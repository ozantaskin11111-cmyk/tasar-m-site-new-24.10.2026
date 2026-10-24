import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./index.css";

// Brand Logo
import xentoraLogo from "./assets/xentora/logo.png";

// 14 Commercial Ad Posters (tasarımlar site)
import poster01 from "./assets/posters/poster-01.webp"; // Canlı Yayın Başlıyor
import poster02 from "./assets/posters/poster-02.webp"; // 3x Keşfet Paketi
import poster03 from "./assets/posters/poster-03.webp"; // GTA 5 Online 40M Nakit
import poster04 from "./assets/posters/poster-04.webp"; // %100 TR 19-50 Level Valorant
import poster05 from "./assets/posters/poster-05.webp"; // Aktivasyon Kod FiveM
import poster06 from "./assets/posters/poster-06.webp"; // Antigravity 4 Aylık Pro
import poster07 from "./assets/posters/poster-07.webp"; // Random 10-120 Yabancı Sunucu
import poster08 from "./assets/posters/poster-08.webp"; // TikTok 75.000 Beğeni Garantili
import poster09 from "./assets/posters/poster-09.webp"; // 1429 Robux Komisyonsuz Gönderim
import poster10 from "./assets/posters/poster-10.webp"; // Windows 10/11 Pro Lisans Key
import poster11 from "./assets/posters/poster-11.webp"; // Profesyonel İlan Afiş Tasarım
import poster12 from "./assets/posters/poster-12.webp"; // Claude Code 1.M Token Pro/Max
import poster13 from "./assets/posters/poster-13.webp"; // %100 TR 4350 VP Bıçak Garantili
import poster14 from "./assets/posters/poster-14.webp"; // 4K Ultra HD Netflix Kişiye Özel

// 12 Signature Logos (logo)
import logo01 from "./assets/logos/logo-01.webp"; // Xentora Resmi 3D Krom Yıldız Logosu
import logo02 from "./assets/logos/logo-02.webp"; // Ruby Roleplay 3D Metalik Logo
import logo03 from "./assets/logos/logo-03.webp"; // RS Dijital Mağaza Logosu
import logo04 from "./assets/logos/logo-04.webp"; // VEXA Crimson Fire Espor Logosu
import logo05 from "./assets/logos/logo-05.webp"; // Celestial 'N' Space Monogram
import logo06 from "./assets/logos/logo-06.webp"; // RS Cyber Kalkan Espor Amblemi
import logo07 from "./assets/logos/logo-07.webp"; // SC Neon Lavanta El Yazısı Amblemi
import logo08 from "./assets/logos/logo-08.webp"; // Leraxpin Kurumsal Kimlik Markası
import logo09 from "./assets/logos/logo-09.webp"; // Taskin Shop Y2K Chrome Tipografi
import logo10 from "./assets/logos/logo-10.webp"; // GF Cyber Esports Logo (açılı)
import logo11 from "./assets/logos/logo-11.webp"; // GF Kalın Çerçeve Espor Rozeti
import logo12 from "./assets/logos/logo-12.webp"; // ES Cyber Block Amblemi (EraStore)

// 7 Banners (baba)
import banner01 from "./assets/banners/banner-01.webp"; // Yıldırım Kurumsal Hizmet
import banner02 from "./assets/banners/banner-02.webp"; // Xentora Resmi Mağaza Vitrin
import banner03 from "./assets/banners/banner-03.webp"; // Rxzzy Store Kozmik Mor
import banner04 from "./assets/banners/banner-04.webp"; // TA Monolith Minimalist Krom
import banner05 from "./assets/banners/banner-05.webp"; // Taskin Shop x Danny Phantom NRG
import banner06 from "./assets/banners/banner-06.webp"; // EraStore Cyberpunk Zincirler
import banner07 from "./assets/banners/banner-07.webp"; // Taskin Shop Dijital Mağaza (Gazete)

// 4 Other Graphics (cxvxcv)
import other01 from "./assets/other/other-01.webp"; // You Need A Graphics Designer?
import other02 from "./assets/other/other-02.webp"; // TaskinShop Müşteri Memnuniyeti
import other03 from "./assets/other/other-03.webp"; // Xentora %50 İndirim Kampanya Posteri
import other04 from "./assets/other/other-04.webp"; // Teşekkür Ederiz & Teslimat Bilgi Fişi

// PVC & Interactive Assets from yashb.xyz
import xPvc from "./assets/x-pvc.png";
import linkedinPvc from "./assets/linkedin-pvc.png";
import githubPvc from "./assets/github-pvc.png";
import resumePvc from "./assets/resume-pvc.png";
import heroCone from "./assets/hero-cone.webp";
import popBombSfx from "./assets/pop-bomb.mp3";
import popBalloonSfx from "./assets/pop-nomi.mp3";
import heroCaution from "./assets/hero-caution.webp";

// Stack WebP Icons
import stFigma from "./assets/stack/figma.webp";
import stPhotoshop from "./assets/stack/react.webp";
import stIllustrator from "./assets/stack/typescript.webp";
import stAfterEffects from "./assets/stack/nextjs.webp";
import stBlender from "./assets/stack/threejs.webp";
import stGsap from "./assets/stack/gsap.webp";
import stMotion from "./assets/stack/motion.webp";
import stRive from "./assets/stack/rive.webp";

const INK = "#111111";
const BLUE = "#4b63ff";
const ORANGE = "#ff7a00";

// Discord URLs
const DISCORD_USER_URL = "https://discord.com/users/473260674609446922";
const DISCORD_SERVER_URL = "https://discord.gg/6KB3xMwK9e";
const STUDIO_EMAIL = "mail@xentora.digital";

/* ---- SFX Engine ---- */
const sfxPool: HTMLAudioElement[] = [];
function makePop(src: string, volume: number): () => void {
  let el: HTMLAudioElement | null = null;
  if (typeof Audio !== "undefined") {
    el = new Audio(src);
    el.preload = "auto";
    el.volume = volume;
    sfxPool.push(el);
  }
  return () => {
    if (!el) return;
    try {
      el.currentTime = 0;
      const p = el.play();
      if (p) p.catch(() => {});
    } catch { /* ignore */ }
  };
}
const playBombPop = makePop(popBombSfx, 0.6);

if (typeof window !== "undefined") {
  const unlockSfx = () => {
    sfxPool.forEach((a) => {
      a.muted = true;
      const p = a.play();
      const reset = () => { a.pause(); a.currentTime = 0; a.muted = false; };
      if (p) p.then(reset).catch(() => { a.muted = false; });
      else reset();
    });
    window.removeEventListener("pointerdown", unlockSfx);
    window.removeEventListener("keydown", unlockSfx);
  };
  window.addEventListener("pointerdown", unlockSfx);
  window.addEventListener("keydown", unlockSfx);
}

let popCtx: AudioContext | null = null;
let popBuf: AudioBuffer | null = null;
async function primeBalloonPop() {
  if (popBuf || typeof window === "undefined") return;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  try {
    popCtx = new AC();
    const res = await fetch(popBalloonSfx);
    const arr = await res.arrayBuffer();
    popBuf = await popCtx.decodeAudioData(arr);
  } catch { /* ignore */ }
}
function playBalloonPop(pan: number = 0, pitchMult: number = 1) {
  if (!popCtx || !popBuf) {
    playBombPop();
    return;
  }
  if (popCtx.state === "suspended") {
    popCtx.resume().catch(() => {});
  }
  try {
    const src = popCtx.createBufferSource();
    src.buffer = popBuf;
    src.playbackRate.value = pitchMult;
    const gain = popCtx.createGain();
    gain.gain.value = 0.85;
    if (popCtx.createStereoPanner) {
      const panner = popCtx.createStereoPanner();
      panner.pan.value = Math.max(-1, Math.min(1, pan));
      src.connect(panner);
      panner.connect(gain);
    } else {
      src.connect(gain);
    }
    gain.connect(popCtx.destination);
    src.start(0);
  } catch {
    playBombPop();
  }
}

/* ---- SVG Filters for 3D Inflatable Wordmark ---- */
function GlobalDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <filter id="balloon" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" result="disp" />
          <feGaussianBlur in="disp" stdDeviation="0.4" result="smooth" />
          <feMerge>
            <feMergeNode in="smooth" />
            <feMergeNode in="SourceGraphic" opacity="0.3" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

/* Crown swaying on letter T */
function CrownHat() {
  return (
    <div className="crownHat" aria-hidden="true">
      <svg className="crownSvg" width="60" height="42" viewBox="0 0 60 42" fill="none">
        <path
          d="M6 34 L12 12 L22 24 L30 6 L38 24 L48 12 L54 34 Z"
          fill="none"
          stroke="#4b63ff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2.5" fill="#4b63ff" />
        <circle cx="30" cy="6" r="2.5" fill="#4b63ff" />
        <circle cx="48" cy="12" r="2.5" fill="#4b63ff" />
      </svg>
    </div>
  );
}

/* 3D Balloon Letters Definition for XENTORA */
interface LetterDef {
  ch: string;
  w: number;
  d: string;
  crown?: boolean;
}

const LETTERS: LetterDef[] = [
  { ch: "X", w: 104, d: "M18 16 L44 54 L18 92 C16 95 19 98 24 98 L36 98 C40 98 44 95 47 91 L62 68 L77 91 C80 95 84 98 88 98 L100 98 C105 98 108 95 106 92 L80 54 L106 16 C108 13 105 10 100 10 L88 10 C84 10 80 13 77 17 L62 40 L47 17 C44 13 40 10 36 10 L24 10 C19 10 16 13 18 16 Z" },
  { ch: "E", w: 86, d: "M22 10 L80 10 C84 10 87 13 87 17 L87 25 C87 29 84 32 80 32 L44 32 L44 44 L74 44 C78 44 81 47 81 51 L81 57 C81 61 78 64 74 64 L44 64 L44 76 L82 76 C86 76 89 79 89 83 L89 91 C89 95 86 98 82 98 L22 98 C17 98 14 94 14 90 L14 18 C14 14 17 10 22 10 Z" },
  { ch: "N", w: 96, d: "M20 10 L34 10 C38 10 41 12 43 16 L72 66 L72 18 C72 14 75 10 80 10 L88 10 C93 10 96 14 96 18 L96 90 C96 95 93 98 88 98 L74 98 C70 98 67 96 65 92 L36 42 L36 90 C36 95 33 98 28 98 L20 98 C15 98 12 95 12 90 L12 18 C12 14 15 10 20 10 Z" },
  { ch: "T", w: 88, crown: true, d: "M14 12 L84 12 C88 12 91 15 91 19 L91 27 C91 31 88 34 84 34 L56 34 L56 90 C56 95 53 98 48 98 L40 98 C35 98 32 95 32 90 L32 34 L14 34 C10 34 7 31 7 27 L7 19 C7 15 10 12 14 12 Z" },
  { ch: "O", w: 98, d: "M49 8 C22 8 8 26 8 54 C8 82 22 100 49 100 C76 100 90 82 90 54 C90 26 76 8 49 8 Z M49 32 C61 32 66 41 66 54 C66 67 61 76 49 76 C37 76 32 67 32 54 C32 41 37 32 49 32 Z" },
  { ch: "R", w: 92, d: "M20 10 L58 10 C74 10 86 19 86 35 C86 46 80 54 70 58 L85 91 C87 95 84 98 79 98 L67 98 C64 98 61 96 59 92 L47 62 L38 62 L38 90 C38 95 35 98 30 98 L20 98 C15 98 12 95 12 90 L12 18 C12 14 15 10 20 10 Z M38 44 L54 44 C61 44 66 41 66 35 C66 29 61 26 54 26 L38 26 Z" },
  { ch: "A", w: 100, d: "M44 10 L56 10 C60 10 63 12 65 17 L94 90 C96 94 93 98 88 98 L76 98 C72 98 69 95 67 91 L60 72 L40 72 L33 91 C31 95 28 98 24 98 L12 98 C7 98 4 94 6 90 L35 17 C37 12 40 10 44 10 Z M50 36 L43 56 L57 56 Z" }
];

const HI: Record<number, Array<{ rx: number; ry: number; rw: number; rh: number; o: number; rot: number }>> = {
  0: [{ rx: 0.32, ry: 0.22, rw: 0.20, rh: 0.38, o: 0.9, rot: -28 }, { rx: 0.68, ry: 0.22, rw: 0.20, rh: 0.38, o: 0.9, rot: 28 }],
  1: [{ rx: 0.24, ry: 0.25, rw: 0.16, rh: 0.50, o: 0.9, rot: 0 }, { rx: 0.55, ry: 0.18, rw: 0.36, rh: 0.18, o: 0.8, rot: 0 }],
  2: [{ rx: 0.24, ry: 0.25, rw: 0.18, rh: 0.50, o: 0.9, rot: 0 }, { rx: 0.52, ry: 0.38, rw: 0.20, rh: 0.44, o: 0.85, rot: -26 }],
  3: [{ rx: 0.50, ry: 0.18, rw: 0.60, rh: 0.18, o: 0.95, rot: 0 }, { rx: 0.50, ry: 0.50, rw: 0.18, rh: 0.38, o: 0.7, rot: 0 }],
  4: [{ rx: 0.50, ry: 0.18, rw: 0.50, rh: 0.20, o: 0.95, rot: 0 }, { rx: 0.22, ry: 0.45, rw: 0.18, rh: 0.40, o: 0.8, rot: 15 }],
  5: [{ rx: 0.26, ry: 0.25, rw: 0.16, rh: 0.50, o: 0.9, rot: 0 }, { rx: 0.58, ry: 0.24, rw: 0.32, rh: 0.22, o: 0.9, rot: 0 }],
  6: [{ rx: 0.42, ry: 0.26, rw: 0.18, rh: 0.38, o: 0.9, rot: -18 }, { rx: 0.58, ry: 0.26, rw: 0.18, rh: 0.38, o: 0.9, rot: 18 }]
};

function Wordmark() {
  const localH = 108;
  const GAP = 3;
  let cxAcc = 0;
  const boxes = LETTERS.map((it) => {
    const x = cxAcc;
    cxAcc += it.w + GAP;
    return { ...it, x, h: localH };
  });
  const outerW = cxAcc - GAP;

  const letterDiv = (b: LetterDef & { x: number; h: number }, i: number) => {
    const pan = (b.x + b.w / 2) / outerW * 2 - 1;
    return (
      <div
        key={i}
        className="wordmarkLetter"
        data-squish="0.5"
        onClick={() => playBalloonPop(pan, 0.92 + (i % 3) * 0.08)}
        onPointerEnter={() => primeBalloonPop()}
        style={{
          position: "absolute",
          left: `${(b.x / outerW) * 100}%`,
          width: `${(b.w / outerW) * 100}%`,
          height: "100%",
          transformStyle: "preserve-3d",
          cursor: "pointer",
          pointerEvents: "auto",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <svg
            viewBox={`0 0 ${b.w} ${b.h}`}
            style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}
            aria-hidden="true"
          >
            <path
              d={b.d}
              fill="#262016"
              opacity="0.14"
              transform="translate(0, 10)"
              filter="blur(7px)"
            />
            <g filter="url(#balloon)">
              <path
                d={b.d}
                fill="url(#pvcGrad)"
                stroke="#ded7c6"
                strokeWidth="1.5"
                style={{
                  filter: "drop-shadow(0 2px 3px rgba(255,255,255,0.95)) drop-shadow(0 -3px 5px rgba(120,105,80,0.38))",
                }}
              />
              {(HI[i] ?? []).map((hl, k) => {
                const bw = b.w * hl.rw;
                const bh = b.h * hl.rh;
                const cx = b.w * hl.rx;
                const cy = b.h * hl.ry;
                return (
                  <ellipse
                    key={k}
                    cx={cx}
                    cy={cy}
                    rx={bw / 2}
                    ry={bh / 2}
                    fill="#ffffff"
                    opacity={hl.o}
                    transform={`rotate(${hl.rot} ${cx} ${cy})`}
                    filter="blur(1.6px)"
                  />
                );
              })}
              {(HI[i] ?? []).filter((hl) => hl.o >= 0.6).map((hl, k) => {
                const bw = b.w * hl.rw;
                const bh = b.h * hl.rh;
                const cx = b.w * hl.rx;
                const cy = b.h * hl.ry;
                const cw = bw * 0.6, ch = bh * 0.5;
                return (
                  <rect
                    key={k}
                    x={cx - cw / 2}
                    y={cy - ch / 2}
                    width={cw}
                    height={ch}
                    rx={Math.min(cw, ch) / 2}
                    fill="#ffffff"
                    opacity={hl.o >= 0.9 ? 1 : 0.6}
                    transform={`rotate(${hl.rot} ${cx} ${cy})`}
                  />
                );
              })}
            </g>
          </svg>
          {b.crown && <CrownHat />}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: `${outerW} / ${localH}`,
        overflow: "visible",
        perspective: "1700px",
      }}
      role="img"
      aria-label="XENTORA"
    >
      <div className="doorLeft" style={{ position: "absolute", inset: 0, transformOrigin: "left center", transformStyle: "preserve-3d", pointerEvents: "none" }}>
        {boxes.slice(0, 4).map((b, i) => letterDiv(b, i))}
      </div>
      <div className="doorRight" style={{ position: "absolute", inset: 0, transformOrigin: "right center", transformStyle: "preserve-3d", pointerEvents: "none" }}>
        {boxes.slice(4).map((b, j) => letterDiv(b, j + 4))}
      </div>
    </div>
  );
}

function HandUnder({ color = BLUE, dy = -4 }: { color?: string; dy?: number }) {
  return (
    <svg className="handInk" viewBox="0 0 100 10" preserveAspectRatio="none" style={{ position: "absolute", left: "-2%", bottom: dy, width: "104%", height: 8 }} aria-hidden="true">
      <path pathLength="100" d="M2 7 Q28 2.5 54 5 Q78 7 98 3.5" stroke={color} strokeWidth="3.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}
const U = ({ children, color = BLUE, ink = false }: { children: React.ReactNode; color?: string; ink?: boolean }) => (
  <span style={{ position: "relative", whiteSpace: "nowrap", color: ink ? INK : color }}>{children}<HandUnder color={color} /></span>
);

/* Motion Helpers */
let revealIO: IntersectionObserver | null = null;
const revealPending = new Set<HTMLElement>();
const revealNow = (el: HTMLElement) => { el.dataset.in = "1"; revealIO?.unobserve(el); revealPending.delete(el); };
const revealSweep = () => revealPending.forEach((el) => { if (el.getBoundingClientRect().top < window.innerHeight) revealNow(el); });
const prefersReduced = () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
function reveal(el: HTMLElement | null) {
  if (!el) return;
  if (prefersReduced()) { el.dataset.in = "1"; return; }
  if (!revealIO && typeof IntersectionObserver !== "undefined") {
    revealIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) revealNow(e.target as HTMLElement);
      });
    }, { rootMargin: "0px 0px -4% 0px", threshold: 0.1 });
    window.addEventListener("scroll", () => {
      clearTimeout(revealSweepT);
      revealSweepT = window.setTimeout(revealSweep, 180);
    }, { passive: true });
  }
  revealPending.add(el);
  revealIO?.observe(el);
}
let revealSweepT = 0;
const rvDelay = (ms: number): React.CSSProperties => ({ ["--rv-d" as string]: `${ms}ms` });

function Words({ text, cls }: { text: string; cls?: string }) {
  const lines = text.split("\n");
  let wordIdx = 0;
  return (
    <span className={`words ${cls ?? ""}`} data-rv="" ref={reveal}>
      {lines.map((line, li) => (
        <span className="wordsLine" key={li}>
          {line.split(" ").map((w, wi) => {
            const d = (wordIdx++) * 36;
            return <span key={wi} className="word" style={rvDelay(d)}>{w} </span>;
          })}
        </span>
      ))}
    </span>
  );
}

function SecTag({ n, label }: { n: number; label: string }) {
  return (
    <div className="secTag" data-rv="" ref={reveal}>
      <div className="secNum">
        <svg viewBox="0 0 50 50" aria-hidden="true">
          <path d="M25 2 C38 2 48 12 48 25 C48 38 38 48 25 48 C12 48 2 38 2 25 C2 12 12 2 25 2 Z" fill={BLUE} />
        </svg>
        <span>{n}</span>
      </div>
      <span className="secLabel">{label}</span>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
  );
}

/* ================================================================== */
/*  ALL 37 REAL USER WORKS (100% IN ENGLISH, EXACT VISUAL MATCHES)     */
/* ================================================================== */

export interface GalleryItem {
  id: string;
  t: string;
  cat: "Poster" | "Logo" | "Banner" | "Other";
  catLabel: string;
  badge: string;
  badgeBg: string;
  d: string;
  img: string;
  date: string;
  tags: string[];
}

export const ALL_37_WORKS: GalleryItem[] = [
  // 14 AD POSTERS (tasarımlar site)
  {
    id: "poster-01",
    t: "Live Stream Launch Poster (Stream Alert)",
    cat: "Poster",
    catLabel: "Ad Posters",
    badge: "AD POSTER",
    badgeBg: "rgba(6, 182, 212, 0.9)",
    d: "High-impact neon 3D broadcast announcement poster created for streamers and live content creators (@woons canlı yayın).",
    img: poster01,
    date: "2026-10",
    tags: ["Stream Alert", "Live Broadcast", "Twitch / Kick"]
  },
  {
    id: "poster-02",
    t: "TikTok 3x Viral Booster Pack",
    cat: "Poster",
    catLabel: "Ad Posters",
    badge: "AD POSTER",
    badgeBg: "rgba(6, 182, 212, 0.9)",
    d: "Commercial promotional flyer for TikTok algorithmic viral reach, +25,000 views, likes, bookmarks, and sharing boost packages.",
    img: poster02,
    date: "2026-10",
    tags: ["TikTok Growth", "Viral Booster", "Social Media"]
  },
  {
    id: "poster-03",
    t: "GTA 5 Online 40M Cash & Unlocked Lvl",
    cat: "Poster",
    catLabel: "Ad Posters",
    badge: "AD POSTER",
    badgeBg: "rgba(6, 182, 212, 0.9)",
    d: "Cyberpunk magenta advertising poster for GTA Online 40M currency delivery and level unlock packages.",
    img: poster03,
    date: "2026-10",
    tags: ["GTA V", "40M Cash", "Game Accounts"]
  },
  {
    id: "poster-04",
    t: "Valorant 19-50 Lvl Verified TR Account",
    cat: "Poster",
    catLabel: "Ad Posters",
    badge: "AD POSTER",
    badgeBg: "rgba(6, 182, 212, 0.9)",
    d: "Cosmic blue marketplace advertisement flyer for verified Turkish Valorant accounts with email-change warranty.",
    img: poster04,
    date: "2026-10",
    tags: ["Valorant", "Mail Change", "TR Server"]
  },
  {
    id: "poster-05",
    t: "FiveM Instant Activation License Key",
    cat: "Poster",
    catLabel: "Ad Posters",
    badge: "AD POSTER",
    badgeBg: "rgba(6, 182, 212, 0.9)",
    d: "Volumetric golden illumination ad poster for FiveM server license keys with automated instant delivery.",
    img: poster05,
    date: "2026-10",
    tags: ["FiveM", "Activation Key", "Server License"]
  },
  {
    id: "poster-06",
    t: "Antigravity AI 4-Month Pro Membership",
    cat: "Poster",
    catLabel: "Ad Posters",
    badge: "AD POSTER",
    badgeBg: "rgba(6, 182, 212, 0.9)",
    d: "Official commercial promotional flyer for Antigravity AI 4-month Pro subscription direct to user inbox.",
    img: poster06,
    date: "2026-10",
    tags: ["Antigravity", "AI Subscription", "Pro License"]
  },
  {
    id: "poster-07",
    t: "Random 10-120 Discord Community Server",
    cat: "Poster",
    catLabel: "Ad Posters",
    badge: "AD POSTER",
    badgeBg: "rgba(6, 182, 212, 0.9)",
    d: "Electric blue digital poster for verified international Discord community servers with members and setup.",
    img: poster07,
    date: "2026-10",
    tags: ["Discord Server", "Community", "Justice"]
  },
  {
    id: "poster-08",
    t: "TikTok 75,000 Guaranteed Likes Pack",
    cat: "Poster",
    catLabel: "Ad Posters",
    badge: "AD POSTER",
    badgeBg: "rgba(6, 182, 212, 0.9)",
    d: "High-conversion neon cyan/magenta ad flyer for guaranteed 75,000 TikTok likes with instant boost.",
    img: poster08,
    date: "2026-10",
    tags: ["TikTok Likes", "75K Boost", "Social Growth"]
  },
  {
    id: "poster-09",
    t: "1429 Robux Automated Instant Delivery",
    cat: "Poster",
    catLabel: "Ad Posters",
    badge: "AD POSTER",
    badgeBg: "rgba(6, 182, 212, 0.9)",
    d: "Golden energetic commercial flyer for commission-free 1429 Robux game balance transfer system.",
    img: poster09,
    date: "2026-10",
    tags: ["Robux", "Roblox", "Game Currency"]
  },
  {
    id: "poster-10",
    t: "Windows 10/11 Pro Genuine License Key",
    cat: "Poster",
    catLabel: "Ad Posters",
    badge: "AD POSTER",
    badgeBg: "rgba(6, 182, 212, 0.9)",
    d: "Clean Microsoft blue commercial poster for genuine Windows 10/11 Professional activation keys with fast dispatch.",
    img: poster10,
    date: "2026-10",
    tags: ["Windows 11", "License Key", "Official Software"]
  },
  {
    id: "poster-11",
    t: "Bespoke Commercial Ad Poster Design",
    cat: "Poster",
    catLabel: "Ad Posters",
    badge: "AD POSTER",
    badgeBg: "rgba(6, 182, 212, 0.9)",
    d: "Agency showcase advertisement flyer presenting high-converting forum and marketplace ad design services.",
    img: poster11,
    date: "2026-10",
    tags: ["Poster Design", "TaskinShop", "Graphic Service"]
  },
  {
    id: "poster-12",
    t: "Claude Code 1.0M Token Pro/Max Pack",
    cat: "Poster",
    catLabel: "Ad Posters",
    badge: "AD POSTER",
    badgeBg: "rgba(6, 182, 212, 0.9)",
    d: "Amber 3D typography commercial ad flyer for Claude Code Pro/Max 1,000,000 developer token packages.",
    img: poster12,
    date: "2026-10",
    tags: ["Claude Code", "1M Tokens", "AI Developer"]
  },
  {
    id: "poster-13",
    t: "Valorant 4350 VP & Knife Guaranteed Account",
    cat: "Poster",
    catLabel: "Ad Posters",
    badge: "AD POSTER",
    badgeBg: "rgba(6, 182, 212, 0.9)",
    d: "Vibrant acid green & purple ad flyer for guaranteed melee knife skin Valorant accounts loaded with 4350 VP.",
    img: poster13,
    date: "2026-10",
    tags: ["Valorant Knife", "4350 VP", "VIP Random"]
  },
  {
    id: "poster-14",
    t: "Netflix 4K Ultra HD Private Account",
    cat: "Poster",
    catLabel: "Ad Posters",
    badge: "AD POSTER",
    badgeBg: "rgba(6, 182, 212, 0.9)",
    d: "Sleek red-glow advertising poster for private 4K UHD Netflix accounts with instant profile setup.",
    img: poster14,
    date: "2026-10",
    tags: ["Netflix 4K", "Ultra HD", "Streaming"]
  },

  // 12 SIGNATURE LOGOS (logo)
  {
    id: "logo-01",
    t: "Xentora Official 3D Chrome Star Logo",
    cat: "Logo",
    catLabel: "Logos",
    badge: "LOGO",
    badgeBg: "rgba(168, 85, 247, 0.9)",
    d: "The official flagship emblem of Xentora featuring a sculpted multi-facet chrome star with cyan luminescence.",
    img: logo01,
    date: "2026-10",
    tags: ["Xentora", "Studio Brandmark", "3D Star"]
  },
  {
    id: "logo-02",
    t: "Ruby Roleplay 3D Metal Crest Logo",
    cat: "Logo",
    catLabel: "Logos",
    badge: "LOGO",
    badgeBg: "rgba(168, 85, 247, 0.9)",
    d: "Heavy industrial bevel metal typography crowned with a faceted crimson ruby gemstone for FiveM communities.",
    img: logo02,
    date: "2026-10",
    tags: ["Ruby Roleplay", "FiveM", "Chrome Gem"]
  },
  {
    id: "logo-03",
    t: "RS Digital Store Brandmark",
    cat: "Logo",
    catLabel: "Logos",
    badge: "LOGO",
    badgeBg: "rgba(168, 85, 247, 0.9)",
    d: "Modern two-tone textured initials mark for RS Digital Store with distressed white-purple brush typography.",
    img: logo03,
    date: "2026-10",
    tags: ["RS Digital", "E-Commerce", "Storefront"]
  },
  {
    id: "logo-04",
    t: "VEXA Crimson Fire Esports Emblem",
    cat: "Logo",
    catLabel: "Logos",
    badge: "LOGO",
    badgeBg: "rgba(168, 85, 247, 0.9)",
    d: "Razor-sharp aggressive red typography with molten fire embers designed for elite gaming rosters.",
    img: logo04,
    date: "2026-10",
    tags: ["VEXA", "Crimson Fire", "Esports Roster"]
  },
  {
    id: "logo-05",
    t: "Celestial 'N' Space Monogram",
    cat: "Logo",
    catLabel: "Logos",
    badge: "LOGO",
    badgeBg: "rgba(168, 85, 247, 0.9)",
    d: "Aerodynamic chrome letterform 'N' set against an atmospheric cosmic backdrop with volumetric lighting.",
    img: logo05,
    date: "2026-10",
    tags: ["Monogram", "Chrome", "Futuristic"]
  },
  {
    id: "logo-06",
    t: "RS Cybernetic Shield Mascot Emblem",
    cat: "Logo",
    catLabel: "Logos",
    badge: "LOGO",
    badgeBg: "rgba(168, 85, 247, 0.9)",
    d: "Futuristic high-tech shield emblem featuring dynamic cyan layered typography for digital gaming clans.",
    img: logo06,
    date: "2026-10",
    tags: ["Esports Shield", "Cybernetic", "Gaming Clan"]
  },
  {
    id: "logo-07",
    t: "SC Lavender Glass Script Emblem",
    cat: "Logo",
    catLabel: "Logos",
    badge: "LOGO",
    badgeBg: "rgba(168, 85, 247, 0.9)",
    d: "Flowing organic neon glass calligraphy emblem crafted with lavender specular reflections.",
    img: logo07,
    date: "2026-10",
    tags: ["SC Monogram", "Glass Neon", "Luxury Script"]
  },
  {
    id: "logo-08",
    t: "Leraxpin Tech Corporate Identity",
    cat: "Logo",
    catLabel: "Logos",
    badge: "LOGO",
    badgeBg: "rgba(168, 85, 247, 0.9)",
    d: "Minimalist corporate wordmark and geometric gradient droplet symbol designed for a digital technology company.",
    img: logo08,
    date: "2026-10",
    tags: ["Corporate", "Tech Software", "Brandmark"]
  },
  {
    id: "logo-09",
    t: "Taskin Shop Y2K Liquid Chrome Logo",
    cat: "Logo",
    catLabel: "Logos",
    badge: "LOGO",
    badgeBg: "rgba(168, 85, 247, 0.9)",
    d: "Acid-style liquid chrome typography framed with 3D metallic barbed-wire elements and blue gradient lighting.",
    img: logo09,
    date: "2026-10",
    tags: ["Y2K Chrome", "Barbed Wire", "Taskin Shop"]
  },
  {
    id: "logo-10",
    t: "GF Cyber Esports Clan Logo",
    cat: "Logo",
    catLabel: "Logos",
    badge: "LOGO",
    badgeBg: "rgba(168, 85, 247, 0.9)",
    d: "Angular cyan and ice-white geometric crest designed for competitive esports teams and gaming rosters.",
    img: logo10,
    date: "2026-10",
    tags: ["GF Esports", "Gaming Crest", "Cyan Geometry"]
  },
  {
    id: "logo-11",
    t: "GF Heavy Bevel Tournament Badge",
    cat: "Logo",
    catLabel: "Logos",
    badge: "LOGO",
    badgeBg: "rgba(168, 85, 247, 0.9)",
    d: "Aggressive sports typography crest with sharp angles and cyan-to-white gradient highlights.",
    img: logo11,
    date: "2026-10",
    tags: ["Tournament Badge", "Heavy Bevel", "Gaming Team"]
  },
  {
    id: "logo-12",
    t: "ES Cyber Block Monogram (EraStore)",
    cat: "Logo",
    catLabel: "Logos",
    badge: "LOGO",
    badgeBg: "rgba(168, 85, 247, 0.9)",
    d: "Chunky 3D cyan monogram crafted with holographic bevels and ambient motion flare for gaming networks.",
    img: logo12,
    date: "2026-10",
    tags: ["EraStore", "Cyber Block", "Holographic"]
  },

  // 7 BANNERS (baba)
  {
    id: "banner-01",
    t: "Lightning Corporate Service Banner",
    cat: "Banner",
    catLabel: "Banners",
    badge: "BANNER",
    badgeBg: "rgba(245, 158, 11, 0.9)",
    d: "Dynamic deep navy 3D header featuring chrome lightning insignia, service guarantee badges, and floating spheres.",
    img: banner01,
    date: "2026-10",
    tags: ["Corporate Header", "Lightning", "Discord Banner"]
  },
  {
    id: "banner-02",
    t: "Xentora Official Storefront Header",
    cat: "Banner",
    catLabel: "Banners",
    badge: "BANNER",
    badgeBg: "rgba(245, 158, 11, 0.9)",
    d: "The signature Xentora panorama banner featuring the glowing chrome star emblem and customer guarantee markers.",
    img: banner02,
    date: "2026-10",
    tags: ["Xentora Official", "Header Panorama", "100% Trust"]
  },
  {
    id: "banner-03",
    t: "Rxzzy Store Cosmic Purple Banner",
    cat: "Banner",
    catLabel: "Banners",
    badge: "BANNER",
    badgeBg: "rgba(245, 158, 11, 0.9)",
    d: "Atmospheric purple galaxy header with sleek cursive typography and starlight accents for digital storefronts.",
    img: banner03,
    date: "2026-10",
    tags: ["Rxzzy Store", "Cosmic Purple", "Store Header"]
  },
  {
    id: "banner-04",
    t: "TA Monolith Minimalist Chrome Banner",
    cat: "Banner",
    catLabel: "Banners",
    badge: "BANNER",
    badgeBg: "rgba(245, 158, 11, 0.9)",
    d: "Dark monochrome brutalist header with chiseled concrete 3D monogram and customer trust credentials.",
    img: banner04,
    date: "2026-10",
    tags: ["TA Monolith", "Minimalist Chrome", "Brutalist"]
  },
  {
    id: "banner-05",
    t: "Taskin Shop x Danny Phantom NRG Banner",
    cat: "Banner",
    catLabel: "Banners",
    badge: "BANNER",
    badgeBg: "rgba(245, 158, 11, 0.9)",
    d: "Vibrant acid-green anime character illustration combined with tech UI wireframes and esports branding.",
    img: banner05,
    date: "2026-10",
    tags: ["Anime Header", "Danny Phantom", "NRG Esports"]
  },
  {
    id: "banner-06",
    t: "EraStore Cyberpunk Chains Banner",
    cat: "Banner",
    catLabel: "Banners",
    badge: "BANNER",
    badgeBg: "rgba(245, 158, 11, 0.9)",
    d: "Heavy chrome chains, cyan neon rim lighting, and dual guarantee plaques for automated gaming stores.",
    img: banner06,
    date: "2026-10",
    tags: ["EraStore", "Cyberpunk Chains", "Cyan Glow"]
  },
  {
    id: "banner-07",
    t: "Taskin Shop Liquid Blue Banner",
    cat: "Banner",
    catLabel: "Banners",
    badge: "BANNER",
    badgeBg: "rgba(245, 158, 11, 0.9)",
    d: "Urban newspaper collage background paired with high-gloss liquid 3D typography and modern street aesthetic.",
    img: banner07,
    date: "2026-10",
    tags: ["Taskin Shop", "Liquid 3D", "Urban Collage"]
  },

  // 4 OTHER GRAPHICS (cxvxcv)
  {
    id: "other-01",
    t: "You Need A Graphics Designer? Promo Flyer",
    cat: "Other",
    catLabel: "Other Works",
    badge: "OTHER",
    badgeBg: "rgba(16, 185, 129, 0.9)",
    d: "3D Pixar-style designer character surrounded by Photoshop tools, tailored for social media advertising.",
    img: other01,
    date: "2026-10",
    tags: ["Social Media Flyer", "3D Character", "Agency Promo"]
  },
  {
    id: "other-02",
    t: "TaskinShop Customer Feedback & Trust Card",
    cat: "Other",
    catLabel: "Other Works",
    badge: "OTHER",
    badgeBg: "rgba(16, 185, 129, 0.9)",
    d: "Frosted glass 3D review badge with holographic thumb-up icon and 5-star customer endorsement layout.",
    img: other02,
    date: "2026-10",
    tags: ["Customer Review", "Glassmorphic 3D", "5-Star Rating"]
  },
  {
    id: "other-03",
    t: "Xentora 50% Discount Campaign Poster",
    cat: "Other",
    catLabel: "Other Works",
    badge: "OTHER",
    badgeBg: "rgba(16, 185, 129, 0.9)",
    d: "Striking 3D chrome statue and star sculpture campaign poster promoting Xentora's 50% discount sale event.",
    img: other03,
    date: "2026-10",
    tags: ["50% Discount", "Xentora Campaign", "Chrome Sculpture"]
  },
  {
    id: "other-04",
    t: "Order Delivery & Thank You Slip",
    cat: "Other",
    catLabel: "Other Works",
    badge: "OTHER",
    badgeBg: "rgba(16, 185, 129, 0.9)",
    d: "Clean modern purple vector thank-you voucher with piggy bank and cash graphics included with order deliveries.",
    img: other04,
    date: "2026-10",
    tags: ["Delivery Slip", "Thank You Card", "Customer Voucher"]
  },
];

/* Services we offer */
const SERVICES = [
  {
    title: "Ad Posters & Commercial Flyers",
    category: "AD POSTERS & COMMERCIAL FLYERS",
    desc: "High-converting item sales posters, gaming server announcements, forum showcase flyers, and event graphics. Engineered with clear visual hierarchy, 3D typography, and vibrant lighting to convert viewers into clients.",
    badge: "14 Showcase Works",
    points: [
      "Custom layouts tailored for gaming items, social growth packages & community recruitment.",
      "Ultra-HD web and print-ready deliverables (Layered PSD, High-Res PNG, Vector).",
      "Optimized to capture immediate attention on Discord feeds and forum threads."
    ]
  },
  {
    title: "Exclusive 3D & Vector Logos",
    category: "EXCLUSIVE LOGO DESIGN",
    desc: "Sculpted 3D liquid chrome wordmarks, competitive esports team crests, cyberpunk monograms, and corporate identities designed to establish immediate brand authority.",
    badge: "12 Showcase Works",
    points: [
      "Bespoke 3D chrome textures, specular highlights & geometric esport mascot lines.",
      "Complete brand kit: Transparent PNG, scalable SVG vector, and editable source files.",
      "Matching Discord server icon, avatar crop, and watermark badges included."
    ]
  },
  {
    title: "Storefront & Community Banners",
    category: "WEB & DISCORD BANNERS",
    desc: "Full-width website headers, Discord server banners, forum signature graphics, and social media banners featuring volumetric lighting, floating 3D props, and balanced typography.",
    badge: "7 Showcase Works",
    points: [
      "Precise responsive aspect ratios for Web, Discord, Twitter/X, and marketplaces.",
      "Layered cyberpunk aesthetics, cinematic particle effects, and customer trust badges.",
      "Delivered with rapid turnaround and all requested resolution crops."
    ]
  },
  {
    title: "Bespoke Brand & Delivery Graphics",
    category: "BESPOKE BRAND GRAPHICS",
    desc: "Custom delivery confirmation slips, 3D character social media flyers, 5-star customer review graphics, and promotional event artwork tailored to your community's identity.",
    badge: "4 Showcase Works",
    points: [
      "Engaging customer onboarding cards with warranty and trust badges.",
      "Eye-catching 3D character illustrations crafted for social promotions.",
      "Delivered in layered PSD format ready for instant deployment."
    ]
  }
];

const DESIGN_STACK = [
  { name: "Photoshop", img: stPhotoshop },
  { name: "Illustrator", img: stIllustrator },
  { name: "Figma", img: stFigma },
  { name: "After Effects", img: stAfterEffects },
  { name: "Blender 3D", img: stBlender },
  { name: "GSAP Motion", img: stGsap },
  { name: "Motion Pro", img: stMotion },
  { name: "Rive", img: stRive },
];

const SOCIALS = [
  { label: "Discord: .xentora", href: DISCORD_USER_URL, ext: true, img: xPvc },
  { label: "Discord Community", href: DISCORD_SERVER_URL, ext: true, img: linkedinPvc },
  { label: `Email: ${STUDIO_EMAIL}`, href: `mailto:${STUDIO_EMAIL}`, img: resumePvc },
];

const NAV_LINKS = [
  { id: "work", label: "Works (37)" },
  { id: "services", label: "Services" },
  { id: "about", label: "Studio" },
  { id: "contact", label: "Contact" },
];

/* ================================================================== */
/*  SITE NAVIGATION BAR                                               */
/* ================================================================== */

function SiteNav({ onOpenMenu }: { onOpenMenu: () => void }) {
  const [shrunk, setShrunk] = useState(false);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => {
      setShrunk(window.scrollY > 40);
      const ids = ["contact", "about", "services", "work"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) {
          setActive(id);
          return;
        }
      }
      setActive("top");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header className={`stageNav${shrunk ? " shrunk" : ""}`}>
      <div className="navInner">
        <a className="navBrand brandPull" href="#top" onClick={(e) => { e.preventDefault(); scrollTo("top"); }} aria-label="Xentora, home">
          <span style={{ display: "inline-flex", alignItems: "center", gap: "9px" }}>
            <img src={xentoraLogo} alt="Xentora Logo" style={{ width: "32px", height: "32px", objectFit: "contain" }} draggable={false} />
            <span style={{ fontFamily: "Shantell Sans, cursive", fontWeight: 800, fontSize: "22px", letterSpacing: "0.02em", color: "#111" }}>XENTORA</span>
          </span>
        </a>

        <nav className="navCenter showDesk" aria-label="Sections">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              className={`navlink${active === link.id ? " active" : ""}`}
              href={`#${link.id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navRight">
          <button className="navMenuBtn showDesk" onClick={onOpenMenu} aria-label="Open command menu">
            <span>Menu</span>
            <span className="kbdHint"><kbd>⌘</kbd><kbd>K</kbd></span>
          </button>
          <a
            className="navTalk showDesk"
            href={DISCORD_USER_URL}
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <span>Order Design</span>
            <ArrowIcon />
          </a>
          <button className="navHamburger showMd" onClick={onOpenMenu} aria-label="Open menu">
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="#111" strokeWidth="2.4" strokeLinecap="round">
              <path d="M1 1.5h20M1 7h20M1 12.5h20" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

/* ================================================================== */
/*  QUICK COMMAND MENU (⌘K)                                            */
/* ================================================================== */

function QuickMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={`quickMenu${open ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Site menu" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="quickCard">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <span style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#6a6253", fontWeight: 700 }}>
            Navigation &amp; Inquiries
          </span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#6a6253" }}>✕</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <a className="quickItem" href="#work" onClick={() => { onClose(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}>
            <span>📁 Portfolio Works (37)</span>
            <kbd>W</kbd>
          </a>
          <a className="quickItem" href="#services" onClick={() => { onClose(); document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }); }}>
            <span>⚡ Services &amp; Capabilities</span>
            <kbd>S</kbd>
          </a>
          <a className="quickItem" href="#about" onClick={() => { onClose(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}>
            <span>🎨 About The Studio</span>
            <kbd>A</kbd>
          </a>
          <a className="quickItem" href="#contact" onClick={() => { onClose(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
            <span>📬 Contact &amp; Pricing</span>
            <kbd>C</kbd>
          </a>
          <a className="quickItem" href={DISCORD_USER_URL} target="_blank" rel="noreferrer" style={{ background: "rgba(88, 101, 242, 0.12)", color: "#5865F2", fontWeight: 700 }}>
            <span>💬 Message on Discord (.xentora)</span>
            <ArrowIcon />
          </a>
          <a className="quickItem" href={DISCORD_SERVER_URL} target="_blank" rel="noreferrer" style={{ background: "rgba(88, 101, 242, 0.08)", color: "#5865F2" }}>
            <span>🌐 Join Discord Community Server</span>
            <ArrowIcon />
          </a>
          <a className="quickItem" href={`mailto:${STUDIO_EMAIL}`}>
            <span>✉️ Email: {STUDIO_EMAIL}</span>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  HERO SECTION — MODERNIZED STUDIO HIGHLIGHTS (NO FAN DECK)         */
/* ================================================================== */

function Hero() {
  return (
    <div className="heroStage" id="top">
      <GlobalDefs />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Availability status badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "18px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "rgba(255, 255, 255, 0.8)",
              border: "1px solid rgba(40, 34, 22, 0.15)",
              boxShadow: "0 6px 16px -6px rgba(45, 40, 32, 0.15)",
              fontSize: "12px",
              fontFamily: "Space Mono, monospace",
              fontWeight: 700,
              color: "#242018",
            }}
          >
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
            <span>Available for Commissions &bull; Fast Delivery</span>
          </div>
        </div>

        {/* 3D Latex Balloon Wordmark */}
        <div style={{ maxWidth: "860px", margin: "0 auto 24px" }}>
          <Wordmark />
        </div>

        {/* Hero Narrative Copy */}
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto" }}>
          <p className="heroNote" style={{ fontSize: "clamp(16px, 1.4vw, 20px)", lineHeight: "1.6", color: "#3a3429", marginBottom: "26px" }}>
            Boutique creative studio crafting <U color={BLUE}>commercial ad posters</U>, exclusive <U color={ORANGE}>3D chrome logos</U>, and high-impact web &amp; Discord banners.
          </p>

          {/* Action CTAs: Direct Discord + Community */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", marginBottom: "38px" }}>
            <a
              href={DISCORD_USER_URL}
              target="_blank"
              rel="noreferrer"
              className="heroBtn"
              style={{
                background: "#5865F2",
                color: "#ffffff",
                borderRadius: "999px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 26px",
                fontFamily: "Space Mono, monospace",
                fontSize: "13px",
                fontWeight: 700,
                boxShadow: "0 14px 28px -8px rgba(88, 101, 242, 0.45)"
              }}
            >
              <span>Message on Discord (.xentora)</span>
              <ArrowIcon />
            </a>
            <a
              href={DISCORD_SERVER_URL}
              target="_blank"
              rel="noreferrer"
              className="heroBtn"
              style={{
                background: "#ffffff",
                color: INK,
                border: "1.5px solid rgba(40,34,22,0.2)",
                borderRadius: "999px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                fontFamily: "Space Mono, monospace",
                fontSize: "13px",
                fontWeight: 700
              }}
            >
              <span>Join Discord Server</span>
              <ArrowIcon />
            </a>
            <a
              href="#work"
              className="heroBtn"
              style={{
                background: INK,
                color: "#faf7ef",
                borderRadius: "999px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                fontFamily: "Space Mono, monospace",
                fontSize: "13px",
                fontWeight: 700
              }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>Browse Portfolio ↓</span>
            </a>
          </div>

          {/* Modernized Studio Metric Highlights Bar (Image 3 fix) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "12px",
              background: "radial-gradient(120% 110% at 38% 12%, #fefdf9 0%, #f4eee2 55%, #dfd5c2 100%)",
              borderRadius: "24px",
              padding: "16px 20px",
              border: "1.5px solid rgba(255, 255, 255, 0.8)",
              boxShadow: "0 18px 36px -16px rgba(45, 40, 32, 0.28), inset 0 2px 4px #ffffff",
              maxWidth: "720px",
              margin: "0 auto 18px",
            }}
          >
            <div style={{ textAlign: "center", padding: "6px" }}>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "18px", fontWeight: 800, color: BLUE }}>24–48h</div>
              <div style={{ fontSize: "11px", color: "#6e6657", fontFamily: "Space Mono, monospace", fontWeight: 600 }}>Fast Turnaround</div>
            </div>
            <div style={{ textAlign: "center", padding: "6px" }}>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "18px", fontWeight: 800, color: ORANGE }}>37+</div>
              <div style={{ fontSize: "11px", color: "#6e6657", fontFamily: "Space Mono, monospace", fontWeight: 600 }}>Crafted Designs</div>
            </div>
            <div style={{ textAlign: "center", padding: "6px" }}>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "18px", fontWeight: 800, color: "#10b981" }}>100%</div>
              <div style={{ fontSize: "11px", color: "#6e6657", fontFamily: "Space Mono, monospace", fontWeight: 600 }}>Client Satisfaction</div>
            </div>
            <div style={{ textAlign: "center", padding: "6px" }}>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "18px", fontWeight: 800, color: "#8b5cf6" }}>Layered</div>
              <div style={{ fontSize: "11px", color: "#6e6657", fontFamily: "Space Mono, monospace", fontWeight: 600 }}>PSD &amp; Ultra-HD PNG</div>
            </div>
          </div>

          {/* Interactive Inflatable Prop from YashB */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "10px" }}>
            <span style={{ fontSize: "11px", fontFamily: "Space Mono, monospace", color: "#8a8170" }}>
              Squeezable Studio Prop &rarr;
            </span>
            <img
              src={heroCone}
              alt="Inflatable Cone"
              draggable={false}
              data-squish="0.8"
              onClick={() => playBombPop()}
              style={{ width: "32px", height: "32px", cursor: "pointer", verticalAlign: "middle" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  WORKS GALLERY — CATEGORIES ONLY, NO 'ALL', ANIMATED PROMPT         */
/* ================================================================== */

function WorkPage({ onItemClick }: { onItemClick: (item: GalleryItem) => void }) {
  // Initial state is null: user MUST click a category to load its items (Image 4 fix)
  const [filter, setFilter] = useState<string | null>(null);

  const categories = [
    { id: "poster", label: "Ad Posters (14)", count: 14, icon: "🖼️", badge: "AD POSTERS" },
    { id: "logo", label: "Signature Logos (12)", count: 12, icon: "💎", badge: "LOGOS" },
    { id: "banner", label: "Web & Discord Banners (7)", count: 7, icon: "🌌", badge: "BANNERS" },
    { id: "other", label: "Other Works (4)", count: 4, icon: "✨", badge: "OTHER" },
  ];

  const filtered = filter
    ? ALL_37_WORKS.filter((it) => {
        if (filter === "poster") return it.cat === "Poster";
        if (filter === "logo") return it.cat === "Logo";
        if (filter === "banner") return it.cat === "Banner";
        if (filter === "other") return it.cat === "Other";
        return false;
      })
    : [];

  const handleSelectCategory = (catId: string) => {
    playBombPop();
    setFilter(catId);
  };

  const currentCategory = categories.find(c => c.id === filter);

  return (
    <section className="aboutSection" id="work" aria-label="Selected Works" style={{ paddingTop: "80px", paddingBottom: "100px" }}>
      <div className="container">
        <SecTag n={1} label="Portfolio Works (37)" />
        <h2 className="pageHead" style={{ fontFamily: "Shantell Sans, cursive", fontSize: "clamp(32px, 4vw, 54px)", fontWeight: 800, color: "#141414", lineHeight: 1.15, marginBottom: "16px" }}>
          <Words text={"Commercial ad posters,\nlogos, banners & graphics."} />
        </h2>
        <p className="pageLede" data-rv="" ref={reveal} style={{ fontSize: "clamp(15px, 1.2vw, 18px)", color: "#544e43", maxWidth: "44em", lineHeight: 1.6, ...rvDelay(180) }}>
          Choose a category below to browse our official collection. Click any card to expand full high-resolution previews and specifications.
        </p>

        {/* Category Filter Pills (NO 'ALL' TAB as requested by user in Image 4) */}
        <div data-rv="" ref={reveal} style={{ display: "flex", flexWrap: "wrap", gap: "10px", margin: "32px 0 28px", ...rvDelay(240) }}>
          {categories.map((tab) => {
            const isSelected = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleSelectCategory(tab.id)}
                style={{
                  padding: "10px 22px",
                  borderRadius: "999px",
                  border: isSelected ? `2px solid ${INK}` : "1.5px solid rgba(40,34,22,0.18)",
                  background: isSelected ? INK : "rgba(255,255,255,0.85)",
                  color: isSelected ? "#fff" : "#1a1714",
                  fontFamily: "Space Mono, monospace",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                  boxShadow: isSelected ? "0 8px 18px -4px rgba(17,17,17,0.35)" : "none",
                  transform: isSelected ? "translateY(-2px)" : "none",
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* If no category is clicked yet, show an interactive animated prompt (Image 4 fix) */}
        {!filter && (
          <div
            style={{
              background: "radial-gradient(120% 110% at 38% 12%, #fefdf9 0%, #f4eee2 55%, #dfd5c2 100%)",
              borderRadius: "32px",
              padding: "48px 24px",
              textAlign: "center",
              boxShadow: "0 28px 50px -20px rgba(45,40,32,0.35), inset 0 2px 6px rgba(255,255,255,0.9)",
              border: "1.5px solid rgba(255,255,255,0.8)",
              margin: "20px 0 40px",
            }}
          >
            <div style={{ fontSize: "36px", marginBottom: "12px", animation: "tagWiggle 1.8s infinite" }}>
              👇
            </div>
            <h3 style={{ fontFamily: "Shantell Sans, cursive", fontSize: "24px", fontWeight: 800, color: "#141414", marginBottom: "10px" }}>
              Select a category above to view designs
            </h3>
            <p style={{ color: "#6a6253", fontFamily: "Space Mono, monospace", fontSize: "13px", maxWidth: "560px", margin: "0 auto 30px", lineHeight: "1.6" }}>
              Designs are organized strictly into 4 distinct disciplines. Click a category button above or pick one of the tiles below to reveal our work:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", maxWidth: "880px", margin: "0 auto" }}>
              {categories.map((c) => (
                <div
                  key={c.id}
                  onClick={() => handleSelectCategory(c.id)}
                  style={{
                    background: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "20px",
                    padding: "20px 16px",
                    cursor: "pointer",
                    border: "1.5px solid rgba(40, 34, 22, 0.12)",
                    boxShadow: "0 10px 24px -10px rgba(45, 40, 32, 0.2)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 18px 32px -12px rgba(45, 40, 32, 0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "0 10px 24px -10px rgba(45, 40, 32, 0.2)";
                  }}
                >
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>{c.icon}</div>
                  <div style={{ fontFamily: "Shantell Sans, cursive", fontSize: "16px", fontWeight: 800, color: "#141414", marginBottom: "4px" }}>
                    {c.label}
                  </div>
                  <span style={{ fontSize: "11px", color: BLUE, fontFamily: "Space Mono, monospace", fontWeight: 700 }}>
                    Load Collection &rarr;
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* When a category is active: show active header + customized grid */}
        {filter && (
          <div>
            {/* Category Status Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", padding: "0 4px" }}>
              <span style={{ fontFamily: "Space Mono, monospace", fontSize: "13px", fontWeight: 700, color: "#4f4738" }}>
                Showing {filtered.length} {currentCategory?.label}
              </span>
              <button
                onClick={() => setFilter(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#7a7161",
                  fontFamily: "Space Mono, monospace",
                  fontSize: "12px",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Close Category ✕
              </button>
            </div>

            {/* Grid layout dynamically adapting to category (Image 1 fix for banners) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: filter === "banner"
                  ? "repeat(auto-fill, minmax(360px, 1fr))"
                  : filter === "logo"
                  ? "repeat(auto-fill, minmax(280px, 1fr))"
                  : "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              {filtered.map((item, idx) => {
                const isLogo = item.cat === "Logo";
                const isBanner = item.cat === "Banner";
                const isPoster = item.cat === "Poster";
                const mediaAspect = isBanner ? "16/6" : isLogo ? "1/1" : isPoster ? "16/10" : "16/11";
                const mediaFit = isLogo ? "contain" : "cover";
                const mediaBg = isLogo
                  ? "radial-gradient(130% 120% at 50% 20%, #1c1d24 0%, #0d0e12 100%)"
                  : "#0c0d10";

                return (
                  <article
                    key={item.id}
                    data-rv=""
                    ref={reveal}
                    style={{
                      ...rvDelay((idx % 6) * 50),
                      background: "radial-gradient(120% 110% at 36% 12%, #fefdf9 0%, #f4efe5 52%, #e2d9c7 100%)",
                      borderRadius: "26px",
                      padding: "12px 12px 14px",
                      boxShadow: "0 22px 42px -18px rgba(45,40,32,0.36), inset 0 2px 5px rgba(255,255,255,0.9), inset 0 -3px 6px rgba(150,138,116,0.22)",
                      border: "1px solid rgba(255,255,255,0.7)",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease",
                    }}
                    className="projCard isLink"
                    onClick={() => onItemClick(item)}
                  >
                    {/* Media Container matching exact aspect ratio with zero black bars */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: mediaAspect,
                        borderRadius: "18px",
                        overflow: "hidden",
                        background: mediaBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "inset 0 2px 8px rgba(40,34,22,0.3), inset 0 0 0 1px rgba(255,255,255,0.12)",
                        padding: isLogo ? "18px" : "0",
                      }}
                    >
                      <img
                        src={item.img}
                        alt={item.t}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: mediaFit,
                          transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                        className="hoverZoom"
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: "10px",
                          left: "10px",
                          background: item.badgeBg,
                          color: "#fff",
                          backdropFilter: "blur(8px)",
                          padding: "3px 10px",
                          borderRadius: "999px",
                          fontSize: "10.5px",
                          fontFamily: "Space Mono, monospace",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.35)",
                        }}
                      >
                        {item.badge}
                      </span>
                    </div>

                    {/* Card Meta Content with tight padding preventing empty space (Image 1 fix) */}
                    <div style={{ padding: "12px 6px 4px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <h3
                        style={{
                          fontFamily: "Shantell Sans, cursive",
                          fontSize: "15px",
                          fontWeight: 800,
                          color: "#161412",
                          marginBottom: "6px",
                          lineHeight: "1.3",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {item.t}
                      </h3>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "8px" }}>
                        <span style={{ fontSize: "11px", color: "#6a6253", fontFamily: "Space Mono, monospace", fontWeight: 600 }}>
                          {item.catLabel} &bull; {item.tags[0]}
                        </span>
                        <span
                          style={{
                            color: BLUE,
                            fontSize: "11px",
                            fontWeight: 700,
                            fontFamily: "Space Mono, monospace",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          Enlarge <ArrowIcon />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  SERVICES SECTION (WHAT WE SELL)                                   */
/* ================================================================== */

function ServicesSection() {
  return (
    <section className="expSection" id="services" aria-label="Services We Offer" style={{ paddingTop: "80px", paddingBottom: "100px" }}>
      <div className="container">
        <SecTag n={2} label="Services &amp; Capabilities" />
        <h2 className="pageHead" style={{ fontFamily: "Shantell Sans, cursive", fontSize: "clamp(32px, 4vw, 54px)", fontWeight: 800, color: "#141414", lineHeight: 1.15, marginBottom: "16px" }}>
          <Words text={"What we design and deliver\nfor your server & brand."} />
        </h2>
        <p className="pageLede" data-rv="" ref={reveal} style={{ fontSize: "clamp(15px, 1.2vw, 18px)", color: "#544e43", maxWidth: "42em", lineHeight: 1.6, ...rvDelay(180) }}>
          From high-converting ad posters and display banners to vector brand logos and digital graphics — delivered in 24–48 hours.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginTop: "40px" }}>
          {SERVICES.map((s, idx) => (
            <div
              key={s.title}
              data-rv=""
              ref={reveal}
              style={{
                ...rvDelay(idx * 90),
                background: "radial-gradient(120% 130% at 38% 14%, #fefdf9 0%, #f1ece1 60%, #e2d8c6 100%)",
                borderRadius: "26px",
                padding: "28px 22px",
                border: "1.5px solid rgba(255,255,255,0.85)",
                boxShadow: "0 18px 36px -18px rgba(45,40,32,0.3), inset 0 2px 4px #fff",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <span style={{ fontSize: "11px", fontFamily: "Space Mono, monospace", fontWeight: 700, color: ORANGE, letterSpacing: "0.12em", marginBottom: "8px" }}>
                {s.category}
              </span>
              <h3 style={{ fontFamily: "Shantell Sans, cursive", fontSize: "20px", fontWeight: 800, color: "#141414", marginBottom: "10px", lineHeight: 1.25 }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "13px", color: "#4f493e", lineHeight: 1.6, marginBottom: "18px", flexGrow: 1 }}>
                {s.desc}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0", display: "flex", flexDirection: "column", gap: "8px" }}>
                {s.points.map((pt, pi) => (
                  <li key={pi} style={{ fontSize: "12px", color: "#36322b", display: "flex", alignItems: "flex-start", gap: "8px", lineHeight: 1.4 }}>
                    <span style={{ color: BLUE, fontWeight: "bold" }}>◆</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <a
                href={DISCORD_USER_URL}
                target="_blank"
                rel="noreferrer"
                style={{
                  alignSelf: "flex-start",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  fontWeight: 700,
                  fontFamily: "Space Mono, monospace",
                  color: INK,
                  textDecoration: "none",
                  borderBottom: `2px solid ${BLUE}`,
                  paddingBottom: "2px"
                }}
              >
                Inquire on Discord (.xentora) &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  ABOUT SECTION — BALANCED NARRATIVE (RIGHT LOGO BOX REMOVED)       */
/* ================================================================== */

function AboutSection() {
  return (
    <section className="aboutSection" id="about" aria-label="About Xentora Studio" style={{ paddingTop: "80px", paddingBottom: "100px" }}>
      <div className="container">
        <SecTag n={3} label="The Studio" />
        {/* Clean, balanced layout with right-hand logo box removed as requested in Image 5 */}
        <div style={{ maxWidth: "860px", margin: "24px 0" }}>
          <h2 className="aboutHead" style={{ fontSize: "clamp(32px, 4.2vw, 52px)", lineHeight: "1.15", marginBottom: "20px" }}>
            We design bespoke commercial graphics that demand instant attention.
          </h2>
          <p className="aboutCopy" style={{ fontSize: "clamp(15px, 1.25vw, 18px)", lineHeight: "1.7", color: "#4f493e", marginBottom: "28px" }}>
            Xentora is a boutique digital graphics studio dedicated to game servers, e-commerce stores, Discord communities, and creators. We combine heavy 3D typography, volumetric lighting, and commercial visual hierarchy into pixel-perfect deliverables.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "40px" }}>
            <a
              href={DISCORD_USER_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#5865F2",
                color: "#ffffff",
                padding: "12px 26px",
                borderRadius: "999px",
                fontFamily: "Space Mono, monospace",
                fontSize: "13px",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 12px 24px -8px rgba(88,101,242,0.4)"
              }}
            >
              <span>Connect on Discord (.xentora)</span>
              <ArrowIcon />
            </a>
            <a
              href={DISCORD_SERVER_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#ffffff",
                color: INK,
                border: "1.5px solid rgba(40,34,22,0.2)",
                padding: "12px 24px",
                borderRadius: "999px",
                fontFamily: "Space Mono, monospace",
                fontSize: "13px",
                fontWeight: 700,
                textDecoration: "none"
              }}
            >
              <span>Join Discord Server</span>
              <ArrowIcon />
            </a>
          </div>
        </div>

        {/* Tech Stack Pills from YashB */}
        <div style={{ marginTop: "32px" }}>
          <span style={{ fontSize: "11.5px", fontFamily: "Space Mono, monospace", color: "#6a6253", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "14px", fontWeight: 700 }}>
            // OUR CREATIVE SUITE
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {DESIGN_STACK.map((item) => (
              <div
                key={item.name}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "999px",
                  background: "rgba(255, 255, 255, 0.75)",
                  border: "1px solid rgba(40, 34, 22, 0.14)",
                  boxShadow: "0 4px 10px -4px rgba(45, 40, 32, 0.15)",
                }}
              >
                <img src={item.img} alt={item.name} style={{ width: "24px", height: "24px", objectFit: "contain" }} />
                <span style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", fontWeight: 700, color: "#2c2823" }}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CONTACT SECTION (FOOTER WITH DISCORD & VERIFIED EMAIL)            */
/* ================================================================== */

function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(STUDIO_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <footer className="expSection" id="contact" aria-label="Contact &amp; Inquiries" style={{ paddingTop: "80px", paddingBottom: "60px", background: "#efece4" }}>
      <div className="container">
        <SecTag n={4} label="Get In Touch" />
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px" }}>
          <h2 style={{ fontFamily: "Shantell Sans, cursive", fontSize: "clamp(34px, 5vw, 60px)", fontWeight: 800, color: "#141414", lineHeight: 1.1, marginBottom: "16px" }}>
            Ready to upgrade your visuals?
          </h2>
          <p style={{ fontSize: "clamp(15px, 1.2vw, 18px)", color: "#544e43", lineHeight: 1.6, marginBottom: "32px" }}>
            Have a project in mind? Reach out on Discord directly or join our server to get an immediate quote and timeline.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            <a
              href={DISCORD_USER_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#5865F2",
                color: "#ffffff",
                textDecoration: "none",
                borderRadius: "999px",
                padding: "14px 30px",
                fontFamily: "Space Mono, monospace",
                fontSize: "13px",
                fontWeight: 700,
                boxShadow: "0 14px 28px -10px rgba(88,101,242,0.5)"
              }}
            >
              <span>Discord: .xentora</span>
              <ArrowIcon />
            </a>
            <a
              href={DISCORD_SERVER_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: INK,
                color: "#faf7ef",
                textDecoration: "none",
                borderRadius: "999px",
                padding: "14px 26px",
                fontFamily: "Space Mono, monospace",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              <span>Join Discord Server</span>
              <ArrowIcon />
            </a>
            <button
              onClick={handleCopyEmail}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#ffffff",
                color: INK,
                border: "1.5px solid rgba(40,34,22,0.2)",
                borderRadius: "999px",
                padding: "14px 24px",
                fontFamily: "Space Mono, monospace",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <span>{copied ? "✓ Copied Email!" : `Email: ${STUDIO_EMAIL}`}</span>
            </button>
          </div>
        </div>

        {/* PVC Social Badges */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", padding: "32px 0", borderTop: "1px solid rgba(40,34,22,0.12)", borderBottom: "1px solid rgba(40,34,22,0.12)", margin: "40px 0" }}>
          {SOCIALS.map((soc) => (
            <a
              key={soc.label}
              href={soc.href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                color: "#2c2823",
                fontFamily: "Space Mono, monospace",
                fontSize: "12.5px",
                fontWeight: 700,
                padding: "8px 18px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(40,34,22,0.14)",
                boxShadow: "0 6px 14px -6px rgba(45,40,32,0.18)"
              }}
            >
              <img src={soc.img} alt="" style={{ width: "20px", height: "20px", objectFit: "contain" }} />
              <span>{soc.label}</span>
              <ArrowIcon />
            </a>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", fontSize: "12px", color: "#6a6253", fontFamily: "Space Mono, monospace" }}>
          <span>&copy; {new Date().getFullYear()} Xentora Studio. All rights reserved.</span>
          <span>Boutique Commercial Graphics &bull; Fast Delivery</span>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  EXPANSIVE LIGHTBOX MODAL (100% IN ENGLISH WITH DISCORD BUTTONS)   */
/* ================================================================== */

function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(10, 10, 14, 0.94)",
        backdropFilter: "blur(14px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
      onClick={onClose}
    >
      <div
        style={{
          maxWidth: "1050px",
          width: "100%",
          maxHeight: "92vh",
          background: "#16151c",
          borderRadius: "28px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 40px 90px rgba(0,0,0,0.85)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)", background: "#111016" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ background: item.badgeBg, color: "#fff", padding: "4px 12px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, fontFamily: "Space Mono, monospace" }}>
              {item.badge}
            </span>
            <span style={{ color: "#fff", fontFamily: "Shantell Sans, cursive", fontSize: "18px", fontWeight: 700 }}>
              {item.t}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px"
            }}
          >
            ✕
          </button>
        </div>

        {/* Image Center View */}
        <div style={{ flexGrow: 1, overflow: "auto", display: "flex", justifyContent: "center", alignItems: "center", padding: "24px", background: "#0a090e", minHeight: "360px" }}>
          <img src={item.img} alt={item.t} style={{ maxWidth: "100%", maxHeight: "65vh", objectFit: "contain", borderRadius: "12px" }} />
        </div>

        {/* Bottom Details & Direct Discord CTAs */}
        <div style={{ padding: "18px 24px", borderTop: "1px solid rgba(255,255,255,0.1)", background: "#111016", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ color: "#a5a3b2", fontSize: "13.5px", maxWidth: "600px", margin: "0 0 6px 0" }}>
              {item.d}
            </p>
            <span style={{ fontSize: "11.5px", color: "#6a6253", fontFamily: "Space Mono, monospace" }}>
              Category: {item.catLabel} &bull; Delivery: 24–48 Hours &bull; Deliverables: Layered PSD + Ultra-HD PNG
            </span>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a
              href={DISCORD_USER_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#5865F2",
                color: "#fff",
                textDecoration: "none",
                padding: "10px 22px",
                borderRadius: "999px",
                fontFamily: "Space Mono, monospace",
                fontSize: "12.5px",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              Order on Discord (.xentora) <ArrowIcon />
            </a>
            <a
              href={DISCORD_SERVER_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                textDecoration: "none",
                padding: "10px 18px",
                borderRadius: "999px",
                fontFamily: "Space Mono, monospace",
                fontSize: "12.5px",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              Join Server <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  MAIN APP ENTRY POINT                                              */
/* ================================================================== */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <div className="portfolioApp" style={{ minHeight: "100vh", background: "#efece4" }}>
      <SiteNav onOpenMenu={() => setMenuOpen(true)} />
      <QuickMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <Hero />
        <WorkPage onItemClick={(item) => setSelectedItem(item)} />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>

      {selectedItem && (
        <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
