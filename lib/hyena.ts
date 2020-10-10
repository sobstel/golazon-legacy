import request from "superagent";

type Hyena = typeof hyena;

const HYENA_URL =
  "https://75sgwy2tr3.execute-api.eu-west-2.amazonaws.com/prod/hyena?func=";

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

export async function herd(hyenas: Promise<Hyena>[]) {
  const results = await Promise.all(hyenas.map(settle));
  return results.map((result) => {
    if (result.status === "fulfilled") {
      return result.value;
    }
    if (result.status === "rejected") {
      return { error: result.reason };
    }
  });
}

/**
 * @return Promise
 */
export function hyena(path: string) {
  return request
    .get(HYENA_URL + path)
    .timeout({
      response: 2500, // wait for the server to start sending
      deadline: 5000, // wait for the file to finish loading
    })
    .retry(2)
    .then((response) => response.body);
}
