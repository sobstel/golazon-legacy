import { ResourceResult } from "common/hyena";
import { Loader, Fixtures } from "components/Layout";

const PAGE_SIZE = 10;

export default function PaginatedFixtures({
  resourceResult,
  header,
  initialPage,
}: {
  resourceResult: ResourceResult;
  header: string;
  initialPage?: "first" | "last";
}) {
  const { data, error, loading } = resourceResult;
  const hasFixtures = Boolean(data?.length);

  let fixtures = [];
  if (hasFixtures && Array.isArray(data)) {
    if (initialPage === "last") {
      fixtures = data.slice(-PAGE_SIZE);
    } else {
      fixtures = data.slice(0, PAGE_SIZE);
    }
  }

  if (error) {
    // TODO: show error
    console.log("fixtures", error);
  }

  return (
    <div className="container">
      <h2>{header}</h2>
      <div className="block">
        {!hasFixtures && loading && <Loader noWrapper />}
        {!hasFixtures && !loading && <span>Not available</span>}
        {hasFixtures && <Fixtures fixtures={fixtures} />}
      </div>
    </div>
  );
}
