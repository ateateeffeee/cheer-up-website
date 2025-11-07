import { useMemo } from "react";
import reactLogo from "../assets/react.svg";

// ICONS (paths are from /src/HomePage/)
import bandcampIcon   from "../assets/icons/bandcamp-logo.svg";
import appleMusicIcon from "../assets/icons/music.svg";
import facebookIcon   from "../assets/icons/facebook-app-symbol.svg";
import instagramIcon  from "../assets/icons/instagram.svg";
import spotifyIcon    from "../assets/icons/spotify.svg";
import youtubeIcon    from "../assets/icons/youtube.svg";
import merchIcon      from "../assets/icons/shopping-cart.svg";

import "./HomePage.scss";

export default function HomePage() {
  const links = [
    { label: "Spotify",     href: "#", cls: "icon--spotify" },
    { label: "YouTube",     href: "#", cls: "icon--youtube" },
    { label: "Instagram",   href: "#", cls: "icon--instagram" },
    { label: "Facebook",    href: "#", cls: "icon--facebook" },
    { label: "Bandcamp",    href: "#", cls: "icon--bandcamp" },
    { label: "Apple Music", href: "#", cls: "icon--apple" },
    { label: "Merch",       href: "#", cls: "icon--merch" },
  ];

  return (
    <main className="home">
      <header className="home__header">
        <h1 className="home__title">Cheer Up!</h1>
        <p className="home__subtitle">beachy indie-math rock</p>
      </header>

      {/* icon grid */}
      <nav className="home__links icons-only" aria-label="Band links">
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
    </main>
  );
}
