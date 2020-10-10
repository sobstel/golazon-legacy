import { NextApiRequest, NextApiResponse } from "next";
import { DEFAULT_CACHE_TIME } from "lib/config";
import { fetchResources, resourcePatterns } from "lib/hyena";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  const [match] = await fetchResources([resourcePatterns.match], id);

  res.setHeader(
    "Cache-Control",
    `s-maxage=${DEFAULT_CACHE_TIME}, stale-while-revalidate`
  );
  res.status(200).json(match);
};
