import Link from "next/link";
import { formatDate } from "common/util/date";
import Score from "components/shared/score";

// TODO: type: hyena
type Props = { fixtures: any };

export default function Fixtures({ fixtures }: Props) {
  if (!fixtures?.length) {
    return null;
  }

  return (
    <div className="matches__wrapper">
      <table className="matches__container">
        <tbody>
          {fixtures.map((fixture) => (
            <MatchRow key={fixture["match_id"]} match={fixture} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// TODO: type: hyena
const MatchRow = ({ match }: { match: any }) => (
  <Link href={`/m/${match.match_id}`}>
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
      <td className="link">
        <a href={`/m/${match.match_id}`}>&#10095;</a>
      </td>
    </tr>
  </Link>
);
