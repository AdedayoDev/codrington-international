import { describe, expect, it } from "vitest";
import { validateContact } from "../src/features/contact/contactValidation";

describe("validateContact", () => {
  it("reports required fields and focuses no unprovided value", () => {
    expect(
      validateContact({ fullName: "", email: "", subject: "", message: "" }),
    ).toEqual({
      fullName: "Enter your full name.",
      email: "Enter your email address.",
      subject: "Enter a subject.",
      message: "Enter a message.",
    });
  });

  it("rejects malformed email and accepts a well-formed address", () => {
    const values = {
      fullName: "Test Visitor",
      email: "not-an-email",
      subject: "Question",
      message: "Hello",
    };

    expect(validateContact(values).email).toBe("Enter a valid email address.");
    expect(
      validateContact({ ...values, email: "visitor@example.test" }),
    ).toEqual({});
  });
});
