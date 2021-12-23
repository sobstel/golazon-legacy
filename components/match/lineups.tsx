import React from "react";

// TODO: move as hyena types
type Props = {
  match: {
    home_players: { name: string }[];
    home_name: string;
    home_coach: { name: string } | null;
    away_players: { name: string }[];
    away_name: string;
    away_coach: { name: string } | null;
  };
};

export default function Lineups({ match }: Props) {
  return (
    <>
      {["home", "away"].map((type) => (
        <div key={type}>
          {match[`${type}_players`].length > 0 && (
            <div className="match__players">
              <h2>
                {match[`${type}_name`]} line-up
                {match[`${type}_coach`]?.name &&
                  ` (${match[`${type}_coach`]?.name})`}
              </h2>
              <p className="block">
                {match[`${type}_players`].map((event, index) => (
                  <span key={`${type}-${index}`} className={event.in && "in"}>
                    {event.in && `${event.in}' `}
                    {event.name}
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
