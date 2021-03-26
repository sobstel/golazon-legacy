import { useState, useEffect, MouseEvent } from "react";
import classNames from "classnames";
import { ResourceResult } from "common/hyena";
import { Loader, Fixtures } from "components/Layout";

const PAGE_SIZE = 10;

function getLastPage(fixtures) {
  if (!fixtures?.length) {
    return false;
  }
  return Math.ceil(fixtures.length / PAGE_SIZE);
}

function PaginationLink({
  active,
  text,
  onClick,
}: {
  active: boolean;
  text: string;
  onClick: () => void;
}) {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if (active) {
      onClick();
    }
  };

  return (
    <a
      href=""
      onClick={handleClick}
      className={classNames({ disabled: !active })}
    >
      {text}
    </a>
  );
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

  const handlePrev = () => hasPrevPage && setPage(page - 1);
  const handleNext = () => hasNextPage && setPage(page + 1);

  let sliceStart = (page - 1) * PAGE_SIZE;
  if (initialPage === "last") {
    sliceStart = Math.max(sliceStart - (fixtures?.length % PAGE_SIZE), 0);
  }
  let sliceEnd = sliceStart + PAGE_SIZE;
  if (initialPage === "last") {
    if (page === 1) {
      sliceEnd = fixtures?.length % PAGE_SIZE;
    }
  }

  const pageFixtures = fixtures?.slice(sliceStart, sliceEnd);
  const hasFixtures = Boolean(pageFixtures?.length);

  return (
    <div className="container">
      <h2 className="paginated-fixtures__header">
        {header}
        <div className="paginated-fixtures__nav">
          <PaginationLink
            active={hasPrevPage}
            text="❮ prev"
            onClick={handlePrev}
          />
          <PaginationLink
            active={hasNextPage}
            text="next ❯"
            onClick={handleNext}
          />
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
