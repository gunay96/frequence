import type { ComponentProps, ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
};

export function FormField({
  id,
  label,
  error,
  hint,
  required,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span className="text-destructive" aria-hidden>
            {" "}
            *
          </span>
        ) : null}
        {required ? <span className="sr-only"> (zorunlu)</span> : null}
      </label>
      {children}
      {hint ? <p className="text-xs text-muted">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function FormErrorSummary({
  title,
  errors,
}: {
  title: string;
  errors: Record<string, string[]>;
}) {
  const entries = Object.entries(errors).filter(([, msgs]) => msgs.length > 0);
  if (entries.length === 0) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className="rounded-none border border-destructive/40 bg-destructive/10 px-4 py-3"
    >
      <p className="font-medium text-destructive">{title}</p>
      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-foreground/90">
        {entries.flatMap(([field, msgs]) =>
          msgs.map((msg) => (
            <li key={`${field}-${msg}`}>
              <span className="sr-only">{field}: </span>
              {msg}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export function HoneypotField() {
  return (
    <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="website">Website</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}

const inputClass =
  "w-full rounded-none border border-border-strong bg-surface px-4 py-3.5 text-sm text-foreground placeholder:text-muted/70 transition-colors focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-[var(--focus)]/35";

export function TextInput(props: ComponentProps<"input">) {
  const { className = "", ...rest } = props;
  return <input className={`${inputClass} ${className}`} {...rest} />;
}

export function TextArea(props: ComponentProps<"textarea">) {
  const { className = "", ...rest } = props;
  return (
    <textarea
      className={`${inputClass} min-h-[120px] resize-y ${className}`}
      {...rest}
    />
  );
}

export function SelectInput(props: ComponentProps<"select">) {
  const { className = "", children, ...rest } = props;
  return (
    <select className={`${inputClass} ${className}`} {...rest}>
      {children}
    </select>
  );
}
