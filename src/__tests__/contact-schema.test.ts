import { describe, it, expect } from "vitest";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";

describe("contactSchema", () => {
  it("accepts valid data", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      message: "This is a valid test message with enough words to pass validation.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects name shorter than 2 characters", () => {
    const result = contactSchema.safeParse({
      name: "J",
      email: "john@example.com",
      message: "This is a valid test message with enough words to pass validation.",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(["name"]);
    }
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "not-an-email",
      message: "This is a valid test message with enough words to pass validation.",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(["email"]);
    }
  });

  it("rejects message shorter than 10 characters", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      message: "Short",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(["message"]);
    }
  });

  it("rejects message longer than 250 words", () => {
    const longMessage = "word ".repeat(251);
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      message: longMessage,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(["message"]);
    }
  });
});
