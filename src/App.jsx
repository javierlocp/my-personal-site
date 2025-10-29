import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import Blog from '@/pages/blog/Blog';
import BlogPost from '@/pages/blog/BlogPost';
import { inject } from '@vercel/analytics';
function useUmamiPageView() {
  const location = useLocation();

  useEffect(() => {
    if (window.umami) {
      window.umami.track();
    }
  }, [location]);
}

inject();

function App() {
  useUmamiPageView();
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} className=""></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/blog/:slug" element={<BlogPost />}></Route>
      </Routes>
    </MainLayout>
  );
}

export default App;
