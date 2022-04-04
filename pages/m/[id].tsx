import { useRouter } from "next/router";
import Link from "next/link";
import { formatDate, formatTime } from "../../common/util/date";
import Layout from "components/Layout";
import Score from "../../components/shared/score";
import Goals from "../../components/match/goals";
import PenaltyShootout from "../../components/match/penalty_shootout";
import Lineups from "../../components/match/lineups";
import Cards from "../../components/match/cards";
import Venue from "../../components/match/venue";
import { useResource, fetchResources, resourcePatterns } from "common/hyena";
import { Loader } from "components/Layout";

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps(context: { params: { id: string } }) {
  const { id } = context.params;
  const [{ data: match }] = await fetchResources([
    () => resourcePatterns.match(id),
  ]);
  return { props: { match }, revalidate: 1 };
}

function title(match) {
  let title = `${match.home_name} v ${match.away_name}`;
  title += ` - ${match.competition_name} - ${match.area_name}`;
  return title;
}

export default function MatchPage(props: any) {
  const { match: serverData } = props;

  const { data: clientData } = useResource(
    () => serverData?.match_id && resourcePatterns.match(serverData.match_id),
    {
      initialData: serverData,
    }
  );

  const router = useRouter();
  if (router.isFallback) {
    return (
      <Layout title={false}>
        <Loader />
      </Layout>
    );
  }

  const match = clientData || serverData;

  console.log({ match });

  const header = match.match_id && (
    <span>
      {match["home_id"] ? (
        <Link href={`/t/${match["home_id"]}`}>
          <a> {match["home_name"]} </a>
        </Link>
      ) : (
        <> {match["home_name"]} </>
      )}
      -
      {match["away_id"] ? (
        <Link href={`/t/${match["away_id"]}`}>
          <a> {match["away_name"]} </a>
        </Link>
      ) : (
        <> {match["away_name"]} </>
      )}
      <Score match={match} />
    </span>
  );

  return (
    <Layout title={title(match)} header={header}>
      <div className="container block">
        {formatDate(match.date, match.time)}
        {match.time && `, ${formatTime(match.date, match.time)}`}
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

      <div className="match__container container">
        <Goals match={match} />
        <PenaltyShootout match={match} />
        <Lineups match={match} />
        <Cards match={match} />
        <Venue match={match} />
      </div>
    </Layout>
  );
}
