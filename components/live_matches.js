import React, { Component } from "react";
import Link from "next/link";
import matchService from "../services/match";
import loadable from "./util/loadable";

import Matches from "./shared/matches";

// update interval in seconds
const UPDATE_INTERVAL = 15 * 1000;

class LiveMatches extends Component {
  state = { groupedMatches: null };
  updateTimeout = null;

  scheduleNextUpdate = () => {
    this.updateTimeout = setTimeout(() => this.updateData(), UPDATE_INTERVAL);
  };

  componentDidMount() {
    this.scheduleNextUpdate();
    document.addEventListener("visibilitychange", this.onVisibilityChange);
  }

  componentWillUnmount() {
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
    this.updateTimeout && clearTimeout(this.updateTimeout);
  }

  onVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      this.updateData();
    }
  };

  updateData = () => {
    dataSource().then(({ groupedMatches }) => {
      this.setState({ groupedMatches });
      this.scheduleNextUpdate();
    });
  };

  render() {
    const groupedMatches =
      this.state.groupedMatches || this.props.groupedMatches;

    return (
      <div className="home__wrapper block wrapped">
        {groupedMatches.map(item => (
          <div key={item.competition.id}>
            <h2>
              <Link
                href={`/competition?id=${item.competition.id}`}
                as={`/c/${item.competition.id}`}
              >
                <a>
                  {item.competition.name}
                  {item.competition.area_name &&
                    ` (${item.competition.area_name}) `}
                  {item.teamtype}
                </a>
              </Link>
            </h2>
            <Matches matches={item.matches} />
          </div>
        ))}

        {groupedMatches.length === 0 && (
          <span>No live matches at the moment.</span>
        )}
      </div>
    );
  }
}

const dataSource = () => {
  return matchService
    .liveMatches()
    .then(groupedMatches => ({ groupedMatches }));
};

export default loadable(dataSource)(LiveMatches);
