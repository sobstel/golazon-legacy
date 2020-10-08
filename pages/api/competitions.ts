import { NextApiRequest, NextApiResponse } from 'next'
import getCompetitions from 'services/getCompetitions';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const result = getCompetitions(req.query.q as string);

  // maxage very high as cache is invalidated on redeploy by vercel
  res.setHeader('Cache-Control', 'max-age=900, s-maxage=2678400, stale-while-revalidate');
  res.status(200).json(result);
}
