import Link from "next/link";

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
    <nav className="mt-10 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.18em]">
      {prevPage ? (
        <Link href={`/blogs?page=${prevPage}`} className="terminal-button secondary">
          Previous
        </Link>
      ) : (
        <span className="terminal-button secondary pointer-events-none opacity-40">
          Previous
        </span>
      )}

      <span className="text-[var(--ink-dim)]">Page {currentPage}</span>

      {nextPage ? (
        <Link href={`/blogs?page=${nextPage}`} className="terminal-button secondary">
          Next
        </Link>
      ) : (
        <span className="terminal-button secondary pointer-events-none opacity-40">
          Next
        </span>
      )}
    </nav>
  );
}
