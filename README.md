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

* Stack: Riot.js, CoffeeScript, SCSS, (BEM?).
* Build tools: brunch, npm.
* Architecture: static SPA site (hosted at GitHub) + external API.
* No images (except inline svg logo and 3rd party material icons)
  * Too much weight, too much data to transfer and it supposed to be extremely lightweight.
* No general live matches page. Live matches only at competition/team/match page.

## Issues

* Using [MDL](https://getmdl.io/), but in fact need just a few components and styles
  (wasted space and processing). Would be nice to replace it with something more lightweight
  (or - even better - custom styles).
  * `material.min.js` on its own weights as much as 61KB!
