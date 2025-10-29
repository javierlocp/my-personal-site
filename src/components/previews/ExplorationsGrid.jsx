import LightBoxModal from '../modals/LightBoxModal'; //import directly from barrel file
import { explorations as thumbs, isVideo } from '@/explorations';
import { useEffect, useRef, useState } from 'react';

function VideoThumb({ src, poster, className }) {
  const holderRef = useRef(null); // stable element to observe
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const el = holderRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => setInView(e.isIntersecting)), { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Play/pause when visibility changes
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView && !prefersReduced) v.play().catch(() => {});
    else {
      v.pause();
      v.currentTime = 0;
    }
  }, [inView, prefersReduced]);

  return (
    <div ref={holderRef} className="">
      {/* keeps layout unchanged */}
      {inView && !prefersReduced ? (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          className={className}
          onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
          onMouseLeave={(e) => {
            e.currentTarget.pause();
            e.currentTarget.currentTime = 0;
          }}
        />
      ) : (
        <img src={poster || '/fallback-thumb.jpg'} alt="" loading="lazy" decoding="async" className={className} />
      )}
    </div>
  );
}

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
      <div className="mb-10 flex flex-col">
        <h2 className="mb-4 text-base text-neutral-50">Explorations</h2>
        <p>Check out some of my design explorations below, or get in touch if you'd like to read full case studies.</p>
      </div>

      {/* Project Gallery Grid */}

      <div className="columns-1 gap-2.5 [column-fill:_balance] md:columns-2 lg:-mx-8">
        {thumbs.map((t, idx) => {
          const first = t.images[0];
          const video = isVideo(first);

          return (
            <div key={t.title} className="relative mb-2.5 break-inside-avoid">
              <button
                type="button"
                onClick={() => openAt(idx)}
                className="group/thumbnail block aspect-video w-full cursor-pointer overflow-hidden rounded-lg focus:ring-2 focus:ring-white/30 focus:outline-none"
                aria-label={`Open ${t.title}`}
              >
                {video ? (
                  <VideoThumb src={first} poster={t.poster} className="h-auto w-full object-contain transition-transform duration-300 ease-out group-hover/thumbnail:scale-[1.02]" />
                ) : (
                  <img
                    src={first}
                    alt={t.title}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full object-contain transition-transform duration-300 ease-out group-hover/thumbnail:scale-[1.02]"
                  />
                )}
                {/* hover title */}
                <div className="absolute bottom-4 left-4 translate-y-1 rounded-sm bg-neutral-50/90 px-2 py-1 text-[12px] text-neutral-950 italic opacity-0 transition-all duration-200 ease-out group-hover/thumbnail:translate-y-0 group-hover/thumbnail:opacity-100">
                  {t.title}
                </div>
              </button>
            </div>
          );
        })}
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
