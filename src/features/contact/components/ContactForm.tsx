import { useRef, useState, type FormEvent } from "react";
import { submitContactMessage } from "../contactService";
import {
  validateContact,
  type ContactErrors,
  type ContactValues,
} from "../contactValidation";

const emptyValues: ContactValues = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(emptyValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionInProgress = useRef(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  function updateField(field: keyof ContactValues, value: string) {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    setFeedback(null);

    if (Object.keys(errors).length > 0) {
      setErrors(validateContact(nextValues));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInProgress.current) return;

    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    setFeedback(null);

    if (Object.keys(nextErrors).length > 0) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }

    submissionInProgress.current = true;
    setIsSubmitting(true);
    try {
      await submitContactMessage(values);
      setFeedback({
        type: "success",
        message:
          "Your message was sent successfully. Thank you for reaching out.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Your message could not be sent. Please try again later.",
      });
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <form className='contact-form' noValidate onSubmit={handleSubmit}>
      <p className='contact-form__notice'>
        Message delivery requires a configured contact service. The form will
        report clearly if delivery is unavailable.
      </p>

      <div className='contact-form__grid'>
        <div className='form-field'>
          <label className='form-field__label' htmlFor='fullName'>
            Full name <span aria-hidden='true'>*</span>
          </label>
          <input
            autoComplete='name'
            className='form-field__control'
            id='fullName'
            name='fullName'
            required
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            value={values.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
          />
          {errors.fullName && (
            <p className='form-field__error' id='fullName-error'>
              {errors.fullName}
            </p>
          )}
        </div>

        <div className='form-field'>
          <label className='form-field__label' htmlFor='email'>
            Email address <span aria-hidden='true'>*</span>
          </label>
          <input
            autoComplete='email'
            className='form-field__control'
            id='email'
            name='email'
            type='email'
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
          {errors.email && (
            <p className='form-field__error' id='email-error'>
              {errors.email}
            </p>
          )}
        </div>

        <div className='form-field contact-form__wide'>
          <label className='form-field__label' htmlFor='subject'>
            Subject <span aria-hidden='true'>*</span>
          </label>
          <input
            className='form-field__control'
            id='subject'
            name='subject'
            required
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            value={values.subject}
            onChange={(event) => updateField("subject", event.target.value)}
          />
          {errors.subject && (
            <p className='form-field__error' id='subject-error'>
              {errors.subject}
            </p>
          )}
        </div>

        <div className='form-field contact-form__wide'>
          <label className='form-field__label' htmlFor='message'>
            Message <span aria-hidden='true'>*</span>
          </label>
          <textarea
            className='form-field__control form-field__control--textarea'
            id='message'
            name='message'
            required
            rows={7}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
          />
          {errors.message && (
            <p className='form-field__error' id='message-error'>
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {feedback && (
        <p
          className={`contact-form__feedback contact-form__feedback--${feedback.type}`}
          role={feedback.type === "error" ? "alert" : "status"}
          aria-live={feedback.type === "error" ? "assertive" : "polite"}
        >
          {feedback.message}
        </p>
      )}

      <button
        className='contact-form__submit'
        type='submit'
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending message" : "Send message"}
      </button>
    </form>
  );
}
