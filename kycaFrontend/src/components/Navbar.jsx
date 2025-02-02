import React, { useState, useEffect } from 'react';
import { MdOutlineSportsCricket } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userState } from '../atoms';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const resetUser = useResetRecoilState(userState);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/signin');
  };

  const handleLogout = () => {
    resetUser();
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('jwtExpiry');
    navigate('/');
  };

  const checkTokenOnLoad = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; 
        return decodedToken.exp > currentTime;
      } catch (error) {
        console.error("Invalid token.");
        return false;
      }
    }
    return false;
  };

  const user = useRecoilValue(userState);

  return (
    <>
      <header className="bg-white shadow-sm fixed w-full z-50 top-0 left-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <MdOutlineSportsCricket className="text-emerald-500 text-3xl" />
              <Link to="/" className="ml-2 text-xl font-bold text-gray-900">KYCA</Link>
            </div>
            <nav className="hidden md:flex space-x-10">
              <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
              <Link to="/about" className="nav-link" onClick={closeMenu}>About Us</Link>
              <Link to="/gem" className="nav-link" onClick={closeMenu}>KYCA Gems</Link>
              {user.isAdmin && checkTokenOnLoad() && (
                <Link to="/adminpanel" className="nav-link" onClick={closeMenu}>Admin Panel</Link>
              )}
            </nav>
            <div className="hidden md:flex items-center">
              {user.name === "" && !checkTokenOnLoad() ? (
                <button onClick={handleLogin} className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition">Login</button>
              ) : (
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">Logout</button>
              )}
            </div>
            <button className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>
      <div className="pt-16"></div>
      <div className={`md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}> 
        <div className="flex justify-between items-center p-5 border-b">
          <div className="flex items-center">
            <MdOutlineSportsCricket className="text-emerald-500 text-3xl" />
            <Link to="/" className="ml-2 text-xl font-bold text-gray-900" onClick={closeMenu}>KYCA</Link>
          </div>
          <button onClick={toggleMenu}>
            <FiX className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col items-start space-y-4 p-5">
          <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/about" className="nav-link" onClick={closeMenu}>About Us</Link>
          <Link to="/testimonial" className="nav-link" onClick={closeMenu}>Testimonials</Link>
          <Link to="/gem" className="nav-link" onClick={closeMenu}>KYCA Gems</Link>
          {user.isAdmin && checkTokenOnLoad() && (
                <Link to="/adminpanel" className="nav-link" onClick={closeMenu}>Admin Panel</Link>
              )}
        </nav>
        <div className="p-5">
          {user.name === "" && !checkTokenOnLoad() ? (
            <button onClick={handleLogin} className="bg-emerald-500 text-white px-4 py-2 w-full rounded-md hover:bg-emerald-600 transition">Login</button>
          ) : (
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 w-full rounded-md hover:bg-red-600 transition">Logout</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
