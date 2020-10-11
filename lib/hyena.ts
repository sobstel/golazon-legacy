import request from "superagent";
import useSWR from "swr";

// TODO: move to ENV
const HYENA_URL =
  "https://75sgwy2tr3.execute-api.eu-west-2.amazonaws.com/prod/hyena?func=";

export const resourcePatterns = {
  competition: (id: string) => `competitions/${id}`,
  liveMatches: () => "matches/live",
  match: (id: string) => `matches/${id}`,
  seasonStandings: (id: string) => `seasons/${id}/standings`,
  seasonRecentFixtures: (id: string) => `seasons/${id}/matches/past`,
  seasonUpcomingFixtures: (id: string) => `seasons/${id}/matches/future`,
  team: (id: string) => `teams/${id}`,
  teamCompetitions: (id: string) => `teams/${id}/competitions`,
  teamRecentFixtures: (id: string) => `teams/${id}/matches/past`,
  teamUpcomingFixtures: (id: string) => `teams/${id}/matches/future`,
};

type ResourcePattern = typeof resourcePatterns[keyof typeof resourcePatterns];

export function useResource(
  resourcePattern: ResourcePattern,
  id: string,
  opts?: any
) {
  const result = useSWR(
    id ? HYENA_URL + resourcePattern(id) : null,
    fetch,
    opts ?? {}
  );
  const { data, error } = result;
  return error ? { error } : data;
}

export async function fetchResources(resourcePatterns: ResourcePattern[], id) {
  const requests = resourcePatterns
    .map((resourcePattern) => resourcePattern(id))
    .map(fetchResource);
  const results = await Promise.all(requests.map(settle));
  return results.map((result) => {
    if (result.status === "fulfilled") {
      return result.value;
    }
    if (result.status === "rejected") {
      return { error: result.reason };
    }
  });
}

function fetchResource(resource: string) {
  return fetch(HYENA_URL + resource);
}

function fetch(url) {
  return request
    .get(url)
    .timeout({
      response: 2500, // wait for the server to start sending
      deadline: 5000, // wait for the file to finish loading
    })
    .retry(1)
    .then((response) => response.body);
}

function settle(
  promise: Promise<any>
): Promise<
  { status: "fulfilled"; value: any } | { status: "rejected"; reason: string }
> {
  return promise.then(
    (value) => ({ status: "fulfilled", value }),
    (error) => ({ status: "rejected", reason: error })
  );
}
