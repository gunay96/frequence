"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { submitCreatorApplicationAction } from "@/app/actions/forms";
import { Button } from "@/components/ui/Button";
import {
  CREATOR_CATEGORIES,
  FOLLOWER_RANGES,
} from "@/lib/forms/schema";
import type { FormSubmissionResult } from "@/lib/forms/types";
import { track } from "@/lib/analytics/events";
import {
  FormErrorSummary,
  FormField,
  HoneypotField,
  SelectInput,
  TextArea,
  TextInput,
} from "@/components/forms/FormFields";

const initialState: FormSubmissionResult | null = null;

export function CreatorApplicationForm() {
  const [state, formAction, pending] = useActionState(
    submitCreatorApplicationAction,
    initialState
  );

  useEffect(() => {
    track("creator_form_started");
  }, []);

  const fieldErrors = state && !state.ok ? state.fieldErrors ?? {} : {};
  const firstError = Object.values(fieldErrors)[0]?.[0];

  return (
    <form action={formAction} noValidate className="relative space-y-6">
      <HoneypotField />

      {state && !state.ok && state.code !== "validation_error" ? (
        <FormErrorSummary title={state.message} errors={{ form: [state.message] }} />
      ) : null}

      {state && !state.ok && state.code === "validation_error" ? (
        <FormErrorSummary
          title="Lütfen formdaki hataları düzeltin."
          errors={fieldErrors}
        />
      ) : null}

      {state?.ok ? (
        <div
          role="status"
          className="space-y-3 border border-success/40 bg-success/10 px-5 py-6"
        >
          <p className="font-display text-xl font-bold">Başvuru alındı.</p>
          <p className="text-sm leading-relaxed text-foreground/90">
            Uygun kampanyalar için sizinle iletişime geçilebilir. Kabul garanti
            değildir; her başvuru kampanyaya dönüşmez.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              id="fullName"
              label="Ad soyad"
              required
              error={fieldErrors.fullName?.[0]}
            >
              <TextInput
                id="fullName"
                name="fullName"
                autoComplete="name"
                required
                aria-invalid={Boolean(fieldErrors.fullName)}
                aria-describedby={
                  fieldErrors.fullName ? "fullName-error" : undefined
                }
              />
            </FormField>

            <FormField
              id="email"
              label="E-posta"
              required
              error={fieldErrors.email?.[0]}
            >
              <TextInput
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-invalid={Boolean(fieldErrors.email)}
              />
            </FormField>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              id="phone"
              label="Telefon"
              hint="Opsiyonel"
              error={fieldErrors.phone?.[0]}
            >
              <TextInput
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                aria-invalid={Boolean(fieldErrors.phone)}
              />
            </FormField>

            <FormField
              id="city"
              label="Şehir"
              hint="Opsiyonel"
              error={fieldErrors.city?.[0]}
            >
              <TextInput id="city" name="city" autoComplete="address-level2" />
            </FormField>
          </div>

          <FormField
            id="tiktokUrl"
            label="TikTok profil linki"
            required
            error={fieldErrors.tiktokUrl?.[0]}
          >
            <TextInput
              id="tiktokUrl"
              name="tiktokUrl"
              type="url"
              placeholder="https://www.tiktok.com/@..."
              required
              aria-invalid={Boolean(fieldErrors.tiktokUrl)}
            />
          </FormField>

          <FormField
            id="instagramUrl"
            label="Instagram profil linki (opsiyonel)"
            error={fieldErrors.instagramUrl?.[0]}
          >
            <TextInput id="instagramUrl" name="instagramUrl" type="url" />
          </FormField>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              id="category"
              label="İçerik kategorisi"
              required
              error={fieldErrors.category?.[0]}
            >
              <SelectInput
                id="category"
                name="category"
                defaultValue=""
                required
                aria-invalid={Boolean(fieldErrors.category)}
              >
                <option value="" disabled>
                  Seçin
                </option>
                {CREATOR_CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </SelectInput>
            </FormField>

            <FormField
              id="followerRange"
              label="Takipçi aralığı"
              required
              error={fieldErrors.followerRange?.[0]}
            >
              <SelectInput
                id="followerRange"
                name="followerRange"
                defaultValue=""
                required
                aria-invalid={Boolean(fieldErrors.followerRange)}
              >
                <option value="" disabled>
                  Seçin
                </option>
                {FOLLOWER_RANGES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </SelectInput>
            </FormField>
          </div>

          <FormField
            id="bio"
            label="Kısa tanıtım"
            required
            hint="Kendinizi ve içerik dilinizi kısaca anlatın."
            error={fieldErrors.bio?.[0]}
          >
            <TextArea
              id="bio"
              name="bio"
              required
              maxLength={800}
              aria-invalid={Boolean(fieldErrors.bio)}
            />
          </FormField>

          <FormField
            id="consent"
            label="Gizlilik onayı"
            required
            error={fieldErrors.consent?.[0]}
          >
            <label className="flex items-start gap-3 text-sm text-muted">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                value="on"
                required
                className="mt-1 h-4 w-4"
                aria-invalid={Boolean(fieldErrors.consent)}
              />
              <span>
                Kişisel verilerimin{" "}
                <Link href="/gizlilik" className="text-primary-soft underline">
                  gizlilik politikası
                </Link>{" "}
                kapsamında işlenmesini kabul ediyorum.
              </span>
            </label>
          </FormField>

          <Button
            type="submit"
            size="lg"
            pending={pending}
            onClick={() => track("creator_form_submitted")}
          >
            {pending ? "Gönderiliyor…" : "Başvuruyu Gönder"}
          </Button>

          {firstError ? (
            <p className="sr-only" role="alert">
              Form hatası: {firstError}
            </p>
          ) : null}
        </>
      )}
    </form>
  );
}
