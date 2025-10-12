import { ExternalLink, LightBoxModal } from '.'; //import directly from barrel file
import { useState } from 'react';

const thumbs = [
  {
    title: 'Doremi Finance - WIP',
    images: ['/showcase/doremi/doremi-landing.png', '/showcase/doremi/doremi-hero.png', '/showcase/doremi/doremi-feature.png', '/showcase/doremi/logo-animation.mp4'],
    wip: true, // WIP tag
  },
  {
    title: 'Neptune App: Solana Riptide 22',
    images: ['/showcase/neptune.png'],
    visit: { href: 'https://solana.com/news/riptide-hackathon-winners-solana', label: 'Visit' }, // With Visit Link
  },
  {
    title: 'Custom Icons',
    images: ['/showcase/tr-assets.png'],
  },
];

export default function ProjectPreview() {
  const [open, setOpen] = useState(false);
  const [projectIndex, setProjectIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const openAt = (pIdx, imgIdx = 0) => {
    setProjectIndex(pIdx);
    setImageIndex(imgIdx);
    setOpen(true);
  };

  const next = () => {
    const imgs = thumbs[projectIndex].images;
    if (imgs.length > 1) {
      setImageIndex((prev) => (prev + 1) % imgs.length);
    } else {
      // Move to next project, wrap around, and open its first image
      const nextProject = (projectIndex + 1) % thumbs.length;
      setProjectIndex(nextProject);
      setImageIndex(0);
    }
  };

  const prev = () => {
    const imgs = thumbs[projectIndex].images;
    if (imgs.length > 1) {
      setImageIndex((prev) => (prev - 1 + imgs.length) % imgs.length);
    } else {
      // Move to previous project, wrap around, and open its first image
      const prevProject = (projectIndex - 1 + thumbs.length) % thumbs.length;
      setProjectIndex(prevProject);
      setImageIndex(0);
    }
  };

  return (
    <section aria-label="Project Preview" className="mb-20">
      <div className="mb-4 flex flex-col gap-1">
        <h2 className="text-base text-neutral-50">Projects</h2>
        <p className="mb-4">
          This site is an ongoing experiment, so things <span className="text-neutral-400 line-through decoration-1">might</span> will break. Feel free to reach out via{' '}
          <ExternalLink href="mailto:hello@javierlo.com">Email</ExternalLink> or <ExternalLink href="https://www.linkedin.com/in/javierlo">LinkedIn</ExternalLink> for case studies.
        </p>
      </div>

      {/* Project Gallery Grid */}

      <div className="columns-2 gap-2.5 [column-fill:_balance] md:columns-2">
        {thumbs.map((t, idx) => (
          <div key={t.title} className="relative mb-2.5 break-inside-avoid overflow-hidden rounded-lg border border-white/10 bg-neutral-900/30">
            <button type="button" onClick={() => openAt(idx)} className="group block w-full cursor-pointer focus:ring-2 focus:ring-white/30 focus:outline-none" aria-label={`Open ${t.title}`}>
              <img src={t.images[0]} alt={t.title} loading="lazy" decoding="async" className="h-auto w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.02]" />
            </button>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-2 py-4 text-center text-xs font-medium text-neutral-100 italic backdrop-blur-lg">
              {t.title}
            </div>
          </div>
        ))}
      </div>

      <LightBoxModal
        open={open}
        src={thumbs[projectIndex].images[imageIndex]}
        alt={thumbs[projectIndex].title}
        onClose={() => setOpen(false)}
        onPrev={prev}
        onNext={next}
        link={thumbs[projectIndex]?.visit}
        wip={thumbs[projectIndex]?.wip}
      />
    </section>
  );
}
