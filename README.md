# <img src="https://raw.githubusercontent.com/hkitago/InvertDark/refs/heads/main/Shared%20(App)/Resources/Icon.png" height="36" valign="bottom"/> InvertDark for Safari Extension

This Safari extension quickly applies dark mode using color inversion and keeps it active as long as you need it. With one simple activation, dark mode stays on until you choose to change it, making browsing more comfortable across different websites and repeat visits.

Originally developed to address the problem of bright screens on HDR-compatible large monitors after sunset, this extension offers a quick and easy solution for stress-free nighttime browsing.

## Installation & Uninstallation

### Installation

To install the extension on iOS or iPadOS, go to Settings > Apps > Safari > Extensions, or enable the extension by toggling it on in the Manage Extensions option found in the Safari address bar.
For macOS, open Safari, go to Safari > Settings > Extensions, and enable the extension from there.

### Uninstallation

To uninstall the extension, similarly to the installation process, toggle the extension off, or remove it completely by selecting the extension icon on the Home Screen and choosing "Delete app".

## Usage

1. Click the icon next to the address bar to activate the extension and apply dark mode.
2. If you want to disable dark mode or if the color inversion doesn't look right, simply click the icon again to revert the changes.

> [!NOTE]  
> The extension remembers whether dark mode was enabled or disabled for each site, based on the domain name (`window.location.hostname`). This means the setting is applied to all pages within the same domain. For example, if dark mode is turned on for `example.com`, it will also be active on `example.com/page1`, `example.com/page2`, and so on. However, different subdomains such as `blog.example.com` and `shop.example.com` are treated as separate sites.

## Icon States

- **Extension Inactive by Default:** <code><img src="https://raw.githubusercontent.com/hkitago/InvertDark/refs/heads/main/Shared%20(Extension)/Resources/images/toolbar-icon.svg" height="24" valign="bottom"/></code>
- **Extension Active:** <code><img src="https://raw.githubusercontent.com/hkitago/InvertDark/refs/heads/main/Shared%20(Extension)/Resources/images/toolbar-icon-dark.svg" height="24" valign="bottom"/></code>
- **Dark Theme Detected:** <code><img src="https://raw.githubusercontent.com/hkitago/InvertDark/refs/heads/main/Shared%20(Extension)/Resources/images/toolbar-icon-site-dark.svg" height="24" valign="bottom"/></code>

## Version History

### 1.3.2 - 2024-07-25

- Fixed display issues with certain videos and their thumbnail images for a better viewing experience
- Refined toolbar icon display logic to ensure consistent and stable operation

### 1.3.1 - 2024-06-04

- Improved image detection for a better dark mode experience.
- Fixed an issue where links on some websites were hard to read due to low contrast with the background.
- Adjusted app names and phrasing in certain languages to improve localization.
- Changed the minimum version requirement for compatibility.

### 1.3 - 2024-11-22

- Fixed video and background image inversion for better display
- Updated app icon to custom design

### 1.2 - 2024-10-30

- Fixed issues with enabling the extension on already opened web pages.

### 1.1

#### **iOS/iPadOS** - 2024-10-23

- Initial release with extended features from macOS version

#### **macOS** - 2024-10-16

- Improved compatibility with page styles and streamlined design settings
- Added support for all languages in the App Store

### 1.0

#### **macOS** - 2024-10-13

- Initial release with basic features

## Compatibility

- iOS/iPadOS 15+
- macOS 10.14+

## License

This project is open-source and available under the [MIT License](LICENSE). Feel free to use and modify it as needed.

## Acknowledgments

The inspiration for this project came from a bookmarklet I developed and shared on GitHub Gist. You can view it [here](https://gist.github.com/hkitago/ef7aa6876254500cc27623c92a30fa2d). I would like to acknowledge the role of the bookmarklet in shaping the idea for the this extension and helping to bring it to fruition.

I would like to thank [framework7io](https://github.com/framework7io/framework7-icons) for providing the icon materials that were used in previous versions of the app.

## Contact

You can reach me via [email](mailto:hkitago@icloud.com?subject=Support%20for%20InvertDark).

## Additional Information

### Related Links
- App Store: [InvertDark on the App Store](https://apps.apple.com/app/invertdark-for-safari/id6736727849)
- [Get extensions to customize Safari on Mac - Apple Support](https://support.apple.com/guide/safari/get-extensions-sfri32508/mac)
- [Get extensions to customize Safari on iPhone - Apple Support](https://support.apple.com/guide/iphone/iphab0432bf6/18.0/ios/18.0)
- Privacy Policy Page: [Privacy Policy – hkitago software dev](https://hkitago.com/wpautoterms/privacy-policy/)
- Support Page: [hkitago/InvertDark](https://github.com/hkitago/InvertDark/)
