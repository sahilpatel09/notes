import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";

interface Props {
  className?: string;
}

export const DocRefineLogo = ({ className }: Props) => {
  return (
    <div
      className={clsx(
        "flex",
        "items-center justify-start",
        "gap-2",
        "no-underline",
        className,
      )}
    >
      <Link
        to="/"
        className={clsx("no-underline", "flex items-center gap-2")}
      >
        <Logo className="text-gray-900 dark:text-gray-100" />
        <span
          className={clsx(
            "text-gray-1000 dark:text-gray-0",
            "text-base",
            "font-semibold",
          )}
        >
          Notes
        </span>
      </Link>
      <span
        className={clsx(
          "block",
          "h-6",
          "w-px",
          "mx-1",
          "bg-gray-300 dark:bg-gray-600",
        )}
      />
    </div>
  );
};

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M14 2v6h6"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M16 13H8"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 17H8"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 9H8"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
