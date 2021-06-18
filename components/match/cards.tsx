import React from "react";

type Props = {
  match: {
    cards: ReadonlyArray<{
      name: string;
      min: string;
      code: string;
    }>;
  };
};

export default function Cards({ match }: Props) {
  if (!match.cards?.length) {
    return null;
  }

  return (
    <div className="match__cards">
      <h2>Cards</h2>
      <p className="block">
        {match.cards.map((event) => (
          <span key={`${event.name}-${event.min}-${event.code}`}>
            {event.name} {event.min}&apos; ({event.code})
          </span>
        ))}
      </p>
    </div>
  );
}
