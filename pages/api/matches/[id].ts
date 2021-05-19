import { NextApiRequest, NextApiResponse } from "next";
import { DEFAULT_CACHE_TIME } from "common/config";
import { fetchResources, resourcePatterns } from "common/hyena";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  if (typeof id !== "string") {
    res.status(400);
    return;
  }

  const [{ data: match }] = await fetchResources([
    () => resourcePatterns.match(id),
  ]);

  res.setHeader(
    "Cache-Control",
    `s-maxage=${DEFAULT_CACHE_TIME}, stale-while-revalidate`
  );
  res.status(200).json(match);
};
