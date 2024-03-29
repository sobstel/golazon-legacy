import React, { Component, Fragment } from "react";

export default class PenaltyShootout extends Component {
  render() {
    const { match } = this.props;

    if (!match.penalty_shootout || match.penalty_shootout.length === 0) {
      return null;
    }

    const eventLabel = (event) => {
      if (event.code === "M") {
        return "X";
      }
      if (event.code === "G") {
        return `${event.score[0]}:${event.score[1]}`;
      }
      return "";
    };

    return (
      <div className="match__penalty-shootout">
        <h2>Penalty shootout</h2>
        <p className="block">
          {match.penalty_shootout.map((event, index) => (
            <Fragment key={index}>
              {event.name} ({eventLabel(event)})
              {index < match.penalty_shootout.length - 1 && ", "}
            </Fragment>
          ))}
        </p>
      </div>
    );
  }
}
