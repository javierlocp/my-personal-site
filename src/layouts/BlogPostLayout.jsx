import { Footer } from '@/components';
import { Outlet, Link } from 'react-router-dom';

/*
  MainLayout is the default layout for this site.
  If you're looking to add custom layout, you can add it in ./src/layouts/CustomLayout.jsx
*/

export default function BlogPostLayout() {
  return (
    <>
      <div className="mx-auto max-w-xl px-8 py-12 md:px-6">
        <main>
          <Link to="/blog" className="inline-block rounded-full bg-neutral-800 p-2 text-gray-50 transition-all duration-100 hover:cursor-pointer hover:bg-gray-500 active:scale-80">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="m4 10-.707.707L2.586 10l.707-.707L4 10Zm17 8a1 1 0 1 1-2 0h2ZM8.293 15.707l-5-5 1.414-1.414 5 5-1.414 1.414Zm-5-6.414 5-5 1.414 1.414-5 5-1.414-1.414ZM4 9h10v2H4V9Zm17 7v2h-2v-2h2Zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5V9Z" />
            </svg>
          </Link>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
