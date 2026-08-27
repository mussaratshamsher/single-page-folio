import { describe, it, expect } from "vitest";
import profile, { type Profile, type Project, type Expertise } from "@/components/ui/PortfolioData";

describe("PortfolioData", () => {
  it("has a valid profile structure", () => {
    expect(profile.name).toBe("Mussarat Shamsher");
    expect(profile.role).toContain("Agentic AI Developer");
    expect(profile.email).toBe("musaratskhan@gmail.com");
    expect(profile.phone).toBe("+92 3182593455");
    expect(profile.location).toBe("Pakistan (Karachi)");
    expect(profile.resumeUrl).toBeTruthy();
    expect(profile.calUrl).toBeTruthy();
  });

  it("has social links", () => {
    expect(profile.socials.linkedin).toBeTruthy();
    expect(profile.socials.twitter).toBeTruthy();
    expect(profile.socials.github).toBeTruthy();
    expect(profile.socials.facebook).toBeTruthy();
  });

  it("has at least 3 services", () => {
    expect(profile.services.length).toBeGreaterThanOrEqual(3);
  });

  it("has at least 3 expertise areas", () => {
    expect(profile.expertise.length).toBeGreaterThanOrEqual(3);
  });

  it("has skills array", () => {
    expect(profile.skills.length).toBeGreaterThan(0);
  });

  it("has at least 5 projects", () => {
    expect(profile.projects.length).toBeGreaterThanOrEqual(5);
  });

  it("each project has required fields", () => {
    profile.projects.forEach((project: Project) => {
      expect(project.slug).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.tags.length).toBeGreaterThan(0);
      expect(project.desc).toBeTruthy();
      expect(project.image).toBeTruthy();
      expect(project.link).toBeTruthy();
    });
  });

  it("each expertise has required fields", () => {
    profile.expertise.forEach((expertise: Expertise) => {
      expect(expertise.title).toBeTruthy();
      expect(expertise.icon).toBeTruthy();
      expect(expertise.desc).toBeTruthy();
      expect(expertise.tags.length).toBeGreaterThan(0);
      expect(expertise.colSpan).toBeTruthy();
    });
  });

  it("all project slugs are unique", () => {
    const slugs = profile.projects.map((p: Project) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
