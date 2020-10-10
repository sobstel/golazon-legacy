import { NextApiRequest, NextApiResponse } from "next";
import { DEFAULT_CACHE_TIME } from "lib/config";
import getCompetition from "services/getCompetition";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  const result = await getCompetition(id as string);

  res.setHeader(
    "Cache-Control",
    `s-maxage=${DEFAULT_CACHE_TIME}, stale-while-revalidate`
  );
  res.status(200).json(result);
};
