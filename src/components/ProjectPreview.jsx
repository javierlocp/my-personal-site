import { ExternalLink, LightBoxModal } from '.'; //import directly from barrel file
import { useState } from 'react';

const thumbs = [
  {
    title: 'Doremi Finance - Building',
    images: [
      '/showcase/doremi/doremi-hero.png',
      '/showcase/doremi/doremi-feature.png',
      '/showcase/doremi/doremi-compare-fees.png',
      '/showcase/doremi/doremi-landing-vid.mp4',
      '/showcase/doremi/logo-animation.mp4',
    ],
    wip: true, // WIP tag
    visit: { href: 'https://doremi-landing-ui.vercel.app/', label: 'Visit' }, // With Visit Link
  },
  {
    title: 'Custom Icons',
    images: ['/showcase/design-exp/tr-assets.png'],
  },
  {
    title: 'Micro-animations',
    images: ['/showcase/ai/motion.png', '/showcase/ai/making-manus-fast.mp4'],
  },

  // {
  //   title: 'Visual Experiments',
  //   images: ['/showcase/design-exp/sound-visualization.png', '/showcase/design-exp/epicenter.png'],
  // },
  // {
  //   title: 'Neptune App: Solana Riptide 22',
  //   images: ['/showcase/design-exp/neptune.png'],
  //   visit: { href: 'https://solana.com/news/riptide-hackathon-winners-solana', label: 'Visit' }, // With Visit Link
  // },
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
        <h2 className="mb-4 text-base text-neutral-50">Explorations</h2>
        <p>Check out some my design explorations below, or get in touch if you'd like to read full case studies.</p>
      </div>

      {/* Project Gallery Grid */}

      <div className="columns-2 gap-2.5 [column-fill:_balance] md:columns-2">
        {thumbs.map((t, idx) => (
          <div key={t.title} className="relative mb-2.5 break-inside-avoid">
            <button
              type="button"
              onClick={() => openAt(idx)}
              className="group/thumbnail block w-full cursor-pointer overflow-hidden rounded-lg focus:ring-2 focus:ring-white/30 focus:outline-none"
              aria-label={`Open ${t.title}`}
            >
              <img
                src={t.images[0]}
                alt={t.title}
                loading="lazy"
                decoding="async"
                className="h-auto w-full object-contain transition-transform duration-300 ease-out group-hover/thumbnail:scale-[1.02]"
              />
              {/* hover title */}
              <div className="absolute bottom-4 left-4 translate-y-1 rounded-sm bg-neutral-50/90 px-2 py-1 text-[12px] text-neutral-950 italic opacity-0 transition-all duration-300 ease-out group-hover/thumbnail:translate-y-0 group-hover/thumbnail:opacity-100">
                {t.title}
              </div>
            </button>
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
