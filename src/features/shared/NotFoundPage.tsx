import { ActionLink } from "../../components/shared/ActionLink";

export function NotFoundPage() {
  return (
    <section className='route-frame'>
      <div className='site-container'>
        <p className='eyebrow'>Page not found</p>
        <h1 className='route-frame__title'>This page is unavailable</h1>
        <p className='page-intro__description'>
          The address may be incorrect or the page may have moved.
        </p>
        <div className='page-intro__action'>
          <ActionLink to='/'>Return Home</ActionLink>
        </div>
      </div>
    </section>
  );
}
