import { h } from 'hyperapp';

export default ({ match }) => {
  if (!match['penalty_shootout'] || match['penalty_shootout'].length === 0) {
    return '';
  }

  const eventLabel = (event) => {
    if (event.code === 'M') {
      return 'X';
    }
    if (event.code === 'G') {
      return `${event.score[0]}:${event.score[1]}`;
    }
    return '';
  };

  return (
    <div class="match__penalty-shootout">
      <h2>Penalty shootout</h2>
      <p>
        {match['penalty_shootout'].map(event => (
          <span>
            {event.name} ({eventLabel(event)})
          </span>
        ))};
      </p>
    </div>
  );
};
