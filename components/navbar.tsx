"use client";
import React from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/app/Store/features/ThemeSlice";

export const Navbar = () => {
  const theme = useSelector(
    (state: { theme: { darkMode: boolean } }) => state.theme.darkMode
  );
  const dispatch = useDispatch();

  return (
    <div>
      <nav className="fixed w-full p-4 backdrop-blur-sm bg-white/75 dark:bg-gray-900/75 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Ujjwal Nepal</h1>
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
            <Button variant="default">Contact Me</Button>
          </div>
        </div>
      </nav>
    </div>
  );
};
