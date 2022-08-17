import { NextApiRequest, NextApiResponse } from "next";
import { MAX_CACHE_TIME } from "common/config";
import getCompetitions from "common/util/getCompetitions";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { q } = req.query;
  const result = await getCompetitions(q as string);

  res.setHeader(
    "Cache-Control",
    `max-age=900, s-maxage=${MAX_CACHE_TIME}, stale-while-revalidate`
  );
  res.status(200).json(result);
};

export const config = {
  runtime: "experimental-edge",
};
