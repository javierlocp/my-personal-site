import { Link } from 'react-router-dom';
import { ExternalLink, BookCall } from '.'; //import directly from barrel file

const ProjectPreview = () => {
  return (
    <>
      <section aria-label="Project Preview" className="mb-20">
        <div className="mb-4 flex flex-col gap-1">
          <h2 className="text-base text-neutral-50">Projects</h2>
          <p className="mb-4">
            This site is an ongoing experiment, so things <span className="text-neutral-400 line-through decoration-1">might</span> will break. Feel free to reach out via{' '}
            <ExternalLink href="mailto:hello@javierlo.com">Email</ExternalLink> or <ExternalLink href="https://www.linkedin.com/in/javierlo">LinkedIn</ExternalLink> for case studies.
          </p>
        </div>
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div className="relative overflow-hidden rounded-lg border border-neutral-50/10">
            <a
              href="https://solana.com/news/riptide-hackathon-winners-solana#:~:text=Ottr.Finance-,Neptune,-Nirvana"
              target="_blank"
              rel="noopener"
              aria-label="Read more about Solana Riptide 2022"
              className="hover:animate-pulse"
            >
              <img src="/showcase/neptune.png" alt="Neptune App for Solana Riptide 2022" loading="lazy" className="aspect-3/2 w-[100%]" />
            </a>
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-b from-neutral-900/0 to-neutral-950 p-2 text-center text-[12px] font-semibold text-neutral-400 italic">
              Neptune App: Solana Riptide 22
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-neutral-50/10">
            <img src="/showcase/tr-assets.png" alt="Trulyremote side project" loading="lazy" className="aspect-3/2 w-[100%]" />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-b from-neutral-900/0 to-neutral-950 p-2 text-center text-[12px] font-semibold text-neutral-400 italic">Custom Icons</div>
          </div>
        </div>
        <div className="my-8">
          <BookCall />
        </div>
      </section>
    </>
  );
};

export default ProjectPreview;
