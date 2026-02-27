# <img src="https://raw.githubusercontent.com/hkitago/InvertDark/refs/heads/main/Shared%20(Extension)/Resources/images/icon.svg" height="36" valign="bottom"/> InvertDark for Safari Extension

This Safari extension is the simplest way to transform any website into a calm, dark theme, with no configuration needed. Once enabled, it stays active across your favorite sites, so you can browse naturally without adjusting settings.

Have you ever been surprised by a blinding white page during late night browsing? Large, modern displays can feel especially harsh after sunset. This extension was created to solve that exact moment, keeping pages easy on the eyes while ensuring videos, images, and embedded content remain clear and natural. Designed to be lightweight and efficient, it runs quietly in the background without slowing down Safari. One action is all it takes to make nighttime browsing more comfortable.

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

> [!CAUTION]
> Some elements on complex websites, such as embedded widgets or certain video players, may not be inverted as expected. This is due to browser security and encapsulation rules (commonly known as Shadow DOM).

## Icon States

- **Extension Inactive by Default:** <code><img src="https://raw.githubusercontent.com/hkitago/InvertDark/refs/heads/main/Shared%20(Extension)/Resources/images/toolbar-icon.svg" height="24" valign="bottom"/></code>
- **Extension Active:** <code><img src="https://raw.githubusercontent.com/hkitago/InvertDark/refs/heads/main/Shared%20(Extension)/Resources/images/toolbar-icon-dark.svg" height="24" valign="bottom"/></code>

## Latest Version

### [26.3] - 2026-02-27

- Improved performance, reducing unnecessary background activity to deliver a faster and more responsive experience
- Strengthened reliability, preventing visual errors when displaying complex web content

Previous Updates: [CHANGELOG.md](./CHANGELOG.md)

## Compatibility

- iOS/iPadOS 16.6+
- macOS 12.4+

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
