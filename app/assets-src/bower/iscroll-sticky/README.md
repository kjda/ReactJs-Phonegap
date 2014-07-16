# iscroll-sticky
Sticky headers for iScroll 5.
Inspired by [iscroll-stickyheader](/rudolfrck/iscroll-stickyheaders) for iScroll 4.

## Installation
`bower install iscroll-sticky`

The repository provides a [prebuilt version](dist).

## Usage
**Note**: This plugin depends on `iscroll-probe.js`, as special kind of iScroll 5 build.

Set your IScroll HTML up as usual. Then set the `probeType` in the IScroll contructor and instantiate the sticky header with the `iScrollSticky` constructor. For example:

```Javascript
var scroll = new IScroll('#scroll', { probeType: 3 });
new IScrollSticky(scroll, 'h1');
```

In this example, the scrolling wrapper element has the id `scroll` and the sticky headers are `h1` tags. You can use any CSS3 selector in IScrollSticky constructor as its second argument.

## Contributing
See [Contributing](CONTRIBUTING.md)

## Release History
See [Changelog](CHANGELOG.md)

## License
[MIT](LICENSE)
