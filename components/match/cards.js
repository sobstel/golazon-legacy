import React, { Component } from "react";

export default class Cards extends Component {
  render() {
    const { match } = this.props;

    if (!match.cards || match.cards.length === 0) {
      return null;
    }

    return (
      <div className="match__cards">
        <h2>Cards</h2>
        <p className="block">
          {match.cards.map((event, index) => (
            <span key={`${event.name}-${event.min}-${event.code}`}>
              {event.name} {event.min}&apos; ({event.code})
            </span>
          ))}
        </p>
      </div>
    );
  }
}
