Golazon
=======

Football data <a href="http://mnmlist.com/w/">mnmlist</a> way. (prototype / proof of concept)

* extremely lightweight (~26KB gzipped in total!)
* no images, no cookies, no tracking, no popups, no ads, no subscriptions, no analytics,
  no social sharing, no comments, no bullshit (<a href="http://mnmlist.com/w/">minimal web</a>)
* remembers user choices to personalize order of search results and live matches
* content loaded from cache whenever possible (and it's nearly always possible)

It has some glitches here and there yet it works pretty well already.

Why? Wanted to have scores & standings website for myself, so I can check scores on very
slow connection (when on holidays, off to mountains or woods, etc).

Contact: przemek@sobstel.org

------------

## Technical

### Getting started

#### Install

* `yarn install`

#### Run

* `npm start` - watches the project with continuous rebuild
* `npm run build` - builds minified project for production
* `npm test` - run acceptance tests (need to `npm start` before)
* `npm run` - list of all tasks

### Architecture

* static SPA site (open source, hosted at GitHub)
  * [riot](http://riotjs.com/), coffeescript, scss, [superagent](http://visionmedia.github.io/superagent/),
    [brunch](http://brunch.io/), npm, [chimp](https://chimp.readme.io/)
* external API (proprietary)
  * ruby, nginx

### Issues

* Data: search API backend is very inefficient (would be good to rewrite to custom solution based on Riak Search).
* Routing: hashbang URLs (#!) used only because of GitHub Pages (cannot serve normal URLs without 404 http code)
* Sass: sass inside of tag processed independently from each other (sharing common stuff only via explicit `@import`)
* JS: riot variable registered globally (as generated tags use it like this; CommonJS option didn't work ok for me)

### Potential technical improvements

* Rewrite global util to riot mixins
* ES6 or TypeScript over CoffeeScript
* Riak Search for search engine
  * Why? AP (Availability + Partition Tolerance)
  * Additional features: shows competition by team name, eg. shows Premier League when searching for Everton
* Better compatibility with Opera Mini and other less popular browsers
* Extract SCSS to separate files to leverage SCSS power in full.
* CloudFlare (free -> TTL 2h) -> for search?
* Mobile app with Cordova.
* Accessibility.
* Migrate to riot3 (http://riotjs.com/guide/migration-from-riot2/, http://riotjs.com/release-notes/) and es6
* Convention: use camelCase eventually
