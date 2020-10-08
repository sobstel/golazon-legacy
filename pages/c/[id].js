import Link from "next/link";
import competitionService from "../../services/competition";
import loadable from "../../components/util/loadable";
import Layout from "../../components/layout";

import CompetitionMatches from "../../components/competition/matches";
import CompetitionStandings from "../../components/competition/standings";

const title = competition => {
  let title = `${competition.name} ${competition.season.name}`;
  if (competition.area_name) {
    title += ` (${competition.area_name})`;
  }
  if (competition.teamtype) {
    title += ` ${competition.teamtype}`;
  }

  return title;
};

function Competition({ competition }) {
  if (!competition) return null;

  const seasonId = competition.season.season_id;

  return (
    <Layout title={title(competition)}>
      <p className="block nav">
        <Link href="/">
          <a>Golazon</a>
        </Link>
      </p>

      <h1 className="competition__title block wrapped">{title(competition)}</h1>

      <div className="competition__container">
        <CompetitionMatches seasonId={seasonId} type="past" />
        <CompetitionMatches seasonId={seasonId} type="future" />
        <CompetitionStandings seasonId={seasonId} />
      </div>
    </Layout>
  );
}

const dataSource = async ({ id }) => {
  const competition = await competitionService.competition(id);
  return { competition };
};

const LoadableCompetition = loadable(dataSource)(Competition);

LoadableCompetition.getInitialProps = ({ query }) => {
  const { id } = query;
  return { id };
};

export default LoadableCompetition;
