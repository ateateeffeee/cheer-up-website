import { useState } from "react";

// ICONS (you don't actually need these imports if you're using CSS bg-images only,
// but I'll leave them since you already have them)
import bandcampIcon   from "../assets/icons/bandcamp-logo.svg";
import appleMusicIcon from "../assets/icons/music.svg";
import facebookIcon   from "../assets/icons/facebook-app-symbol.svg";
import instagramIcon  from "../assets/icons/instagram.svg";
import spotifyIcon    from "../assets/icons/spotify.svg";
import youtubeIcon    from "../assets/icons/youtube.svg";
import merchIcon      from "../assets/icons/shopping-cart.svg";
import tikTokLogo     from "../assets/icons/tik-tok-logo.svg";

import cuWhiteLogo from "../assets/pics/cu-white-logo.png";
import boysHunched from "../assets/pics/boys-hunched.jpg";

import "./HomePage.scss";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Instagram",   href: "#",      cls: "icon--instagram" },
    { label: "Spotify",     href: "#",      cls: "icon--spotify" },
    { label: "Apple Music", href: "#",      cls: "icon--apple" },
    { label: "Bandcamp",    href: "#",      cls: "icon--bandcamp" },
    { label: "YouTube",     href: "#",      cls: "icon--youtube" },
    { label: "Facebook",    href: "#",      cls: "icon--facebook" },
    { label: "TikTok",      href: "#",      cls: "icon--tikTok" },
    { label: "Merch",       href: "#",      cls: "icon--merch" },
  ];

  const menuItems = [
    { label: "Home",   href: "#home" },
    { label: "About",  href: "#about" },
    { label: "Shows",  href: "#shows" },
    { label: "Music",  href: "#music" },
    { label: "Videos", href: "#videos" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <main
      className={`home ${menuOpen ? "home--menu-open" : ""}`}
      id="home"
    >
      <section className="home__hero">
        {/* full-screen band photo in the background */}
        <img
          src={boysHunched}
          alt="The boys"
          className="home__hero-photo"
        />

        {/* overlay content on top of the photo */}
        <div className="home__overlay">
          {/* HAMBURGER BUTTON */}
          <button
            className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          {/* MOBILE MENU OVERLAY */}
          <nav
            className={`mobile-menu ${
              menuOpen ? "mobile-menu--open" : ""
            }`}
            aria-label="Main navigation"
          >
            <ul className="mobile-menu__list">
              {menuItems.map((item) => (
                <li key={item.label} className="mobile-menu__item">
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <header className="home__header">
            <h1 className="home__title">
              <span className="sr-only">Cheer Up!</span>
              <img
                src={cuWhiteLogo}
                alt="Cheer Up! band logo"
                className="home__logo"
              />
            </h1>
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
        </div>
      </section>
    </main>
  );
}
