export default {
  route(state, actions, routeInfo) {
    // restart state
    actions.reset();

    // fetch data
    if (routeInfo.match === '/') {
      actions.home.fetchData();
    }
    if (routeInfo.match === '/c/:competition_id') {
      actions.competition.fetchData({ competitionId: routeInfo.params['competition_id'] });
    }
    if (routeInfo.match === '/m/:match_id') {
      actions.match.fetchData({ matchId: routeInfo.params['match_id'] });
    }
  },

  update(state, actions, nextState) {
    if (state.siteTitle !== nextState.siteTitle) {
      /* global document */
      document.title = nextState.siteTitle;
    }
  },
};
