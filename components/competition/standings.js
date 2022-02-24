import React, { Component } from "react";
import Link from "next/link";

export default class Standings extends Component {
  render() {
    const { rounds } = this.props;

    if (rounds.length === 0) {
      return null;
    }

    return (
      <div className="standings__container container">
        {rounds.map((round, index) => (
          <div key={index}>
            <h2>{round.name}</h2>
            <div className="standings block">
              <table className="standings-table">
                <thead>
                  <tr>
                    <th className="rank">&nbsp;</th>
                    <th className="team">Team</th>
                    <th className="mp">
                      <acronym title="Matches Played">MP</acronym>
                    </th>
                    <th className="gd">
                      <acronym title="Goals For / Goals Against">
                        GF&#8209;GA
                      </acronym>
                    </th>
                    <th className="pts">
                      <acronym title="Points">Pts</acronym>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {round.standings.map((table) => (
                    <tr key={table.team_id}>
                      <td className={this.rankClass(table.zone)}>
                        <span>{table.rank}</span>
                      </td>
                      <td
                        className="team"
                        title={
                          table.country === "RUS" ? "..." : table.team_name
                        }
                      >
                        {table.country === "RUS" ? (
                          "..."
                        ) : (
                          <Link href={`/t/${table.team_id}`}>
                            <a>{table.team_name}</a>
                          </Link>
                        )}
                      </td>
                      <td className="mp">{table.matches}</td>
                      <td className="gd">
                        {table.goals_for}&nbsp;-&nbsp;{table.goals_against}
                      </td>
                      <td className="pts">{table.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    );
  }

  rankClass = (zone) => {
    if (!zone) {
      return "rank";
    }
    return `rank zone zone-${zone}`;
  };
}
