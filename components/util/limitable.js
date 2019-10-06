import React, { Component } from "react";

const PER_PAGE = 10;
const HARD_LIMIT = 50; // forced by API

export default (WrappedComponent) => {
  return class extends Component {
    state = {
      limit: PER_PAGE
    }

    render () {
      return (
        <WrappedComponent
          limit={this.state.limit}
          hasMore={this.hasMore}
          increaseLimit={this.increaseLimit}
          {...this.props} />
      );
    }

    hasMore = (results) => {
      return (results.length < HARD_LIMIT && results.length % PER_PAGE === 0);
    }

    increaseLimit = () => {
      const limit = Math.min(this.state.limit + PER_PAGE, HARD_LIMIT);
      this.setState({ limit });
    }
  };
};
