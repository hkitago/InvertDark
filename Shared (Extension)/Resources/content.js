(() => {
  /* Global variables */
  let iconState = 'default';
  let isSiteDarkThemeDetected = false;

  const IS_TOP_FRAME = window.self === window.top;

  const STYLE_ID = 'InvertDarkStyle';
  const FILTER_VAL = 'invert(1) hue-rotate(180deg)';

  const CSS_CONTENT = `
    html[data-invertdark-active="true"]:not([data-dark-mode-context="sub-frame"]) {
      background-color: rgb(35, 35, 33) !important;
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
    let state = 'default';
    if (enabled) {
      state = 'extension-dark';
    } else if (isSiteDarkThemeDetected) {
      state = 'site-dark';
    }
    browser.runtime.sendMessage({ action: 'UPDATE_ICON', iconState: state });
  };

  const checkBackgroundForElement = (element) => {
    const style = window.getComputedStyle(element);
    if (style.backgroundImage && style.backgroundImage !== 'none') {
      element.classList.add('invertdark-ext-bg-images');
    }
  };

  /* Detection & Background processing */
//  const detectSiteDarkTheme = () => {
//   const getRGB = (el) => {
//     const bg = window.getComputedStyle(el).backgroundColor;
//     return bg.startsWith('rgb') ? bg.match(/\d+/g).map(Number) : null;
//   };
//   const isDark = (rgb) => (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255 < 0.5;
//
//   const bodyRgb = document.body ? getRGB(document.body) : getRGB(document.documentElement);
//   isSiteDarkThemeDetected = bodyRgb ? isDark(bodyRgb) : false;
//  };

//     const detectSiteDarkTheme = () => {
//       isSiteDarkThemeDetected = findLargeDarkElements();
//       if (isSiteDarkThemeDetected && document.documentElement.getAttribute('data-invertdark-active') !== 'true') {
//         iconState = 'site-dark';
//         browser.runtime.sendMessage({ action: 'UPDATE_ICON', iconState: iconState });
//       }
//     };
//
//     const isDarkColor = (rgb) => {
//       const [r, g, b] = rgb;
//       return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
//     };
//     const getRGBColor = (el) => {
//       const bg = window.getComputedStyle(el).backgroundColor;
//       if (bg.startsWith('rgb')) return bg.match(/\d+/g).slice(0, 3).map(Number);
//       return null;
//     };
//     const findLargeDarkElements = () => {
//       const htmlBodyRgb = getRGBColor(document.documentElement) || (document.body ? getRGBColor(document.body) : null);
//       return htmlBodyRgb ? isDarkColor(htmlBodyRgb) : false;
//     };

  
  const detectSiteDarkTheme = () => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const largeElements = [];

    document.querySelectorAll('*').forEach(element => {
      const rect = element.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(element);

      if (computedStyle.opacity === '0') return;

      if (rect.width >= windowWidth && rect.height >= windowHeight / 2 && rect.top < windowHeight / 3 && rect.bottom >= windowHeight ) {
        const rgb = getRGBColor(element);
        if (rgb && isDarkColor(rgb)) {
          const zIndex = computedStyle.zIndex;
          largeElements.push({ element, zIndex: parseInt(zIndex) || 0 });
          //console.log('Checked element:', element, 'RGB:', rgb);
        }
      }
    });

    const topElement = largeElements.reduce((max, current) => {
      return current.zIndex > max.zIndex ? current : max;
    }, { zIndex: -Infinity });

    if (topElement.element) {
      const rgb = getRGBColor(topElement.element);
      //console.log('Top element:', topElement.element, 'RGB:', rgb, 'isDarkColor:', rgb ? isDarkColor(rgb) : 'N/A');
      return rgb ? isDarkColor(rgb) : false;
    }

    const htmlBodyRgb = getRGBColor(document.documentElement) || getRGBColor(document.body);
    //console.log('HTML/Body RGB:', htmlBodyRgb, 'isDarkColor:', htmlBodyRgb ? isDarkColor(htmlBodyRgb) : 'N/A');
//    return htmlBodyRgb ? isDarkColor(htmlBodyRgb) : false;
    iconState = isDarkColor(htmlBodyRgb) ? 'site-dark' : iconState;
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

//    if (IS_TOP_FRAME) {
//      detectSiteDarkTheme();
//      browser.runtime.sendMessage({ action: 'UPDATE_ICON', iconState: iconState });
//    }

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(processNodeTree);
      });
    });

    observer.observe(document.documentElement || document.body, {
      childList: true,
      subtree: true
    });

    processNodeTree(document.documentElement);
  };

  if (document.readyState !== 'loading') {
    initializeContent();
  } else {
    document.addEventListener('DOMContentLoaded', initializeContent, { once: true });
  }
})();
