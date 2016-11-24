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

### General CSS styles (app.scss)

* block - full width block
* column - one of 2 columns
* hpadding/sticky-hpadding

### Issues

* Data: search API is very inefficient (would be good to rewrite to custom solution based on Riak Search.
* Routing: hashbang URLs (#!) used only because of GitHub Pages (cannot serve normal URLs without 404 http code)
* Sass: sass inside of tag processed independently from each other (sharing common stuff only via explicit `@import`)
* JS: riot variable registered globally (as generated tags use it like this; CommonJS option didn't work ok for me)

### Potential technical improvements

* ES6 or TypeScript over CoffeeScript
* Riak Search for search engine
  * Why? AP (Availability + Partition Tolerance)
  * Additional features: shows competition by team name, eg. shows Premier League when searching for Everton
* Better compatibility with Opera Mini and other less popular browsers
* Extract SCSS to separate files to leverage SCSS power in full.
* CloudFlare (free -> TTL 2h) -> for search?
* Mobile app with Cordova.
* Accessibility.
