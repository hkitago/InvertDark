// When enabled with tabs already open, just tricky part for Safari
browser.runtime.onInstalled.addListener(async () => {
  const tabs = await browser.tabs.query({});

  for (const tab of tabs) {
    if (tab.url.startsWith('http') || tab.url.startsWith('https')) {
      await browser.tabs.reload(tab.id);
    }
  }
});

// Main action
browser.action.onClicked.addListener((tab) => {
  browser.tabs.sendMessage(tab.id, { action: "performAction" });
});

// Listen for when a tab is activated
browser.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await browser.tabs.get(activeInfo.tabId);
    browser.tabs.sendMessage(tab.id, { action: "updatePageAction" });
  } catch (error) {
    console.error("Error updating page on tab activation:", error);
  }
});

// Listen for when a tab is updated (e.g., page loaded or reloaded)
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    browser.tabs.sendMessage(tabId, { action: "updatePageAction" });
  }
});

// Listen for when the window focus changes (e.g., switching to a different window)
browser.windows.onFocusChanged.addListener(async (windowId) => {
  if (windowId !== browser.windows.WINDOW_ID_NONE) {
    try {
      const tabs = await browser.tabs.query({ active: true, windowId });
      if (tabs.length > 0) {
        browser.tabs.sendMessage(tabs[0].id, { action: "updatePageAction" });
      }
    } catch (error) {
      console.error("Error updating page on window focus:", error);
    }
  }
});

// Update icon logic
const updateIcon = (iconState) => {
  let iconPath;
  switch (iconState) {
    case "extension-dark":
      iconPath = "images/toolbar-icon-dark.svg";
      break;
    case "site-dark":
      iconPath = "images/toolbar-icon-site-dark.svg";
      break;
    default:
      iconPath = "images/toolbar-icon.svg";
      break;
  }
  //console.log('updateIcon:', iconState);
  browser.action.setIcon({ path: iconPath });
};

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateIcon") {
    updateIcon(message.iconState);
  }
});
