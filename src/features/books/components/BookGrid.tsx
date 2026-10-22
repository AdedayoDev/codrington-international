export type PublishedBook = {
  id: string;
  title: string;
  author?: string;
  cover: string;
  coverAlt: string;
  detailHref?: string;
};

type BookGridProps = {
  books: PublishedBook[];
};

export function BookGrid({ books }: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className='catalog-empty' role='status'>
        <p className='catalog-empty__eyebrow'>Published titles</p>
        <h3 className='catalog-empty__title'>
          No verified book catalog has been provided
        </h3>
        <p className='catalog-empty__copy'>
          Titles, cover artwork, and author details can be added here when
          approved materials are available.
        </p>
      </div>
    );
  }

  return (
    <div className='book-grid'>
      {books.map((book) => (
        <article className='book-card' key={book.id}>
          <div className='book-card__cover-wrap'>
            <img
              className='book-card__cover'
              src={book.cover}
              alt={book.coverAlt}
            />
          </div>
          <div className='book-card__body'>
            <h3 className='book-card__title'>{book.title}</h3>
            {book.author && <p>{book.author}</p>}
            {book.detailHref && (
              <a className='text-link' href={book.detailHref}>
                Book details
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
