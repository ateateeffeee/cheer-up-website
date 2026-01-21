import { useState, useEffect, useRef, MouseEvent } from "react";

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
import milestone2024 from "../assets/pics/milestone-2024.jpg";
import boysStandingInStar from "../assets/pics/boys-standing-in-star.jpg";


import SocialLinks from "../SocialLinks/SocialLinks";

import "./HomePage.scss";

import adverbsData from "../utils/adverbs.json"

type AdverbFile = { adverbs: string[] };

function getRandomAdverb(prev?: string): string {
  const { adverbs } = adverbsData as AdverbFile;
  if (!adverbs || adverbs.length === 0) return prev ?? "frick";
  if (adverbs.length === 1) return adverbs[0];

  let next = prev;
  while (!next || next === prev) {
    const idx = Math.floor(Math.random() * adverbs.length);
    next = adverbs[idx];
  }
  return next;
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

    // current adverb shown in the "Home" label
  const [menuAdverb, setMenuAdverb] = useState(() => getRandomAdverb());

    
  const [mailingOpen, setMailingOpen] = useState(false);

  const [mailingForm, setMailingForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone: "",
    consent: true,
    company: "",
  });

  const [mailingStatus, setMailingStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [mailingError, setMailingError] = useState<string>("");
  const firstNameInputRef = useRef<HTMLInputElement | null>(null);


  const handleMailingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMailingForm((prev) => ({ ...prev, [name]: value }));
  };


  // store timeout so we can clean up on unmount
  const adverbTimeoutRef = useRef<number | null>(null);
  const firstRunRef = useRef(true);
  
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

    // Instagram embed loader
  useEffect(() => {
    const scriptId = "instagram-embed-script";
    if (document.getElementById(scriptId)) {
      (window as any).instgrm?.Embeds?.process?.();
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      (window as any).instgrm?.Embeds?.process?.();
    };

    document.body.appendChild(script);
  }, []);

useEffect(() => {
  // skip the first run (initial mount)
  if (firstRunRef.current) {
    firstRunRef.current = false;
    return;
  }

  // when menu goes from open -> closed
  if (!menuOpen) {
    const isDesktop = window.matchMedia?.("(min-width: 768px)").matches;

    if (isDesktop) {
      // DESKTOP: change instantly
      setMenuAdverb((prev) => getRandomAdverb(prev));
    } else {
      // MOBILE: keep the slight delay if you still want it
      adverbTimeoutRef.current = window.setTimeout(() => {
        setMenuAdverb((prev) => getRandomAdverb(prev));
      }, 100);
    }
  }
}, [menuOpen]);

  // clear timeout when component unmounts
  useEffect(() => {
    return () => {
      if (adverbTimeoutRef.current !== null) {
        clearTimeout(adverbTimeoutRef.current);
      }
    };
  }, []);

      useEffect(() => {
        const openFromHash = () => {
          if (window.location.hash === "#mailing-list") {
            setMailingOpen(true);

            window.setTimeout(() => {
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });

              window.setTimeout(() => {
                firstNameInputRef.current?.focus();
              }, 250);
            }, 50);
          }
        };

        // run once on initial load
        openFromHash();

        // run whenever hash changes (SPA + link clicks)
        window.addEventListener("hashchange", openFromHash);
        return () => window.removeEventListener("hashchange", openFromHash);
      }, []);

  const links = [
    { label: "Instagram",   href: "https://www.instagram.com/cheerupband", cls: "icon--instagram" },
    { label: "Spotify",     href: "https://open.spotify.com/playlist/5x0uZO2RAgtv8LR9tY9kCM?si=TPEYAVQwRPq0yNHjqp1osA", cls: "icon--spotify" },
    { label: "Apple Music", href: "https://music.apple.com/us/artist/cheer-up/1837211582", cls: "icon--apple" },
    { label: "Bandcamp",    href: "https://millhouserecords.bandcamp.com/track/henry-j-fate", cls: "icon--bandcamp" },
    { label: "YouTube",     href: "https://www.youtube.com/watch?v=QTPSs8EEIG0", cls: "icon--youtube" },
    { label: "Facebook",    href: "https://www.facebook.com/CheerUpBang/", cls: "icon--facebook" },
    { label: "TikTok",      href: "https://www.tiktok.com/@cheerupbang", cls: "icon--tikTok" },
    { label: "Merch",       href: "https://millhousemerch.com/search?q=Cheer+Up%21", cls: "icon--merch" },
  ];

  const menuItems = [
    { label: `Cheer the ${menuAdverb} Up!`, id: "home" },
    { label: "About",  id: "about" },
    { label: "Music",  id: "music" },
    { label: "Videos", id: "videos" },
    { label: "Shows",  id: "shows" },
    { label: "Contact", id: "contact" },
  ];

  const openMailingListFromMenu = (e?: MouseEvent<HTMLAnchorElement>) => {
  // e?.preventDefault();
  openMailingListAndFocus(true);
  };

      const openMailingListAndFocus = (closeMenu: boolean) => {
      if (closeMenu) setMenuOpen(false);

      setMailingOpen((wasOpen) => {
        const willOpen = !wasOpen;

        if (willOpen) {
          // scroll + focus after layout/animation starts
          window.setTimeout(() => {
            document.getElementById("contact")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });

            window.setTimeout(() => {
              firstNameInputRef.current?.focus();
            }, 250);
          }, 50);
        }

        return willOpen;
      });
    };




  const handleMenuClick = (id: string, e?: MouseEvent<HTMLAnchorElement>) => {
    if (id === "contact") setMailingOpen(false);
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
                  <a href={`#${item.id}`} onClick={(e) => handleMenuClick(item.id, e)}>
                    {item.label}
                  </a>
                </li>
              ))}

              <li className="mobile-menu__item">
                <a href="#mailing-list" onClick={openMailingListFromMenu}>
                  JOIN THE MAILING LIST
                </a>
              </li>
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

        {/* DESKTOP NAV (hidden on mobile via CSS) */}
        <nav className="desktop-nav" aria-label="Main navigation">
          <ul className="desktop-nav__list">
            {menuItems.map((item) => (
              <li key={item.id} className="desktop-nav__item">
                <a href={`#${item.id}`} onClick={(e) => handleMenuClick(item.id, e)}>
                  {item.label}
                </a>
              </li>
            ))}

            <li className="desktop-nav__item">
              <a href="#mailing-list" onClick={openMailingListFromMenu}>
                Join the mailing list
              </a>
            </li>
          </ul>
        </nav>


          {/* SOCIAL ICONS */}
          <SocialLinks links={links} />
        </div>
      </section>

      {/* ===== SECTIONS BELOW (single-page scroll targets) ===== */}

      <section id="about" className="section section--about">
        <div className="section__inner">
          <h2 className="section__title">About</h2>
          <p className="section__text">
            Cheer Up! is a beachy indie-math rock band from Charlotte, North Carolina. 
            The project is lead by two songwriting brothers, Andrew (vocals) and Reno (guitar/vocals), 
            Joaco (bass), and David (guitar). 
          </p>
            <></>
          <p className="section__text">
            Their latest single, “Henry J. Fate,” has brought new attention to Cheer Up! along for 50k+ streams.
            
          </p>
          <div className="embed embed--spotify">
      {/* <iframe
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
      /> */}
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

    {/* SHORTS ROW */}
    <div className="videos__shorts-row">
      {/* Short 1 */}
      <div className="video-embed video-embed--tall">
        <div className="video-embed__inner">
          <iframe
            src="https://www.youtube.com/embed/en4ntRV88ng?si=jrWb5IcEAqV5TLdu"
            title="Cheer Up! – live short 1"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>

      {/* Short 2 – same sizing as Short 1 */}
      <div className="video-embed video-embed--tall">
        <div className="video-embed__inner">
          <iframe
            src="https://www.youtube.com/embed/c7StL0KmnEE?si=Yaci4nA3o8uhddqS"
            title="Cheer Up! – live short 2"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>

    {/* NORMAL HORIZONTAL VIDEOS BELOW */}
    <div className="video-embed video-embed--wide">
      <div className="video-embed__inner">
        <iframe
          src="https://www.youtube.com/embed/QTPSs8EEIG0?si=3SuM9D1j_1uFO8aA"
          title="Cheer Up! – Music Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>

    <div className="video-embed video-embed--wide">
      <div className="video-embed__inner">
        <iframe
          src="https://www.youtube.com/embed/Ohsm8MY3JAU?si=dPN06uxLILuqLBzd"
          title="Cheer Up! – Music Video 2"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  </div>
</section>


        <section id="shows" className="section section--shows">
          <div className="section__inner">
            <h2 className="section__title">Shows</h2>
                <div className="shows-banner">
                  <img
                    src={milestone2024}
                    alt="Cheer Up! live at The Milestone, 2024"
                    className="shows-banner__image"
                  />
                </div>

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


<section id="contact" className="section section--contact">
  <div className="contact-hero">
    {/* background image */}
    <img
      src={boysStandingInStar}
      alt="Cheer Up! standing in a star"
      className="contact-hero__photo"
    />

    {/* overlay with text + icons */}
    <div className="contact-hero__overlay">
      <div className="section__inner section__inner--contact">
        <h2 className="section__title">Contact</h2>
        <p className="section__text">
          Booking / press:&nbsp;
          <button
            type="button"
            className="contact-email"
            onClick={() => {
              const user = "cheerupbang";
              const domain = "gmail.com";
              const email = `${user}@${domain}`;
              window.location.href = `mailto:${email}`;
            }}
          >
            cheerupbang [at] gmail [dot] com
          </button>
        </p>

        <div id="mailing-list" />
        <button
          type="button"
          className="mailing-toggle"
          onClick={() => openMailingListAndFocus(false)}
          aria-expanded={mailingOpen}
          aria-controls="mailing-list-panel"
        >
          JOIN THE MAILING LIST
        </button>


        <div
          id="mailing-list-panel"
          className={`mailing-panel ${mailingOpen ? "mailing-panel--open" : ""}`}
        >
          <p className="mailing-note">
            We’ll only use this to send occasional free stickers / updates.
          </p>

          <form
            className="mailing-form"
            onSubmit={async (e) => {
            e.preventDefault();

            try {
              setMailingStatus("submitting");
              setMailingError("");

              const res = await fetch("/.netlify/functions/fan-signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(mailingForm),
              });

              const json = await res.json().catch(() => ({}));

              if (!res.ok) {
                throw new Error(json?.message || `Request failed (${res.status})`);
              }

              setMailingStatus("success");
              setTimeout(() => {
                setMailingStatus("idle");
                setMailingOpen(false);
              }, 3500);
            } catch (err: any) {
              setMailingStatus("error");
              setMailingError(err?.message || "Something broke.");
            }
          }}

          >
                    {mailingStatus !== "success" && (
          <>
            {/* honeypot */}
            <input
              type="text"
              name="company"
              value={mailingForm.company}
              onChange={handleMailingChange}
              className="hp-field"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="mailing-row">
              <input
                ref={firstNameInputRef}
                name="first_name"
                placeholder="First name"
                value={mailingForm.first_name}
                onChange={handleMailingChange}
                autoComplete="given-name"
              />
              <input
                name="last_name"
                placeholder="Last name"
                value={mailingForm.last_name}
                onChange={handleMailingChange}
                autoComplete="family-name"
              />
            </div>

            <input
              name="email"
              placeholder="Email address *"
              value={mailingForm.email}
              onChange={handleMailingChange}
              autoComplete="email"
              required
            />

            <input
              name="address1"
              placeholder="Address line 1 *"
              value={mailingForm.address1}
              onChange={handleMailingChange}
              autoComplete="address-line1"
              required
            />

            <input
              name="address2"
              placeholder="Address line 2"
              value={mailingForm.address2}
              onChange={handleMailingChange}
              autoComplete="address-line2"
            />

            <div className="mailing-row">
              <input
                name="city"
                placeholder="City *"
                value={mailingForm.city}
                onChange={handleMailingChange}
                autoComplete="address-level2"
                required
              />
              <input
                name="state"
                placeholder="State"
                value={mailingForm.state}
                onChange={handleMailingChange}
                autoComplete="address-level1"
              />
            </div>

            <div className="mailing-row">
              <input
                name="postal_code"
                placeholder="ZIP / Postal code *"
                value={mailingForm.postal_code}
                onChange={handleMailingChange}
                autoComplete="postal-code"
                required
              />
              <input
                name="country"
                placeholder="Country *"
                value={mailingForm.country}
                onChange={handleMailingChange}
                autoComplete="country-name"
                required
              />
            </div>

            <input
              name="phone"
              placeholder="Phone (optional)"
              value={mailingForm.phone}
              onChange={handleMailingChange}
              autoComplete="tel"
            />

            <button type="submit" className="mailing-submit" disabled={mailingStatus === "submitting"}>
              {mailingStatus === "submitting" ? "Joining..." : "Join"}
            </button>

            {mailingStatus === "error" && (
              <div className="mailing-err">{mailingError || "Something broke."}</div>
            )}
          </>
        )}

        {mailingStatus === "success" && (
          <div className="mailing-success-block" role="status" aria-live="polite">
            <div className="check">✓</div>
            <h3>You’re in!</h3>
          </div>
        )}

          </form>
        </div>

        {/* icons as the final “outro” row */}
        <SocialLinks links={links} className="home__links home__links--footer" />
      </div>
    </div>
  </div>
</section>


    </main>
  );
}
