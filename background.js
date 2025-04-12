chrome.commands.onCommand.addListener((command) => {
    if (command === "toggle-search") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "toggleSearch" });
            }
        });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openUrl" && message.url) {
        chrome.tabs.create({ url: message.url });
    }
});
