import { createBrowserRouter } from "react-router-dom";
import { SiteLayout } from "../components/layout/SiteLayout";
import {
  AboutUsPage,
  BooksPublishingPage,
  ContactUsPage,
  DivisionsPage,
  FacebeatApparelPage,
  HomePage,
  NotFoundPage,
  ShopApparelPage,
  VeteranWarriorBelieverPage,
} from "./routePages";

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutUsPage /> },
      { path: "apparel/facebeat", element: <FacebeatApparelPage /> },
      { path: "apparel/shop", element: <ShopApparelPage /> },
      { path: "books-publishing", element: <BooksPublishingPage /> },
      {
        path: "veteran-warrior-believer",
        element: <VeteranWarriorBelieverPage />,
      },
      { path: "divisions", element: <DivisionsPage /> },
      { path: "contact", element: <ContactUsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
