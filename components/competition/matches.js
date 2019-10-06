import matchService from '../../services/match';
import limitableMatches from '../util/limitable_matches';

const dataSource = async ({ seasonId, type, limit }) => {
  const matches = await matchService.seasonMatches(seasonId, type, limit);
  return ({ matches });
};

export default limitableMatches(dataSource);
