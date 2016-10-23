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

* Stack: Riot.js, CoffeeScript, SCSS, BEM, [Primer](http://primercss.io/).
* Build tools: brunch, npm.
* Architecture: static SPA site (hosted at GitHub) + external API.
* No images (except inline svg logo and 3rd party material icons)
  * Too much weight, too much data to transfer and it supposed to be extremely lightweight.
* No general live matches page. Live matches only at competition/team/match page.
