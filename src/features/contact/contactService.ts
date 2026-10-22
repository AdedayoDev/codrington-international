import type { ContactValues } from "./contactValidation";

const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();

export async function submitContactMessage(values: ContactValues) {
  if (!contactEndpoint) {
    throw new Error(
      "Message delivery is not configured. Set VITE_CONTACT_ENDPOINT to a server endpoint that accepts the contact form JSON.",
    );
  }

  let endpoint: URL;

  try {
    endpoint = new URL(contactEndpoint);
  } catch {
    throw new Error(
      "Message delivery requires an absolute HTTPS endpoint without embedded credentials.",
    );
  }

  if (
    endpoint.protocol !== "https:" ||
    endpoint.username !== "" ||
    endpoint.password !== ""
  ) {
    throw new Error(
      "Message delivery requires an HTTPS endpoint without embedded credentials.",
    );
  }

  let response: Response;

  try {
    response = await fetch(endpoint.href, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      }),
    });
  } catch {
    throw new Error(
      "We could not connect to the message service. Please try again later.",
    );
  }

  if (!response.ok) {
    throw new Error("Your message could not be sent. Please try again later.");
  }
}
