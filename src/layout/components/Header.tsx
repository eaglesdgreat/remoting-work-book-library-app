import { Link } from 'react-router-dom';
import { useState } from 'react';

interface HeaderProps {
  user?: { name: string };
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="flex items-center justify-between py-4 px-6 bg-gray-800 text-white shadow-md">
      <Link to="/" className="text-xl font-bold">
        Book Library
      </Link>

      <nav className="hidden sm:flex space-x-4">
        {!user && (
          <>
            <Link to="/register" className="px-3 py-2 rounded-md hover:bg-gray-700">
              Sign Up
            </Link>
            <Link to="/login" className="px-3 py-2 rounded-md hover:bg-gray-700">
              Sign In
            </Link>
          </>
        )}
        {user && (
          <>
            <span className="text-sm">{user.name}</span>
            <Link to="/profile" className="px-3 py-2 rounded-md hover:bg-gray-700">
              Profile
            </Link>
            <Link to="/logout" className="px-3 py-2 rounded-md hover:bg-gray-700">
              Logout
            </Link>
          </>
        )}
      </nav>

      <button
        className="block hamburger sm:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
        onClick={toggleMobileMenu}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16v12H4zM4 12h16v12H4z" />
        </svg>
      </button>

      {isMobileMenuOpen && (
        <div className="w-40 absolute top-24 right-0 z-50 bg-white border-2 border-gray-800 text-gray-800 px-4 py-3">
          {!user && (
            <>
              <Link to="/register" className="block px-2 py-1 rounded-md hover:bg-gray-700">
                Sign Up
              </Link>
              <Link to="/login" className="block px-2 py-1 rounded-md hover:bg-gray-700 mt-2">
                Sign In
              </Link>
            </>
          )}
          {user && (
            <>
              <span className="block px-2 py-1">{user.name}</span>
              <Link to="/profile" className="block px-2 py-1 rounded-md hover:bg-gray-700 mt-2">
                Profile
              </Link>
              <Link to="/logout" className="block px-2 py-1 rounded-md hover:bg-gray-700 mt-2">
                Logout
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;