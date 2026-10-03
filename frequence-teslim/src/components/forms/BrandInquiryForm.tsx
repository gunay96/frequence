"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { submitBrandInquiryAction } from "@/app/actions/forms";
import { Button } from "@/components/ui/Button";
import {
  BUDGET_RANGES,
  CAMPAIGN_TYPES,
  TARGET_PLATFORMS,
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

export function BrandInquiryForm() {
  const [state, formAction, pending] = useActionState(
    submitBrandInquiryAction,
    initialState
  );

  useEffect(() => {
    track("brand_form_started");
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
          className="space-y-4 border border-success/40 bg-success/10 px-5 py-6"
        >
          <p className="font-display text-xl font-extrabold tracking-[-0.005em]">Brief alındı.</p>
          <p className="text-sm leading-relaxed text-foreground/90">
            Ekibimiz talebinizi inceleyip iş e-postanız üzerinden dönüş yapacak.
            Acil bir lansman pencereniz varsa, yanıtta zamanlamayı tekrar
            belirtmeniz yeterli.
          </p>
          <p>
            <Link
              href={"/nasil-calisir"}
              className="text-sm font-medium text-primary-soft hover:underline"
            >
              Süreç nasıl işler →
            </Link>
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
              <TextInput id="fullName" name="fullName" autoComplete="name" required aria-invalid={Boolean(fieldErrors.fullName)} />
            </FormField>

            <FormField
              id="company"
              label="Marka / Şirket"
              required
              error={fieldErrors.company?.[0]}
            >
              <TextInput
                id="company"
                name="company"
                autoComplete="organization"
                required
                aria-invalid={Boolean(fieldErrors.company)}
              />
            </FormField>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              id="workEmail"
              label="İş e-postası"
              required
              error={fieldErrors.workEmail?.[0]}
            >
              <TextInput
                id="workEmail"
                name="workEmail"
                type="email"
                autoComplete="email"
                required
                aria-invalid={Boolean(fieldErrors.workEmail)}
              />
            </FormField>

            <FormField
              id="phone"
              label="Telefon"
              hint="Opsiyonel"
              error={fieldErrors.phone?.[0]}
            >
              <TextInput id="phone" name="phone" type="tel" autoComplete="tel" aria-invalid={Boolean(fieldErrors.phone)} />
            </FormField>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              id="campaignType"
              label="Kampanya tipi"
              required
              error={fieldErrors.campaignType?.[0]}
            >
              <SelectInput id="campaignType" name="campaignType" defaultValue="" required aria-invalid={Boolean(fieldErrors.campaignType)}>
                <option value="" disabled>
                  Kampanya tipi seçin
                </option>
                {CAMPAIGN_TYPES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </SelectInput>
            </FormField>

            <FormField
              id="targetPlatform"
              label="Platform tercihi"
              required
              error={fieldErrors.targetPlatform?.[0]}
            >
              <SelectInput
                id="targetPlatform"
                name="targetPlatform"
                defaultValue=""
                required
                aria-invalid={Boolean(fieldErrors.targetPlatform)}
              >
                <option value="" disabled>
                  Platform seçin
                </option>
                {TARGET_PLATFORMS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </SelectInput>
            </FormField>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              id="budget"
              label="Bütçe aralığı"
              hint="Opsiyonel"
            >
              <SelectInput id="budget" name="budget" defaultValue="">
                <option value="">Belirtmek istemiyorum</option>
                {BUDGET_RANGES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </SelectInput>
            </FormField>

            <FormField
              id="timing"
              label="Tahmini zamanlama"
              required
              hint="Örn. Nisan lansmanı / Q2"
              error={fieldErrors.timing?.[0]}
            >
              <TextInput id="timing" name="timing" required />
            </FormField>
          </div>

          <FormField
            id="message"
            label="Kampanya hedefi / brief"
            required
            hint="Hedef kitle, mesaj, başarı ölçütü ve özel notlarınız."
            error={fieldErrors.message?.[0]}
          >
            <TextArea id="message" name="message" required maxLength={2000} aria-invalid={Boolean(fieldErrors.message)} />
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
            movingBorder
            onClick={() => track("brand_form_submitted")}
          >
            {pending ? "Gönderiliyor…" : "Kampanya Talebini Gönder"}
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
