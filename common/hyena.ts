import request from "superagent";
import useSWR from "swr";

const HYENA_URL = process.env.NEXT_PUBLIC_HYENA_URL;

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
type ResourceResult = {
  data: Record<string, unknown> | Record<string, unknown>[];
  error?: string;
  loading?: boolean;
};

export function useResource(
  resourcePattern: ResourcePattern,
  id: string,
  opts?: any
): ResourceResult {
  const result = useSWR(
    id ? HYENA_URL + resourcePattern(id) : null,
    fetch,
    opts ?? {}
  );
  const { data, error, isValidating } = result;
  return { data, error, loading: isValidating };
}

export async function fetchResources(
  resourcePatterns: ResourcePattern[],
  id
): Promise<ResourceResult[]> {
  const requests = resourcePatterns
    .map((resourcePattern) => resourcePattern(id))
    .map(fetchResource);
  const results = await Promise.all(requests.map(settle));
  return results.map((result) => {
    if (result.status === "fulfilled") {
      return { data: result.value, loading: false };
    }
    if (result.status === "rejected") {
      return { data: null, error: result.reason, loading: false };
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
