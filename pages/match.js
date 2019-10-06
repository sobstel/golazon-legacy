import React, { Component } from "react";
import Link from "next/link";
import matchService from "../services/match";
import loadable from "../components/util/loadable";
import Layout from "../components/Layout";

import Score from "../components/shared/score";
import Info from "../components/match/info";
import Goals from "../components/match/goals";
import PenaltyShootout from "../components/match/penalty_shootout";
import Lineups from "../components/match/lineups";
import Cards from "../components/match/cards";

function title(match) {
  let title = `${match.home_name} v ${match.away_name}`;
  title += ` - ${match.competition_name} - ${match.area_name}`;
  return title;
}

function Match({ match }) {
  if (!match) return null;

  return (
    <Layout title={title(match)}>
      <p className="block nav">
        <Link href="/">
          <a>Golazon</a>
        </Link>
        {match.match_id && (
          <>
            <span> » </span>
            <Link
              href={`/competition?id=${match.competition_id}`}
              as={`/c/${match.competition_id}`}
            >
              <a>
                {match.competition_name}
                {match.area_name && ` (${match.area_name})`}
              </a>
            </Link>
          </>
        )}
      </p>

      <h1 className="match__title block wrapped">
        {match.match_id && (
          <span>
            <Link href={`/team?id=${match.home_id}`} as={`/t/${match.home_id}`}>
              <a> {match.home_name} </a>
            </Link>
            -
            <Link href={`/team?id=${match.away_id}`} as={`/t/${match.away_id}`}>
              <a> {match.away_name} </a>
            </Link>
            <Score match={match} />
          </span>
        )}
      </h1>

      <div className="match__container block wrapped">
        <Info match={match} />
        <Goals match={match} />
        <PenaltyShootout match={match} />
        <Lineups match={match} />
        <Cards match={match} />
      </div>
    </Layout>
  );
}

// TODO
// componentDidMount() {

// }

const dataSource = async ({ id }) => {
  const match = await matchService.match(id);
  return { match };
};

const LoadableMatch = loadable(dataSource)(Match);

LoadableMatch.getInitialProps = ({ query }) => {
  const { id } = query;
  return { id };
};

export default LoadableMatch;
