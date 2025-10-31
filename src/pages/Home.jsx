import { BlogPreview, ExternalLink, ExplorationsGrid, BookCall } from '@/components';
const Home = () => {
  return (
    <>
      <div className="intro mb-4 flex flex-col gap-4">
        <h1 className="text-pretty">I'm a product designer with over a decade of experience crafting mobile and web products for startups and large organizations.</h1>
        <p className="text-pretty">
          I lead the product design at <ExternalLink href="https://haven1.org/">Haven1</ExternalLink>, where I define core protocol experiences and drive design strategy across products. Previously, I
          built and led design teams, scaled cross-functional collaboration, and improved design systems at <ExternalLink href="https://agoda.com/">Agoda</ExternalLink>,{' '}
          <ExternalLink href="https://brankas.com/">Brankas</ExternalLink>, <ExternalLink href="https://says.com/">Says</ExternalLink> and Yield App.
        </p>
      </div>
      <BookCall />
      <ExplorationsGrid />
      <BlogPreview />
    </>
  );
};

export default Home;
