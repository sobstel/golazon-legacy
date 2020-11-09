import { useRouter } from "next/router";
import Link from "next/link";
import { formatDate, formatTime } from "../../common/util/date";
import Layout from "../../components/layout";
import Score from "../../components/shared/score";
import Goals from "../../components/match/goals";
import PenaltyShootout from "../../components/match/penalty_shootout";
import Lineups from "../../components/match/lineups";
import Cards from "../../components/match/cards";
import Venue from "../../components/match/venue";
import { fetchResources, resourcePatterns } from "common/hyena";

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps(context: { params: { id: string } }) {
  const { id } = context.params;
  const [{ data: match, loading }] = await fetchResources(
    [resourcePatterns.match],
    id
  );
  return { props: { match, loading }, revalidate: 1 };
}

function title(match) {
  let title = `${match.home_name} v ${match.away_name}`;
  title += ` - ${match.competition_name} - ${match.area_name}`;
  return title;
}

export default function MatchPage(props: any) {
  const { match, loading } = props;

  const router = useRouter();
  if (router.isFallback || loading) {
    return (
      <Layout title={false}>
        <p className="block wrapped">
          <span className="loader">Loading</span>
        </p>
      </Layout>
    );
  }

  return (
    <Layout title={title(match)}>
      <h1 className="match__title block wrapped">
        {match.match_id && (
          <span>
            <Link href={`/t/${match["home_id"]}`}>
              <a> {match.home_name} </a>
            </Link>
            -
            <Link href={`/t/${match["away_id"]}`}>
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
        <span> · </span>
        <Link href={`/c/${match.competition_id}`}>
          <a>
            {match.competition_name}
            {match.area_name && ` (${match.area_name})`}
          </a>
        </Link>
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