"use client";
import Portfolio from "@/components/portfolio";
import { useSelector } from "react-redux";




export default function Home() {
  const theme = useSelector(
    (state: { theme: { darkMode: boolean } }) => state.theme.darkMode
  );
 
  return (
    <div
    className={` ${
      theme ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`}
  >
      <Portfolio />
    </div>
  );
}
