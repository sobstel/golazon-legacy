import { useRouter } from "next/router";
import Link from "next/link";
import { formatDate, formatTime } from "../../lib/util";
import Layout from "../../components/layout";
import Score from "../../components/shared/score";
import Goals from "../../components/match/goals";
import PenaltyShootout from "../../components/match/penalty_shootout";
import Lineups from "../../components/match/lineups";
import Cards from "../../components/match/cards";
import Venue from "../../components/match/venue";
import getMatch from "services/getMatch";

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps(context: { params: { id: string } }) {
  const { id } = context.params;
  const result = await getMatch(id);

  return { props: result, revalidate: 1 };
}

function title(match) {
  let title = `${match.home_name} v ${match.away_name}`;
  title += ` - ${match.competition_name} - ${match.area_name}`;
  return title;
}

export default function MatchPage(props: any) {
  const { match } = props;

  const router = useRouter();
  if (router.isFallback) {
    // TODO: replace with skeleton
    return (
      <Layout title={false}>
        <p className="block wrapped">Loading...</p>
      </Layout>
    );
  }

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

      <div className="block wrapped">
        {formatDate(match.date, match.time)}
        {", "}
        {formatTime(match.date, match.time)}
        <span> · </span>
        {match.round_name}
      </div>

      <div className="match__container block wrapped">
        <Goals match={match} />
        <PenaltyShootout match={match} />
        <Lineups match={match} />
        <Cards match={match} />
        <Venue match={match} />
      </div>
    </Layout>
  );
}
