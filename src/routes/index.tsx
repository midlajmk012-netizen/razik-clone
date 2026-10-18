import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import portrait from '@/assets/razi-profile.png.asset.json';
import { Header, RoleText, ScrollCue, Stats, SkillCards, Services, Marquee, Contact, Footer, pageHead } from '@/components/portfolio';

export const Route = createFileRoute('/')({
  head: () => pageHead(
    'MUHAMMED MIDLAJ KK — Web Designer & Developer',
    'Crafting digital experiences. Explore the web design, development, SEO, and graphic design portfolio of MUHAMMED MIDLAJ KK.'
  ),
  component: Index,
});

function IntroOverlay({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'enter' | 'exit'>('enter');

  useEffect(() => {
    // Lock scroll while intro is visible
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const t1 = setTimeout(() => {
      document.body.offsetHeight; // force reflow
      setPhase('exit');
    }, 3400);

    return () => {
      clearTimeout(t1);
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    if (phase !== 'exit') return;
    const t2 = setTimeout(() => {
      // Unlock scroll and ensure page is at top before revealing
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
      onDone();
    }, 900);
    return () => clearTimeout(t2);
  }, [phase, onDone]);

  return (
    <div className={`intro-overlay${phase === 'exit' ? ' exit' : ''}`} aria-hidden="true">
      <div className="intro-shutter-top" />
      <div className="intro-shutter-bottom" />
      <div className="intro-stage">
        <div className="intro-word-wrap">
          <span className="intro-big-word word-think">THINK</span>
        </div>
        <div className="intro-bar" />
        <div className="intro-word-wrap">
          <span className="intro-big-word word-build">BUILD</span>
        </div>
        <div className="intro-word-wrap">
          <span className="intro-big-word word-inspire">INSPIRE</span>
        </div>
        <div className="intro-tagline">MUHAMMED MIDLAJ KK</div>
        <div className="intro-dots">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}

function Index() {
  // Show intro only once per browser session — not on back-navigation or re-renders
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof sessionStorage === 'undefined') return false;
    const seen = sessionStorage.getItem('intro-seen');
    if (seen) return false;
    sessionStorage.setItem('intro-seen', '1');
    return true;
  });

  return (
    <>
      {showIntro && <IntroOverlay onDone={() => setShowIntro(false)} />}
      <Header />
      <main>
        <section className="hero">
          <div className="hero-center">
            <div className="eyebrow">CRAFTING DIGITAL EXPERIENCES — SINCE 2026</div>
            <div className="hero-name">
              <h1>
                <span>MHD</span>
                <span>MIDLAJ</span>
              </h1>
              <img className="hero-portrait" src={portrait.url} alt="MUHAMMED MIDLAJ KK" fetchPriority="high" />
            </div>
            <div className="hero-star" aria-hidden="true">✦</div>
            <div className="hero-intro">
              I'm <strong>MUHAMMED MIDLAJ KK</strong> — <RoleText />
            </div>
          </div>
          <ScrollCue />
        </section>

        <section className="about-band" id="about">
          <div className="container">
            <div className="section-label">
              <span>02 — ABOUT</span>
              <Link to="/about">FULL PROFILE ↗</Link>
            </div>
            <div className="about-grid">
              <div className="about-copy">
                <h2 className="section-title">
                  WHO<br />
                  <span className="outline">AM I</span>
                  <em>.</em>
                </h2>
                <p>I'm <strong>MUHAMMED MIDLAJ KK</strong> — a Web Designer &amp; Developer from Malappuram, Kerala. I build fast, visually sharp digital experiences that help brands grow.</p>
                <p>Proficient in React, Next.js, SEO, E-Commerce &amp; Graphic Design — delivering on time, every time.</p>
                <Link className="read-more" to="/about">READ MORE <span>―</span></Link>
              </div>
              <div className="about-tools">
                <Stats />
                <SkillCards />
              </div>
            </div>
          </div>
        </section>

        <Services />
        <Marquee />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
