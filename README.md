# Nami Tab 🌊

A simple extension to add links to your new tab page

## Configuration

Go to the extension options, you will be presented with an input field for a JSON config/
Example config:
```
{
  "columns": [
    {
      "name": "Column 1",
      "links": [
        { "name": "Link 1", "url": "https://google.com","icon": "nf-md-diamond_stone", "icon-color": "brightBlue" },
        { "name": "Link 2", "url": "https://google.com", "icon": "nf-fa-file_invoice", "icon-color": "" },
        { "name": "Link 3", "url": "https://google.com", "icon": "nf-fa-file_invoice", "icon-color": "" }
      ]
    },
    {
      "name": "Column 2",
      "links": [
        { "name": "Link 1", "url": "https://google.com","icon": "nf-md-diamond_stone", "icon-color": "brightBlue" },
        { "name": "Link 2", "url": "https://google.com","icon": "nf-md-diamond_stone", "icon-color": "brightBlue" },
        {},
        { "name": "Link 3", "url": "https://google.com", "icon": "nf-fa-file_invoice", "icon-color": "" },
        { "name": "Link 4", "url": "https://google.com", "icon": "nf-fa-file_invoice", "icon-color": "" }
      ]
    },
    {
      "name": "Column 3",
      "links": [
        { "name": "Link 1", "url": "https://google.com","icon": "nf-md-diamond_stone", "icon-color": "brightBlue" },
        { "name": "Link 2", "url": "https://google.com", "icon": "nf-fa-file_invoice", "icon-color": "" },
        { "name": "Link 3", "url": "https://google.com", "icon": "nf-fa-file_invoice", "icon-color": "" },
        { "name": "Link 4", "url": "https://google.com", "icon": "nf-fa-file_invoice", "icon-color": "" },
        { "name": "Link 5", "url": "https://google.com", "icon": "nf-fa-file_invoice", "icon-color": "" }
      ]
    }
  ]
}
```

You can define multiple columns with multiple links in each. Each column has a name.
Each link has:
- name
- url
- icon (search for icons here, copy the class: https://www.nerdfonts.com/cheat-sheet)
- icon color (choose from a predefined palette from the Kanagawa color scheme: https://github.com/rebelot/kanagawa.nvim/blob/master/extras/windows-terminal/kanagawa.json#L3)
