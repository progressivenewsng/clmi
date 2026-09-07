import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import { getPublishedGallery } from "@/lib/content/public";

export default async function GalleryPage() {
  const galleryItems = await getPublishedGallery();
  return (
    <>
      <PageHero
        eyebrow="Media Gallery"
        title="Moments From CLMI"
        description="A visual record of fellowships, conventions, outreaches and lectures. Tap any image to view it in full."
      />
      <section className="relative overflow-hidden bg-parchment py-16">
        <div className="absolute left-10 bottom-40 hidden w-56 border-r-2 border-gold/50 pr-4 text-right text-[12px] font-display italic leading-relaxed text-ink/45 lg:block">
          "If thou wilt diligently hearken to the voice of the LORD thy God, and wilt do that which is right in his sight..." Deuteronomy 28:1
        </div>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <GalleryGrid items={galleryItems} />
        </div>
      </section>
    </>
  );
}
