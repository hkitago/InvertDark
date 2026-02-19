(() => {
  const IS_TOP_FRAME = window.self === window.top;

  const STYLE_ID = 'InvertDarkStyle';
  const FILTER_VAL = 'invert(1) hue-rotate(180deg)';

  const CSS_CONTENT = `
    html[data-invertdark-active="true"]:not([data-dark-mode-context="sub-frame"]) {
      background-color: rgb(220, 220, 222) !important;
    }

    html[data-invertdark-active="true"][data-dark-mode-context="sub-frame"] {
      background-color: transparent !important;
      filter: none !important;
    }

    img, video, svg, canvas, .invertdark-ext-bg-images {
      filter: var(--invertdark-re-invert, none) !important;
    }
  `;

  const ensureDarkModeStyles = (root = document) => {
    if (!root || root.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = CSS_CONTENT;
    (root.head || root.documentElement || root).appendChild(style);
  };

  const applyFinalState = (enabled) => {
    const html = document.documentElement;
    const isSubFrame = window.self !== window.top;

    html.setAttribute('data-invertdark-active', enabled ? 'true' : 'false');

    if (isSubFrame) {
      html.setAttribute('data-dark-mode-context', 'sub-frame');
      html.style.filter = 'none';
    } else {
      html.style.filter = enabled ? FILTER_VAL : 'none';
    }
    html.style.setProperty('--invertdark-re-invert', enabled ? FILTER_VAL : 'none');

    if (!IS_TOP_FRAME) {
      html.setAttribute('data-dark-mode-context', 'sub-frame');
    }

    if (IS_TOP_FRAME) {
      updateIconState(enabled);
    }
  };

  const syncStateWithBackground = async () => {
    try {
      const response = await browser.runtime.sendMessage({ action: 'checkState' });
      if (response && typeof response.enabled === 'boolean') {
        applyFinalState(response.enabled);
      }
    } catch (error) {
      const res = await browser.storage.local.get('darkModeDomains');
      const domains = res.darkModeDomains || [];
      applyFinalState(domains.includes(window.location.hostname));
    }
  };

  /* MutationObserver for Shadow DOM and Background Images */
  const processNodeTree = (node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    // Handle Shadow DOM
    if (node.shadowRoot && node.shadowRoot.mode === 'open') {
      ensureDarkModeStyles(node.shadowRoot);
      Array.from(node.shadowRoot.children).forEach(processNodeTree);
    }

    // Existing background detection logic (keep class-based)
    checkBackgroundForElement(node);
    Array.from(node.children).forEach(processNodeTree);
  };

  const updateIconState = (enabled) => {
    const state = enabled ? 'extension-dark' : 'default';
    browser.runtime.sendMessage({ action: 'UPDATE_ICON', iconState: state });
  };

  const checkBackgroundForElement = (element) => {
    const style = window.getComputedStyle(element);
    const hasBackgroundImage = Boolean(style.backgroundImage && style.backgroundImage !== 'none');
    element.classList.toggle('invertdark-ext-bg-images', hasBackgroundImage);
  };

  // ========================================
  // Event listeners
  // ========================================
  browser.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.darkModeDomains) {
      syncStateWithBackground();
    }
  });

  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState !== 'visible') return;
    syncStateWithBackground();
  });

  window.addEventListener('pageshow', (event) => {
    if (!event.persisted) return;
    syncStateWithBackground();
  });

  // ========================================
  // Initialization
  // ========================================
  let isInitialized = false;
  const initializeContent = () => {
    if (isInitialized) return;
    isInitialized = true;

    ensureDarkModeStyles(document);
    syncStateWithBackground();

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(processNodeTree);
        } else if (mutation.type === 'attributes') {
          checkBackgroundForElement(mutation.target);
        }
      });
    });

    observer.observe(document.documentElement || document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    processNodeTree(document.documentElement);
  };

  if (document.readyState !== 'loading') {
    initializeContent();
  } else {
    document.addEventListener('DOMContentLoaded', initializeContent, { once: true });
  }
})();
