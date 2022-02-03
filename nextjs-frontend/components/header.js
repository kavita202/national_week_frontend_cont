import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="header">
      <Link href="/">
        <a>
          <h1 className="title">School of Quizzes</h1>
        </a>
      </Link>
      <Link href="/resources">
        <a>
          <h2 className="resources-button">Extra Resources</h2>
        </a>
      </Link>
    </div>
  );
}
