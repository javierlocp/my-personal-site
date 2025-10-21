import { BlogPreview, ExternalLink, ProjectPreview, BookCall } from '../components/index';
const Home = () => {
  return (
    <>
      <div className="intro mb-4 flex flex-col gap-4">
        <h1 className="text-pretty">I'm a product designer with 13+ years of experience designing mobile and web products for start-ups and large orgs.</h1>
        <p className="text-pretty">
          I'm currently leading product design at <ExternalLink href="https://haven1.org/">Haven1</ExternalLink>. In the past, I led high-impact design initiatives and helped build design teams and
          processes across both startups and large organizations including <ExternalLink href="https://agoda.com/">Agoda</ExternalLink>,{' '}
          <ExternalLink href="https://brankas.com/">Brankas</ExternalLink>, Yield App (Sunsetted 🌻) and <ExternalLink href="https://says.com/">Says</ExternalLink>.
        </p>
      </div>
      <BookCall />
      <ProjectPreview />
      <BlogPreview />
    </>
  );
};

export default Home;
