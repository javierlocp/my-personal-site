import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import matter from 'gray-matter';

const markdownFiles = import.meta.glob('../../posts/*.md', {
  query: '?raw',
  import: 'default',
});

const BlogPost = () => {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadMarkdown = async () => {
      const matchKey = Object.keys(markdownFiles).find((key) => key.endsWith(`${slug}.md`));
      if (matchKey) {
        const rawMarkdown = await markdownFiles[matchKey]();
        const { data, content } = matter(rawMarkdown);
        setPost(data); // frontmatter (e.g., title, date)
        setContent(content); // markdown content
      } else {
        setPost(null);
      }
    };

    loadMarkdown();
  }, [slug]);

  // Check if post exist
  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <>
      <article>
        <span className="mt-10 mb-4 flex items-center gap-5 font-mono text-xs text-neutral-400">
          {new Date(post.date).toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          })}
          {post.readingTime && ` · ${post.readingTime} min read`}
        </span>
        <div className="flex flex-col gap-2">
          <h1>{post.title}</h1>
          <p className="text-pretty">{post.description}</p>
        </div>
        <div className="my-8 text-sm text-neutral-400">{post.image && <img src={post.image} alt={post.title} className="aspect-3/2 h-auto w-full rounded-lg" loading="lazy" />}</div>
        <div className="md-content-style">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
