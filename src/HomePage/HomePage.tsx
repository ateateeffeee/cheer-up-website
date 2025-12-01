import { useState, useEffect, MouseEvent } from "react";

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

    useEffect(() => {
    // avoid loading it multiple times if component re-renders
    const existingScript = document.querySelector(
      'script[src="https://widgetv3.bandsintown.com/main.min.js"]'
    );
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = "https://widgetv3.bandsintown.com/main.min.js";
    script.async = true;
    script.defer = true;
    script.charset = "utf-8";

    document.body.appendChild(script);
        // you can optionally clean up, but for this widget it's fine to just leave it
    // return () => {
    //   script.remove();
    // };
  }, []);

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

            <div className="bit-widget-wrapper">
              <a
                className="bit-widget-initializer"
                data-artist-name="id_15608336"
                data-events-to-display=""
                data-background-color="rgba(0, 0, 0, 1)"
                data-separator-color="rgba(221,221,221,1)"
                data-text-color="rgba(255, 255, 255, 1)"
                data-font="Helvetica"
                data-auto-style="true"
                data-button-label-capitalization="uppercase"
                data-header-capitalization="uppercase"
                data-location-capitalization="uppercase"
                data-venue-capitalization="uppercase"
                data-display-local-dates="true"
                data-local-dates-position="tab"
                data-display-past-dates="true"
                data-display-details="false"
                data-display-lineup="false"
                data-display-start-time="false"
                data-social-share-icon="false"
                data-display-limit="all"
                data-date-format="MMM. D, YYYY"
                data-date-orientation="horizontal"
                data-date-border-color="#4A4A4A"
                data-date-border-width="1px"
                data-date-capitalization="capitalize"
                data-date-border-radius="10px"
                data-event-ticket-cta-size="medium"
                data-event-custom-ticket-text=""
                data-event-ticket-text="TICKETS"
                data-event-ticket-icon="false"
                data-event-ticket-cta-text-color="rgba(255,255,255,1)"
                data-event-ticket-cta-bg-color="rgba(74,74,74,1)"
                data-event-ticket-cta-border-color="rgba(74,74,74,1)"
                data-event-ticket-cta-border-width="0px"
                data-event-ticket-cta-border-radius="2px"
                data-sold-out-button-text-color="rgba(255,255,255,1)"
                data-sold-out-button-background-color="rgba(74,74,74,1)"
                data-sold-out-button-border-color="rgba(74,74,74,1)"
                data-sold-out-button-clickable="true"
                data-event-rsvp-position="left"
                data-event-rsvp-cta-size="medium"
                data-event-rsvp-only-show-icon="false"
                data-event-rsvp-text="RSVP"
                data-event-rsvp-icon="false"
                data-event-rsvp-cta-text-color="rgba(74,74,74,1)"
                data-event-rsvp-cta-bg-color="rgba(255,255,255,1)"
                data-event-rsvp-cta-border-color="rgba(74,74,74,1)"
                data-event-rsvp-cta-border-width="1px"
                data-event-rsvp-cta-border-radius="2px"
                data-follow-section-position="hidden"
                data-follow-section-alignment="center"
                data-follow-section-header-text=""
                data-follow-section-cta-size="medium"
                data-follow-section-cta-text="FOLLOW"
                data-follow-section-cta-icon="false"
                data-follow-section-cta-text-color="rgba(255,255,255,1)"
                data-follow-section-cta-bg-color="rgba(74,74,74,1)"
                data-follow-section-cta-border-color="rgba(74,74,74,1)"
                data-follow-section-cta-border-width="0px"
                data-follow-section-cta-border-radius="2px"
                data-play-my-city-position="bottom"
                data-play-my-city-alignment="center"
                data-play-my-city-header-text=""
                data-play-my-city-cta-size="medium"
                data-play-my-city-cta-text="REQUEST A SHOW"
                data-play-my-city-cta-icon="false"
                data-play-my-city-cta-text-color="rgba(255,255,255,1)"
                data-play-my-city-cta-bg-color="rgba(74,74,74,1)"
                data-play-my-city-cta-border-color="rgba(74,74,74,1)"
                data-play-my-city-cta-border-width="0px"
                data-play-my-city-cta-border-radius="2px"
                data-optin-font=""
                data-optin-text-color=""
                data-optin-bg-color=""
                data-optin-cta-text-color=""
                data-optin-cta-bg-color=""
                data-optin-cta-border-width=""
                data-optin-cta-border-radius=""
                data-optin-cta-border-color=""
                data-language="en"
                data-layout-breakpoint="900"
                data-app-id="63ececee9b830a12689a6f5ff4e648dd"
                data-affil-code=""
                data-bit-logo-position="hidden"
                data-bit-logo-color="rgba(66,66,66,1)"
              />
            </div>
          </div>
        </section>



      <section id="music" className="section section--music">
        <div className="section__inner">
          <h2 className="section__title">Music</h2>

          <div className="embed embed--spotify-playlist">
            <iframe
              data-testid="embed-iframe"
              title="Cheer Up! Playlist on Spotify"
              style={{ borderRadius: 12 }}
              src="https://open.spotify.com/embed/playlist/5x0uZO2RAgtv8LR9tY9kCM?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
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
