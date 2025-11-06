import { Footer, BackButton } from '@/components';
import { Outlet, Link } from 'react-router-dom';

/*
  MainLayout is the default layout for this site.
  If you're looking to add custom layout, you can add it in ./src/layouts/CustomLayout.jsx
*/

export default function BlogPostLayout() {
  return (
    <>
      <div className="mx-auto max-w-xl px-8 py-12 md:px-6">
        <BackButton />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
