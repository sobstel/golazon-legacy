import request from "superagent";
import uniqBy from "common/util/uniqBy";

export function uniqResults<T extends { competition_id: string }>(
  results: T[]
): T[] {
  return uniqBy(results, "competition_id");
}

export const { debouncedRequest, cancelRequest } = (function () {
  let req = null;
  let timeoutId = null;

  function delay(seconds: number, func: () => void) {
    timeoutId = setTimeout(func, seconds * 1000);
  }

  function debouncedRequest(
    query: string,
    resolve: (results: string) => void,
    reject: (error: Error) => void
  ) {
    delay(0.33, () => {
      req = request.get(`/api/competitions?q=${query}`).retry(1).timeout({
        response: 3200, // wait for the server to start sending
        deadline: 6400, // wait for the file to finish loading
      });
      return req
        .then((response) => resolve(response.body))
        .catch((e) => reject(e));
    });
  }

  function cancelRequest() {
    if (delay) clearTimeout(timeoutId);
    if (req) req.abort();
  }

  return { debouncedRequest, cancelRequest };
})();
