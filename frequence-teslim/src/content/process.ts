export type ProcessStep = {
  number: string;
  title: string;
  summary: string;
  /** What the brand provides at this stage */
  brandProvides: string;
  /** What FREQUENCE handles */
  teamHandles: string;
  /** Concrete output of the stage */
  output: string;
  brandNote: string;
  creatorNote: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Brief",
    summary:
      "Şarkıyı ya da ürünü, çıkış tarihini ve başarının ne demek olduğunu netleştiriyoruz.",
    brandProvides:
      "Hedef, kısıtlar, çıkış tarihi ve başarı tanımı; olabildiğince somut.",
    teamHandles:
      "Brief’i tek sayfada topluyor, belirsiz noktaları baştan görünür kılıyoruz.",
    output: "Herkesin aynı şeyi okuduğu, kararı hızlandıran bir kampanya brief’i.",
    brandNote:
      "Hedef, kısıtlar ve başarı tanımı tek brief’te; kararlar hızlanır.",
    creatorNote:
      "Beklenti baştan net; içerik dili ve yayın çerçevesi anlaşılır.",
  },
  {
    number: "02",
    title: "Strateji",
    summary:
      "Mesajı, formatı ve creator yaklaşımını ölçülebilir bir yöne bağlıyoruz.",
    brandProvides:
      "Mesaj, hassasiyetler ve kampanya tipi hakkında yön.",
    teamHandles:
      "TikTok kültürüne uyan format, ses kullanımı ve creator yaklaşımı öneriyoruz.",
    output: "Gerekçeli bir strateji çerçevesi; viral vaadi değil, ölçülebilir yön.",
    brandNote:
      "Mesaj platformun diline uyarlanır; format seçimi gerekçesiyle gelir.",
    creatorNote:
      "Üretimi zorlamayan, doğal içerik diline uyan bir çerçeve kurulur.",
  },
  {
    number: "03",
    title: "Creator Seçimi",
    summary:
      "İçerik dili ve şarkıyla uyuma göre kısa liste çıkarıyoruz; uyum önce gelir.",
    brandProvides:
      "Tercihler, kısıtlar ve onay için geri bildirim.",
    teamHandles:
      "Uyum, kategori ve içerik diline göre kısa liste; takipçi sayısı tek kriter değil.",
    output: "Gerekçeli kısa liste ve alternatifleri.",
    brandNote:
      "Kısa liste takipçi sayısından önce uyum, kategori ve içerik diliyle gelir.",
    creatorNote:
      "FREQUENCE ekibi kampanyaya uyan creator’larla iletişime geçer; zorla eşleştirme yapılmaz.",
  },
  {
    number: "04",
    title: "İçerik & Yayın",
    summary:
      "Brief, onay ve yayın takvimini tek hatta ilerletiyoruz.",
    brandProvides:
      "Onaylar, hassasiyetler ve zamanlama onayı.",
    teamHandles:
      "Creator iletişimini, üretim koordinasyonunu ve yayın takvimini yürütüyoruz.",
    output: "Onaylanmış içerik akışı ve görünür bir yayın planı.",
    brandNote:
      "Onay akışı ve yayın takvimi görünür; iş tek yerden yürür.",
    creatorNote:
      "Brief net, tarih belli; üretim ve yayın düzenli ilerler.",
  },
  {
    number: "05",
    title: "Takip",
    summary:
      "Yayın durumunu, içerik listesini ve sesin kullanımını izliyoruz.",
    brandProvides:
      "Kampanya sırasında değişen öncelikler ve geri bildirim.",
    teamHandles:
      "Yayınlanan ve bekleyen içerikleri, gecikmeleri ve ses kullanımını takip ediyoruz.",
    output: "Güncel içerik durumu; tahmin değil, gerçek tablo.",
    brandNote:
      "Hangi içerik yayında, hangisi bekliyor; kampanya durumu güncel.",
    creatorNote:
      "Yayın durumu takip edilir; eksik veya geciken adım hemen görünür.",
  },
  {
    number: "06",
    title: "Raporlama",
    summary:
      "Kampanyanın sonuçlarını okunabilir, paylaşılabilir bir rapora çeviriyoruz.",
    brandProvides:
      "Raporu okuyacak ekipler ve paylaşım ihtiyacı.",
    teamHandles:
      "İçerik, creator ve kampanya özetini aynı dilde raporluyoruz.",
    output: "Paylaşılabilir kampanya raporu; yayından sonra da şeffaflık.",
    brandNote:
      "İçerik, creator ve kampanya özeti paylaşılabilir biçimde gelir.",
    creatorNote:
      "Performans şeffaf tutulur; içeriğin sonucu bağlamıyla okunur.",
  },
];
