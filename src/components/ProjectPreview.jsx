import { ExternalLink, LightBoxModal } from '.'; //import directly from barrel file
import { useState } from 'react';

const thumbs = [
  {
    title: 'Doremi Finance - WIP',
    images: ['/showcase/doremi/doremi-hero.png', '/showcase/doremi/doremi-feature.png', '/showcase/doremi/logo-animation.mp4', '/showcase/doremi/doremi-landing-vid.mp4'],
    wip: true, // WIP tag
  },
  {
    title: 'Neptune App: Solana Riptide 22',
    images: ['/showcase/design-exp/neptune.png'],
    visit: { href: 'https://solana.com/news/riptide-hackathon-winners-solana', label: 'Visit' }, // With Visit Link
  },
  {
    title: 'Custom Icons',
    images: ['/showcase/design-exp/tr-assets.png'],
  },
  {
    title: 'Micro-animations',
    images: ['/showcase/ai/motion.png', '/showcase/ai/making-manus-fast.mp4'],
  },
  {
    title: 'Epicenter',
    images: ['/showcase/design-exp/epicenter.png'],
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
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="mb-4 text-base text-neutral-50">Projects</h2>
        <p>
          This site is an ongoing experiment, so things <span className="text-neutral-400 line-through decoration-1">might</span> will break. Check out some my work and design explorations below, or
          get in touch if you'd like to read case studies.
        </p>
      </div>

      {/* Project Gallery Grid */}

      <div className="columns-2 gap-2.5 [column-fill:_balance] md:columns-2">
        {thumbs.map((t, idx) => (
          <div key={t.title} className="relative mb-2.5 break-inside-avoid">
            <button
              type="button"
              onClick={() => openAt(idx)}
              className="group block w-full cursor-pointer overflow-hidden rounded-lg focus:ring-2 focus:ring-white/30 focus:outline-none"
              aria-label={`Open ${t.title}`}
            >
              <img src={t.images[0]} alt={t.title} loading="lazy" decoding="async" className="h-auto w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.02]" />
            </button>
            <div className="px-2 py-2 text-[12px] text-neutral-400 italic">{t.title}</div>
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
