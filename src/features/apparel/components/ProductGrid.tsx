export type ApparelProduct = {
  id: string;
  brand: string;
  category?: string;
  name: string;
  image: string;
  imageAlt: string;
  price?: {
    amount: number;
    currency: string;
  };
  variants?: {
    name: string;
    values: string[];
  }[];
  availability?: "in-stock" | "out-of-stock" | "preorder";
  description?: string;
  detailHref?: string;
};

type ProductGridProps = {
  products: ApparelProduct[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className='catalog-empty' role='status'>
        <p className='catalog-empty__eyebrow'>Catalog information</p>
        <h3 className='catalog-empty__title'>
          Product details are not available yet
        </h3>
        <p className='catalog-empty__copy'>
          Verified products, pricing, options, and purchasing details have not
          been provided.
        </p>
      </div>
    );
  }

  return (
    <div className='product-grid'>
      {products.map((product) => (
        <article className='product-card' key={product.id}>
          <div className='product-card__image-wrap'>
            <img
              className='product-card__image'
              src={product.image}
              alt={product.imageAlt}
              loading='lazy'
              decoding='async'
            />
          </div>
          <div className='product-card__body'>
            <p className='product-card__brand'>{product.brand}</p>
            {product.category && (
              <p className='product-card__category'>{product.category}</p>
            )}
            <h3 className='product-card__title'>{product.name}</h3>
            {product.description && <p>{product.description}</p>}
            {product.price && (
              <p className='product-card__price'>
                {new Intl.NumberFormat(undefined, {
                  style: "currency",
                  currency: product.price.currency,
                }).format(product.price.amount)}
              </p>
            )}
            {product.availability && (
              <p className='product-card__availability'>
                {product.availability === "in-stock" && "In stock"}
                {product.availability === "out-of-stock" && "Out of stock"}
                {product.availability === "preorder" &&
                  "Available for preorder"}
              </p>
            )}
            {product.variants && product.variants.length > 0 && (
              <p className='product-card__options'>
                {product.variants
                  .map(
                    (variant) =>
                      `${variant.name}: ${variant.values.join(", ")}`,
                  )
                  .join(" · ")}
              </p>
            )}
            {product.detailHref && (
              <a className='text-link' href={product.detailHref}>
                View details
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
