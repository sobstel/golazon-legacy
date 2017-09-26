import { h } from 'hyperapp';

export default ({ match }) => {
  if (!match.cards || match.cards.length === 0) {
    return '';
  }

  return (
    <div class="match__cards">
      <h2>Cards</h2>
      <p>
        {match.cards.map(event => (
          <span>{event.name} {event.min}&apos; ({event.code})</span>
        ))}
      </p>
    </div>
  );
};
