export default function queryCompetition(
  query: string,
  competition: { name: string; area_name?: string }
): boolean {
  const searchValue = query.trim().toLowerCase();

  if (competition["name"].toLowerCase().includes(searchValue)) {
    return true;
  }

  if (
    competition["area_name"] &&
    competition["area_name"].toLowerCase().includes(searchValue)
  ) {
    return true;
  }

  return false;
}
