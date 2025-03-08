# Nami Tab 🌊

A simple extension to add links to your new tab page

## Configuration

Go to the extension options to set up your new tab view

### Margins
You can set left/right/top margins, in % of the screen size. Default is 0.

### Config
These are the links that are displayed on a new tab. The config is a JSON

Example an explanation:
```
{
  "columns": [                              // an array of all the columns on the page
    {
      "sections": [                         // each column consists of an array of sections
        {
          "name": "Column 1 Section 1",     // every section has a name
          "links": [                        // and a list of links
            {
              "name": "Link 1",             // each link has a name
              "url": "https://google.com",  // and a url
              "icon": "nf-fa-file_invoice", // [optional] an icon to display on the left of the link name
              "icon-color": "brightBlue"    // [optional] and a color for the icon
                                            // more icon info below
            },
            {
              "name": "Link 2",
              .....
            }
          ]
        },
        {
          "name": "Column 1 Section 2",
          "links": [
              ......
          ]
        }
      ]
    },
    {
      "sections": [
        {
          "name": "Column 2",
          "links": [
              .......
          ]
        }
      ]
    }
  ]
}
```

`icon` is taken from [NerdFonts](https://www.nerdfonts.com/). You can search for icons [here](https://www.nerdfonts.com/cheat-sheet). Copy the `class` of the icon.
`icon-color` lets you use a color from the theme config, explained below

### Colors (theme)

You can customize the colors of things. Theme config is a JSON.
The following colors are mandatory to set: 
- `background` - background color of the entire new tab page
- `settingsButton` - color of the cog button in the bottom right
- `settingsButtonHover` - color of the cog button when hovered over
- `link` - color of all links
- `sectionName` - color of all section names

You can provide additional colors to use as icon colors.
