import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Contact from "./Contact";

describe("Contact", () => {
  test("renders all address lines", () => {
    render(<Contact />);
    expect(screen.getByText("610 Water Street")).toBeInTheDocument();
    expect(screen.getByText("St. John's, NL")).toBeInTheDocument();
    expect(screen.getByText("A1E 2T6")).toBeInTheDocument();
  });

  test("renders phone number as a link", () => {
    render(<Contact />);
    const phoneLink = screen.getByRole("link", { name: "(709) 635-9247" });
    expect(phoneLink).toHaveAttribute("href", "tel:7096359247");
  });

  test("renders email as a link", () => {
    render(<Contact />);
    const emailLink = screen.getByRole("link", {
      name: "contact@momandpop.com",
    });
    expect(emailLink).toHaveAttribute("href", "mailto:contact@momandpop.com");
  });

  test("renders map iframe", () => {
    render(<Contact />);
    const iframe = screen.getByTitle("location");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      expect.stringContaining("google.com/maps")
    );
  });
});
