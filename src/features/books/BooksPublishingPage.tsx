import { ActionLink } from "../../components/shared/ActionLink";
import { DivisionHero } from "../../components/shared/DivisionHero";
import { SectionHeading } from "../../components/shared/SectionHeading";
import { BookGrid } from "./components/BookGrid";

export function BooksPublishingPage() {
  return (
    <>
      <DivisionHero
        eyebrow='A Codrington International LLC division'
        title='Books & Publishing'
        description='The Books & Publishing division is part of Codrington International LLC, a veteran-owned, faith-based business.'
        image='https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=85'
        imageAlt='Notebook and writing materials on a desk'
        theme='editorial'
      >
        <ActionLink to='/contact'>Contact Us</ActionLink>
        <ActionLink to='/divisions' variant='secondary'>
          Our Divisions
        </ActionLink>
      </DivisionHero>

      <section className='content-section content-section--soft'>
        <div className='site-container content-section__narrow'>
          <SectionHeading
            eyebrow='Books & Publishing'
            title='A place for the written word'
            description='Explore published titles and publishing information when approved materials are available.'
          />
        </div>
      </section>

      <section className='content-section'>
        <div className='site-container'>
          <SectionHeading eyebrow='Featured books' title='Published titles' />
          <div className='book-catalog'>
            <BookGrid books={[]} />
          </div>
        </div>
      </section>

      <section className='closing-band closing-band--editorial'>
        <div className='site-container closing-band__inner'>
          <div>
            <p className='eyebrow eyebrow--light'>Books & Publishing</p>
            <h2 className='closing-band__title'>
              Connect with Codrington International
            </h2>
          </div>
          <div className='closing-band__actions'>
            <ActionLink to='/contact' variant='light'>
              Contact Us
            </ActionLink>
            <ActionLink to='/divisions' variant='outline-light'>
              Our Divisions
            </ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}
