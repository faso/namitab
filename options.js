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
    chrome.storage.local.get(["settings"], (result) => {
        document.getElementById("config").value =
            result.settings.config || JSON.stringify(example);

        document.getElementById("marginTop").value =
            result.settings.margins.top || 0;
        document.getElementById("marginLeft").value =
            result.settings.margins.left || 0;
        document.getElementById("marginRight").value =
            result.settings.margins.right || 0;
    });
});

document.getElementById("saveBtn").addEventListener("click", () => {
    const configValue = document.getElementById("config").value;
    const marginTop = document.getElementById("marginTop").value;
    const marginLeft = document.getElementById("marginLeft").value;
    const marginRight = document.getElementById("marginRight").value;

    chrome.storage.local.set(
        {
            settings: {
                config: configValue,
                margins: {
                    top: marginTop,
                    left: marginLeft,
                    right: marginRight,
                },
            },
        },
        () => {
            console.log("Settings saved!");
        },
    );
});
