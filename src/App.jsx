import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const ROLES = [
  "Full-Stack Developer",
  "Mobile Engineer",
  "React Native Dev",
  "Next.js Architect",
  "UI/UX Enthusiast",
];

const PROJECTS = [
  {
    id: 1, num: "01", title: "TypoTerror", type: "Web App", year: "2025",
    tags: ["React Vite", "Tailwind CSS", "Node.js"],
    desc: "A fast-paced typing game where every typo is your enemy. Race against the clock, sharpen your accuracy, and survive the terror of the keyboard.",
    demoUrl: "https://typo-terror.vercel.app/", codeUrl: "https://github.com/mawi1C/TypoTerror",
  },
  {
    id: 2, num: "02", title: "PawFind", type: "Mobile App", year: "2025",
    tags: ["React Native", "Firebase", "AI / ML"],
    desc: "An AI-powered pet behavior analysis app that helps reunite lost pets with their owners. Smart search meets compassionate tech.",
    demoUrl: "https://pawfindapp.vercel.app/", codeUrl: "https://github.com/mawi1C/PawFind-Web",
  },
  {
    id: 3, num: "03", title: "Intern Blog", type: "Web App", year: "2025",
    tags: ["Next.js", "Tailwind CSS", "Vercel"],
    desc: "A personal internship blog documenting my journey, learnings, and experiences as a developer intern — written by Den John Emmanuel Cabria.",
    demoUrl: "https://dens-blog.vercel.app/", codeUrl: "#",
  },
  {
    id: 4, num: "04", title: "Recidencia del Hamor", type: "Web App", year: "2025",
    tags: ["React Vite", "Tailwind CSS", "Vercel"],
    desc: "A restaurant advertisement site for Recidencia del Hamor featuring the menu, ambiance showcase, and an integrated table booking system.",
    demoUrl: "https://recidencia-del-hamor.vercel.app/", codeUrl: "#",
  },
];

const STACK = [
  { name: "React Native", cat: "Mobile" },
  { name: "React Vite",   cat: "Frontend" },
  { name: "Next.js",      cat: "Frontend" },
  { name: "Node.js",      cat: "Backend" },
  { name: "Firebase",     cat: "Backend" },
  { name: "Cloudinary",   cat: "Cloud" },
  { name: "Tailwind CSS", cat: "Frontend" },
  { name: "PHP",          cat: "Backend" },
  { name: "Python",       cat: "Backend" },
  { name: "HTML / CSS",   cat: "Frontend" },
  { name: "MySQL",        cat: "Database" },
];

/* ══════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════ */
function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setMobile(mq.matches);
    const handler = (e) => setMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return mobile;
}

function useInView(ref, threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return visible;
}

function useMouse() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

/* ══════════════════════════════════════════════
   MAGNETIC CURSOR — desktop only
══════════════════════════════════════════════ */
function MagneticCursor() {
  const isMobile = useIsMobile();
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const pos      = useRef({ x: -200, y: -200 });
  const ringPos  = useRef({ x: -200, y: -200 });
  const hovered  = useRef(false);
  const raf      = useRef(null);

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      const el = document.elementFromPoint(e.clientX, e.clientY);
      hovered.current = !!(el && el.closest("a, button, [data-mag]"));
    };
    window.addEventListener("mousemove", onMove);
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.11;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.11;
      if (dotRef.current) {
        dotRef.current.style.left      = `${pos.current.x}px`;
        dotRef.current.style.top       = `${pos.current.y}px`;
        dotRef.current.style.transform = `translate(-50%,-50%) scale(${hovered.current ? 0 : 1})`;
      }
      if (ringRef.current) {
        ringRef.current.style.left        = `${ringPos.current.x}px`;
        ringRef.current.style.top         = `${ringPos.current.y}px`;
        ringRef.current.style.width       = hovered.current ? "54px" : "34px";
        ringRef.current.style.height      = hovered.current ? "54px" : "34px";
        ringRef.current.style.borderColor = hovered.current ? "#fff" : "rgba(255,255,255,0.35)";
        ringRef.current.style.transform   = "translate(-50%,-50%)";
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf.current); };
  }, [isMobile]);

  if (isMobile) return null;
  return (
    <>
      <div ref={dotRef} style={{ position: "fixed", width: 7, height: 7, background: "#fff", borderRadius: "50%", pointerEvents: "none", zIndex: 9999, transition: "transform 0.15s" }} />
      <div ref={ringRef} style={{ position: "fixed", width: 34, height: 34, border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: "50%", pointerEvents: "none", zIndex: 9998, transition: "width 0.28s, height 0.28s, border-color 0.28s" }} />
    </>
  );
}

/* ══════════════════════════════════════════════
   PARTICLES
══════════════════════════════════════════════ */
function Particles() {
  const isMobile  = useIsMobile();
  const particles = useRef(
    Array.from({ length: 22 }, (_, id) => ({
      id, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 1.8 + 0.4, speed: Math.random() * 0.25 + 0.08,
      drift: (Math.random() - 0.5) * 0.12, opacity: Math.random() * 0.25 + 0.06,
    }))
  ).current;
  const [, setTick] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    let frame = 0;
    const loop = () => {
      frame++;
      particles.forEach((p) => {
        p.y -= p.speed * 0.04; p.x += p.drift * 0.04;
        if (p.y < -2) { p.y = 102; p.x = Math.random() * 100; }
        if (p.x < -2) p.x = 102;
        if (p.x > 102) p.x = -2;
      });
      if (frame % 3 === 0) setTick((t) => t + 1);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const count = isMobile ? 10 : 22;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {particles.slice(0, count).map((p) => (
        <div key={p.id} style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: "50%", background: "#fff", opacity: p.opacity }} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  const navLinks = [["About", "#about"], ["Projects", "#projects"], ["Stack", "#stack"]];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 64, display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "0 24px" : "0 64px",
        background: scrolled || menuOpen ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid rgba(255,255,255,0.07)" : "none",
        transition: "all 0.4s ease",
      }}>
        <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 22, color: "#fff", letterSpacing: 4 }}>
          DEN<span style={{ color: "#555" }}>.</span>
        </span>

        {!isMobile && (
          <div style={{ display: "flex", gap: 44, alignItems: "center" }}>
            {navLinks.map(([label, href]) => (
              <a key={label} href={href} data-mag="" style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 12, letterSpacing: 2,
                color: "rgba(255,255,255,0.4)", textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s",
              }}
                onMouseEnter={(e) => e.target.style.color = "#fff"}
                onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.4)"}
              >{label}</a>
            ))}
            <a href="#contact" data-mag="" style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 12, letterSpacing: 2,
              padding: "9px 24px", border: "1px solid rgba(255,255,255,0.25)", color: "#fff",
              textDecoration: "none", textTransform: "uppercase",
              transition: "background 0.25s, color 0.25s", borderRadius: 2,
            }}
              onMouseEnter={(e) => { e.target.style.background = "#fff"; e.target.style.color = "#0a0a0a"; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = "#fff"; }}
            >Hire Me</a>
          </div>
        )}

        {isMobile && (
          <button onClick={() => setMenuOpen((o) => !o)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 6 }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: "block", width: 24, height: 1.5, background: "#fff",
                transition: "all 0.3s ease",
                transform: menuOpen
                  ? i === 0 ? "translateY(6.5px) rotate(45deg)"
                    : i === 2 ? "translateY(-6.5px) rotate(-45deg)" : "none"
                  : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        )}
      </nav>

      {isMobile && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 199,
          background: "rgba(10,10,10,0.97)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          maxHeight: menuOpen ? 400 : 0, overflow: "hidden",
          padding: menuOpen ? "28px 24px 36px" : "0 24px",
          transition: "max-height 0.4s ease, padding 0.35s ease",
        }}>
          {navLinks.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{
              display: "block", fontFamily: "'Bebas Neue', cursive",
              fontSize: 36, letterSpacing: 3, color: "rgba(255,255,255,0.6)",
              textDecoration: "none", textTransform: "uppercase",
              padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
              transition: "color 0.2s",
            }}
              onMouseEnter={(e) => e.target.style.color = "#fff"}
              onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}
            >{label}</a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} style={{
            display: "inline-block", marginTop: 24,
            fontFamily: "'Outfit', sans-serif", fontSize: 11, letterSpacing: 2.5,
            padding: "13px 32px", border: "1px solid rgba(255,255,255,0.25)",
            color: "#fff", textDecoration: "none", textTransform: "uppercase",
          }}>Hire Me</a>
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
function Hero() {
  const [roleIdx, setRoleIdx]           = useState(0);
  const [typed, setTyped]               = useState("");
  const [deleting, setDeleting]         = useState(false);
  const [mounted, setMounted]           = useState(false);
  const [lettersShown, setLettersShown] = useState(0);
  const [lettersDone, setLettersDone]   = useState(false);

  const isMobile   = useIsMobile();
  const mouse      = useMouse();
  const photoRef   = useRef(null);
  const sectionRef = useRef(null);
  const headline   = "DEN CABRIA";

  useEffect(() => {
    setTimeout(() => setMounted(true), 120);
    const timers = headline.split("").map((_, i) =>
      setTimeout(() => {
        setLettersShown(i + 1);
        if (i === headline.length - 1) setTimeout(() => setLettersDone(true), 200);
      }, 500 + i * 65)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!lettersDone) return;
    const role = ROLES[roleIdx];
    let t;
    if (!deleting && typed.length < role.length) t = setTimeout(() => setTyped(role.slice(0, typed.length + 1)), 65);
    else if (!deleting) t = setTimeout(() => setDeleting(true), 2000);
    else if (typed.length > 0) t = setTimeout(() => setTyped(typed.slice(0, -1)), 35);
    else { setDeleting(false); setRoleIdx((i) => (i + 1) % ROLES.length); }
    return () => clearTimeout(t);
  }, [typed, deleting, roleIdx, lettersDone]);

  useEffect(() => {
    if (isMobile || !photoRef.current || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const dx = (mouse.x - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (mouse.y - (rect.top + rect.height / 2)) / (rect.height / 2);
    photoRef.current.style.transform = `perspective(900px) rotateY(${dx * 6}deg) rotateX(${-dy * 4}deg) scale(1.015)`;
  }, [mouse, isMobile]);

  return (
    <section ref={sectionRef} id="about" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: isMobile ? "0 24px" : "0 64px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "200px 200px" }} />

      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column-reverse" : "row",
        alignItems: "center",
        justifyContent: isMobile ? "center" : "space-between",
        width: "100%", maxWidth: 1300, margin: "0 auto",
        paddingTop: isMobile ? 96 : 68,
        paddingBottom: isMobile ? 72 : 0,
        gap: isMobile ? 44 : 80,
        position: "relative", zIndex: 1,
      }}>

        {/* Text */}
        <div style={{ flex: 1, textAlign: isMobile ? "center" : "left" }}>
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: isMobile ? "center" : "flex-start",
            gap: 12, marginBottom: 18,
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(12px)", transition: "all 0.6s ease 0.1s",
          }}>
            {!isMobile && <span style={{ display: "block", width: 32, height: 1, background: "rgba(255,255,255,0.3)" }} />}
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 10 : 12, letterSpacing: 3, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
              Hey, I'm Den — 22, from the Philippines
            </span>
          </div>

          <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: isMobile ? "clamp(60px, 18vw, 96px)" : "clamp(80px, 12vw, 156px)", lineHeight: 0.88, letterSpacing: 3 }}>
            {headline.split("").map((ch, i) => (
              <span key={i} style={{
                display: ch === " " ? "inline" : "inline-block",
                color: i >= 4 ? "rgba(255,255,255,0.2)" : "#fff",
                opacity: i < lettersShown ? 1 : 0,
                transform: i < lettersShown ? "translateY(0)" : "translateY(50px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}>{ch === " " ? "\u00a0" : ch}</span>
            ))}
          </h1>

          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: isMobile ? "center" : "flex-start",
            gap: 10, marginTop: 16, marginBottom: 24, minHeight: 30,
            opacity: lettersDone ? 1 : 0, transition: "opacity 0.5s ease",
          }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.22)" }}>—</span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 14 : "clamp(16px,2vw,22px)", color: "rgba(255,255,255,0.55)" }}>{typed}</span>
            <span style={{ display: "inline-block", width: 2, height: "1em", background: "rgba(255,255,255,0.6)", animation: "cursorBlink 1s steps(1) infinite", verticalAlign: "middle" }} />
          </div>

          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 14 : 16, lineHeight: 1.85,
            color: "rgba(255,255,255,0.32)",
            maxWidth: isMobile ? "100%" : 440,
            margin: isMobile ? "0 auto 36px" : "0 0 44px",
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)", transition: "all 0.7s ease 0.75s",
          }}>
            I'm a full-stack developer who builds web and mobile experiences that are fast, clean, and made to last — from sleek UIs to solid backends.
          </p>

          <div style={{
            display: "flex", gap: 12,
            justifyContent: isMobile ? "center" : "flex-start",
            flexWrap: "wrap",
            opacity: mounted ? 1 : 0, transition: "opacity 0.7s ease 0.95s",
          }}>
            <a href="#projects" data-mag="" style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 11, letterSpacing: 2.5,
              padding: isMobile ? "12px 26px" : "15px 40px",
              background: "#fff", color: "#0a0a0a",
              textDecoration: "none", textTransform: "uppercase", fontWeight: 700,
              transition: "background 0.25s, transform 0.2s",
            }}
              onMouseEnter={(e) => { e.target.style.background = "#d4d4d4"; e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.target.style.background = "#fff"; e.target.style.transform = "none"; }}
            >See My Work</a>
            <a href="#contact" data-mag="" style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 11, letterSpacing: 2.5,
              padding: isMobile ? "12px 26px" : "15px 40px",
              border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.5)",
              textDecoration: "none", textTransform: "uppercase",
              transition: "border-color 0.25s, color 0.25s",
            }}
              onMouseEnter={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.6)"; e.target.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.18)"; e.target.style.color = "rgba(255,255,255,0.5)"; }}
            >Let's Talk</a>
          </div>
        </div>

        {/* Photo */}
        <div style={{ flexShrink: 0, width: isMobile ? 200 : 340, position: "relative", opacity: mounted ? 1 : 0, transition: "opacity 1s ease 0.5s" }}>
          <div style={{ position: "absolute", inset: -16, zIndex: 0, border: "1px solid rgba(255,255,255,0.08)", borderRadius: "40% 60% 55% 45% / 45% 40% 60% 55%", animation: "morphBorder 9s ease-in-out infinite" }} />
          <div ref={photoRef} style={{
            position: "relative", zIndex: 1, borderRadius: isMobile ? 16 : 20, overflow: "hidden",
            aspectRatio: "3/4",
            boxShadow: "0 32px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)",
            transition: "transform 0.1s ease", transformStyle: "preserve-3d",
          }}>
            {/*
              ── ADD YOUR PHOTO ──
              Replace the <div> below with:
              <img src="/den.jpg" alt="Den Cabria" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
              Put your photo in the /public folder.
            */}
            <div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg, #1c1c1c 0%, #111 50%, #0d0d0d 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
              <div style={{ fontSize: isMobile ? 40 : 56, opacity: 0.18 }}>👤</div>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "rgba(255,255,255,0.18)", letterSpacing: 3, textTransform: "uppercase" }}>Your Photo Here</span>
            </div>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to bottom, transparent 55%, rgba(10,10,10,0.65) 100%)" }} />
          </div>

          <div style={{ position: "absolute", top: isMobile ? 10 : 20, right: isMobile ? -8 : -18, zIndex: 2, background: "rgba(10,10,10,0.85)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: isMobile ? "7px 11px" : "10px 16px", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", gap: 7, animation: "floatY 3.2s ease-in-out infinite" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#aaa", display: "block", animation: "pulseDot 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 9 : 11, color: "rgba(255,255,255,0.7)", letterSpacing: 1 }}>Available for hire</span>
          </div>

          <div style={{ position: "absolute", bottom: isMobile ? 12 : 24, left: isMobile ? -8 : -22, zIndex: 2, background: "rgba(10,10,10,0.85)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: isMobile ? "7px 11px" : "10px 16px", backdropFilter: "blur(16px)", animation: "floatY 3.8s ease-in-out infinite 1s" }}>
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: isMobile ? 13 : 17, color: "#fff", letterSpacing: 2, lineHeight: 1 }}>Philippines 🇵🇭</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: 1, marginTop: 3 }}>Den, 22</div>
          </div>
        </div>
      </div>

      {!isMobile && (
        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: mounted ? 0.3 : 0, transition: "opacity 0.6s ease 1.4s" }}>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, letterSpacing: 4, color: "#fff", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 44, background: "linear-gradient(to bottom, #fff, transparent)", animation: "scrollPulse 2s ease-in-out infinite" }} />
        </div>
      )}
    </section>
  );
}

/* ══════════════════════════════════════════════
   PROJECT CARD
══════════════════════════════════════════════ */
function ProjectCard({ p, index }) {
  const [hovered, setHovered] = useState(false);
  const [mxy, setMxy]         = useState({ x: 0, y: 0 });
  const ref     = useRef(null);
  const visible = useInView(ref, 0.08);

  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setMxy({ x: e.clientX - r.left, y: e.clientY - r.top }); }}
      style={{
        position: "relative", borderRadius: 14, overflow: "hidden",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)"}`,
        background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        transition: "all 0.4s cubic-bezier(0.34,1.4,0.64,1)",
        transform: visible ? (hovered ? "translateY(-7px) scale(1.01)" : "translateY(0)") : "translateY(36px) scale(0.97)",
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 0.07}s` : "0s",
        cursor: "pointer",
      }}
    >
      {hovered && <div style={{ position: "absolute", pointerEvents: "none", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)", left: mxy.x - 130, top: mxy.y - 130, zIndex: 0 }} />}
      <div style={{ height: 1, background: hovered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.06)", transition: "background 0.3s" }} />
      <div style={{ padding: 24, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: 3, textTransform: "uppercase", display: "block", marginBottom: 6 }}>{p.num} · {p.type} · {p.year}</span>
            <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 32, color: hovered ? "#fff" : "rgba(255,255,255,0.88)", lineHeight: 1, letterSpacing: 1, transition: "color 0.25s" }}>{p.title}</h3>
          </div>
          <span style={{ fontSize: 18, lineHeight: 1, marginTop: 4, color: hovered ? "#fff" : "rgba(255,255,255,0.18)", transform: hovered ? "translate(3px,-3px)" : "none", transition: "color 0.3s, transform 0.3s" }}>↗</span>
        </div>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, marginBottom: 16 }}>{p.desc}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
          {p.tags.map((tag) => (
            <span key={tag} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, letterSpacing: 1, padding: "4px 10px", borderRadius: 20, textTransform: "uppercase", color: hovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.38)", border: `1px solid ${hovered ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.1)"}`, transition: "border-color 0.3s, color 0.3s" }}>{tag}</span>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16, display: "flex", gap: 10 }}>
          {[["Demo", p.demoUrl], ["Code", p.codeUrl]].map(([label, url]) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer" data-mag="" style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 10, letterSpacing: 2, padding: "8px 16px", borderRadius: 4,
              background: label === "Demo" ? "rgba(255,255,255,0.08)" : "transparent",
              color: label === "Demo" ? "#fff" : "rgba(255,255,255,0.35)",
              border: `1px solid ${label === "Demo" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
              textDecoration: "none", textTransform: "uppercase", transition: "all 0.2s",
            }}
              onMouseEnter={(e) => { e.target.style.background = "rgba(255,255,255,0.14)"; e.target.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.target.style.background = label === "Demo" ? "rgba(255,255,255,0.08)" : "transparent"; e.target.style.color = label === "Demo" ? "#fff" : "rgba(255,255,255,0.35)"; }}
            >{label}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PROJECTS SECTION
══════════════════════════════════════════════ */
function Projects() {
  const [filter, setFilter] = useState("All");
  const isMobile = useIsMobile();
  const ref      = useRef(null);
  const visible  = useInView(ref);
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.type === filter);

  return (
    <section id="projects" style={{ padding: isMobile ? "80px 24px" : "130px 64px", position: "relative", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div ref={ref} style={{
          display: "flex", flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end",
          gap: isMobile ? 20 : 0, marginBottom: 40,
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(22px)", transition: "all 0.65s ease",
        }}>
          <div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, letterSpacing: 4, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 10 }}>// Selected Work</p>
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: isMobile ? 48 : 68, color: "#fff", lineHeight: 0.9, letterSpacing: 2 }}>Projects</h2>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["All", "Web App", "Mobile App"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 10, letterSpacing: 2,
                padding: "8px 14px", borderRadius: 3, cursor: "pointer", textTransform: "uppercase",
                background: filter === f ? "#fff" : "transparent",
                color: filter === f ? "#0a0a0a" : "rgba(255,255,255,0.35)",
                border: `1px solid ${filter === f ? "#fff" : "rgba(255,255,255,0.1)"}`,
                fontWeight: filter === f ? 700 : 400, transition: "all 0.22s",
              }}>{f}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(330px, 1fr))", gap: 16 }}>
          {filtered.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   STACK
══════════════════════════════════════════════ */
function StackItem({ name, cat, delay }) {
  const ref     = useRef(null);
  const visible = useInView(ref, 0.05);
  return (
    <div ref={ref} style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "18px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-16px)",
      transition: `all 0.5s ease ${delay}s`,
    }}
      onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "10px"; }}
      onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0"; }}
    >
      <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 24, color: "rgba(255,255,255,0.82)", letterSpacing: 1.5 }}>{name}</span>
      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "rgba(255,255,255,0.22)", letterSpacing: 3, textTransform: "uppercase" }}>{cat}</span>
    </div>
  );
}

function Stack() {
  const isMobile = useIsMobile();
  const ref      = useRef(null);
  const visible  = useInView(ref);
  return (
    <section id="stack" style={{ padding: isMobile ? "80px 24px" : "130px 64px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.6fr", gap: isMobile ? 40 : 100, alignItems: "start" }}>
        <div ref={ref} style={{ position: isMobile ? "relative" : "sticky", top: 100, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(22px)", transition: "all 0.65s ease" }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, letterSpacing: 4, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 10 }}>// Technologies</p>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: isMobile ? 48 : 68, color: "#fff", lineHeight: 0.9, letterSpacing: 2, marginBottom: 18 }}>My<br />Stack</h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.28)", lineHeight: 1.8, maxWidth: 260 }}>Tools I use day-to-day to build clean, production-ready products.</p>
        </div>
        <div>{STACK.map((s, i) => <StackItem key={s.name} {...s} delay={i * 0.055} />)}</div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════ */
function Contact() {
  const isMobile = useIsMobile();
  const ref      = useRef(null);
  const visible  = useInView(ref);
  return (
    <section id="contact" style={{ padding: isMobile ? "80px 24px 100px" : "140px 64px 120px", borderTop: "1px solid rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: -20, right: -20, pointerEvents: "none", fontFamily: "'Bebas Neue', cursive", fontSize: isMobile ? "38vw" : "22vw", color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.03)", lineHeight: 1, letterSpacing: 4, userSelect: "none" }}>DEN</div>
      <div ref={ref} style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)", transition: "all 0.8s ease" }}>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, letterSpacing: 4, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", marginBottom: 16 }}>// Let's Connect</p>
        <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: isMobile ? "clamp(44px,13vw,72px)" : "clamp(64px,10vw,120px)", color: "#fff", lineHeight: 0.9, letterSpacing: 2, marginBottom: 24 }}>
          Got a project<br /><span style={{ color: "rgba(255,255,255,0.25)" }}>in mind?</span>
        </h2>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 14 : 16, color: "rgba(255,255,255,0.3)", lineHeight: 1.8, maxWidth: 480, margin: "0 auto 40px" }}>
          I'm open to freelance work, full-time roles, and cool collaborations. Drop me a message anytime.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 44, flexWrap: "wrap" }}>
          <a href="mailto:dennjohnn1@email.com" data-mag="" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, letterSpacing: 2.5, padding: isMobile ? "13px 28px" : "17px 46px", background: "#fff", color: "#0a0a0a", textDecoration: "none", textTransform: "uppercase", fontWeight: 700, transition: "background 0.25s, transform 0.2s" }}
            onMouseEnter={(e) => { e.target.style.background = "#d4d4d4"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.target.style.background = "#fff"; e.target.style.transform = "none"; }}
          >Say Hello</a>
          <a href="https://github.com/mawi1C" target="_blank" rel="noopener noreferrer" data-mag="" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, letterSpacing: 2.5, padding: isMobile ? "13px 28px" : "17px 46px", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.5)", textDecoration: "none", textTransform: "uppercase", transition: "all 0.25s" }}
            onMouseEnter={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.6)"; e.target.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.color = "rgba(255,255,255,0.5)"; }}
          >GitHub ↗</a>
        </div>
        <div style={{ display: "flex", gap: isMobile ? 20 : 36, justifyContent: "center", flexWrap: "wrap" }}>
          {[["Instagram ↗", "https://www.instagram.com/dennjohnn/"], ["GitHub ↗", "https://github.com/mawi1C"], ["Facebook ↗", "https://www.facebook.com/mawee4"]].map(([label, url]) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer" data-mag="" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, letterSpacing: 2.5, color: "rgba(255,255,255,0.2)", textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.target.style.color = "#fff"}
              onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.2)"}
            >{label}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   APP ROOT
══════════════════════════════════════════════ */
export default function App() {
  const isMobile = useIsMobile();
  return (
    <>
      <MagneticCursor />
      <Particles />
      <Navbar />
      <main style={{ background: "#0a0a0a", maxWidth: 1440, margin: "0 auto" }}>
        <Hero />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: isMobile ? "20px 24px" : "24px 64px",
        maxWidth: 1440, margin: "0 auto",
        display: "flex", flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between", alignItems: "center",
        gap: isMobile ? 8 : 0, textAlign: "center",
      }}>
        <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 18, color: "rgba(255,255,255,0.25)", letterSpacing: 4 }}>DEN.</span>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.15)", letterSpacing: 2 }}>© {new Date().getFullYear()} Den John Emmanuel Cabria</span>
        <a href="#about" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "rgba(255,255,255,0.2)", textDecoration: "none", letterSpacing: 3, textTransform: "uppercase", transition: "color 0.2s" }}
          onMouseEnter={(e) => e.target.style.color = "#fff"}
          onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.2)"}
        >Top ↑</a>
      </footer>
    </>
  );
}
