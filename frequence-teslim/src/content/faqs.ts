export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  audience: "brand" | "creator" | "both";
};

export const faqs: FaqItem[] = [
  {
    id: "brand-setup",
    audience: "brand",
    question: "Kampanya nasıl başlıyor?",
    answer:
      "Şarkıyı ya da ürünü, çıkış tarihini ve hedefi paylaşman yeterli. Stratejiyi, creator seçimini ve yayın akışını birlikte netleştiriyoruz.",
  },
  {
    id: "brand-selection",
    audience: "brand",
    question: "Creator’ları nasıl seçiyorsunuz?",
    answer:
      "Takipçi sayısından önce kategori uyumuna, içerik diline, kitle büyüklüğüne ve kampanyanın bağlamına bakıyoruz. Kısa liste gerekçesiyle gelir.",
  },
  {
    id: "brand-reporting",
    audience: "brand",
    question: "Rapor nasıl geliyor?",
    answer:
      "Kampanya videoları, creator görünümü ve performans özeti okunabilir bir rapora dönüşür; paylaşılabilir linkle herkes aynı rakamı görür.",
  },
  {
    id: "brand-tiktok",
    audience: "brand",
    question: "Sadece TikTok mu?",
    answer:
      "Önce TikTok. Kısa video kültürü, ses kullanımı ve creator dili kampanyaların merkezinde.",
  },
  {
    id: "brand-music",
    audience: "brand",
    question: "Müzik kampanyası nasıl işliyor?",
    answer:
      "Sesi creator’lara dağıtıyor, katılımı yönetiyor ve kullanımı takip ediyoruz. Trend ya da chart garantisi vermiyoruz.",
  },
  {
    id: "brand-timing",
    audience: "brand",
    question: "Ne kadar sürüyor?",
    answer:
      "Hedefe, creator onaylarına ve üretim ritmine göre değişir. Çıkış tarihine göre takvimi birlikte kuruyoruz.",
  },
  {
    id: "brand-pricing",
    audience: "brand",
    question: "Fiyat nasıl belirleniyor?",
    answer:
      "Bütçe kampanya tipine, creator kapsamına ve süreye göre şekillenir. Sabit paket yerine bağlama göre teklif hazırlıyoruz.",
  },
  {
    id: "creator-apply",
    audience: "creator",
    question: "Başvuru kabul edilme garantisi mi?",
    answer:
      "Hayır. Başvuru değerlendirmenin ilk adımı; her başvuru kampanyaya dönüşmez.",
  },
  {
    id: "creator-eligibility",
    audience: "creator",
    question: "Kimler başvurabilir?",
    answer:
      "TikTok’ta içerik üreten, net bir içerik dili olan creator’lar. Uygunluk kampanyanın bağlamına göre değişir.",
  },
  {
    id: "creator-selection",
    audience: "creator",
    question: "Kampanyalara nasıl seçiliyorum?",
    answer:
      "Kategori uyumu, içerik kalitesi, kitle büyüklüğü ve kampanyanın ihtiyacı belirler. Kabul edilmek otomatik kampanya demek değil.",
  },
  {
    id: "creator-payment",
    audience: "creator",
    question: "Ödeme nasıl oluyor?",
    answer:
      "Ödeme koşulları her kampanyada ayrıca netleşir. Genel bir garanti tutar paylaşmıyoruz; her iş kendi brief’iyle ilerler.",
  },
  {
    id: "creator-briefs",
    audience: "creator",
    question: "Brief nasıl geliyor?",
    answer:
      "Mesaj, format beklentisi ve sınırlar açıkça yazılır. Sorular için bir iletişim hattı açılır.",
  },
  {
    id: "creator-approvals",
    audience: "creator",
    question: "İçerik onayı var mı?",
    answer:
      "Kampanyaya göre marka ya da FREQUENCE onayı olabilir. Beklentiler brief’te yazılı olur.",
  },
];

export const homepageFaqs = faqs.filter((f) =>
  ["brand-setup", "brand-selection", "brand-reporting", "brand-music", "creator-apply", "creator-selection"].includes(f.id),
);
