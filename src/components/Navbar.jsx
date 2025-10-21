import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="mb-22 flex items-center justify-between">
      <div className="flex flex-col">
        <Link to="/" className="font-semibold text-neutral-50">
          Javier Lo
        </Link>
        <span className="text-sm text-neutral-500 md:text-base">Product Design Leader</span>
      </div>
      <nav className="flex gap-4 text-sm">
        <Link to="/">Home</Link>
        <Link to="/blog">Writing</Link>
      </nav>
    </header>
  );
};

export default Navbar;
