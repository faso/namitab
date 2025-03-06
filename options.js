// options.js
const example = {
    columns: [
        {
            name: "Column 1",
            links: [
                {
                    name: "Link 1",
                    url: "https://google.com",
                    icon: "nf-md-diamond_stone",
                    "icon-color": "brightBlue",
                },
                {
                    name: "Link 2",
                    url: "https://google.com",
                    icon: "nf-fa-file_invoice",
                    "icon-color": "",
                },
            ],
        },
        {
            name: "Column 2",
            links: [
                {
                    name: "Link 1",
                    url: "https://google.com",
                    icon: "nf-md-diamond_stone",
                    "icon-color": "brightBlue",
                },
                {},
                {
                    name: "Link 2",
                    url: "https://google.com",
                    icon: "nf-fa-file_invoice",
                    "icon-color": "",
                },
            ],
        },
    ],
};

document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(["config"], (result) => {
        document.getElementById("config").value =
            result.config || JSON.stringify(example);
    });
});

document.getElementById("saveBtn").addEventListener("click", () => {
    const settingValue = document.getElementById("config").value;

    chrome.storage.local.set({ config: settingValue }, () => {
        console.log("Settings saved!");
    });
});
