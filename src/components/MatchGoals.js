import { h } from 'hyperapp';

export default ({ match }) => {
  if (match.goals.length === 0) {
    return '';
  }

  return (
    <div class="match__goals">
      <h2 class="first">Goals</h2>
      <p>
        {match.goals.map(goal => (
          <span>
            {goal.name} {goal.min}&apos;&nbsp;
            {goal.code !== 'G' && `[${goal.code}] `}
            (<strong>{goal.score[0]}:{goal.score[1]}</strong>)
          </span>
        ))}
      </p>
    </div>
  );
};
