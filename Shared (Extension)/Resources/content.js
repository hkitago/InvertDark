(() => {  
  /* Global variables */
  let iconState = 'default';
  let isSiteDarkThemeDetected = false;
  
  const isInvertDarkActive = () => {
    return document.getElementById('InvertDarkStyle') !== null;
  };
  
  /* Storage management */
  const getDarkModeDomains = async () => {
    try {
      const result = await browser.storage.local.get('darkModeDomains');
      return result.darkModeDomains || [];
    } catch (e) {
      console.error('Storage is unavailable or insecure:', e);
      return [];
    }
  };
  
  const saveDarkModeDomains = async (domains) => {
    const uniqueDomains = [...new Set(domains)];
    try {
      await browser.storage.local.set({ darkModeDomains: uniqueDomains });
    } catch (e) {
      console.error('Failed to save data to browser storage:', e);
    }
  };
  
  /* Core dark mode functions */
  const applyInvertDark = () => {
    if (isInvertDarkActive()) return;

    const link = document.createElement('link');
    link.id = 'InvertDarkStyle';
    link.rel = 'stylesheet';
    link.href = browser.runtime.getURL('invert-dark.css');

    document.head.appendChild(link);
  };
  
  const removeInvertDark = () => {
    if (isInvertDarkActive()) {
      document.getElementById('InvertDarkStyle').remove();
    }
  };
  
  const updateToolbarIcon = () => {
    browser.runtime.sendMessage({ action: 'updateIcon', iconState: iconState });
  };
  
  /* Main function to toggle dark mode on/off */
  const toggleInvertDarkMode = async () => {
    const currentDomain = window.location.hostname;
    const darkModeDomains = await getDarkModeDomains();
    
    if (isInvertDarkActive()) {
      iconState = isSiteDarkThemeDetected ? 'site-dark' : 'default';
      removeInvertDark();
      darkModeDomains.splice(darkModeDomains.indexOf(currentDomain), 1);
    } else {
      iconState = 'extension-dark';
      applyInvertDark();
      darkModeDomains.push(currentDomain);
    }
    
    await saveDarkModeDomains(darkModeDomains);
    updateToolbarIcon();
  };
  
  browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === 'performAction') {
      try {
        await toggleInvertDarkMode();
      } catch (error) {
        console.error('Error in content script: ', error);
      }
    }
  });
  
  /* Initialize dark mode based on stored settings */
  const initInvertDark = async () => {
    /* Debug: await browser.storage.local.clear(); return; */
    const currentDomain = window.location.hostname;
    const darkModeDomains = await getDarkModeDomains();
    
    if (darkModeDomains.includes(currentDomain)) {
      if (document.head) {
        applyInvertDark();
      } else {
        // waiting for head tag
        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.addedNodes) {
              for (const node of mutation.addedNodes) {
                if (node.nodeName.toLowerCase() === 'head') {
                  applyInvertDark();
                  observer.disconnect();
                  return;
                }
              }
            }
          }
        });
        
        observer.observe(document.documentElement, { childList: true });
      }
      iconState = 'extension-dark';
      updateToolbarIcon();
    }
  };
  
  initInvertDark();

  /* Detect Site Dark Theme */
  const isDarkColor = (rgb) => {
    const [r, g, b] = rgb;
    // Relative luminance formula for dark color
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5; // Dark if luminance is below 0.5
  };

  const getComputedBackgroundColor = (element) => {
    let currentElement = element;
    let backgroundColor;
    while (currentElement) {
      backgroundColor = window.getComputedStyle(currentElement).backgroundColor;
      if (backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent') {
        return backgroundColor;
      }
      currentElement = currentElement.parentElement;
    }
    // If all elements are transparent, default to white (common browser default)
    return 'rgb(255, 255, 255)';
  };

  const getRGBColor = (element) => {
    const bgColor = getComputedBackgroundColor(element);
    if (bgColor.startsWith('rgb')) {
      return bgColor.match(/\d+/g).slice(0, 3).map(Number);
    }
    return null;
  };

  const findLargeDarkElements = () => {
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
    return htmlBodyRgb ? isDarkColor(htmlBodyRgb) : false;
  };

  const detectSiteDarkTheme = () => {
    if (isInvertDarkActive()) return;
    
    isSiteDarkThemeDetected = findLargeDarkElements();
    
    if (isSiteDarkThemeDetected) {
      iconState = 'site-dark';
    }
    updateToolbarIcon();
  };
  
  if (document.readyState !== 'loading') {
    detectSiteDarkTheme();
  } else {
    document.addEventListener('DOMContentLoaded', detectSiteDarkTheme);
  }
  
  /* Update page and icon state based on current settings and site theme */
  const updatePage = async () => {
    const currentDomain = window.location.hostname;
    const darkModeDomains = await getDarkModeDomains();

    if (darkModeDomains.includes(currentDomain)) {
      iconState = 'extension-dark';
      applyInvertDark();
    } else {
      iconState = isSiteDarkThemeDetected ? 'site-dark' : 'default';
      removeInvertDark();
    }
    updateToolbarIcon();
  };
  
  /* Listen for messages from the background script */
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updatePageAction') {
      updatePage();
    }
  });

  /* Add custom class for background-images */
  const detectBackgroundImageElements = () => {
    const extractBackgroundUrls = bgImage => {
      return [...bgImage.matchAll(/url\(['"]?(.*?)['"]?\)/g)].map(match => match[1]);
    };

    const checkBackgroundForElement = (element) => {
      const style = window.getComputedStyle(element);
      const beforeStyle = window.getComputedStyle(element, '::before');
      const afterStyle = window.getComputedStyle(element, '::after');
      
      const checkAndSetClass = (style, pseudo = '') => {
        if (style.backgroundImage && style.backgroundImage !== 'none') {
          element.classList.add('invertdark-ext-bg-images');
          element.setAttribute(`data${pseudo ? `-${pseudo}` : ''}-background-urls`, JSON.stringify(extractBackgroundUrls(style.backgroundImage)));
        }
      };

      checkAndSetClass(style);
      checkAndSetClass(beforeStyle, 'before');
      checkAndSetClass(afterStyle, 'after');
    };

    const processNodeTree = (node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        checkBackgroundForElement(node);
        Array.from(node.children).forEach(child => processNodeTree(child));
      }
    };

    Array.from(document.getElementsByTagName('*')).forEach(checkBackgroundForElement);

    const observer = new MutationObserver(mutations => {
      resetIdleTimer();
      mutations.forEach(mutation => {
        Array.from(mutation.addedNodes).forEach(processNodeTree);
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    let idleTimer;
    const idleTimeout = 3000;

    const resetIdleTimer = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        observer.disconnect();
      }, idleTimeout);
    };

    resetIdleTimer();

    return observer;
  };
  
  // Init with tricky part https://developer.apple.com/forums/thread/651215
  if (document.readyState !== 'loading') {
    detectBackgroundImageElements();
  } else {
   document.addEventListener('DOMContentLoaded', detectBackgroundImageElements);
  }

})();
