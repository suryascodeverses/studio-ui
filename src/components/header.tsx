"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Task 2", href: "/task2" },
];

const HOME_ANCHORS = [
  { label: "Services", href: "#services" },
  { label: "Stylists", href: "#stylists" },
  { label: "Join Our Team", href: "#join-our-team" },
  { label: "Contacts", href: "#contacts" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__logo">
          Studio
        </Link>

        <nav className="site-header__nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`site-header__link ${pathname === link.href ? "site-header__link--active" : ""}`}
            >
              {link.label}
            </Link>
          ))}

          <span className="site-header__divider" aria-hidden="true" />

          {HOME_ANCHORS.map((anchor) => (
            <a
              key={anchor.href}
              href={isHome ? anchor.href : `/${anchor.href}`}
              className="site-header__link site-header__link--anchor"
            >
              {anchor.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
