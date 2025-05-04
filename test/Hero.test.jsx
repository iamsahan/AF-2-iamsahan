import React from "react";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

describe("Hero Component", () => {
  test("renders main heading", () => {
    render(<Hero />);
    expect(screen.getByText("The World Factbook")).toBeInTheDocument();
  });

  test("renders supporting paragraph", () => {
    render(<Hero />);
    expect(
      screen.getByText(/The World Factbook provides basic information/i)
    ).toBeInTheDocument();
  });

  test("renders call-to-action text", () => {
    render(<Hero />);
    expect(
      screen.getByText(/Travel the globe with CIA’s World Factbook./i)
    ).toBeInTheDocument();
  });

  test("renders edition date", () => {
    render(<Hero />);
    expect(screen.getByText("Edition: May 1, 2025")).toBeInTheDocument();
  });

  test("renders logo image with alt text", () => {
    render(<Hero />);
    expect(screen.getByAltText("World Factbook Logo")).toBeInTheDocument();
  });
});
