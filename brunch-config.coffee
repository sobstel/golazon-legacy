exports.config =
  files:
    javascripts:
      joinTo:
        'app.js': /^app/
        'vendors.js': /^node_modules/
      order:
        before: [
          'app/app.coffee'
        ]
    stylesheets:
      joinTo: 'app.css'

  plugins:
    on: ['riot']
    riot:
      extension: 'tag'
      type: 'coffee'
      style: 'scss'
    sass:
      mode: 'native'

  modules:
    wrapper: false

  npm:
    enabled: true

  server:
    port: 1987 # Messi year of birth ;-)
