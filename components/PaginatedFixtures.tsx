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
  navigateBackward,
}: {
  resourceResult: ResourceResult;
  header: string;
  navigateBackward: boolean;
}) {
  const { data, error, loading } = resourceResult;
  const fixtures = Array.isArray(data) ? data : undefined;

  if (error) {
    // TODO: show error
    console.log("fixtures", error);
  }

  const [page, setPage] = useState(1);
  const hasPrevPage = page && page > 1;
  const hasNextPage = page && page < getLastPage(fixtures);

  const handlePrev = () => hasPrevPage && setPage(page - 1);
  const handleNext = () => hasNextPage && setPage(page + 1);

  let sliceStart = (page - 1) * PAGE_SIZE;
  let sliceEnd = sliceStart + PAGE_SIZE;

  if (navigateBackward) {
    sliceStart = -(page * PAGE_SIZE);
    sliceEnd = sliceStart + PAGE_SIZE;
    if (sliceEnd >= 0) {
      sliceEnd = undefined;
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
            active={navigateBackward ? hasNextPage : hasPrevPage}
            text="❮ prev"
            onClick={navigateBackward ? handleNext : handlePrev}
          />
          <PaginationLink
            active={navigateBackward ? hasPrevPage : hasNextPage}
            text="next ❯"
            onClick={navigateBackward ? handlePrev : handleNext}
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
