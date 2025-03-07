const colors = {
    background: "#1F1F28",
    black: "#090618",
    blue: "#7E9CD8",
    brightBlack: "#727169",
    brightBlue: "#7FB4CA",
    brightCyan: "#7AA89F",
    brightGreen: "#98BB6C",
    brightPurple: "#938AA9",
    brightRed: "#E82424",
    brightWhite: "#DCD7BA",
    brightYellow: "#E6C384",
    cursorColor: "#C8C093",
    cyan: "#6A9589",
    foreground: "#EEEBD9",
    green: "#8BAE7D",
    purple: "#957FB8",
    red: "#C34043",
    selectionBackground: "#2D4F67",
    white: "#C8C093",
    yellow: "#D4BA88",
};

document.addEventListener("DOMContentLoaded", () => {
    const settingsBtn = document.getElementById("settingsBtn");
    settingsBtn.addEventListener("click", () => {
        // Open the extension’s options page
        chrome.runtime.openOptionsPage();
    });

    chrome.storage.local.get(["settings"], (result) => {
        let config = {};
        if (!result.settings.config) {
            config = {
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
        } else {
            config = JSON.parse(result.settings.config);
        }

        const container = document.getElementById("container");

        container.style.marginTop = `${result.settings.margins.top}%`;
        container.style.marginRight = `${result.settings.margins.right}%`;
        container.style.marginLeft = `${result.settings.margins.left}%`;

        for (const columnConfig of config.columns) {
            console.log(columnConfig);
            const newColumn = buildColumn(columnConfig);
            container.appendChild(newColumn);
        }
    });
});

const buildColumn = (column) => {
    const newColumn = document.createElement("div");
    newColumn.classList += " column";

    let sectionNum = 0;
    for (const section of column.sections) {
        newColumn.appendChild(buildHeader(section.name));
        const links = buildLinkList(section.links);
        newColumn.appendChild(links);
        sectionNum++;
    }

    return newColumn;
};

const buildHeader = (name) => {
    const columnHeader = document.createElement("h2");
    columnHeader.textContent = name;
    return columnHeader;
};

const buildLinkList = (links) => {
    const newList = document.createElement("ul");
    for (const link of links) {
        newList.appendChild(buildLink(link));
    }

    return newList;
};

const buildLink = (link) => {
    const a = document.createElement("a");
    const li = document.createElement("li");

    const i = document.createElement("i");
    i.classList += "nf";
    if (link.hasOwnProperty("icon")) {
        i.classList += ` ${link.icon}`;

        let iconColor = colors.brightWhite;
        if (
            link.hasOwnProperty("icon-color") &&
            link["icon-color"] !== "" &&
            colors.hasOwnProperty(link["icon-color"])
        ) {
            iconColor = colors[link["icon-color"]];
        }
        i.style.color = iconColor;
    }
    li.appendChild(i);

    li.appendChild(a);

    if (link.hasOwnProperty("name")) {
        a.href = link.url;
        a.textContent = link.name;
    } else {
        li.classList += " placeholder";
    }

    return li;
};
