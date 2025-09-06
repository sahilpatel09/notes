import React from "react";
import Link from "@docusaurus/Link";

export default function Tag({ permalink, label, count }) {
  return (
    <Link
      href={permalink}
      className="inline-block px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      {label}
      {count && <span className="ml-1 text-gray-500">({count})</span>}
    </Link>
  );
}
