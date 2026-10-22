import { lazy } from "react";

export const AboutUsPage = lazy(async () => ({
  default: (await import("../features/about/AboutUsPage")).AboutUsPage,
}));
export const FacebeatApparelPage = lazy(async () => ({
  default: (await import("../features/apparel/FacebeatApparelPage"))
    .FacebeatApparelPage,
}));
export const ShopApparelPage = lazy(async () => ({
  default: (await import("../features/apparel/ShopApparelPage"))
    .ShopApparelPage,
}));
export const BooksPublishingPage = lazy(async () => ({
  default: (await import("../features/books/BooksPublishingPage"))
    .BooksPublishingPage,
}));
export const ContactUsPage = lazy(async () => ({
  default: (await import("../features/contact/ContactUsPage")).ContactUsPage,
}));
export const DivisionsPage = lazy(async () => ({
  default: (await import("../features/divisions/DivisionsPage")).DivisionsPage,
}));
export const HomePage = lazy(async () => ({
  default: (await import("../features/home/HomePage")).HomePage,
}));
export const NotFoundPage = lazy(async () => ({
  default: (await import("../features/shared/NotFoundPage")).NotFoundPage,
}));
export const VeteranWarriorBelieverPage = lazy(async () => ({
  default: (await import("../features/veteran/VeteranWarriorBelieverPage"))
    .VeteranWarriorBelieverPage,
}));
