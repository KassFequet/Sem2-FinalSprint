// Dropdown.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Dropdown from "./Dropdown";
import { BrowserRouter } from "react-router-dom";

// ----- MOCKING NAVIGATION -----
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// ----- MOCKING IMAGE IMPORTS -----
// Prevents Vitest from trying to actually load image files
vi.mock("../images/addtocart.png", () => ({ default: "addtocart.png" }));
vi.mock("../images/addedtocart.png", () => ({ default: "addedtocart.png" }));

// ----- MOCKING FETCH -----
global.fetch = vi.fn();

const mockProducts = [
  { id: 1, name: "Test Product", price: 9.99, image: "test.jpg" },
];

describe("Dropdown component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state, then products", async () => {
    // First call = products
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });
    // Second call = cart check
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(
      <BrowserRouter>
        <Dropdown category="Test Category" />
      </BrowserRouter>
    );

    expect(screen.getByText(/loading products/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText("Test Product")).toBeInTheDocument()
    );
  });

  it("navigates when clicking a product", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

    render(
      <BrowserRouter>
        <Dropdown category="Test Category" />
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(screen.getByText("Test Product")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Test Product"));

    expect(mockNavigate).toHaveBeenCalledWith("/products/1");
  });

  it("does not navigate when clicking Add to Cart", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

    render(
      <BrowserRouter>
        <Dropdown category="Test Category" />
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(screen.getByText("Test Product")).toBeInTheDocument()
    );

    const addToCartBtn = screen.getByRole("button", {
      name: /add to cart/i,
    });

    fireEvent.click(addToCartBtn);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("shows error message if fetch fails", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(
      <BrowserRouter>
        <Dropdown category="Test Category" />
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/failed to fetch products/i)).toBeInTheDocument()
    );
  });
});
