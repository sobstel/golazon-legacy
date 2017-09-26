import { request } from '../lib/util';

export default {
  fetchData() {
    return (update) => {
      request('/matches/live', (matches) => {
        const competitionMatches = matches.reduce((result, match) => {
          const key = match['competition_id'];

          if (!result[key]) {
            return {
              ...result,
              [key]: {
                competition: {
                  id: match['competition_id'],
                  name: match['competition_name'],
                  area_name: match['area_name'],
                },
                matches: [match],
              },
            };
          }

          return { ...result, [key]: match };
        }, {});

        const groupedMatches = Object.keys(competitionMatches).map(key => competitionMatches[key]);

        // TODO: top most used competitions at the top
        // grouped_matches.sort(function(a, b) {
        //   let ha = history.get('competition', a.competition.id);
        //   let hb = history.get('competition', b.competition.id);
        //   if (!ha) { ha = { '_score': {'count': 0} }; }
        //   if (!hb) { hb = { '_score': {'count': 0} }; }
        //   return hb['_score']['count'] - ha['_score']['count'];});

        update({
          home: { groupedMatches }
        });

        // TODO setTimeout(refresh_data, 30 * 1000);
      });
    };
  },
};
