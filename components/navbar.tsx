"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/app/Store/features/ThemeSlice";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface NavbarProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Blog', path: '/blogs' },
  { label: 'Work', path: '/work' },
  { label: 'Contact', path: '/contact' },
];

const Navbar: React.FC<NavbarProps> = ({ isMobile = false, onItemClick }) => {
  const theme = useSelector(
    (state: { theme: { darkMode: boolean } }) => state.theme.darkMode
  );
  const pathname = usePathname()
  const dispatch = useDispatch();

  return (
    <nav className="fixed w-full p-4 backdrop-blur-sm bg-white/75 dark:bg-gray-900/75 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Ujjwal Nepal</h1>
        
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path || 
                          (item.path !== '/' && pathname.startsWith(item.path));
            
            return (
              <Link href={item.path} key={item.path} legacyBehavior>
                <a
                  className={`relative text-base font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
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
                </a>
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
          
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="md:hidden mt-4">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.path || 
                            (item.path !== '/' && pathname.startsWith(item.path));
              
              return (
                <Link href={item.path} key={item.path} legacyBehavior>
                  <a
                    className={`relative text-base font-medium transition-colors duration-300 ${
                      isActive
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                    }`}
                    onClick={onItemClick}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-indicator-mobile"
                        className="absolute bottom-[-5px] left-0 right-0 h-[2px] bg-primary-600 dark:bg-primary-400"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </a>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;