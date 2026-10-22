import { ActionLink } from "../../components/shared/ActionLink";
import { DivisionDirectory } from "../../components/shared/DivisionDirectory";
import { SectionHeading } from "../../components/shared/SectionHeading";

export function AboutUsPage() {
  return (
    <>
      <section className='page-intro'>
        <div className='site-container page-intro__inner'>
          <p className='eyebrow'>Codrington International LLC</p>
          <h1 className='page-intro__title'>About Us</h1>
          <p className='page-intro__description'>
            Codrington International LLC is a veteran-owned, faith-based
            company. Its divisions are Veteran Warrior Believer, Faith-Based
            Apparel, and Books &amp; Publishing.
          </p>
          <p className='page-intro__tagline'>
            Serving with purpose, leading with integrity.
          </p>
        </div>
      </section>

      <section className='content-section'>
        <div className='site-container'>
          <SectionHeading
            eyebrow='Company divisions'
            title='Explore our divisions'
            description='Each division is part of Codrington International LLC.'
          />
          <div className='home-division-list'>
            <DivisionDirectory compact />
          </div>
          <div className='page-intro__action'>
            <ActionLink to='/contact'>Contact Us</ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}
