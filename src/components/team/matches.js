import matchService from '../../services/match';
import limitableMatches from '../util/limitable_matches';

const dataSource = ({ teamId, type, limit }) => {
  return matchService.teamMatches(teamId, type, limit).then(matches => ({ matches }));
};

export default limitableMatches(dataSource);
