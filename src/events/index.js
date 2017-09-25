export default {
  route(state, actions, routeInfo) {
    if (routeInfo.match == '/c/:competition_id') {
      actions.competition.fetchData(routeInfo.params['competition_id']);
    }
  },

  update(state, actions, nextState) {
    if (state.title !== nextState.title) {
      document.title = nextState.title;
    }
  }
};
