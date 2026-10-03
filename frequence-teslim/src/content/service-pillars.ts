export type ServicePillar = {
  id: string;
  number: string;
  title: string;
  what: string;
  brandGets: string;
  value: string;
  points: string[];
};

/** Primary service pillars for /hizmetler — operational, non-generic. */
export const servicePillars: ServicePillar[] = [
  {
    id: "strategy",
    number: "01",
    title: "Strateji & Creator Seçimi",
    what: "Çıkışın hedefini TikTok’un diline çeviriyor, creator listesini uyuma göre kuruyoruz.",
    brandGets:
      "Net bir yön, gerekçesiyle creator önerisi ve kararı hızlandıran bir seçim çerçevesi.",
    value:
      "Takipçi sayısına indirgenmiş listeler yerine içerik dili, kategori ve şarkıyla uyum önce gelir.",
    points: [
      "Hedef ve başarı ölçütleri",
      "Format ve ses kullanım yaklaşımı",
      "Uyum odaklı kısa liste ve gerekçeleri",
    ],
  },
  {
    id: "campaign",
    number: "02",
    title: "Kampanya Yönetimi",
    what: "Brief’ten yayına creator iletişimini, onayları ve takvimi tek hatta yürütüyoruz.",
    brandGets:
      "Dağınık mesajlar yerine görünür bir yayın ritmi; geciken adım erken fark edilir.",
    value:
      "Marka ve creator tarafı aynı dili konuşur; kampanya yazışmalarda kaybolmaz.",
    points: [
      "Kampanya yayın planı",
      "Onay ve yayın takvimi koordinasyonu",
      "Tek yerden durum takibi",
    ],
  },
  {
    id: "content",
    number: "03",
    title: "İçerik Operasyonu",
    what: "Brief netliğini, üretim çerçevesini ve yayınlanan içerik listesini birlikte yönetiyoruz.",
    brandGets:
      "Hangi içerik yayında, hangisi bekliyor — tahmin değil, güncel liste.",
    value:
      "Platformun kendi formatlarına uygun üretim alanı; şablon içerik dayatılmaz.",
    points: [
      "Brief ve üretim çerçevesi",
      "İçerik listesi",
      "Yayın durumu ve eksikler",
    ],
  },
  {
    id: "measurement",
    number: "04",
    title: "Ölçüm & Raporlama",
    what: "İş yayınla bitmiyor. İçerik, creator ve kampanya sonuçlarını okunabilir bir rapora bağlıyoruz.",
    brandGets:
      "Paylaşılabilir bir performans özeti; herkes aynı rakama bakar.",
    value:
      "Rapor, kampanyadan kopuk bir ek değil; aynı dilin devamı.",
    points: [
      "Kampanya performans özeti",
      "Creator kıyas görünümü",
      "Paylaşılabilir rapor",
    ],
  },
];

export const serviceModules = [
  {
    id: "platform-native",
    title: "Platformun kendi dili",
    body: "Kısa video ritmi, ses ve creator formatları kampanyanın tasarımına dahil. Trend garantisi vermiyoruz; içeriğin doğal akışına alan açıyoruz.",
  },
  {
    id: "music",
    title: "Müzik ve ses aktivasyonu",
    body: "Sesin creator’lara dağıtımını ve katılımı aynı hatta kurguluyoruz. Kullanım takibi; chart ya da viral vaadi değil.",
  },
  {
    id: "advisory",
    title: "Kampanya danışmanlığı",
    body: "Öncelikler, riskler ve sıradaki adım için bağlama dayalı yönlendirme. Büyük vaat değil, hızlı karar.",
  },
] as const;
