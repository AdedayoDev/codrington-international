import { ActionLink } from "../../components/shared/ActionLink";
import { DivisionDirectory } from "../../components/shared/DivisionDirectory";
import { SectionHeading } from "../../components/shared/SectionHeading";

export function DivisionsPage() {
  return (
    <>
      <section className='page-intro'>
        <div className='site-container page-intro__inner'>
          <p className='eyebrow'>Codrington International LLC</p>
          <h1 className='page-intro__title'>Our Divisions</h1>
          <p className='page-intro__description'>
            Explore the three business divisions of Codrington International
            LLC.
          </p>
        </div>
      </section>

      <section className='content-section'>
        <div className='site-container'>
          <SectionHeading
            eyebrow='Business divisions'
            title='Find the right division'
            description='Select a division to learn more about its place within the company.'
          />
          <div className='home-division-list'>
            <DivisionDirectory />
          </div>
          <div className='page-intro__action'>
            <ActionLink to='/contact' variant='secondary'>
              Contact Us
            </ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}
