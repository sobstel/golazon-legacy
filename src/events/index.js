import routePatterns from '../lib/routePatterns';

export default {
  route(state, actions, routeInfo) {
    // restart state
    actions.reset();

    // fetch data
    if (routeInfo.match === routePatterns.home) {
      actions.home.fetchData();
    }
    if (routeInfo.match === routePatterns.competition) {
      actions.competition.fetchData({ competitionId: routeInfo.params['competition_id'] });
    }
    if (routeInfo.match === routePatterns.match) {
      actions.match.fetchData({ matchId: routeInfo.params['match_id'] });
    }
  },

  update(state, actions, nextState) {
    if (state.siteTitle !== nextState.siteTitle) {
      document.title = nextState.siteTitle;
    }
  },
};
