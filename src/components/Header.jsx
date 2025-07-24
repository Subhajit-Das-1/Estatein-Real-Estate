import { RiCloseLine, RiMenuLine } from "@remixicon/react";
import { navItems } from "../constants/data";
import { useState, useEffect } from "react";
import UserAvatar from "./UserAvatar";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (!user) {
      fetch("/api/me", { credentials: "include" })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.username) setUser(data);
          else setUser(null);
        });
    }
    // eslint-disable-next-line
  }, [user]);

  // Only open menu when hamburger is clicked
  const openMenu = () => setIsOpen(true);
  // Always close menu when a mobile link is clicked
  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    await fetch("/logout", {
      method: "POST",
      credentials: "include"
    });
    setUser(null);
    window.location.reload();
  };

  // Scroll to #contact section
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
    closeMenu();
  };

  return (
    <header className="w-full border border-grey-15 bg-grey-10 py-4 lg:py-5">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src="/images/logo.png" alt="logo" width={114} height={34} />
        </Link>
        {/* Mobile menu */}
        <nav className={`navbar ${isOpen ? "active" : ""}`}>
          {/* close button */}
          <button
            className="absolute top-10 right-10 border border-grey-30"
            onClick={closeMenu}
          >
            <RiCloseLine size={30} />
          </button>

          {/* list */}
          <ul className="space-y-3.5 text-center">
            {navItems.map((item) => (
              <li key={item.id}>
                {item.href.startsWith("#") ? (
                  <a
                    href={item.href}
                    className={`text-lg hover:text-white transition-colors ${
                      item.href === "#home" ? "text-white " : ""
                    }`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.href === "#home" ? "/" : item.href}
                    className={`text-lg hover:text-white transition-colors ${
                      item.href === "#home" ? "text-white " : ""
                    }`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            {/* Login/Signup for mobile, hide if logged in */}
            {!user && <li>
              <Link to="/login" className="text-lg hover:text-white transition-colors" onClick={closeMenu}>Login</Link>
            </li>}
            {!user && <li>
              <Link to="/register" className="text-lg hover:text-white transition-colors" onClick={closeMenu}>Signup</Link>
            </li>}
            {/* Show avatar and logout if logged in */}
            {user && <li><UserAvatar username={user.username} /></li>}
            {user && <li><button onClick={handleLogout} className="secondary-btn">Logout</button></li>}
          </ul>

          {/* button */}
          <button className="primary-btn mt-10" onClick={scrollToContact}>Contact us</button>
        </nav>

        {/* lg Menu */}
        <ul className="max-lg:hidden flex items-center gap-10">
          {navItems.map((item) => (
            <li key={item.id}>
              {item.href.startsWith("#") ? (
                <a
                  href={item.href}
                  className={`hover:text-white text-lg transition-colors ${
                    item.href === "#home" ? "text-white " : ""
                  }`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  to={item.href === "#home" ? "/" : item.href}
                  className={`hover:text-white text-lg transition-colors ${
                    item.href === "#home" ? "text-white " : ""
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          {/* Login/Signup for desktop, hide if logged in */}
          {!user && <li>
            <Link to="/login" className="secondary-btn">Login</Link>
          </li>}
          {!user && <li>
            <Link to="/register" className="secondary-btn">Signup</Link>
          </li>}
          {/* Show avatar and logout if logged in */}
          {user && <li><UserAvatar username={user.username} /></li>}
          {user && <li><button onClick={handleLogout} className="secondary-btn">Logout</button></li>}
        </ul>

        {/* lg contact btn */}
        <button className="max-lg:hidden primary-btn" onClick={scrollToContact}>Contact Us</button>

        {/* Open menu */}
        <button className="lg:hidden" onClick={openMenu}>
          <RiMenuLine size={30} />
        </button>
      </div>
    </header>
  );
};

export default Header;
