import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  ProductGrid,
  type ApparelProduct,
} from "../src/features/apparel/components/ProductGrid";

const testProduct: ApparelProduct = {
  id: "test-product-1",
  brand: "Test brand",
  category: "Test category",
  name: "Test product",
  image: "/test-product.jpg",
  imageAlt: "Synthetic test image",
  description: "Synthetic fixture for component testing only.",
  price: { amount: 24, currency: "USD" },
  variants: [{ name: "Size", values: ["S", "M"] }],
  availability: "in-stock",
  detailHref: "/test-product",
};

describe("ProductGrid", () => {
  it("shows an honest empty state when there are no verified products", () => {
    render(<ProductGrid products={[]} />);

    expect(screen.getByRole("status")).toHaveTextContent(
      "Product details are not available yet",
    );
    expect(screen.queryByRole("link", { name: "Buy" })).not.toBeInTheDocument();
  });

  it("renders only the product information supplied by its typed data", () => {
    render(<ProductGrid products={[testProduct]} />);

    expect(screen.getByRole("heading", { name: "Test product" })).toBeVisible();
    expect(screen.getByText("Test brand")).toBeVisible();
    expect(screen.getByText("Test category")).toBeVisible();
    expect(screen.getByText(/24\.00/)).toBeVisible();
    expect(screen.getByText("Size: S, M")).toBeVisible();
    expect(screen.getByText("In stock")).toBeVisible();
    expect(
      screen.getByRole("img", { name: "Synthetic test image" }),
    ).toHaveAttribute("loading", "lazy");
    expect(screen.getByRole("link", { name: "View details" })).toHaveAttribute(
      "href",
      "/test-product",
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
