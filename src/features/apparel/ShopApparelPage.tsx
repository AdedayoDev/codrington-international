import { ActionLink } from "../../components/shared/ActionLink";
import { SectionHeading } from "../../components/shared/SectionHeading";
import { ProductGrid } from "./components/ProductGrid";

export function ShopApparelPage() {
  return (
    <>
      <section className='shop-intro'>
        <div className='site-container shop-intro__inner'>
          <p className='eyebrow'>Faith-Based Apparel division</p>
          <h1 className='division-hero__title'>Apparel Catalog</h1>
          <p className='division-hero__description'>
            This catalog is for Codrington International LLC's Faith-Based
            Apparel division. Facebeat Apparel is a distinct brand within that
            division. Verified product listings are not available yet.
          </p>
          <ActionLink to='/apparel/facebeat' variant='secondary'>
            About Facebeat Apparel
          </ActionLink>
        </div>
      </section>
      <section className='content-section'>
        <div className='site-container'>
          <SectionHeading
            eyebrow='Faith-Based Apparel'
            title='Verified product listings'
            description='Approved product information will appear here when it has been supplied.'
          />
          <div className='shop-catalog'>
            <ProductGrid products={[]} />
          </div>
        </div>
      </section>
    </>
  );
}
