import { ActionLink } from "../../components/shared/ActionLink";
import { DivisionDirectory } from "../../components/shared/DivisionDirectory";
import { SectionHeading } from "../../components/shared/SectionHeading";

export function HomePage() {
  return (
    <>
      <section className='home-hero'>
        <div className='site-container home-hero__inner'>
          <div className='home-hero__copy'>
            <p className='eyebrow'>Veteran-owned · Faith-based</p>
            <h1 className='home-hero__title'>Codrington International LLC</h1>
            <p className='home-hero__tagline'>
              Serving with purpose, leading with integrity.
            </p>
            <p className='home-hero__description'>
              A veteran-owned, faith-based company with business divisions in
              Veteran Warrior Believer, Faith-Based Apparel, and Books &amp;
              Publishing.
            </p>
            <div className='home-hero__actions'>
              <ActionLink to='/divisions'>Explore Our Divisions</ActionLink>
              <ActionLink to='/about' variant='secondary'>
                About Us
              </ActionLink>
            </div>
          </div>
          <div className='home-hero__aside'>
            <span className='home-hero__aside-rule' aria-hidden='true' />
            <p className='home-hero__aside-name'>
              Codrington International LLC
            </p>
            <p className='home-hero__aside-copy'>
              Veteran-owned and faith-based.
            </p>
          </div>
        </div>
      </section>

      <section className='content-section'>
        <div className='site-container'>
          <SectionHeading
            eyebrow='Our business divisions'
            title='Distinct divisions, one company'
            description='Explore each Codrington International LLC division.'
          />
          <div className='home-division-list'>
            <DivisionDirectory compact />
          </div>
        </div>
      </section>

      <section className='closing-band'>
        <div className='site-container closing-band__inner'>
          <div>
            <p className='eyebrow eyebrow--light'>Contact</p>
            <h2 className='closing-band__title'>
              Connect with Codrington International
            </h2>
          </div>
          <ActionLink to='/contact' variant='light'>
            Contact Us
          </ActionLink>
        </div>
      </section>
    </>
  );
}
