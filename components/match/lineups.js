import React, { Component } from "react";

export default class Lineups extends Component {
  render() {
    const { match } = this.props;

    return (
      <div>
        {["home", "away"].map(type => (
          <div>
            {match[`${type}_players`].length > 0 && (
              <div className="match__players">
                <h2>
                  {match[`${type}_name`]} line-up ({match[`${type}_coach`].name}
                  )
                </h2>
                <p>
                  {match[`${type}_players`].map(event => (
                    <span className={event.in && "in"}>
                      {event.in && `${event.in}' `}
                      {event.name}
                    </span>
                  ))}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}
