import Link from "next/link";
import React from "react";

export interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
}

export default function Pagination({
  currentPage,
  hasNextPage,
}: PaginationProps) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = hasNextPage ? currentPage + 1 : null;

  return (
    <nav className="flex justify-between py-8 text-sm font-medium">
      {prevPage ? (
        <Link
          href={`/blogs?page=${prevPage}`}
          className="underline underline-offset-4 hover:text-zinc-500"
        >
          Previous
        </Link>
      ) : (
        <span className="text-zinc-400"></span>
      )}
      <span>Page {currentPage}</span>
      {nextPage ? (
        <Link
          href={`/blogs?page=${nextPage}`}
          className="underline underline-offset-4 hover:text-zinc-500"
        >
          Next
        </Link>
      ) : (
        <span className="text-gray-400"></span>
      )}
    </nav>
  );
}
