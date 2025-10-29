import { Navbar, Footer } from '@/components';

/*
  MainLayout is the default layout for this site.
  If you're looking to add custom layout, you can add it in ./src/layouts/CustomLayout.jsx
*/

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="mx-auto max-w-[640px] px-8 py-12">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
