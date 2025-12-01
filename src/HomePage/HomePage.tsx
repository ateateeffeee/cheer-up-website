import { useState, MouseEvent } from "react";

// ICON imports are technically unused (you use CSS background-image),
// but keeping them here doesn’t hurt and you might use them later.
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
    { label: "Instagram",   href: "#", cls: "icon--instagram" },
    { label: "Spotify",     href: "#", cls: "icon--spotify" },
    { label: "Apple Music", href: "#", cls: "icon--apple" },
    { label: "Bandcamp",    href: "#", cls: "icon--bandcamp" },
    { label: "YouTube",     href: "#", cls: "icon--youtube" },
    { label: "Facebook",    href: "#", cls: "icon--facebook" },
    { label: "TikTok",      href: "#", cls: "icon--tikTok" },
    { label: "Merch",       href: "#", cls: "icon--merch" },
  ];

  const menuItems = [
    { label: "Home",   id: "home" },
    { label: "About",  id: "about" },
    { label: "Shows",  id: "shows" },
    { label: "Music",  id: "music" },
    { label: "Videos", id: "videos" },
    { label: "Contact", id: "contact" },
  ];

  const handleMenuClick = (id: string, e?: MouseEvent<HTMLAnchorElement>) => {
    e?.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  return (
    <main className={`home ${menuOpen ? "home--menu-open" : ""}`} id="home">
      {/* ===== HERO (exact vibe you have now) ===== */}
      <section className="home__hero">
        {/* full-screen band photo in the background */}
        <img
          src={boysHunched}
          alt="The boys"
          className="home__hero-photo"
        />

        {/* overlay content on top of the photo */}
        <div className="home__overlay">
          {/* HAMBURGER (your CSS can keep it on the left) */}
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

          {/* FULLSCREEN MENU */}
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
                    href={`#${item.id}`}
                    onClick={(e) => handleMenuClick(item.id, e)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* LOGO + TAGLINE */}
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

          {/* SOCIAL ICONS */}
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

      {/* ===== SECTIONS BELOW (single-page scroll targets) ===== */}

      <section id="about" className="section section--about">
        <div className="section__inner">
          <h2 className="section__title">About</h2>
          <p className="section__text">
            Cheer Up! is a beachy indie-math rock band from Charlotte, North Carolina. 
            The project is lead by two songwriting brothers, Andrew (vocals) and Reno (guitar/vocals), 
            joined by Ramen (drums), Joaco (bass), and David (guitar). 
          </p>
            <></>
          <p className="section__text">
            Their latest single, “Henry J. Fate,” has brought new attention to Cheer Up! along for 40k+ streams.
            
          </p>
          <div className="embed embed--spotify">
      <iframe
        data-testid="embed-iframe"
        title="Henry J. Fate on Spotify"
        style={{ borderRadius: 12 }}
        src="https://open.spotify.com/embed/track/1hzaFEoR3cEws9oLvniCbX?utm_source=generator"
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
        </div>
      </section>

      <section id="shows" className="section section--shows">
        <div className="section__inner">
          <h2 className="section__title">Shows</h2>
          <p className="section__text">
            Upcoming dates and past highlights will live here.
          </p>
        </div>
      </section>

      <section id="music" className="section section--music">
        <div className="section__inner">
          <h2 className="section__title">Music</h2>
          <p className="section__text">
            Embedded players, featured tracks, and releases go here.
          </p>
        </div>
      </section>

      <section id="videos" className="section section--videos">
        <div className="section__inner">
          <h2 className="section__title">Videos</h2>
          <p className="section__text">
            Live sessions, music videos, and clips will go here.
          </p>
        </div>
      </section>

      <section id="contact" className="section section--contact">
        <div className="section__inner">
          <h2 className="section__title">Contact</h2>
          <p className="section__text">
            Booking / press: you@yourband.com
          </p>
        </div>
      </section>
    </main>
  );
}
