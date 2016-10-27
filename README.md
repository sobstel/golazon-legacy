Golazon
=======

*football data mnmlist way*

## Getting started

* Install
  * `yarn install`

* Run
  * `npm run start` - watches the project with continuous rebuild
  * `npm run build` - builds minified project for production
  * `npm run` - list of all build tasks

## Decisions

* Stack: Riot.js, CoffeeScript, SCSS. See package.json for more.
* Build tools: brunch, npm.
* Architecture: static SPA site (hosted at GitHub) + external API.
* No images, except inline svg logo or icons (if any).
  * Too much weight, too much data to transfer and it's supposed to be extremely lightweight.

## Technical

### General styles

* block - full width block
* column - one of 2 columns
* hpadding - standard hortizonal padding
