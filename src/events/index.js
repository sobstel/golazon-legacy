export default {
  route(state, actions, routeInfo) {
    // restart state
    actions.reset();

    // fetch data
    if (routeInfo.match === '/c/:competition_id') {
      actions.competition.fetchData({ competitionId: routeInfo.params['competition_id'] });
    }
  },

  update(state, actions, nextState) {
    if (state.siteTitle !== nextState.siteTitle) {
      document.title = nextState.siteTitle;
    }
  },
};
