import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

vi.mock("@/components/HeroSection", () => ({
  HeroSection: () => <div data-testid="hero-section">Hero Section</div>,
}));

vi.mock("@/components/AboutSection", () => ({
  AboutSection: () => <div data-testid="about-section">About Section</div>,
}));

vi.mock("@/components/ProjectShowcase", () => ({
  ProjectShowcase: () => <div data-testid="project-showcase">Projects</div>,
}));

vi.mock("@/components/tech-arsenal/TechArsenal", () => ({
  TechArsenal: () => <div data-testid="tech-arsenal">Tech Arsenal</div>,
}));

vi.mock("@/components/tech-arsenal/ExpertiseGrid", () => ({
  ExpertiseGrid: () => <div data-testid="expertise-grid">Expertise</div>,
}));

vi.mock("@/components/ui/contact", () => ({
  default: () => <div data-testid="contact-section">Contact</div>,
}));

describe("Home Page", () => {
  it("renders without crashing", () => {
    render(<Home />);
    expect(document.body).toBeTruthy();
  });

  it("contains all major sections", () => {
    render(<Home />);
    expect(screen.getByTestId("hero-section")).toBeTruthy();
    expect(screen.getByTestId("about-section")).toBeTruthy();
    expect(screen.getByTestId("project-showcase")).toBeTruthy();
    expect(screen.getByTestId("tech-arsenal")).toBeTruthy();
    expect(screen.getByTestId("expertise-grid")).toBeTruthy();
    expect(screen.getByTestId("contact-section")).toBeTruthy();
  });

  it("has a main element", () => {
    render(<Home />);
    expect(document.querySelector("main")).toBeTruthy();
  });
});
