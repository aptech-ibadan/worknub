"use client";
import GalleryGrid from '@/components/GalleryGrid';
import GalleryHero from '@/components/GalleryHero';

export default function Gallery() {
  return (
    <>
      <GalleryHero />

      {/* ── Gallery grid ── */}
      <section className="py-16 bg-gray-50/60">
        <div className="container-custom">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}