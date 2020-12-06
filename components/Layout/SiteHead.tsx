import { useState, useCallback } from "react";
import Link from "next/link";
import Logo from "components/Logo";
import Search from "components/Search";

export default function SiteHead() {
  const [isSearchActive, setSearchActive] = useState(false);

  const handleFocus = useCallback(() => setSearchActive(true), [
    setSearchActive,
  ]);
  const handleBlur = useCallback(() => setSearchActive(false), [
    setSearchActive,
  ]);

  return (
    <div className="container head">
      {!isSearchActive && (
        <Link href="/">
          <a className="logo__container">
            <Logo />
          </a>
        </Link>
      )}

      <Search onFocus={handleFocus} onBlur={handleBlur} />
    </div>
  );
}
