import { useState, type ChangeEvent, type FormEvent } from "react";

import cuWhiteLogo from "../assets/pics/cu-white-logo.png";
import boysStandingInStar from "../assets/pics/boys-standing-in-star.jpg";

import "../HomePage/HomePage.scss";
import "./MailingListPage.scss";

type MailingStatus = "idle" | "submitting" | "success" | "error";

const emptyMailingForm = {
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
};

export default function MailingListPage() {
  const [mailingForm, setMailingForm] = useState(emptyMailingForm);
  const [mailingStatus, setMailingStatus] = useState<MailingStatus>("idle");
  const [mailingError, setMailingError] = useState("");

  const handleMailingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMailingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        throw new Error(json?.message || json?.error || `Request failed (${res.status})`);
      }

      setMailingStatus("success");
      setMailingForm(emptyMailingForm);
    } catch (err: any) {
      setMailingStatus("error");
      setMailingError(err?.message || "Something broke.");
    }
  };

  return (
    <main className="mailing-page">
      <img
        src={boysStandingInStar}
        alt="Cheer Up! standing in a star"
        className="mailing-page__photo"
      />

      <div className="mailing-page__overlay">
        <a href="/" className="mailing-page__home-link">
          ← Back to site
        </a>

        <section className="mailing-page__card" aria-label="Join the mailing list">
          <img
            src={cuWhiteLogo}
            alt="Cheer Up!"
            className="mailing-page__logo"
          />

          <h1 className="mailing-page__title">Join the Mailing List</h1>

          <p className="mailing-page__text">
            Sign up for free stickers, updates, shows, and other Cheer Up! stuff.
          </p>

          <form className="mailing-form" onSubmit={handleSubmit}>
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
                  type="email"
                  placeholder="Email address *"
                  value={mailingForm.email}
                  onChange={handleMailingChange}
                  autoComplete="email"
                  required
                />

                <input
                  name="address1"
                  placeholder="Address line 1"
                  value={mailingForm.address1}
                  onChange={handleMailingChange}
                  autoComplete="address-line1"
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
                    placeholder="City"
                    value={mailingForm.city}
                    onChange={handleMailingChange}
                    autoComplete="address-level2"
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
                    placeholder="ZIP / Postal code"
                    value={mailingForm.postal_code}
                    onChange={handleMailingChange}
                    autoComplete="postal-code"
                  />

                  <input
                    name="country"
                    placeholder="Country"
                    value={mailingForm.country}
                    onChange={handleMailingChange}
                    autoComplete="country-name"
                  />
                </div>

                <input
                  name="phone"
                  placeholder="Phone"
                  value={mailingForm.phone}
                  onChange={handleMailingChange}
                  autoComplete="tel"
                />

                <button
                  type="submit"
                  className="mailing-submit"
                  disabled={mailingStatus === "submitting"}
                >
                  {mailingStatus === "submitting" ? "Joining..." : "Join"}
                </button>

                {mailingStatus === "error" && (
                  <div className="mailing-err">
                    {mailingError || "Something broke."}
                  </div>
                )}
              </>
            )}

            {mailingStatus === "success" && (
              <div className="mailing-success-block" role="status" aria-live="polite">
                <div className="check">✓</div>
                <h3>You’re in!</h3>
                <p>Thanks for signing up.</p>
              </div>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}