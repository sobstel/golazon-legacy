import React, { Component } from "react";

export default class Venue extends Component {
  render() {
    const { match } = this.props;

    if (!match.venue) {
      return null;
    }

    return (
      <div>
        <h2>Venue</h2>
        <p className="block">
          {match.venue.name} ({match.venue.city})
        </p>
      </div>
    );
  }
}
