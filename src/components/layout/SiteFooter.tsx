import { Link } from "react-router-dom";
import { apparelNavigation, siteNavigation } from "./siteNavigation";

export function SiteFooter() {
  return (
    <footer className='site-footer'>
      <div className='site-container site-footer__inner'>
        <div className='site-footer__brand-block'>
          <div className='site-footer__brand'>Codrington International LLC</div>
          <p className='site-footer__tagline'>
            Serving with purpose, leading with integrity.
          </p>
        </div>
        <nav aria-label='Company navigation'>
          <h2 className='site-footer__heading'>Company</h2>
          <ul className='site-footer__links'>
            {siteNavigation
              .slice(0, 2)
              .concat(siteNavigation.slice(4))
              .map((item) => (
                <li key={item.to}>
                  <Link className='site-footer__link' to={item.to}>
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
        <nav aria-label='Our divisions'>
          <h2 className='site-footer__heading'>Our Divisions</h2>
          <ul className='site-footer__links'>
            <li>
              <Link
                className='site-footer__link'
                to='/veteran-warrior-believer'
              >
                Veteran Warrior Believer
              </Link>
            </li>
            {apparelNavigation.map((item) => (
              <li key={item.to}>
                <Link className='site-footer__link' to={item.to}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className='site-footer__link' to='/books-publishing'>
                Books & Publishing
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className='site-footer__bottom'>
        <div className='site-container'>
          © {new Date().getFullYear()} Codrington International LLC
        </div>
      </div>
    </footer>
  );
}
