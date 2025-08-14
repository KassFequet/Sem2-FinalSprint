// Dropdown.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Dropdown from "./Dropdown";
import { BrowserRouter } from "react-router-dom";

// ----- MOCKING NAVIGATION -----

// Create a spy function for navigation
const mockNavigate = vi.fn();

// Mock the react-router-dom module so we can replace useNavigate with our spy
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // Keep real functionality for everything else
  return {
    ...actual,
    useNavigate: () => mockNavigate, // Replace useNavigate with our spy
  };
});

// ----- MOCKING FETCH -----

// Example mock product data
const mockProducts = [
  { id: 1, name: "Test Product", price: 9.99, image: "test.jpg" },
];

// Replace global fetch with a spy function
global.fetch = vi.fn();

describe("Dropdown component", () => {
  beforeEach(() => {
    // Reset all mocks before each test to avoid test bleed
    vi.clearAllMocks();
  });

  it("shows loading state, then products", async () => {
    // Mock fetch to return a successful response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    // Render component inside BrowserRouter (needed for navigation)
    render(
      <BrowserRouter>
        <Dropdown category="Test Category" />
      </BrowserRouter>
    );

    // Step 1: Assert loading message is shown
    expect(screen.getByText(/Loading products/i)).toBeInTheDocument();

    // Step 2: Wait until product appears
    await waitFor(() =>
      expect(screen.getByText("Test Product")).toBeInTheDocument()
    );
  });

  it("navigates when clicking a product", async () => {
    // Mock fetch again for this test
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    render(
      <BrowserRouter>
        <Dropdown category="Test Category" />
      </BrowserRouter>
    );

    // Wait for product to appear
    await waitFor(() =>
      expect(screen.getByText("Test Product")).toBeInTheDocument()
    );

    // Simulate clicking the product name
    fireEvent.click(screen.getByText("Test Product"));

    // Assert navigation was called with the right route
    expect(mockNavigate).toHaveBeenCalledWith("/product/1");
  });

  it("does not navigate when clicking Add to Cart", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    render(
      <BrowserRouter>
        <Dropdown category="Test Category" />
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(screen.getByText("Test Product")).toBeInTheDocument()
    );

    // Find the Add to Cart button (must be a <button> in the component)
    const addToCartBtn = screen.getByRole("button", { name: /add to cart/i });

    // Click Add to Cart
    fireEvent.click(addToCartBtn);

    // Assert navigation did NOT happen
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("shows error message if fetch fails", async () => {
    // Mock fetch to return an unsuccessful response
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(
      <BrowserRouter>
        <Dropdown category="Test Category" />
      </BrowserRouter>
    );

    // Wait for error message to appear
    await waitFor(() =>
      expect(
        screen.getByText(/failed to fetch products/i)
      ).toBeInTheDocument()
    );
  });
});
