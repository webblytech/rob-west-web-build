import { useId, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Values = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: "", phone: "", email: "", service: "", message: "" };

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.phone.trim()) e.phone = "Please enter a phone number.";
  else if (v.phone.replace(/\D/g, "").length < 7) e.phone = "Please enter a valid phone number.";
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    e.email = "Please enter a valid email address.";
  if (!v.service) e.service = "Please choose a type of service.";
  if (v.message.trim().length < 10) e.message = "Please give a brief description (10+ characters).";
  return e;
}

const fieldBase =
  "w-full rounded-md border bg-background px-3.5 py-2.5 text-[0.95rem] text-navy placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-accent";

export function ContactForm() {
  const id = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (key: keyof Values) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus("idle");
      const first = document.getElementById(`${id}-${Object.keys(found)[0]}`);
      first?.focus();
      return;
    }
    setStatus("loading");
    try {
      // TODO: connect a real endpoint here, e.g.
      // await fetch("/api/public/enquiry", { method: "POST", body: JSON.stringify(values) });
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
      setValues(EMPTY);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]"
      >
        <CheckCircle2 className="mx-auto size-10 text-primary" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-bold text-navy">Enquiry sent</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks — your enquiry has been received. Rob will get back to you. If it's urgent, please
          call directly.
        </p>
        <Button variant="quote" size="lg" className="mt-6" onClick={() => setStatus("idle")}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
    >
      <h2 className="text-xl font-bold text-navy">Request a Quote</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Fill in a few details and Rob will get back to you.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field
          id={`${id}-name`}
          label="Name"
          required
          error={errors.name}
          input={
            <input
              id={`${id}-name`}
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={set("name")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? `${id}-name-error` : undefined}
              className={cn(fieldBase, errors.name ? "border-destructive" : "border-input")}
            />
          }
        />
        <Field
          id={`${id}-phone`}
          label="Phone number"
          required
          error={errors.phone}
          input={
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={set("phone")}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
              className={cn(fieldBase, errors.phone ? "border-destructive" : "border-input")}
            />
          }
        />
        <Field
          id={`${id}-email`}
          label="Email"
          hint="Optional"
          error={errors.email}
          input={
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={set("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? `${id}-email-error` : undefined}
              className={cn(fieldBase, errors.email ? "border-destructive" : "border-input")}
            />
          }
        />
        <Field
          id={`${id}-service`}
          label="Type of service"
          required
          error={errors.service}
          input={
            <select
              id={`${id}-service`}
              name="service"
              value={values.service}
              onChange={set("service")}
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? `${id}-service-error` : undefined}
              className={cn(fieldBase, errors.service ? "border-destructive" : "border-input")}
            >
              <option value="">Please choose…</option>
              <option value="plumbing">Plumbing</option>
              <option value="handyman">Handyman</option>
              <option value="other">Other</option>
              <option value="not-sure">Not sure</option>
            </select>
          }
        />
        <div className="sm:col-span-2">
          <Field
            id={`${id}-message`}
            label="Brief description of the job"
            required
            error={errors.message}
            input={
              <textarea
                id={`${id}-message`}
                name="message"
                rows={5}
                value={values.message}
                onChange={set("message")}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? `${id}-message-error` : undefined}
                className={cn(
                  fieldBase,
                  "resize-y",
                  errors.message ? "border-destructive" : "border-input",
                )}
              />
            }
          />
        </div>
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-5 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Something went wrong sending your enquiry. Please try again, or call Rob directly.
        </p>
      ) : null}

      <Button type="submit" variant="call" size="xl" className="mt-6 w-full sm:w-auto" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send aria-hidden="true" />
            Submit Enquiry
          </>
        )}
      </Button>
      <p className="mt-3 text-xs text-muted-foreground">
        Fields marked with * are required.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  input,
  error,
  required,
  hint,
}: {
  id: string;
  label: string;
  input: React.ReactNode;
  error?: string | undefined;
  required?: boolean | undefined;
  hint?: string | undefined;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline gap-2 text-sm font-semibold text-navy">
        {label}
        {required ? (
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
        ) : null}
        {hint ? <span className="text-xs font-normal text-muted-foreground">{hint}</span> : null}
      </label>
      {input}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
