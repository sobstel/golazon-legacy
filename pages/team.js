import Link from "next/link";
import teamService from "../services/team";
import loadable from "../components/util/loadable";
import Layout from "../components/layout";

import TeamCompetitions from "../components/team/competitions";
import TeamMatches from "../components/team/matches";

function Team({ team }) {
  const teamId = team.team_id;

  return (
    <Layout title={team.name}>
      <p className="block nav">
        <Link href="/">
          <a>Golazon</a>
        </Link>
      </p>

      <h1 className="team__title block wrapped">{team.name}</h1>

      <div className="team__container">
        <TeamCompetitions teamId={teamId} />
        <TeamMatches teamId={teamId} type="past" />
        <TeamMatches teamId={teamId} type="future" />
      </div>
    </Layout>
  );
}

const dataSource = async ({ id }) => {
  const team = await teamService.team(id);
  return { team };
};

const LoadableTeam = loadable(dataSource)(Team);

LoadableTeam.getInitialProps = ({ query }) => {
  const { id } = query;
  return { id };
};

export default LoadableTeam;
