export type AnalyticsEventName =
  | "campaign_cta_clicked"
  | "creator_cta_clicked"
  | "brand_form_started"
  | "brand_form_submitted"
  | "creator_form_started"
  | "creator_form_submitted";

export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

export type AnalyticsProvider = {
  track: (event: AnalyticsEventName, payload?: AnalyticsPayload) => void;
};

/** No-op provider until GA/Meta/consent stack is enabled. */
export const noopAnalytics: AnalyticsProvider = {
  track: () => {
    /* intentionally empty — no cookies, no third-party pixels */
  },
};

let provider: AnalyticsProvider = noopAnalytics;

export function setAnalyticsProvider(next: AnalyticsProvider): void {
  provider = next;
}

export function track(
  event: AnalyticsEventName,
  payload?: AnalyticsPayload
): void {
  provider.track(event, payload);
}
