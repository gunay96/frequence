export type NavItem = {
  label: string;
  href: string;
};

/** Marketing-primary navigation — real routes only. */
export const primaryNav: NavItem[] = [
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Nasıl Çalışır", href: "/nasil-calisir" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

export const footerNav = {
  company: [
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "İletişim", href: "/iletisim" },
  ],
  solutions: [
    { label: "Hizmetler", href: "/hizmetler" },
    { label: "Nasıl Çalışır", href: "/nasil-calisir" },
    { label: "Markalar", href: "/markalar" },
    { label: "Creatorlar", href: "/creatorlar" },
  ],
  resources: [
      { label: "Kampanya Başlat", href: "/marka-iletisim" },
    { label: "Creator Başvurusu", href: "/creator-basvuru" },
  ],
  legal: [
    { label: "Gizlilik", href: "/gizlilik" },
    { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
    { label: "Çerez Politikası", href: "/cerez-politikasi" },
  ],
} as const;

export const ctaLinks = {
  campaignStart: "/marka-iletisim",
  creatorApply: "/creator-basvuru",
  howItWorks: "/nasil-calisir",
  contact: "/iletisim",
} as const;
