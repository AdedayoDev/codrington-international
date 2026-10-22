import { ActionLink } from "../../components/shared/ActionLink";
import { SectionHeading } from "../../components/shared/SectionHeading";
import { ContactForm } from "./components/ContactForm";

export function ContactUsPage() {
  return (
    <>
      <section className='contact-hero'>
        <div className='site-container contact-hero__inner'>
          <div className='contact-hero__copy'>
            <p className='eyebrow'>Codrington International LLC</p>
            <h1 className='contact-hero__title'>Contact Us</h1>
            <p className='contact-hero__description'>
              Send a message to Codrington International LLC using the form
              below. We welcome inquiries about the company and its divisions.
            </p>
            <a
              className='action-link action-link--primary'
              href='#contact-form'
            >
              Go to contact form
            </a>
          </div>
          <div className='contact-hero__aside'>
            <span className='contact-hero__rule' aria-hidden='true' />
            <p className='contact-hero__company'>
              Codrington International LLC
            </p>
            <p className='contact-hero__identity'>
              Veteran-owned · Faith-based
            </p>
            <p className='contact-hero__tagline'>
              Serving with purpose, leading with integrity.
            </p>
          </div>
        </div>
      </section>

      <section className='contact-content content-section' id='contact-form'>
        <div className='site-container contact-content__layout'>
          <div className='contact-content__intro'>
            <SectionHeading
              eyebrow='Get in touch'
              title='Send us a message'
              description='Complete each field and include enough detail for us to understand your inquiry.'
            />
            <p className='contact-content__availability'>
              Direct email, telephone, address, and office-hour details are not
              published here because verified contact information has not been
              provided.
            </p>
            <ActionLink to='/divisions' variant='secondary'>
              Explore Our Divisions
            </ActionLink>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
