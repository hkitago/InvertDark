(() => {
  const IS_TOP_FRAME = window.self === window.top;

  const STYLE_ID = 'InvertDarkStyle';
  const FILTER_VAL = 'invert(1) hue-rotate(180deg)';
  const BG_IMAGE_HEURISTICS = {
    maxWidthPx: 128,
    maxHeightPx: 128,
    maxAreaViewportRatio: 0.2,
    maxTextLength: 24,
    allowSelectors: 'a, button, [role="img"], .icon, .logo, .hero, .mv, .kv, .main-visual, .page-header, .section-hero, .visual-header, .header-band, .uritai_main',
    explicitMediaSelectors: '.profile, .preview__image, .featured__slide-bg, progressive-image, [data-bg-image], [data-bg-small-image], [background-image], .thumbBlock[role="img"], [aria-label*="Taboola" i]'
  };
  const AD_SCAN_HEURISTICS = {
    fastSelectors: [
      '.adsbygoogle',
      '[data-ad]',
      '[data-ad-client]',
      '[data-ad-slot]',
      '[data-uv-creative]',
      '[data-uv-element]',
      '[data-creative-element]',
      '[id*="ad-" i]',
      '[class*="ad-" i]',
      '[class*="ob-" i]',
      '[id*="yads" i]',
      '[class*="yads" i]',
      '[id*="banner" i]',
      '[class*="banner" i]',
      'iframe[src*="doubleclick.net"]',
      'iframe[src*="googlesyndication.com"]'
    ].join(', '),
    keywordPattern: /\b(ad|ads|advert|banner|sponsor|promoted|doubleclick|googlesyndication|adsbygoogle|gpt|yads|yahooads)\b/i,
    maxNodesPerAdSubtree: 240
  };
  const INCREMENTAL_SCAN_HEURISTICS = {
    maxNodesPerMutationSubtree: 800
  };

  const SKIP_BG_PROCESSING = {
    // Class names that should skip background processing (case-insensitive)
    classNames: [
      'compass-fit-ad-img-inner'
    ],
    // Tag names that should skip background processing (UPPERCASE)
    tagNames: new Set(['PICTURE']),
    // Extra selectors that should skip background processing (evaluated with .closest)
    // Keep this empty for now; add patterns here when needed.
    extraSelectors: []
  };

  const MEDIA_IFRAME_SELECTORS = [
    'iframe[src*="youtube" i]',
    'iframe[src*="vimeo" i]',
    'iframe[src*="dailymotion" i]',
    'iframe[src*="jwplayer" i]',
    'iframe[src*="instagram.com" i][src*="/embed" i]',
    'iframe[src*="youtube-nocookie.com" i]',
    'iframe[src*="mdstrm.com/embed" i]',
    'iframe[src*="r7.com/player" i]',
    'iframe[src*="noticias.r7.com/player" i]',
    'iframe[src*="video.google.com" i]',
    'iframe[src*="doubleclick" i]',
    'iframe[src*="foxnews.com" i]',
    'iframe[src*="dailymotion.com" i]'
  ];
  const MEDIA_IFRAME_SELECTOR = MEDIA_IFRAME_SELECTORS.join(',\n    ');
  const SUBFRAME_MEDIA_IFRAME_SELECTOR = MEDIA_IFRAME_SELECTORS
    .map((selector) => `html[data-invertdark-active="true"][data-dark-mode-context="sub-frame"] ${selector}`)
    .join(',\n    ');
  const SKIP_TREE_SCAN_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE']);
  const IS_INSTAGRAM_FRAME = /(^|\.)instagram\.com$/i.test(window.location.hostname);

  const INPUT_CONTEXT_SELECTOR = 'textarea, [contenteditable="true"], [contenteditable=""], [role="textbox"], [role="combobox"]';

  const CSS_CONTENT = `
    html[data-invertdark-active="true"]:not([data-dark-mode-context="sub-frame"]) {
      background-color: rgb(220, 220, 222) !important;
    }

    html[data-invertdark-active="true"][data-dark-mode-context="sub-frame"] {
      background-color: transparent !important;
      filter: none !important;
    }

    img, svg, canvas, .invertdark-ext-bg-images {
      filter: var(--invertdark-re-invert, none) !important;
      -webkit-filter: var(--invertdark-re-invert, none) !important;
    }

    .invertdark-ext-bg-images-pseudo::before,
    .invertdark-ext-bg-images-pseudo::after {
      filter: var(--invertdark-re-invert, none) !important;
      -webkit-filter: var(--invertdark-re-invert, none) !important;
    }

    video {
      filter: var(--invertdark-video-filter, var(--invertdark-re-invert, none)) !important;
      -webkit-filter: var(--invertdark-video-filter, var(--invertdark-re-invert, none)) !important;
    }

    .vjs-poster,
    .ytp-cued-thumbnail-overlay-image {
      filter: var(--invertdark-video-poster-filter, var(--invertdark-video-filter, var(--invertdark-re-invert, none))) !important;
      -webkit-filter: var(--invertdark-video-poster-filter, var(--invertdark-video-filter, var(--invertdark-re-invert, none))) !important;
    }

    news-player,
    .ftscp-plr {
      filter: var(--invertdark-video-poster-filter, var(--invertdark-video-filter, var(--invertdark-re-invert, none))) !important;
      -webkit-filter: var(--invertdark-video-poster-filter, var(--invertdark-video-filter, var(--invertdark-re-invert, none))) !important;
    }

    ${MEDIA_IFRAME_SELECTOR} {
      filter: var(--invertdark-iframe-media-filter, var(--invertdark-video-filter, var(--invertdark-re-invert, none))) !important;
      -webkit-filter: var(--invertdark-iframe-media-filter, var(--invertdark-video-filter, var(--invertdark-re-invert, none))) !important;
    }

    html[data-invertdark-active="true"][data-dark-mode-context="sub-frame"] .ytp-cued-thumbnail-overlay-image,
    html[data-invertdark-active="true"][data-dark-mode-context="sub-frame"] news-player,
    html[data-invertdark-active="true"][data-dark-mode-context="sub-frame"] .ftscp-plr {
      filter: none !important;
      -webkit-filter: none !important;
    }

    ${SUBFRAME_MEDIA_IFRAME_SELECTOR} {
      filter: none !important;
      -webkit-filter: none !important;
    }
 
    html[data-invertdark-active="true"][data-dark-mode-context="sub-frame"] .player .video_thumbnail .video_thumbnail_image,
    html[data-invertdark-active="true"][data-dark-mode-context="sub-frame"] .ytp-cued-thumbnail-overlay-image,
    html[data-invertdark-active="true"][data-dark-mode-context="sub-frame"] news-player,
    html[data-invertdark-active="true"][data-dark-mode-context="sub-frame"] .ftscp-plr {
      filter: none !important;
      -webkit-filter: none !important;
    }

    html[data-invertdark-active="true"] [aria-label*="Taboola" i][role="img"] {
      filter: var(--invertdark-re-invert, none) !important;
      -webkit-filter: var(--invertdark-re-invert, none) !important;
    }

    .ob-rec-image, .creative__image, .logly-lift-ad-img-inner {
      filter: var(--invertdark-re-invert, none) !important;
      -webkit-filter: var(--invertdark-re-invert, none) !important;  
    }
  
    html[data-invertdark-active="true"][data-dark-mode-context="sub-frame"] [data-uv-element*="yads" i],
    html[data-invertdark-active="true"][data-dark-mode-context="sub-frame"] [id*="compass-fit-" i],
    html[data-invertdark-active="true"][data-dark-mode-context="sub-frame"] [id*="yads" i] {
      filter: var(--invertdark-re-invert, none) !important;
      -webkit-filter: var(--invertdark-re-invert, none) !important;
    }

    html[data-invertdark-active="true"] [gtm-jack-info] {
      filter: var(--invertdark-re-invert, none) !important;
      -webkit-filter: var(--invertdark-re-invert, none) !important;
    }

    [data-testid="betamax-poster"],
    [data-host="https://www.dailymail.co.uk"] {
      filter: var(--invertdark-re-invert, none) !important;
      -webkit-filter: var(--invertdark-re-invert, none) !important;  
    }
 `;

  const ensureDarkModeStyles = (root = document) => {
    if (!root || root.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = CSS_CONTENT;
    (root.head || root.documentElement || root).appendChild(style);
  };

  // ========================================
  // Managing heavy processing
  // ========================================
  let domObserver = null;

  const startHeavyProcessing = () => {
    if (!domObserver) {
      domObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              handleAddedNode(node);
            });
            return;
          }
          if (mutation.type === 'attributes' && shouldRecheckOnStyleMutation(mutation.target)) {
            if (!isInputContextNode(mutation.target)) {
              queueIncrementalNodeScan(mutation.target);
            }
          }
        });
      });

      domObserver.observe(document.documentElement || document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'src']
      });
    }

    processInitialNodeTree(document.documentElement);
    processAdNodeTree(document.documentElement);
  };

  const stopHeavyProcessing = () => {
    if (!domObserver) return;
    domObserver.disconnect();
    domObserver = null;
  };

  const applyFinalState = (enabled) => {
    const html = document.documentElement;
    const isSubFrame = window.self !== window.top;
    const isFramesetSubFrame =
      isSubFrame &&
      window.frameElement &&
      window.frameElement.tagName === 'FRAME';

    html.setAttribute('data-invertdark-active', enabled ? 'true' : 'false');

    if (isSubFrame) {
      html.setAttribute('data-dark-mode-context', 'sub-frame');
      html.style.filter = 'none';
      html.style.webkitFilter = 'none';
    } else {
      html.removeAttribute('data-dark-mode-context');
      const rootFilter = enabled ? FILTER_VAL : 'none';
      html.style.filter = rootFilter;
      html.style.webkitFilter = rootFilter;
    }
    const reinvertFilter = enabled ? FILTER_VAL : 'none';
    const subFrameReinvert = isSubFrame && IS_INSTAGRAM_FRAME ? 'none' : reinvertFilter;
    html.style.setProperty('--invertdark-re-invert', subFrameReinvert);
    const mediaFilter = enabled
      ? (isSubFrame ? (isFramesetSubFrame ? FILTER_VAL : 'none') : FILTER_VAL)
      : 'none';
    html.style.setProperty('--invertdark-video-filter', mediaFilter);
    html.style.setProperty('--invertdark-video-poster-filter', mediaFilter);
    html.style.setProperty('--invertdark-iframe-media-filter', mediaFilter);

    if (enabled) {
      startHeavyProcessing();
    } else {
      stopHeavyProcessing();
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

  const walkElementTree = (root, visitor, maxNodes = Number.POSITIVE_INFINITY) => {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return;
    const stack = [root];
    let visited = 0;

    while (stack.length > 0 && visited < maxNodes) {
      const element = stack.pop();
      if (SKIP_TREE_SCAN_TAGS.has(element.tagName)) {
        visited += 1;
        continue;
      }
      visitor(element);
      visited += 1;

      if (element.shadowRoot && element.shadowRoot.mode === 'open') {
        ensureDarkModeStyles(element.shadowRoot);
        observeShadowRoot(element.shadowRoot);
        for (let i = element.shadowRoot.children.length - 1; i >= 0; i -= 1) {
          stack.push(element.shadowRoot.children[i]);
        }
      }

      for (let i = element.children.length - 1; i >= 0; i -= 1) {
        stack.push(element.children[i]);
      }
    }
  };

  const ensureShadowStylesInTree = (root, maxNodes = Number.POSITIVE_INFINITY) => {
    if (SKIP_TREE_SCAN_TAGS.has(root?.tagName)) return;
    walkElementTree(root, () => {}, maxNodes);
  };

  const observedShadowRoots = new WeakSet();

  const isInputContextNode = (node) => {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return false;
    if (node.matches(INPUT_CONTEXT_SELECTOR)) return true;
    return Boolean(node.closest(INPUT_CONTEXT_SELECTOR));
  };

  const handleAddedNode = (node) => {
    if (isInputContextNode(node)) return;

    ensureShadowStylesInTree(node, 1200);
    queueIncrementalNodeScan(node);
    queueAdNodeScan(node);
  };

  const observeShadowRoot = (shadowRoot) => {
    if (!shadowRoot || observedShadowRoots.has(shadowRoot)) return;
    observedShadowRoots.add(shadowRoot);

    const shadowObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            handleAddedNode(node);
          });
          return;
        }

        if (mutation.type === 'attributes' && shouldRecheckOnStyleMutation(mutation.target)) {
          if (!isInputContextNode(mutation.target)) {
            queueIncrementalNodeScan(mutation.target);
          }
        }
      });
    });

    shadowObserver.observe(shadowRoot, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'src']
    });
  };

  const updateIconState = (enabled) => {
    const state = enabled ? 'extension-dark' : 'default';
    browser.runtime.sendMessage({ action: 'UPDATE_ICON', iconState: state });
  };

  const hasUrlBackgroundImage = (backgroundImage) => {
    if (!backgroundImage || backgroundImage === 'none') return false;
    return /url\s*\(/i.test(backgroundImage);
  };

  const hasInlineUrlCustomProperty = (element) => {
    const inlineStyle = element.getAttribute('style') || '';
    return /--[a-z0-9_-]*(cover|bg|image|thumb|poster)[a-z0-9_-]*\s*:\s*url\s*\(/i.test(inlineStyle);
  };

  const shouldRecheckOnStyleMutation = (element) => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) return false;
    if (element.tagName === 'IFRAME') return true;
    if (hasInlineUrlCustomProperty(element)) return true;

    const className = typeof element.className === 'string'
      ? element.className
      : (element.getAttribute('class') || '');
    return /(bstn|headline|cover|photo|thumb|image)/i.test(className);
  };

  const VIDEO_CONTEXT_SELECTOR = [
    'video',
    'source',
    'track',
    '[class*="video" i]',
    '[class*="player" i]',
    '[class*="poster" i]',
    '[class*="thumbnail" i]',
    '[id*="video" i]',
    '[id*="player" i]',
    '[id*="poster" i]',
    '[id*="thumbnail" i]'
  ].join(', ');

  const isVideoContextElement = (element) => {
    if (element.matches('video, source, track')) return true;
    if (element.closest('video')) return true;
    return Boolean(element.closest(VIDEO_CONTEXT_SELECTOR));
  };

  const clearBgImageClasses = (element) => {
    element.classList.remove('invertdark-ext-bg-images');
    element.classList.remove('invertdark-ext-bg-images-pseudo');
  };

  const shouldSkipBackgroundProcessing = (element) => {
    // Class name based skip (case-insensitive)
    const classNameLower = ((typeof element.className === 'string'
      ? element.className
      : (element.className && element.className.baseVal) || '')
    ).toLowerCase();
    if (SKIP_BG_PROCESSING.classNames.some((name) => classNameLower.includes(name))) return true;

    // Tag name based skip
    if (SKIP_BG_PROCESSING.tagNames.has(element.tagName)) return true;

    // Selector based skip via closest
    if (SKIP_BG_PROCESSING.extraSelectors.length > 0) {
      for (const sel of SKIP_BG_PROCESSING.extraSelectors) {
        if (element.closest(sel)) return true;
      }
    }

    // Video-related contexts are handled elsewhere
    return isVideoContextElement(element);
  };

  const checkBackgroundForElement = (element) => {
    if (shouldSkipBackgroundProcessing(element)) {
      clearBgImageClasses(element);
      return;
    }

    const style = window.getComputedStyle(element);
    const hasBackgroundImage = hasUrlBackgroundImage(style.backgroundImage);
    const hasPseudoBackgroundImage = hasInlineUrlCustomProperty(element);
    if (!hasBackgroundImage) {
      element.classList.remove('invertdark-ext-bg-images');
      element.classList.toggle('invertdark-ext-bg-images-pseudo', hasPseudoBackgroundImage);
      return;
    }

    const rect = element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const area = width * height;
    const viewportArea = Math.max(window.innerWidth * window.innerHeight, 1);
    const textLength = (element.textContent || '').trim().length;
    const hasChildren = element.children.length > 0;
    const hasMediaChild = element.querySelector('img, svg, canvas, video') !== null;
    const matchesAllowSelector = element.matches(BG_IMAGE_HEURISTICS.allowSelectors);
    const matchesExplicitMediaSelector = element.matches(BG_IMAGE_HEURISTICS.explicitMediaSelectors);

    const isLargeArea = area > viewportArea * BG_IMAGE_HEURISTICS.maxAreaViewportRatio;
    const isTooWideOrTall = width > BG_IMAGE_HEURISTICS.maxWidthPx || height > BG_IMAGE_HEURISTICS.maxHeightPx;
    const isCover = style.backgroundSize === 'cover';
    const looksLikeWrapper = hasChildren && (isTooWideOrTall || isLargeArea || isCover);
    const hasTooMuchText = textLength > BG_IMAGE_HEURISTICS.maxTextLength;

    // Detect header-like band: fixed-ish height, spans most of viewport width, and uses background-size: cover
    const isHeaderBandCandidate = (() => {
      if (!isCover) return false;
      const headerMinHeight = 80;
      const headerMaxHeight = 400;
      const widthCoversViewport = width >= Math.max(window.innerWidth, 1) * 0.8;
      const heightLooksFixed = height >= headerMinHeight && height <= headerMaxHeight;
      const textOK = textLength <= 200; // allow a headline and small subtext
      return widthCoversViewport && heightLooksFixed && textOK;
    })();

    // If it looks like a header band, don't treat it as a generic wrapper
    const effectiveLooksLikeWrapper = isHeaderBandCandidate ? false : looksLikeWrapper;

    const shouldApplyClass =
      !hasMediaChild && (
        matchesAllowSelector ||
        matchesExplicitMediaSelector ||
        (!isLargeArea && !effectiveLooksLikeWrapper && !hasTooMuchText && !isTooWideOrTall) ||
        isHeaderBandCandidate
      );

    element.classList.toggle('invertdark-ext-bg-images', shouldApplyClass);
    element.classList.remove('invertdark-ext-bg-images-pseudo');
  };

  const checkAdBackgroundForElement = (element) => {
    if (shouldSkipBackgroundProcessing(element)) {
      clearBgImageClasses(element);
      return;
    }

    const style = window.getComputedStyle(element);
    const hasBackgroundImage = hasUrlBackgroundImage(style.backgroundImage);
    element.classList.toggle('invertdark-ext-bg-images', hasBackgroundImage);
    element.classList.remove('invertdark-ext-bg-images-pseudo');
  };

  const getElementAdHintText = (element) => {
    const className = typeof element.className === 'string'
      ? element.className
      : (element.getAttribute('class') || '');
    return [
      element.id,
      className,
      element.getAttribute('name'),
      element.getAttribute('src'),
      element.getAttribute('role'),
      element.getAttribute('aria-label'),
      element.getAttribute('data-ad'),
      element.getAttribute('data-ad-client'),
      element.getAttribute('data-ad-slot'),
      element.getAttribute('data-uv-element'),
      element.getAttribute('data-creative-element'),
      element.getAttribute('data-uv-creative')
    ].filter(Boolean).join(' ');
  };

  const isAdRelatedElement = (element) => {
    if (element.matches(AD_SCAN_HEURISTICS.fastSelectors)) return true;
    return AD_SCAN_HEURISTICS.keywordPattern.test(getElementAdHintText(element));
  };

  const processInitialNodeTree = (root) => {
    walkElementTree(root, checkBackgroundForElement);
  };

  const processIncrementalNodeTree = (root) => {
    walkElementTree(root, checkBackgroundForElement, INCREMENTAL_SCAN_HEURISTICS.maxNodesPerMutationSubtree);
  };

  const processAdNodeTree = (root) => {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return;

    const adRoots = new Set();
    if (isAdRelatedElement(root)) {
      adRoots.add(root);
    }

    root.querySelectorAll(AD_SCAN_HEURISTICS.fastSelectors).forEach((element) => {
      adRoots.add(element);
    });

    adRoots.forEach((adRoot) => {
      walkElementTree(adRoot, checkAdBackgroundForElement, AD_SCAN_HEURISTICS.maxNodesPerAdSubtree);
    });
  };

  // ========================================
  // Queuing for scanning ads
  // ========================================
  const queuedIncrementalNodes = new Set();
  let isIncrementalScanScheduled = false;

  const flushIncrementalNodeQueue = () => {
    isIncrementalScanScheduled = false;
    queuedIncrementalNodes.forEach((node) => {
      processIncrementalNodeTree(node);
    });
    queuedIncrementalNodes.clear();
  };

  const queueIncrementalNodeScan = (node) => {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return;
    queuedIncrementalNodes.add(node);
    if (isIncrementalScanScheduled) return;

    isIncrementalScanScheduled = true;
    if (typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(flushIncrementalNodeQueue);
    } else {
      window.setTimeout(flushIncrementalNodeQueue, 16);
    }
  };

  const queuedAdNodes = new Set();
  let isAdScanScheduled = false;

  const flushAdNodeQueue = () => {
    isAdScanScheduled = false;
    queuedAdNodes.forEach((node) => {
      processAdNodeTree(node);
    });
    queuedAdNodes.clear();
  };

  const queueAdNodeScan = (node) => {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return;
    queuedAdNodes.add(node);
    if (isAdScanScheduled) return;

    isAdScanScheduled = true;
    if (typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(flushAdNodeQueue);
    } else {
      window.setTimeout(flushAdNodeQueue, 16);
    }
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
  };

  if (document.readyState !== 'loading') {
    initializeContent();
  } else {
    document.addEventListener('DOMContentLoaded', initializeContent, { once: true });
  }
})();

