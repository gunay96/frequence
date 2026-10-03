import { BrandLoadingScreen } from "@/components/ui/brand-flow-loader";

/**
 * Pazarlama grubu rota yüklemesi — markalı bekleme ekranı. Rotalar statik
 * ve prefetch'li olduğu için fallback nadiren görünür; göründüğünde de
 * ürünle aynı yükleme dilini konuşur.
 */
export default function MarketingLoading() {
  return <BrandLoadingScreen />;
}
