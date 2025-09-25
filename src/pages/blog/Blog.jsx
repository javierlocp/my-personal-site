import { useEffect, useState } from 'react';
import { getAllPosts } from '../../lib/getPosts';
import { Link } from 'react-router-dom';

// Blog Index
const Blog = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setPosts(getAllPosts());
  }, []);

  return (
    <>
      <div className="intro mb-22 flex flex-col gap-4">
        <h1 className="text-pretty">Writing</h1>
        <p>A collection of notes, code snippets, and loosely formed ideas on design, tech, and the process of figuring things out.</p>
      </div>

      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="my-2">
            <Link
              to={`/blog/${post.slug}`}
              className="-mx-4 flex flex-col gap-1.5 rounded-md px-4 py-3 text-base text-neutral-50 transition-all duration-250 hover:bg-stone-50/5 hover:text-neutral-50 active:bg-stone-50/5"
            >
              <div className="flex items-center justify-between gap-4 md:gap-8">
                <h2 className="max-w-[320px] truncate md:max-w-[500px]">{post.title}</h2>
                <div className="block flex-grow border-t border-gray-400/25" />
                <span className="shrink-0 font-mono text-xs text-neutral-400">
                  {new Date(post.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'numeric',
                  })}
                </span>
              </div>
              <span className="line-clamp-2 text-neutral-400">{post.description}</span>
            </Link>
          </li>
        ))}
      </ul>
      <iframe className="mt-12" src="https://paragraph.com/@vestigia/embed" width="100%" height="280" />
    </>
  );
};

export default Blog;
