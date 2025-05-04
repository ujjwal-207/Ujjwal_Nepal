"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/app/Store/features/ThemeSlice";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface NavbarProps {
  onItemClick?: () => void;
}

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Blog', path: '/blogs' },
  { label: 'Contact', path: '/contact' },
];

const Navbar: React.FC<NavbarProps> = ({ onItemClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useSelector(
    (state: { theme: { darkMode: boolean } }) => state.theme.darkMode
  );
  const pathname = usePathname();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky  top-0 w-full py-4 backdrop-blur-sm  z-50">
      <div className="max-w-screen-lg mx-auto px-4 md:px-6 lg:px-8">  
      <div className="flex justify-between items-center ">
        <Link href={"/"}>
        <h1 className="text-xl font-bold text-black dark:text-white ">Ujjwal Nepal</h1></Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path || 
                          (item.path !== '/' && pathname.startsWith(item.path));
            
            return (
              <Link href={item.path} key={item.path}>
                <span
                  className={`relative text-base font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-950'
                  }`}
                  onClick={onItemClick}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute bottom-[-5px] left-0 right-0 h-[2px] bg-primary-600 dark:bg-primary-400"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(toggleDarkMode())}
            className="rounded-full"
          >
            {theme ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden mt-4 bg-white/95 dark:bg-white/95 rounded-lg shadow-lg"
        >
          <nav className="flex flex-col space-y-4 p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.path || 
                            (item.path !== '/' && pathname.startsWith(item.path));
              
              return (
                <Link href={item.path} key={item.path}>
                  <span
                    className={`relative text-base font-medium transition-colors duration-300 block py-2 ${
                      isActive
                        ? 'text-black dark:text-gray-300'
                        : 'text-gray-700 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-950'
                    }`}
                    onClick={() => {
                      onItemClick?.();
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-indicator-mobile"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-white dark:bg-gray-900"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>
        </motion.div>
      )}
      </div>
    </nav>
  );
};

export default Navbar;