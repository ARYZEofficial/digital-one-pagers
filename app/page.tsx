import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { HomeHero } from "@/components/home/Hero";
import { AboutStrip } from "@/components/home/AboutStrip";
import { ProductGrid, HomeBottomCta } from "@/components/home/ProductGrid";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto mt-7 grid w-[min(1180px,calc(100vw-32px))] gap-6">
        <HomeHero />
        <AboutStrip />
        <ProductGrid />
        <HomeBottomCta />
      </main>
      <Footer />
    </>
  );
}
