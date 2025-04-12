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

const mandatoryColors = [
    "background",
    "settingsButton",
    "settingsButtonHover",
    "link",
    "sectionName",
    "searchBackground",
    "searchBorder",
    "searchText",
    "searchLink",
    "searchSelection",
    "searchInputBackground",
];

const defaultColors = {
    background: "#1F1F28",
    settingsButton: "#EEEBD9",
    settingsButtonHover: "#7E9CD8",
    link: "#DCD7BA",
    sectionName: "#DCD7BA",
    searchBackground: "#1F1F28",
    searchBorder: "#DCD7BA",
    searchText: "#DCD7BA",
    searchLink: "#DCD7BA",
    searchSelection: "#EEEBD920",
    searchInputBackground: "#1F1F28",
    black: "#090618",
    blue: "#7E9CD8",
    cyan: "#6A9589",
    green: "#8BAE7D",
    purple: "#957FB8",
    red: "#C34043",
    white: "#C8C093",
    yellow: "#D4BA88",
    brightBlack: "#727169",
    brightBlue: "#7FB4CA",
    brightCyan: "#7AA89F",
    brightGreen: "#98BB6C",
    brightPurple: "#938AA9",
    brightRed: "#E82424",
    brightWhite: "#DCD7BA",
    brightYellow: "#E6C384",
};

const formatJson = (string) => (string ? JSON.stringify(JSON.parse(string), null, 2) : null);

document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(["settings"], (result) => {
        document.getElementById("config").value =
            formatJson(result.settings?.config) || JSON.stringify(example, null, 2);

        document.getElementById("colors").value =
            formatJson(result.settings?.colors) || JSON.stringify(defaultColors, null, 2);

        document.getElementById("marginTop").value = result.settings.margins.top || 0;
        document.getElementById("marginLeft").value = result.settings.margins.left || 0;
        document.getElementById("marginRight").value = result.settings.margins.right || 0;
        document.getElementById("searchSections").checked = result.settings.searchSections || false;
    });
});

document.getElementById("saveBtn").addEventListener("click", () => {
    document.getElementById("configError").style.display = "none";
    document.getElementById("colorsError").style.display = "none";

    let failed = false;
    const configValue = document.getElementById("config").value;
    try {
        JSON.parse(configValue);
    } catch (err) {
        failed = true;
        document.getElementById("configError").style.display = "block";
    }

    let colorJsonValid = true;
    let parsedColors = {};
    const colorsValue = document.getElementById("colors").value;
    try {
        parsedColors = JSON.parse(colorsValue);
    } catch (err) {
        failed = true;
        colorJsonValid = false;
        document.getElementById("colorsError").style.display = "block";
    }
    if (colorJsonValid) {
        const missingMandatoryColors = mandatoryColors.filter((c) => !parsedColors.hasOwnProperty(c));

        if (missingMandatoryColors.length > 0) {
            document.getElementById("missingColorsError").textContent =
                `Missing mandatory colors: ${missingMandatoryColors.join(", ")}`;
            document.getElementById("missingColorsError").style.display = "block";
        } else {
            document.getElementById("missingColorsError").style.display = "none";
        }
    }

    const marginTop = document.getElementById("marginTop").value;
    const marginLeft = document.getElementById("marginLeft").value;
    const marginRight = document.getElementById("marginRight").value;

    if (!failed) {
        chrome.storage.local.set(
            {
                settings: {
                    config: formatJson(configValue),
                    colors: formatJson(colorsValue),
                    margins: {
                        top: marginTop,
                        left: marginLeft,
                        right: marginRight,
                    },
                    searchSections: document.getElementById("searchSections").checked,
                },
            },
            () => {
                console.log("Settings saved!");
            },
        );
    }
});
