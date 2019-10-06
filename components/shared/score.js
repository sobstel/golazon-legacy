import React, { Component } from "react";
import { formatTime } from "../../lib/util";

export default class extends Component {
  render() {
    const { match } = this.props;

    if (match.fixture) {
      return <span>{formatTime(match.date, match.time)}</span>;
    }

    if (match.live || match.ended) {
      return (
        <span className={match.live && "live"}>
          {match.ft && (!match.et || match.ps) && (
            <span>
              {match.ft[0]}&nbsp;-&nbsp;{match.ft[1]}
            </span>
          )}
          {match.et && !match.ps && (
            <span>
              {match.et[0]}&nbsp;-&nbsp;{match.et[1]} aet
            </span>
          )}
          {match.ps && (
            <span>
              {" "}
              p.{match.ps[0]}-{match.ps[1]}
            </span>
          )}
        </span>
      );
    }

    if (match.postponed) {
      return <abbr title="Postponed">PSTP</abbr>;
    }

    if (match.suspended) {
      return <abbr title="Suspended">SUSP</abbr>;
    }

    if (match.cancelled) {
      return <abbr title="Cencelled">CANC</abbr>;
    }

    return null;
  }
}
