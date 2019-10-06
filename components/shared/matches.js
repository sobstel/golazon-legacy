import React, { Component } from "react";
import Link from "next/link";
import { formatDate } from "../../lib/util";

import Score from "./score";

export default class extends Component {
  render() {
    const { matches } = this.props;

    if (!matches || matches.length === 0) {
      return null;
    }

    return (
      <div className="matches__wrapper">
        <table className="matches__container">
          <tbody>
            {matches.map(match => (
              <MatchRow key={match.match_id} match={match} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const MatchRow = ({ match }) => (
  <Link href={`/match?id=${match.match_id}`} as={`/m/${match.match_id}`}>
    <tr>
      {match.min && match.period !== "HT" && (
        <td className="min">{match.min}&apos;</td>
      )}
      {match.period === "HT" && <td className="period">{match.period}</td>}
      {!match.min && match.period !== "HT" && (
        <td className="date">{formatDate(match.date, match.time)}</td>
      )}
      <td className="host">{match.home_name}</td>
      <td className="status">
        <Score match={match} />
      </td>
      <td className="away">{match.away_name}</td>
    </tr>
  </Link>
);
