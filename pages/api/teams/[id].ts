import { NextApiRequest, NextApiResponse } from 'next'
import { MAX_CACHE_TIME } from 'lib/config';
import getTeam from 'services/getTeam';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query: { id } } = req;
  const result = await getTeam(id as string);

  // res.setHeader('Cache-Control', `max-age=900, s-maxage=${MAX_CACHE_TIME}, stale-while-revalidate`);
  res.status(200).json(result);
}
