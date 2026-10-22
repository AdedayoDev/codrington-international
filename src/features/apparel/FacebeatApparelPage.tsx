import { ActionLink } from "../../components/shared/ActionLink";
import { DivisionHero } from "../../components/shared/DivisionHero";
import { SectionHeading } from "../../components/shared/SectionHeading";
import { ProductGrid } from "./components/ProductGrid";

export function FacebeatApparelPage() {
  return (
    <>
      <DivisionHero
        eyebrow='Faith-Based Apparel · Codrington International LLC'
        title='Facebeat Apparel'
        description="A distinct, unisex apparel brand within Codrington International LLC's Faith-Based Apparel division."
        image='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=85'
        imageAlt='Model wearing a plain, unbranded white T-shirt'
        theme='apparel'
      >
        <ActionLink to='/apparel/shop'>View Apparel Catalog</ActionLink>
      </DivisionHero>

      <section className='content-section content-section--soft'>
        <div className='site-container content-section__narrow'>
          <SectionHeading
            eyebrow='Facebeat Apparel'
            title='Faith-based apparel, with its own point of view'
            description="Facebeat Apparel is part of the company's Faith-Based Apparel division and has a distinct identity within the Codrington International family."
          />
        </div>
      </section>

      <section className='content-section' id='featured-apparel'>
        <div className='site-container'>
          <div className='catalog-section__header'>
            <SectionHeading
              eyebrow='Facebeat Apparel catalog'
              title='Apparel collection'
              description='Product information will be shown here when an approved catalog is available.'
            />
            <p className='catalog-section__note'>
              Categories have not been verified or supplied.
            </p>
          </div>
          <ProductGrid products={[]} />
        </div>
      </section>

      <section className='closing-band closing-band--apparel'>
        <div className='site-container closing-band__inner'>
          <div>
            <p className='eyebrow eyebrow--light'>Facebeat Apparel</p>
            <h2 className='closing-band__title'>
              Questions about the apparel division?
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
