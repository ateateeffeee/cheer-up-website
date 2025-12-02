import React from "react";

type Link = {
  label: string;
  href: string;
  cls: string; // CSS class like "icon--instagram"
};

type SocialLinksProps = {
  links: Link[];
  className?: string; // extra wrapper classes, e.g. "home__links icons-only"
};

export default function SocialLinks({ links, className = "" }: SocialLinksProps) {
  return (
    <nav className={`home__links icons-only ${className}`} aria-label="Band links">
      {links.map((l) => (
        <a
          key={l.label}
          className="icon-link"
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label}
          title={l.label}
        >
          <span className={`icon ${l.cls}`} aria-hidden />
        </a>
      ))}
    </nav>
  );
}
