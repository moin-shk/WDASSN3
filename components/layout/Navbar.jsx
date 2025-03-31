// components/layout/Navbar.jsx
/**
 * Navbar Component
 * 
 * This component represents the main navigation bar of the application.
 * It displays the company logo, navigation links, and user authentication status.
 * 
 * Author: [Your Name]
 * Date: March 31, 2025
 */
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

const Navbar = () => {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = session?.user?.role === 'ADMIN';
  
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <span className="flex-shrink-0 text-xl font-bold cursor-pointer">IMR</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/">
                  <span className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 cursor-pointer">Home</span>
                </Link>
                <Link href="/movies">
                  <span className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 cursor-pointer">Movies</span>
                </Link>
                {isAdmin && (
                  <Link href="/movies/add">
                    <span className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 cursor-pointer">Add Movie</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {status === 'loading' ? (
                <span className="px-3 py-2">Loading...</span>
              ) : session ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm">
                    {session.user.name} ({isAdmin ? 'Admin' : 'User'})
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Link href="/login">
                    <span className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 cursor-pointer">Login</span>
                  </Link>
                  <Link href="/signup">
                    <span className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 cursor-pointer">Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/">
              <span className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 cursor-pointer">Home</span>
            </Link>
            <Link href="/movies">
              <span className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 cursor-pointer">Movies</span>
            </Link>
            {isAdmin && (
              <Link href="/movies/add">
                <span className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 cursor-pointer">Add Movie</span>
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            {status === 'loading' ? (
              <div className="px-3 py-2">Loading...</div>
            ) : session ? (
              <div className="px-3 py-2 space-y-2">
                <div className="text-base font-medium">{session.user.name} ({isAdmin ? 'Admin' : 'User'})</div>
                <button
                  onClick={() => signOut()}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-3 py-2 space-y-2">
                <Link href="/login">
                  <span className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 cursor-pointer">Login</span>
                </Link>
                <Link href="/signup">
                  <span className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 hover:bg-blue-700 cursor-pointer">Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;