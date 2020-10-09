import { NextApiRequest, NextApiResponse } from 'next'
import { MAX_CACHE_TIME } from 'lib/config';
import getCompetitions from 'services/getCompetitions';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { q } = req.query;
  const result = getCompetitions(q as string);

  res.setHeader('Cache-Control', `max-age=900, s-maxage=${MAX_CACHE_TIME}, stale-while-revalidate`);
  res.status(200).json(result);
}
