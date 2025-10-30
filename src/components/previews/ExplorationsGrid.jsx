import LightBoxModal from '../modals/LightBoxModal'; //import directly from barrel file
import { explorations as thumbs, isVideo } from '@/explorations';
import { useEffect, useRef, useState } from 'react';

function VideoThumb({ src, poster, className }) {
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);

  // Try to autoplay as soon as the video can play
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Important for iOS Safari: set these before play()
    v.muted = true;
    v.playsInline = true;

    const tryPlay = () => {
      v.play().catch(() => setFailed(true));
    };

    if (v.readyState >= 2) tryPlay();
    else v.addEventListener('canplay', tryPlay, { once: true });

    return () => v.removeEventListener('canplay', tryPlay);
  }, [src]);

  // Pause when not visible; resume when in view
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { rootMargin: '150px' }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  if (failed) {
    return <img src={poster || '/fallback-thumb.jpg'} alt="" decoding="async" className={className} />;
  }

  return (
    <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" poster={poster} className={className} controls={false} disableRemotePlayback>
      <source src={src} type="video/mp4" />
    </video>
  );
}

export default function ExplorationsGrid() {
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

      <div className="columns-1 gap-2.5 [column-fill:_balance]">
        {thumbs.map((t, idx) => {
          const first = t.images[0];
          const video = isVideo(first);

          return (
            <div key={t.title} className="relative mb-2 break-inside-avoid">
              <button
                type="button"
                onClick={() => openAt(idx)}
                className="group/thumbnail relative block aspect-[3/2] w-full cursor-pointer overflow-hidden rounded-lg focus:ring-2 focus:ring-white/30 focus:outline-none"
                aria-label={`Open ${t.title}`}
              >
                {video ? (
                  <VideoThumb src={first} poster={t.poster} className="absolute inset-0 h-full w-full object-contain transition-transform duration-300 ease-out group-hover/thumbnail:scale-[1.02]" />
                ) : (
                  <img
                    src={first}
                    alt={t.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-contain transition-transform duration-300 ease-out group-hover/thumbnail:scale-[1.02]"
                  />
                )}

                {/* hover title */}
                <div className="pointer-events-none absolute bottom-3 left-3 translate-y-1 rounded-sm bg-neutral-50/90 px-2 py-1 text-xs text-neutral-950 opacity-0 transition-all duration-200 ease-out group-hover/thumbnail:translate-y-0 group-hover/thumbnail:opacity-100">
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
