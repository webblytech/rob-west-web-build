import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ page }: { page: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-sm text-navy-foreground/70">
        <li>
          <Link to="/" className="rounded transition-colors hover:text-navy-foreground">
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="flex items-center">
          <ChevronRight className="size-4 opacity-60" />
        </li>
        <li aria-current="page" className="font-medium text-navy-foreground">
          {page}
        </li>
      </ol>
    </nav>
  );
}
