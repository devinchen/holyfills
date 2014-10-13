# holyfills [![Travis CI][travis-image]][travis-url] [![Quality][codeclimate-image]][codeclimate-url] [![Coverage][codeclimate-coverage-image]][codeclimate-coverage-url] [![Dependencies][gemnasium-image]][gemnasium-url] [![Gitter][gitter-image]][gitter-url]
> No more "Holy Sxxt!!" when writting ES5/ES6

[![Version][npm-image]][npm-url]


## Usage

TBD


## Advantage

Rewrites the whole file of `es5-shim/es5-shim.js` with CommonJS.

### Results

#### es5-shim / holyfill

* *Minified*: 14,315 byte / 13,893 byte (3% saved!)
* *Gzipped*: 5,272 byte / 4,336 byte (**17.8%** saved!)


## Development

```shell
git clone ...
npm i
npm run build # generates dist/es5-shim.js
NODE_ENV=production npm run build # generates dist/es5-shim.min.js
```


## Contributing

[![devDependency Status][david-dm-image]][david-dm-url]

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


## Credits

* [`es5-shim`](https://github.com/es-shims/es5-shim)


[npm-image]: https://img.shields.io/npm/v/holyfills.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/holyfills

[travis-image]: https://img.shields.io/travis/tomchentw/holyfills.svg?style=flat-square
[travis-url]: https://travis-ci.org/tomchentw/holyfills
[codeclimate-image]: https://img.shields.io/codeclimate/github/tomchentw/holyfills.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/tomchentw/holyfills
[codeclimate-coverage-image]: https://img.shields.io/codeclimate/coverage/github/tomchentw/holyfills.svg?style=flat-square
[codeclimate-coverage-url]: https://codeclimate.com/github/tomchentw/holyfills
[gemnasium-image]: https://img.shields.io/gemnasium/tomchentw/holyfills.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/tomchentw/holyfills
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/tomchentw/holyfills?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[david-dm-image]: https://img.shields.io/david/dev/tomchentw/holyfills.svg?style=flat-square
[david-dm-url]: https://david-dm.org/tomchentw/holyfills#info=devDependencies
