import { h, Component } from 'preact';

export default class Cards extends Component {
  render () {
    const { match } = this.props;

    if (!match.cards || match.cards.length === 0) {
      return null;
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
  }
}
