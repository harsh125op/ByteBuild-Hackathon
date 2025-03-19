import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

import useNavigation from "../utils/navigation";
import Routes from "../utils/routes";

const Navbar = () => {
  const navigateTo = useNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Sponsors", path: "/sponsors" },
    { name: "Team", path: "/team" },
    { name: "Updates", path: "/update" },
  ];

  return (
    <nav className="flex max-w-[1350px] mx-auto justify-between items-center p-4 h-[75px] relative">
      {/* Logo */}
      <div
        className="text-[26px] font-extrabold cursor-pointer"
        onClick={() => navigateTo(Routes.Home)}
      > 

      PDD RIDE

      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-[50px] text-[18px] font-semibold">
        {navLinks.map(({ name, path }) => (
          <Link
            key={name}
            to={path}
            className="hover:text-[#A9EB09] transition duration-300"
          >
            {name}
          </Link>
        ))}
      </div>

      {/* Register Button */}
      <div className="hidden md:block">
        <button
          className="bg-black text-white py-[10px] px-[40px] rounded-[8px] font-semibold cursor-pointer hover:scale-[1.1] transition duration-300"
          onClick={() => navigateTo(Routes.Register)}
        >
          Register
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl z-40 cursor-pointer"
        onClick={toggleMenu}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-lg flex flex-col items-center justify-center gap-10 z-30"
          >
            {navLinks.map(({ name, path }, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  to={path}
                  className="text-[26px] md:text-5xl font-bold text-white hover:text-[#A9EB09] transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {name}
                </Link>
              </motion.div>
            ))}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="bg-[#A9EB09] text-black py-3 px-8 rounded-[8px] font-semibold text-xl"
              onClick={() => {
                setIsOpen(false);
                navigateTo(Routes.Register);
              }}
            >
              Register
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
