// Main message listener remains unchanged.
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "toggleSearch") {
        toggleSearchPanel();
    }
});

// Create and style a new element given a tag name, attributes, and style options.
function createElement(tag, attributes = {}, styles = {}) {
    const element = document.createElement(tag);
    Object.assign(element, attributes);
    Object.assign(element.style, styles);
    return element;
}

// Build the search input field.
function createSearchInput(colors, panel) {
    const input = createElement(
        "input",
        { type: "text", placeholder: "Search your saved URLs..." },
        {
            width: "100%",
            background: colors.searchInputBackground || "#fff",
            color: colors.searchText || "#000",
            fontSize: "1.3em",
            padding: "5px",
            border: "none",
        },
    );

    input.addEventListener("blur", () => {
        setTimeout(() => {
            panel.style.display = "none";
        }, 50);
    });
    return input;
}

// Build the results container (an unordered list).
function createResultsContainer() {
    return createElement(
        "ul",
        {},
        {
            listStyleType: "none",
            padding: "0",
            marginTop: "10px",
            marginBottom: "0",
            maxHeight: "90vh",
            overflowY: "auto",
        },
    );
}

// Build the floating search panel overlay.
function createFloatingPanel(colors) {
    return createElement(
        "div",
        { id: "floating-search" },
        {
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "30%",
            background: colors.searchBackground || "#fff",
            border: `1px solid ${colors.searchBorder || "#ddd"}`,
            zIndex: "2147483647",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            padding: "10px",
            fontFamily: "Consolas, monaco, monospace",
        },
    );
}

// Render search results in the results container.
function renderResults(results, sections, resultsContainer, colors, selectedIndex, renderSections) {
    resultsContainer.innerHTML = "";

    const makeLi = (c) => {
        const li = createElement(
            "li",
            {},
            {
                padding: "5px",
                fontSize: "1.3em",
                cursor: "pointer",
                color: colors.searchLink || "#000",
            },
        );
        li.classList.add(c || "nami-link");
        return li;
    };

    const makeArrow = (i, s) => {
        const arrow = createElement(
            "i",
            {},
            {
                minWidth: "1em",
                display: "inline-block",
                marginRight: "5px",
                fontStyle: "normal",
            },
        );
        arrow.classList.add("arrow");
        arrow.textContent = i === s ? ">" : "";
        return arrow;
    };

    const makeLinkName = (name) => {
        const linkName = createElement("span", { id: "link-name" });
        linkName.textContent = name;
        return linkName;
    };

    let linkIndex = 0;
    results.forEach((link, index) => {
        const li = makeLi();

        // Arrow indicator for selection.
        const arrow = makeArrow(index, selectedIndex);
        li.appendChild(arrow);

        // Link name.
        const linkName = makeLinkName(link.name);
        li.appendChild(linkName);

        li.addEventListener("click", () => {
            chrome.runtime.sendMessage({ action: "openUrl", url: link.url });
        });

        resultsContainer.appendChild(li);
        linkIndex++;
    });

    if (renderSections) {
        sections.forEach((section) => {
            const sectionName = makeLi("nami-section");

            // Link name.
            const linkName = makeLinkName(section.name);
            sectionName.appendChild(linkName);

            resultsContainer.appendChild(sectionName);

            section.links.forEach((link) => {
                if (!link.hasOwnProperty("name")) return;

                const li = makeLi();

                // Arrow indicator for selection.
                const arrow = makeArrow(linkIndex, selectedIndex);
                li.appendChild(arrow);

                // Link name.
                const linkName = makeLinkName(link.name);
                li.appendChild(linkName);

                li.addEventListener("click", () => {
                    chrome.runtime.sendMessage({ action: "openUrl", url: link.url });
                });

                resultsContainer.appendChild(li);
                linkIndex++;
            });
        });
    }
}

// Main function that toggles the search panel.
async function toggleSearchPanel() {
    // Retrieve settings and colors from storage.
    const { settings } = await chrome.storage.local.get(["settings"]);
    const config = JSON.parse(settings.config);
    const colors = JSON.parse(settings.colors);
    const links =
        config.columns.flatMap((col) => col.sections.flatMap((s) => s.links)).filter((e) => e.hasOwnProperty("name")) ||
        [];

    const sections = config.columns.flatMap((col) => col.sections);

    let panel = document.getElementById("floating-search");
    if (panel) {
        panel.style.display = panel.style.display === "none" ? "block" : "none";
        if (panel.style.display === "block") {
            const input = panel.querySelector("input");
            if (input) {
                input.focus();
                input.value = "";
                input.dispatchEvent(new Event("input", { bubbles: true }));
            }
        }
    } else {
        panel = createFloatingPanel(colors);
        const input = createSearchInput(colors, panel);
        panel.appendChild(input);
        const resultsContainer = createResultsContainer();
        panel.appendChild(resultsContainer);
        document.body.appendChild(panel);
        input.focus();

        let selectedIndex = -1;

        const updateSelection = () => {
            const items = resultsContainer.querySelectorAll("li.nami-link");
            Array.from(items).forEach((item, i) => {
                item.querySelector(".arrow").textContent = i === selectedIndex ? ">" : "";
            });
        };

        const performSearch = () => {
            if (!input.value) {
                renderResults([], resultsContainer, colors, selectedIndex);
                return;
            }
            const query = input.value.toLowerCase();
            const startsWith = links.filter((link) => {
                return link.name.toLowerCase().startsWith(query);
            });
            const contains = links
                .filter((link) => link.name.toLowerCase().includes(query))
                .filter((link) => !startsWith.includes(link));

            const foundSections = sections.filter((section) => section.name.toLowerCase().includes(query));
            const filtered = [...startsWith, ...contains];
            selectedIndex = 0;
            renderResults(filtered, foundSections, resultsContainer, colors, selectedIndex, settings.searchSections);
        };

        input.addEventListener("input", performSearch);

        input.addEventListener("keydown", (e) => {
            const items = resultsContainer.querySelectorAll("li.nami-link");
            if (e.key === "ArrowDown") {
                if (selectedIndex < items.length - 1) {
                    selectedIndex++;
                    updateSelection();
                }
                e.preventDefault();
            } else if (e.key === "ArrowUp") {
                if (selectedIndex > 0) {
                    selectedIndex--;
                    updateSelection();
                }
                e.preventDefault();
            } else if (e.key === "Enter") {
                if (selectedIndex >= 0 && selectedIndex < items.length) {
                    const selectedUrl = items[selectedIndex].querySelector("#link-name").textContent;
                    const link = links.find((l) => l.name === selectedUrl);
                    panel.style.display = "none";
                    chrome.runtime.sendMessage({ action: "openUrl", url: link.url });
                }
            } else if (e.key === "Escape") {
                panel.style.display = "none";
            }
        });
    }
}
