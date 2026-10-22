import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { siteNavigation } from "./siteNavigation";

function BrandLockup() {
  return (
    <Link
      className='brand-lockup'
      to='/'
      aria-label='Codrington International LLC home'
    >
      <span className='brand-lockup__name'>Codrington International LLC</span>
      <span className='brand-lockup__tagline'>
        Serving with purpose, leading with integrity.
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [menuOpenPath, setMenuOpenPath] = useState<string | null>(null);
  const { pathname } = useLocation();
  const menuOpen = menuOpenPath === pathname;

  useEffect(() => {
    if (!menuOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpenPath(null);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className='site-header'>
      <div className='site-container site-header__inner'>
        <BrandLockup />
        <nav
          className='primary-nav primary-nav--desktop'
          aria-label='Primary navigation'
        >
          {siteNavigation.map((item) => (
            <NavLink
              className='primary-nav__link'
              key={item.to}
              to={item.to}
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          aria-controls='mobile-primary-navigation'
          aria-expanded={menuOpen}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          className='menu-toggle'
          onClick={() => setMenuOpenPath(menuOpen ? null : pathname)}
          type='button'
        >
          <span
            aria-hidden='true'
            className={`menu-toggle__icon${menuOpen ? " is-open" : ""}`}
          />
        </button>
      </div>
      <nav
        aria-label='Mobile navigation'
        className='mobile-nav'
        data-open={menuOpen}
        id='mobile-primary-navigation'
      >
        {siteNavigation.map((item) => (
          <NavLink
            className='mobile-nav__link'
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            onClick={() => setMenuOpenPath(null)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
