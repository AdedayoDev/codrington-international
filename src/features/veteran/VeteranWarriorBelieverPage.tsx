import { Link } from "react-router-dom";
import { ActionLink } from "../../components/shared/ActionLink";
import { DivisionHero } from "../../components/shared/DivisionHero";
import { SectionHeading } from "../../components/shared/SectionHeading";

export function VeteranWarriorBelieverPage() {
  return (
    <>
      <DivisionHero
        eyebrow='A Codrington International LLC division'
        title='Veteran Warrior Believer'
        description='A veteran-owned, faith-based division grounded in the values at the heart of Codrington International LLC.'
        image='https://images.unsplash.com/photo-1508433957232-3107f5fd5995?auto=format&fit=crop&w=1400&q=85'
        imageAlt='United States flag outside city buildings'
      >
        <ActionLink to='/contact'>Contact Us</ActionLink>
        <ActionLink to='/divisions' variant='secondary'>
          Explore Our Divisions
        </ActionLink>
      </DivisionHero>

      <section className='content-section content-section--soft'>
        <div className='site-container content-section__narrow'>
          <SectionHeading
            eyebrow='Our connection'
            title='Purpose rooted in service and faith'
          />
          <p className='body-copy'>
            Veteran Warrior Believer is one of Codrington International LLC's
            business divisions. It reflects the company's veteran-owned and
            faith-based identity.
          </p>
        </div>
      </section>

      <section className='closing-band'>
        <div className='site-container closing-band__inner'>
          <div>
            <p className='eyebrow eyebrow--light'>
              Codrington International LLC
            </p>
            <h2 className='closing-band__title'>
              Explore the company divisions
            </h2>
          </div>
          <div className='closing-band__actions'>
            <ActionLink to='/divisions' variant='light'>
              Our Divisions
            </ActionLink>
            <Link className='closing-band__text-link' to='/contact'>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
