import { NextApiRequest, NextApiResponse } from 'next'
import getCompetitions from 'services/getCompetitions';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const result = getCompetitions(req.query.q as string);

  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.status(200).json(result);
}
