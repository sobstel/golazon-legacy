import { NextApiRequest, NextApiResponse } from "next";
import { DEFAULT_CACHE_TIME } from "common/config";
import { fetchResources, resourcePatterns } from "common/hyena";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const [{ data: liveMatches }] = await fetchResources([
    () => resourcePatterns.liveMatches(),
  ]);

  res.setHeader(
    "Cache-Control",
    `s-maxage=${DEFAULT_CACHE_TIME}, stale-while-revalidate`
  );
  res.status(200).json(liveMatches);
};

export const config = {
  runtime: "experimental-edge",
};
