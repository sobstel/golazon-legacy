import React, { Component } from "react";
import Link from "next/link";
import teamService from "../../services/team";
import loadable from "../util/loadable";

function Competitions({ competitions }) {
  if (!competitions.length) {
    return null;
  }

  return (
    <div className="compeitions__container block wrapped">
      {competitions.map(competition => (
        <p>
          <Link
            href={`/competition?id=${competition.competition_id}`}
            as={`/c/${competition.competition_id}`}
          >
            <a>
              {competition.name} {competition.season.name}
              {competition.area_name && ` (${competition.area_name})`}
            </a>
          </Link>
        </p>
      ))}
    </div>
  );
}

const dataSource = ({ teamId }) => {
  return teamService
    .competitions(teamId)
    .then(competitions => ({ competitions }));
};

export default loadable(dataSource)(Competitions);
