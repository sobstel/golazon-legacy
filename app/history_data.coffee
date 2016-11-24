require.register 'history_data', (exports, require, module) ->
  exports.get_initial_history_list = () ->
    initial_history_list = [
      {
        area_name: "England",
        id: "04",
        name: "Premier League",
        teamtype: "default",
        type: "competition",
      },
      {
        area_name: "Spain",
        id: "80",
        name: "Primera División",
        teamtype: "default",
        type: "competition",
      },
      {
        area_name: "Germany",
        id: "1y",
        name: "Bundesliga"
        teamtype: "default",
        type: "competition",
      },
      {
        area_name : "Italy",
        id: "rw",
        name: "Serie A",
        teamtype: "default",
        type: "competition",
      },
      {
        area_name: "France",
        id: "3w",
        name: "Ligue 1",
        teamtype: "default",
        type: "competition",
      },
      {
        area_name: "Netherlands",
        id: "4e",
        name: "Eredivisie",
        teamtype: "default",
        type: "competition",
      },
      {
        area_name: "Argentina",
        id: "97m",
        name: "Primera División",
        teamtype: "default",
        type: "competition",
      },
      {
        area_name: "Mexico"
        id: "873",
        name: "Liga MX",
        teamtype: "default",
        type: "competition",
      },
      {
        area_name: "Europe",
        id: "5d",
        name: "UEFA Champions League"
        teamtype: "default",
        type: "competition",
      },
      {
        area_name: "South America",
        id: "4nn",
        name: "WC Qualification South America",
        teamtype: "default",
        type: "competition",
      },
      # not displayed, just for search
      {
        area_name: "USA",
        id: "1xy",
        name: "MLS",
        teamtype: "default",
        type: "competition",
      },
    ]

    item._score = { count: 1, last_visit: new Date() } for item in initial_history_list

    return initial_history_list
