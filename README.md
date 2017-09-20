Golazon
=======

Football data <a href="http://mnmlist.com/w/">mnmlist</a> way.

* extremely lightweight (~19KB gzipped without polyfills)
* no images, no cookies, no tracking, no popups, no ads, no subscriptions, no analytics,
  no social sharing, no comments, no bullshit
* remembers user choices to personalize order of search results and live matches
* content loaded from cache whenever possible (and it's nearly always possible)

It's a prototype (proof of concept), it has some glitches here and there yet it works pretty
well already.

Contact: przemek@sobstel.org

------------

## Technical stuff

### Getting started

#### Install

* `yarn install`

#### Run

* `npm start` - watches the project with continuous rebuild
* `npm run build` - builds minified project for production
* `npm run` - list of all tasks

### Architecture

* static SPA site (open source, hosted at GitHub)
  * [riot](http://riotjs.com/), coffeescript, scss, fetch,
    [brunch](http://brunch.io/), npm
* external API (proprietary)
  * ruby (@ heroku)

### Technical issues & potential improvements

* Data: search API backend is inefficient (would be good to rewrite to custom solution based on Riak Search).
* Routing: hashbang URLs (#!) used only because of GitHub Pages (cannot serve normal URLs without 404 http code)
* Sass: sass inside of tag processed independently from each other (sharing common stuff only via explicit `@import`)
* JS: riot variable registered globally (as generated tags use it like this; CommonJS option didn't work ok for me)

* Rewrite global util to riot mixins
* Riak Search for search engine
  * Why? AP (Availability + Partition Tolerance)
  * Additional features: shows competition by team name, eg. shows Premier League when searching for Everton
* Better compatibility with Opera Mini and other less popular browsers
* Extract SCSS to separate files to leverage SCSS power in full.
