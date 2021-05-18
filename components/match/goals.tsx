import React from "react";

type Props = {
  match: {
    goals: {
      name: string;
      min: string;
      code: string;
      score: [string, string];
    }[];
  };
};

export default function Goals({ match }: Props) {
  if (!match.goals?.length) {
    return null;
  }

  return (
    <div className="match__goals">
      <h2>Goals</h2>
      <p className="block">
        {match.goals.map((goal) => (
          <span key={`${goal.name}-${goal.code}-${goal.min}`}>
            {goal.name} {goal.min}&apos;&nbsp;
            {goal.code !== "G" && `[${goal.code}] `}(
            <strong>
              {goal.score[0]}:{goal.score[1]}
            </strong>
            )
          </span>
        ))}
      </p>
    </div>
  );
}
