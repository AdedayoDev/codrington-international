import { Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

const pageMetadata: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Codrington International LLC | Veteran-Owned, Faith-Based",
    description:
      "Codrington International LLC is a veteran-owned, faith-based company with divisions in Veteran Warrior Believer, Faith-Based Apparel, and Books & Publishing.",
  },
  "/about": {
    title: "About Us | Codrington International LLC",
    description:
      "Learn about Codrington International LLC, a veteran-owned, faith-based company serving with purpose and leading with integrity.",
  },
  "/divisions": {
    title: "Our Divisions | Codrington International LLC",
    description:
      "Explore Veteran Warrior Believer, Faith-Based Apparel, and Books & Publishing, the divisions of Codrington International LLC.",
  },
  "/contact": {
    title: "Contact Us | Codrington International LLC",
    description:
      "Contact Codrington International LLC through the contact form.",
  },
  "/apparel/facebeat": {
    title: "Facebeat Apparel | Codrington International LLC",
    description:
      "Explore Facebeat Apparel, a distinct unisex faith-based apparel brand within Codrington International LLC.",
  },
  "/apparel/shop": {
    title: "Apparel Catalog | Codrington International LLC",
    description:
      "Catalog for Codrington International LLC's Faith-Based Apparel division. Facebeat Apparel is a distinct brand within the division.",
  },
  "/books-publishing": {
    title: "Books & Publishing | Codrington International LLC",
    description:
      "Learn about the Books & Publishing division of Codrington International LLC.",
  },
  "/veteran-warrior-believer": {
    title: "Veteran Warrior Believer | Codrington International LLC",
    description:
      "Learn about Veteran Warrior Believer, a veteran-focused, faith-based division of Codrington International LLC.",
  },
};

export function SiteLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = pageMetadata[pathname] ?? {
      title: "Page Not Found | Codrington International LLC",
      description: "The requested page could not be found.",
    };
    document.title = metadata.title;

    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    description?.setAttribute("content", metadata.description);
  }, [pathname]);

  return (
    <>
      <a className='sr-only' href='#main-content'>
        Skip to content
      </a>
      <SiteHeader />
      <main className='site-main' id='main-content'>
        <Suspense
          fallback={
            <div className='route-loading' role='status'>
              Loading page
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
