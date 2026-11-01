const About = () => {
  return (
    <main className="about-page">
      <style>{`
        .about-page {
          max-width: 1200px;
          min-height: 85vh;
          margin: 0 auto;
          padding: 56px 20px;
          color: #f4f4f5;
        }

        .about-hero {
          padding: 64px 40px;
          text-align: center;
          border: 1px solid rgba(249, 115, 22, 0.22);
          border-radius: 20px;
          background:
            radial-gradient(circle at top right, rgba(249, 115, 22, 0.24), transparent 38%),
            linear-gradient(135deg, #18181b 0%, #09090b 100%);
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.35);
        }

        .about-label {
          display: inline-block;
          margin-bottom: 16px;
          padding: 7px 13px;
          border: 1px solid rgba(249, 115, 22, 0.4);
          border-radius: 999px;
          color: #fb923c;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .about-hero h1 {
          margin: 0 0 18px;
          font-size: clamp(2.4rem, 6vw, 4.5rem);
          letter-spacing: -0.07em;
          color: #fff;
        }

        .about-hero h1 span { color: #f97316; }

        .about-hero p {
          max-width: 700px;
          margin: 0 auto;
          color: #d4d4d8;
          font-size: 1.1rem;
          line-height: 1.8;
        }

        .about-section {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 0.85fr);
          gap: 28px;
          margin-top: 32px;
        }

        .about-card {
          padding: 32px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          background: #18181b;
        }

        .about-card h2 {
          margin: 0 0 16px;
          color: #fff;
          font-size: 1.7rem;
        }

        .about-card p {
          color: #a1a1aa;
          line-height: 1.8;
        }

        .about-values {
          display: grid;
          gap: 14px;
        }

        .about-value {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          padding: 15px;
          border-radius: 10px;
          background: #27272a;
        }

        .about-value-icon {
          display: grid;
          width: 34px;
          height: 34px;
          flex: 0 0 34px;
          place-items: center;
          border-radius: 9px;
          background: rgba(249, 115, 22, 0.16);
          color: #fb923c;
          font-weight: 800;
        }

        .about-value h3 {
          margin: 0 0 4px;
          color: #f4f4f5;
          font-size: 1rem;
        }

        .about-value p {
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .about-footer-note {
          margin-top: 28px;
          padding: 23px;
          text-align: center;
          border-radius: 14px;
          color: #d4d4d8;
          background: rgba(249, 115, 22, 0.08);
          border: 1px solid rgba(249, 115, 22, 0.18);
        }

        @media (max-width: 720px) {
          .about-page { padding: 32px 16px; }
          .about-hero, .about-card { padding: 32px 24px; }
          .about-section { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="about-hero">
        <span className="about-label">About ShopNest</span>
        <h1>Shopping made <span>simple.</span></h1>
        <p>
          ShopNest is a modern online store built to make discovering products,
          managing orders, and shopping with confidence feel effortless.
        </p>
      </section>

      <section className="about-section">
        <article className="about-card">
          <h2>Our mission</h2>
          <p>
            We bring useful, quality products together in one clear and friendly
            shopping experience. From the first search to the final checkout,
            ShopNest is designed to be fast, transparent, and easy to use.
          </p>
        </article>

        <aside className="about-card">
          <h2>What matters to us</h2>
          <div className="about-values">
            <div className="about-value">
              <span className="about-value-icon">✓</span>
              <div><h3>Quality first</h3><p>Products and information you can trust.</p></div>
            </div>
            <div className="about-value">
              <span className="about-value-icon">↗</span>
              <div><h3>Simple shopping</h3><p>A clean experience without unnecessary steps.</p></div>
            </div>
            <div className="about-value">
              <span className="about-value-icon">♥</span>
              <div><h3>Customer focused</h3><p>Clear order details and support throughout the journey.</p></div>
            </div>
          </div>
        </aside>
      </section>

      <p className="about-footer-note">
        Thank you for visiting ShopNest. We are glad you are here.
      </p>
    </main>
  );
};

export default About;
