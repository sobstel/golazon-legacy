import React, { Fragment } from "react";

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
        {match.goals.map((goal, index) => (
          <Fragment key={`${goal.name}-${goal.code}-${goal.min}`}>
            <strong>
              {goal.score[0]}:{goal.score[1]}
            </strong>
            &nbsp;{goal.name}&nbsp;{goal.min}&apos;
            {goal.code !== "G" && ` [${goal.code}]`}
            {index < match.goals.length - 1 && ", "}
          </Fragment>
        ))}
      </p>
    </div>
  );
}
