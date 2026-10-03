# Forms

Two public forms:

| Route | Kind | Component |
|-------|------|-----------|
| `/creator-basvuru` | `creator_application` | `CreatorApplicationForm` |
| `/marka-iletisim` | `brand_inquiry` | `BrandInquiryForm` |

## Pipeline

```
Client form (useActionState)
  → Server Action (src/app/actions/forms.ts)
  → submitForm() (src/lib/forms/submit-form.ts)
  → Zod schema validation
  → Webhook provider (if configured)
```

## Validation

Schemas in `src/lib/forms/schema.ts` (Zod). Turkish error messages.

Required fields enforced server-side; client uses `noValidate` + accessible error summary (`role="alert"`).

## Honeypot

Field name: **`website`**. Visually hidden, `tabIndex={-1}`. Non-empty → `code: "honeypot"`.

## Consent

Checkbox `consent` must be checked; mapped to `true` in server action.

## Environment

| Variable | Purpose |
|----------|---------|
| `FORM_SUBMISSION_PROVIDER` | `webhook` or unset (`none`) |
| `FORM_WEBHOOK_URL` | Destination URL when provider is webhook |

Unconfigured provider returns `provider_unconfigured` with Turkish message (safe for dev).

## Analytics

Forms call `track()` on start/submit (`brand_form_*`, `creator_form_*`). Provider is currently no-op.

## Accessibility

- Labels associated with inputs
- `aria-invalid` + error text per field
- Error summary at top on validation failure
- Success message uses `role="status"`

## Durum

Formlar varsayılan olarak **kapalı**: `FORM_SUBMISSION_PROVIDER` tanımsız veya
`none` iken doğrulama çalışır, gönderim `provider_unconfigured` döner ve
ziyaretçiye `CONTACT_EMAIL` (`src/lib/config/urls.ts`) gösterilir. Bir
backend'e bağlamak için `FORM_SUBMISSION_PROVIDER=webhook` + `FORM_WEBHOOK_URL`
(+ isteğe bağlı `FORM_WEBHOOK_SECRET`, `Authorization: Bearer` olarak gider).
Webhook gövdesi: `{ kind, submittedAt, data }`.
