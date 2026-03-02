"use client";

import Link from "next/link";
import React from "react";

export default function NavLinks() {
  return (
    <div className="top-8 mt-3 flex gap-7 px-3 md:absolute md:mt-0">
      <Link href="/" className="arrow-link">
        Home
      </Link>
    </div>
  );
}
