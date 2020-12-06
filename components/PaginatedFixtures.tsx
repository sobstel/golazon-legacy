import { useState, useEffect } from "react";
import { ResourceResult } from "common/hyena";
import { Loader, Fixtures } from "components/Layout";

const PAGE_SIZE = 10;

function getLastPage(fixtures) {
  if (!fixtures?.length) {
    return false;
  }
  return Math.ceil(fixtures.length / PAGE_SIZE);
}

export default function PaginatedFixtures({
  resourceResult,
  header,
  initialPage,
}: {
  resourceResult: ResourceResult;
  header: string;
  initialPage: "first" | "last";
}) {
  const { data, error, loading } = resourceResult;
  const fixtures = Array.isArray(data) ? data : null;

  if (error) {
    // TODO: show error
    console.log("fixtures", error);
  }

  const [page, setPage] = useState(null);
  const hasPrevPage = page && page > 1;
  const hasNextPage = page && page < getLastPage(fixtures);

  useEffect(() => {
    if (fixtures?.length) {
      setPage(initialPage === "first" ? 1 : getLastPage(fixtures));
    }
  }, [initialPage, fixtures]);

  const handlePrev = (e) => {
    setPage(page - 1);
    e.preventDefault();
  };
  const handleNext = (e) => {
    setPage(page + 1);
    e.preventDefault();
  };

  const sliceStart = (page - 1) * PAGE_SIZE;
  const pageFixtures = fixtures?.slice(sliceStart, sliceStart + PAGE_SIZE);
  const hasFixtures = Boolean(pageFixtures?.length);

  return (
    <div className="container">
      <h2 className="paginated-fixtures__header">
        {header}
        <div className="paginated-fixtures__nav">
          {hasPrevPage && (
            <a href="" onClick={handlePrev}>
              ❮ prev
            </a>
          )}
          {hasNextPage && (
            <a href="" onClick={handleNext}>
              next ❯
            </a>
          )}
        </div>
      </h2>
      <div className="block">
        {!hasFixtures && loading && <Loader noWrapper />}
        {!hasFixtures && !loading && <span>Not available</span>}
        {hasFixtures && <Fixtures fixtures={pageFixtures} />}
      </div>
    </div>
  );
}
