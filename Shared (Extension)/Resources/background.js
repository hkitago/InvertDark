// ========================================
// Storage management
// ========================================
const getDarkModeSites = async () => {
  try {
    const result = await browser.storage.local.get('darkModeDomains');
    return result.darkModeDomains || [];
  } catch (error) {
    console.warn('[InvertDarkExtension] Fail to get sites from storage:', error);
    return [];
  }
};

const saveDarkModeSites = async (sites) => {
  const uniqueDomains = [...new Set(sites)];
  try {
    await browser.storage.local.set({ darkModeDomains: uniqueDomains });
  } catch (error) {
    console.error('[InvertDarkExtension] Failed to save data to browser storage:', error);
  }
};

const extractUrl = (url) => {
  try {
    return new URL(url).hostname;
  } catch (error) {
    return url;
  }
};

// ========================================
// Icon Handlings
// ========================================
const updateToolbarIcon = async (iconState, tabId = null) => {
  let iconPath;
  switch (iconState) {
    case 'extension-dark':
      iconPath = 'images/toolbar-icon-dark.svg';
      break;
    default:
      iconPath = 'images/toolbar-icon.svg';
      break;
  }

  if (tabId === null) {
    const [activeTab] = await browser.tabs.query({ active: true, currentWindow: true });
    tabId = activeTab?.id;
  }

  browser.action.setIcon({ path: iconPath, tabId });
};

// ========================================
// Event Listeners
// ========================================
browser.action.onClicked.addListener(async (tab) => {
  try {
    const darkModeSites = await getDarkModeSites();
    const currentHostname = extractUrl(tab?.url);
    const hasDarkModeSites = darkModeSites.includes(currentHostname);
    if (hasDarkModeSites) {
      darkModeSites.splice(darkModeSites.indexOf(currentHostname), 1);
    } else {
      darkModeSites.push(currentHostname);
    }
    await saveDarkModeSites(darkModeSites);
  } catch (error) {
    console.error('[InvertDarkExtension] Failed to toggle the extension:', error);
  }
});

browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'checkState') {
    const darkModeSites = await getDarkModeSites();
    const currentHostname = extractUrl(sender.tab.url);
    return { enabled: darkModeSites.includes(currentHostname) };
  }

  if (message.action === 'UPDATE_ICON') {
    const tabId = sender.tab.id;
    updateToolbarIcon(message.iconState, tabId);
    return;
  }
});
