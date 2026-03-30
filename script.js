/* ══════════════════════════════════════════════════════════════
   BADBOYS GROCERIES V2 — script.js
   Full stack: Three.js hero · GSAP scroll storytelling · Lenis
   Supabase Google Auth · Products API · Cart · Checkout · Admin
   ══════════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────────────────────
   1. CONFIG
   ─────────────────────────────────────────────────────────────
   Replace these with your actual Supabase credentials:
   https://supabase.com/dashboard → Settings → API
   ───────────────────────────────────────────────────────────── */
const SUPABASE_URL  = 'https://wfrjoclfymtglpjvqkuk.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmcmpvY2xmeW10Z2xwanZxa3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjI2ODksImV4cCI6MjA5MDQzODY4OX0.A8XaVgwdtQ9YJm6Zll0RbAtXbfpiBfRr4MAKr2OdUw0';
const BACKEND_URL   = 'http://localhost:3001'; // Node.js backend

/* ─────────────────────────────────────────────────────────────
   2. PRODUCTS DATA (used as primary source — no Supabase needed)
   ───────────────────────────────────────────────────────────── */
const PRODUCTS_DATA = [
  {id:1, name:'Cyber Apple', price:45, category:'fruits', stock:120,
   description:'Nano-enhanced Fuji apples from the hydroponic towers of Neo-Mumbai.',
   image_url:'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500&q=80'},
  {id:2, name:'Quantum Mango', price:120, category:'fruits', stock:80,
   description:'Premium Alphonso mangoes irradiated for peak bio-ripeness.',
   image_url:'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&q=80'},
  {id:3, name:'Synth Banana', price:40, category:'fruits', stock:200,
   description:'Molecularly-structured Cavendish. Potassium levels off-chart.',
   image_url:'https://images.unsplash.com/photo-1543218024-57a70143c369?w=500&q=80'},
  {id:4, name:'Pixel Berries', price:180, category:'fruits', stock:55,
   description:'Mixed antioxidant berries — lab-certified freshness.',
   image_url:'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=500&q=80'},
  {id:5, name:'Neon Broccoli', price:60, category:'veggies', stock:90,
   description:'Bioluminescent-grade organic broccoli packed with synth-vitamins.',
   image_url:'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&q=80'},
  {id:6, name:'Pixel Tomatoes', price:50, category:'veggies', stock:150,
   description:'Vine-ripened in LED farms. Resolution: 4K flavor output.',
   image_url:'https://images.unsplash.com/photo-1471194402529-8e0f5cf8d51f?w=500&q=80'},
  {id:7, name:'Matrix Spinach', price:75, category:'veggies', stock:110,
   description:'Iron-fortified nano-spinach. Grown in zero-G orbital stations.',
   image_url:'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&q=80'},
  {id:8, name:'Cyber Carrots', price:55, category:'veggies', stock:180,
   description:'Beta-carotene enhanced. Crunch rated 9.8 on the Mohs scale.',
   image_url:'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=500&q=80'},
  {id:9, name:'Holo Milk', price:55, category:'dairy', stock:75,
   description:'Ultra-pasteurized, zero-lag delivery. Full-fat cyber grade.',
   image_url:'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80'},
  {id:10, name:'Zero Cheese', price:180, category:'dairy', stock:40,
   description:'Cryo-vault aged for 60 days. Sharp and cyber-smooth texture.',
   image_url:'https://images.unsplash.com/photo-1486297678162-eb2a19b0a318?w=500&q=80'},
  {id:11, name:'Volt Yoghurt', price:95, category:'dairy', stock:65,
   description:'Probiotic-enhanced live culture yoghurt with neon berry swirl.',
   image_url:'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&q=80'},
  {id:12, name:'Plasma Chips', price:35, category:'snacks', stock:300,
   description:'Fried in arc-energy oil. Crunch intensity: maximum overdrive.',
   image_url:'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&q=80'},
  {id:13, name:'Dark Matter Bar', price:65, category:'snacks', stock:220,
   description:'40g protein per bar — forged in the void. Zero sugar.',
   image_url:'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=500&q=80'},
  {id:14, name:'Reactor Nuts', price:120, category:'snacks', stock:85,
   description:'Mixed premium nuts charged with nano-selenium. High energy.',
   image_url:'https://images.unsplash.com/photo-1536591375849-f63e67bae4f8?w=500&q=80'},
  {id:15, name:'Grid Coffee', price:299, category:'beverages', stock:50,
   description:'Arabica beans processed in zero-G labs. Brews at warp speed.',
   image_url:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80'},
  {id:16, name:'Volt Energy', price:80, category:'beverages', stock:180,
   description:'Electrolyte surge in every can. 100ms reaction time boost.',
   image_url:'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=500&q=80'},
  {id:17, name:'Neon OJ', price:90, category:'beverages', stock:120,
   description:'Cold-pressed in fluorescent orchards of New Goa. 100% real.',
   image_url:'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&q=80'},
  {id:18, name:'Cyber Rice', price:85, category:'grains', stock:200,
   description:'Basmati aged in sealed vaults. Extra long grain, zero impurities.',
   image_url:'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80'},
  {id:19, name:'Quantum Wheat', price:70, category:'grains', stock:150,
   description:'Fortified whole wheat flour from orbital greenhouses.',
   image_url:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80'},
  {id:20, name:'Matrix Oats', price:110, category:'grains', stock:90,
   description:'Rolled in nano-mills. Steel-cut precision. High beta-glucan.',
   image_url:'https://images.unsplash.com/photo-1505253304499-671c55fb57fe?w=500&q=80'},
];

/* ─────────────────────────────────────────────────────────────
   3. APP STATE
   ───────────────────────────────────────────────────────────── */
const STATE = {
  cart: JSON.parse(localStorage.getItem('bb_v2_cart') || '[]'),
  products: [],
  filtered: [],
  currentFilter: 'all',
  searchQuery: '',
  currentPage: 0,
  pageSize: 8,
  storyIndex: 0,
  modalProduct: null,
  modalQty: 1,
  user: null,
  supabase: null,
};

/* ─────────────────────────────────────────────────────────────
   4. UTILITIES
   ───────────────────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const fmt = n => `₹${parseFloat(n).toFixed(2)}`;
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

function toast(msg, type = 'info') {
  const el = document.createElement('div');
  el.className = `toast ${type === 'success' ? 'ok' : type === 'error' ? 'err' : ''}`;
  el.textContent = msg;
  $('#toastWrap').appendChild(el);
  setTimeout(() => el.remove(), 3300);
}

function openModal(id) { $(`#${id}`).classList.add('open'); }
function closeModal(id) { $(`#${id}`).classList.remove('open'); }

/* ─────────────────────────────────────────────────────────────
   5. LOADER
   ───────────────────────────────────────────────────────────── */
function runLoader(onDone) {
  const fill = $('#loaderProgress');
  const pct  = $('#loaderPct');
  let p = 0;

  const tick = setInterval(() => {
    p += Math.random() * 14 + 3;
    if (p >= 100) { p = 100; clearInterval(tick); finish(); }
    fill.style.width = p + '%';
    pct.textContent  = String(Math.round(p)).padStart(3, '0');
  }, 100);

  function finish() {
    setTimeout(() => {
      gsap.to('#loader', {
        opacity: 0, duration: .6, ease: 'power2.out',
        onComplete() {
          $('#loader').style.display = 'none';
          document.body.classList.remove('loading');
          onDone();
        }
      });
    }, 300);
  }
}

/* ─────────────────────────────────────────────────────────────
   6. LENIS SMOOTH SCROLL
   ───────────────────────────────────────────────────────────── */
let lenis;
function initLenis() {
  if (typeof Lenis === 'undefined') {
    console.warn('[Lenis] not loaded — using native scroll');
    return;
  }
  lenis = new Lenis({
    duration: 1.3,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.8,
  });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  // Connect with ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ─────────────────────────────────────────────────────────────
   7. CUSTOM CURSOR
   ───────────────────────────────────────────────────────────── */
function initCursor() {
  const inner = $('#cursor-inner');
  const outer = $('#cursor-outer');
  let ix = 0, iy = 0, ox = 0, oy = 0, mx = 0, my = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function track() {
    ix += (mx - ix) * 0.15;
    iy += (my - iy) * 0.15;
    ox += (mx - ox) * 0.10;
    oy += (my - oy) * 0.10;
    inner.style.left = mx + 'px';  inner.style.top = my + 'px';
    outer.style.left = ox + 'px';  outer.style.top = oy + 'px';
    requestAnimationFrame(track);
  }
  track();

  $$('a,button,.p-card,.pill,.feat-card,.glass-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ─────────────────────────────────────────────────────────────
   8. SCROLL PROGRESS BAR
   ───────────────────────────────────────────────────────────── */
function initScrollBar() {
  const fill = $('#scroll-fill');
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    fill.style.width = pct + '%';
  }, { passive: true });
}

/* ─────────────────────────────────────────────────────────────
   9. NAVBAR SCROLL BEHAVIOR
   ───────────────────────────────────────────────────────────── */
function initNavbar() {
  const nav = $('#nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });

  // Smooth scroll nav links
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = $(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -72 });
      else target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ─────────────────────────────────────────────────────────────
   10. THREE.JS HERO
   ───────────────────────────────────────────────────────────── */
function initThreeJS() {
  if (typeof THREE === 'undefined') return;
  const canvas = $('#threeCanvas');
  const section = $('#hero');
  const W = section.clientWidth;
  const H = section.clientHeight;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;

  // Scene & Camera
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
  camera.position.set(0, 0.5, 9);

  // ── Lights ──
  scene.add(new THREE.AmbientLight(0xffffff, 0.25));

  const blueLight = new THREE.PointLight(0x00d4ff, 5, 25);
  blueLight.position.set(4, 4, 4);
  scene.add(blueLight);

  const pinkLight = new THREE.PointLight(0xff2d78, 3, 20);
  pinkLight.position.set(-4, -1, 3);
  scene.add(pinkLight);

  const topLight = new THREE.DirectionalLight(0xffffff, 0.6);
  topLight.position.set(0, 8, 6);
  scene.add(topLight);

  // ── Glow disc (behind hero) ──
  const discGeo = new THREE.CircleGeometry(1.8, 64);
  const discMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.07 });
  const disc    = new THREE.Mesh(discGeo, discMat);
  disc.position.z = -0.5;
  scene.add(disc);

  const ringGeo = new THREE.RingGeometry(1.82, 1.9, 64);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, side: THREE.DoubleSide, transparent: true, opacity: 0.35 });
  scene.add(new THREE.Mesh(ringGeo, ringMat));

  // ── Cyber character (built with primitives) ──
  const cyberMat = new THREE.MeshStandardMaterial({ color: 0x001428, emissive: 0x001e40, metalness: 0.95, roughness: 0.15 });
  const glowMat  = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
  const panelMat = new THREE.MeshBasicMaterial({ color: 0x0077cc, transparent: true, opacity: 0.8 });

  const hero = new THREE.Group();

  // Head
  const head = new THREE.Mesh(new THREE.BoxGeometry(.65, .72, .6), cyberMat);
  head.position.y = 1.1;
  hero.add(head);

  // Visor
  const visor = new THREE.Mesh(new THREE.BoxGeometry(.5, .14, .06), glowMat);
  visor.position.set(0, 1.13, .3);
  hero.add(visor);

  // Antenna dots
  [-0.12, 0.12].forEach(x => {
    const a = new THREE.Mesh(new THREE.SphereGeometry(.04, 6, 6), glowMat);
    a.position.set(x, 1.55, 0);
    hero.add(a);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(.015, .015, .15, 6), cyberMat);
    stem.position.set(x, 1.48, 0);
    hero.add(stem);
  });

  // Torso
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(.42, .32, 1.35, 8), cyberMat);
  torso.position.y = 0;
  hero.add(torso);

  // Chest plate
  const chest = new THREE.Mesh(new THREE.BoxGeometry(.48, .36, .06), panelMat);
  chest.position.set(0, .18, .4);
  hero.add(chest);

  // Chest lines
  for (let i = 0; i < 3; i++) {
    const ln = new THREE.Mesh(new THREE.BoxGeometry(.32, .025, .02), glowMat);
    ln.position.set(0, .08 + i * .08, .43);
    hero.add(ln);
  }

  // Shoulder pads
  [-0.65, 0.65].forEach(x => {
    const sp = new THREE.Mesh(new THREE.SphereGeometry(.25, 8, 8), cyberMat);
    sp.position.set(x, .6, 0);
    hero.add(sp);
    // Shoulder accent
    const sa = new THREE.Mesh(new THREE.BoxGeometry(.1, .05, .26), glowMat);
    sa.position.set(x, .62, 0);
    hero.add(sa);
  });

  // Arms
  [-0.65, 0.65].forEach((x, i) => {
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(.11, .09, 1, 6), cyberMat);
    arm.position.set(x, .08, 0);
    arm.rotation.z = i === 0 ? .22 : -.22;
    hero.add(arm);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(.11, 8, 8), cyberMat);
    hand.position.set(x * 1.1, -.45, 0);
    hero.add(hand);
  });

  // Pelvis & legs
  const pelvis = new THREE.Mesh(new THREE.CylinderGeometry(.3, .26, .3, 6), cyberMat);
  pelvis.position.y = -.72;
  hero.add(pelvis);

  [-0.2, 0.2].forEach(x => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(.14, .11, 1.1, 6), cyberMat);
    leg.position.set(x, -1.3, 0);
    hero.add(leg);
    // Knee accent
    const knee = new THREE.Mesh(new THREE.BoxGeometry(.17, .1, .18), panelMat);
    knee.position.set(x, -.92, 0);
    hero.add(knee);
    // Boot
    const boot = new THREE.Mesh(new THREE.BoxGeometry(.18, .22, .28), cyberMat);
    boot.position.set(x, -1.91, .04);
    hero.add(boot);
  });

  hero.position.set(2, -0.1, 0);
  scene.add(hero);

  // ── Floating particles ──
  const pCount = 160;
  const pPos   = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pPos[i*3]   = (Math.random()-.5)*18;
    pPos[i*3+1] = (Math.random()-.5)*12;
    pPos[i*3+2] = (Math.random()-.5)*8;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ color:0x00d4ff, size:.045, transparent:true, opacity:.55 });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // ── Grid floor ──
  const grid = new THREE.GridHelper(30, 35, 0x00d4ff, 0x002244);
  grid.position.y = -2.4;
  grid.material.transparent = true;
  grid.material.opacity = 0.12;
  scene.add(grid);

  // ── Mouse parallax ──
  let mouse = { x: 0, y: 0 };
  window.addEventListener('mousemove', e => {
    mouse.x = (e.clientX / W - .5) * 2;
    mouse.y = -(e.clientY / H - .5) * 2;
  });

  // ── Scroll camera animation ──
  let scrollProgress = 0;
  window.addEventListener('scroll', () => {
    const heroH = section.offsetHeight;
    scrollProgress = Math.min(window.scrollY / heroH, 1);
  }, { passive: true });

  // ── Animation loop ──
  let t = 0;
  (function animate() {
    requestAnimationFrame(animate);
    t += .012;

    // Hero float + rotate
    hero.rotation.y += .006;
    hero.position.y = -.1 + Math.sin(t * .7) * .1;

    // Camera: mouse parallax
    camera.position.x += (mouse.x * .6 - camera.position.x) * .04;
    camera.position.y += (mouse.y * .4 + .5 - camera.position.y) * .04;

    // Camera: scroll around model
    camera.position.z = 9 - scrollProgress * 4;
    camera.position.x += -scrollProgress * 3;
    camera.lookAt(0, 0.2, 0);

    // Animate lights
    blueLight.position.x = Math.sin(t*.6)*5;
    blueLight.position.z = Math.cos(t*.6)*5;
    pinkLight.position.x = Math.cos(t*.4)*4;

    // Pulse disc
    disc.scale.setScalar(1 + Math.sin(t*1.2)*.04);

    // Rotate particles
    particles.rotation.y += .0004;

    renderer.render(scene, camera);
  })();

  // ── Resize ──
  window.addEventListener('resize', () => {
    const nW = section.clientWidth, nH = section.clientHeight;
    renderer.setSize(nW, nH);
    camera.aspect = nW / nH;
    camera.updateProjectionMatrix();
  });
}

/* ─────────────────────────────────────────────────────────────
   11. HERO PARTICLES (CSS-based floating dots)
   ───────────────────────────────────────────────────────────── */
function initParticleField() {
  const field = $('#particleField');
  for (let i = 0; i < 25; i++) {
    const dot = document.createElement('div');
    dot.className = 'p-dot';
    const size = Math.random() * 4 + 2;
    dot.style.cssText = `
      width:${size}px;height:${size}px;
      left:${Math.random()*100}%;bottom:${Math.random()*40}%;
      animation-duration:${Math.random()*6+5}s;
      animation-delay:${Math.random()*5}s;
      opacity:0;
    `;
    field.appendChild(dot);
  }
}

/* ─────────────────────────────────────────────────────────────
   12. GSAP ANIMATIONS — HERO & GENERAL
   ───────────────────────────────────────────────────────────── */
function initGSAPHero() {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl
    .from('.hero-eyebrow', { opacity: 0, y: 30, duration: .8 })
    .from('.ht-line', { opacity: 0, y: 60, stagger: .15, duration: .9 }, '-=.4')
    .from('.hero-desc', { opacity: 0, y: 25, duration: .7 }, '-=.3')
    .from('.hero-cta', { opacity: 0, y: 20, duration: .6 }, '-=.3')
    .from('.scroll-hint', { opacity: 0, duration: .6 }, '-=.2')
    .from('.frame', { opacity: 0, scale: 0, stagger: .06, duration: .4 }, '-=.4');

  gsap.from('#nav', { opacity: 0, y: -30, duration: .6, delay: .3 });
}

/* ─────────────────────────────────────────────────────────────
   13. STORY SCROLL — Cyberfiction Sticky
   ───────────────────────────────────────────────────────────── */
function initStoryScroll() {
  const storySection = $('#story');
  const panels  = $$('.story-panel');
  const chapters = $$('.story-chapter');
  const dots    = $$('.dot');
  const TOTAL   = 4;

  function activate(index) {
    if (index < 0 || index >= TOTAL) return;
    STATE.storyIndex = index;

    panels.forEach(p => p.classList.toggle('active', +p.dataset.panel === index));
    chapters.forEach(c => c.classList.toggle('active', +c.dataset.chapter === index));
    dots.forEach(d => d.classList.toggle('active', +d.dataset.i === index));
  }

  activate(0);

  // Dot click
  dots.forEach(d => d.addEventListener('click', () => activate(+d.dataset.i)));

  // ScrollTrigger driving the chapters
  ScrollTrigger.create({
    trigger: storySection,
    start: 'top top',
    end: 'bottom bottom',
    scrub: false,
    onUpdate(self) {
      const idx = Math.min(TOTAL - 1, Math.floor(self.progress * TOTAL));
      if (idx !== STATE.storyIndex) activate(idx);
    }
  });

  // Section header reveal
  gsap.from('.chapter-title', {
    scrollTrigger: { trigger: '#story', start: 'top 80%' },
    opacity: 0, y: 40, duration: .7
  });
}

/* ─────────────────────────────────────────────────────────────
   14. FEATURES — Horizontal Scroll Track
   ───────────────────────────────────────────────────────────── */
function initFeaturesScroll() {
  const section = $('#features');
  if (!section || window.innerWidth < 769) return;

  const track = $('#featuresTrack');
  const fill  = $('#fplFill');
  const totalScroll = track.scrollWidth - track.parentElement.clientWidth;

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    onUpdate(self) {
      const p = self.progress;
      gsap.set(track, { x: -totalScroll * p });
      fill.style.width = p * 100 + '%';
    }
  });

  // Animate cards in
  gsap.from('.feat-card', {
    scrollTrigger: { trigger: '#features', start: 'top 80%', toggleActions: 'play none none reverse' },
    opacity: 0, x: 60, stagger: .12, duration: .7, ease: 'power2.out'
  });

  gsap.from('.features-title', {
    scrollTrigger: { trigger: '#features', start: 'top 85%' },
    opacity: 0, x: -40, duration: .7
  });
}

/* ─────────────────────────────────────────────────────────────
   15. SHOP SECTION ANIMATIONS
   ───────────────────────────────────────────────────────────── */
function initShopAnimations() {
  gsap.from('.shop-header', {
    scrollTrigger: { trigger: '#shop', start: 'top 80%' },
    opacity: 0, y: 50, duration: .8
  });
  gsap.from('.cat-pills', {
    scrollTrigger: { trigger: '.cat-pills', start: 'top 90%' },
    opacity: 0, y: 20, duration: .5
  });
}

/* ─────────────────────────────────────────────────────────────
   16. CHECKOUT SECTION ANIMATIONS
   ───────────────────────────────────────────────────────────── */
function initCheckoutAnimations() {
  gsap.from('.checkout-title', {
    scrollTrigger: { trigger: '#checkout', start: 'top 80%' },
    opacity: 0, y: 40, duration: .7
  });
  gsap.from('.summary-card', {
    scrollTrigger: { trigger: '#checkout', start: 'top 75%' },
    opacity: 0, x: 40, duration: .7
  });
}

/* ─────────────────────────────────────────────────────────────
   17. PRODUCTS — Load & Render
   ───────────────────────────────────────────────────────────── */
async function loadProducts() {
  // Try backend first, fall back to embedded data
  try {
    const res = await Promise.race([
      fetch(`${BACKEND_URL}/api/products`),
      new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 2500))
    ]);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data.length > 0) {
        STATE.products = data.data;
        console.log('[Products] Loaded from backend:', data.data.length);
        applyFilters();
        return;
      }
    }
  } catch (e) {
    console.log('[Products] Backend unavailable, using embedded data');
  }

  STATE.products = PRODUCTS_DATA;
  applyFilters();
}

function applyFilters() {
  STATE.filtered = STATE.products.filter(p => {
    const catOk  = STATE.currentFilter === 'all' || p.category === STATE.currentFilter;
    const nameOk = !STATE.searchQuery || p.name.toLowerCase().includes(STATE.searchQuery);
    return catOk && nameOk;
  });
  STATE.currentPage = 0;
  renderProducts(false);
}

function renderProducts(append = false) {
  const grid = $('#productsGrid');
  const loadMore = $('#loadMoreBtn');
  const start = STATE.currentPage * STATE.pageSize;
  const page  = STATE.filtered.slice(start, start + STATE.pageSize);

  if (!append) {
    grid.innerHTML = '';
    // Remove loading indicator
    const loading = grid.querySelector('#gridLoading');
    if (loading) loading.remove();
  }

  if (STATE.filtered.length === 0) {
    grid.innerHTML = '<div class="no-products">// NO PRODUCTS FOUND //</div>';
    loadMore.style.display = 'none';
    return;
  }

  page.forEach((p, i) => {
    const card = makeProductCard(p);
    card.style.opacity = '0';
    card.style.transform = 'translateY(28px)';
    grid.appendChild(card);
    setTimeout(() => {
      gsap.to(card, { opacity: 1, y: 0, duration: .5, ease: 'power2.out', delay: i * .06 });
    }, 30);
  });

  const hasMore = (STATE.currentPage + 1) * STATE.pageSize < STATE.filtered.length;
  loadMore.style.display = hasMore ? 'inline-block' : 'none';

  // Re-bind cursor hover
  $$('.p-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

function makeProductCard(p) {
  const img = p.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80';
  const low = p.stock < 15;

  const div = document.createElement('div');
  div.className = 'p-card';
  div.dataset.id = p.id;

  div.innerHTML = `
    <div class="p-card-img">
      <img src="${img}" alt="${p.name}" loading="lazy"
           onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80'"/>
      <span class="p-cat-tag">${p.category}</span>
      ${low ? `<span class="p-stock-badge">LOW STOCK</span>` : ''}
    </div>
    <div class="p-card-body">
      <div class="p-card-name">${p.name}</div>
      <div class="p-card-desc">${(p.description||'').substring(0,70)}${p.description?.length>70?'…':''}</div>
      <div class="p-card-footer">
        <div class="p-card-price">${fmt(p.price)}</div>
        <button class="p-card-add" data-id="${p.id}">+ CART</button>
      </div>
    </div>
  `;

  // Card click → Quick view
  div.addEventListener('click', e => {
    if (!e.target.classList.contains('p-card-add')) openQuickView(p);
  });

  // Add to cart button
  div.querySelector('.p-card-add').addEventListener('click', e => {
    e.stopPropagation();
    addToCart(p, 1);
    const btn = e.currentTarget;
    btn.classList.add('added');
    btn.textContent = '✓ ADDED';
    setTimeout(() => { btn.classList.remove('added'); btn.textContent = '+ CART'; }, 1300);
  });

  return div;
}

/* ─────────────────────────────────────────────────────────────
   18. QUICK VIEW MODAL
   ───────────────────────────────────────────────────────────── */
function openQuickView(product) {
  STATE.modalProduct = product;
  STATE.modalQty = 1;

  $('#pmImg').src   = product.image_url || '';
  $('#pmImg').onerror = () => { $('#pmImg').src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500'; };
  $('#pmCat').textContent   = product.category.toUpperCase();
  $('#pmName').textContent  = product.name;
  $('#pmDesc').textContent  = product.description || '';
  $('#pmPrice').textContent = fmt(product.price);
  $('#pmQtyVal').textContent = '1';

  openModal('productModal');

  gsap.from('#productModalInner', { scale: .92, opacity: 0, duration: .4, ease: 'back.out(1.5)' });
}

/* ─────────────────────────────────────────────────────────────
   19. CART MANAGEMENT
   ───────────────────────────────────────────────────────────── */
function saveCart() {
  localStorage.setItem('bb_v2_cart', JSON.stringify(STATE.cart));
  updateCartUI();
  updateCheckoutUI();
}

function addToCart(product, qty = 1) {
  const existing = STATE.cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty += qty;
  } else {
    STATE.cart.push({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image_url: product.image_url || '',
      qty
    });
  }
  saveCart();
  toast(`✅ ${product.name} added`, 'success');
  gsap.from('.float-cart', { scale: 1.35, duration: .3, ease: 'back.out' });
}

function removeFromCart(id) {
  STATE.cart = STATE.cart.filter(i => i.id !== id);
  saveCart();
}

function updateQty(id, delta) {
  const item = STATE.cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else saveCart();
}

function clearCart() {
  STATE.cart = [];
  saveCart();
}

function getCartTotal() { return STATE.cart.reduce((s, i) => s + i.price * i.qty, 0); }
function getCartCount() { return STATE.cart.reduce((s, i) => s + i.qty, 0); }

function updateCartUI() {
  const count = getCartCount();
  const total = getCartTotal();

  // Badges
  ['cartCount', 'cs-count', 'floatCount'].forEach(id => {
    const el = $(`#${id}`); if (el) el.textContent = count;
  });

  // Sidebar items
  const csItems = $('#csItems');
  const csFooter = $('#csFooter');
  if (!csItems) return;

  if (STATE.cart.length === 0) {
    csItems.innerHTML = '<div class="cs-empty">Cart is empty</div>';
    if (csFooter) csFooter.style.display = 'none';
    return;
  }

  csItems.innerHTML = STATE.cart.map(item => `
    <div class="cs-item">
      <img class="cs-item-img" src="${item.image_url}" alt="${item.name}"
           onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=200'"/>
      <div class="cs-item-info">
        <div class="cs-item-name">${item.name}</div>
        <div class="cs-item-price">${fmt(item.price)} × ${item.qty} = ${fmt(item.price * item.qty)}</div>
        <div class="cs-item-qty">Qty: ${item.qty}</div>
      </div>
      <button class="cs-item-rm" data-id="${item.id}">✕</button>
    </div>
  `).join('');

  csItems.querySelectorAll('.cs-item-rm').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
  });

  const totalEl = $('#cs-total');
  if (totalEl) totalEl.textContent = fmt(total);
  if (csFooter) csFooter.style.display = 'block';
}

function updateCheckoutUI() {
  const total     = getCartTotal();
  const orderLines = $('#orderLines');
  const summary   = $('#checkoutSummary');
  const emptyMsg  = $('#emptyMsg');
  const subEl     = $('#co-subtotal');
  const totalEl   = $('#co-total');

  if (!orderLines) return;

  // Remove existing items
  orderLines.querySelectorAll('.order-item').forEach(el => el.remove());

  if (STATE.cart.length === 0) {
    if (emptyMsg)  emptyMsg.style.display = 'block';
    if (summary)   { summary.style.opacity = '0'; summary.style.pointerEvents = 'none'; }
    return;
  }

  if (emptyMsg) emptyMsg.style.display = 'none';
  if (summary)  { summary.style.opacity = '1'; summary.style.pointerEvents = 'all'; }

  STATE.cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'order-item';
    div.innerHTML = `
      <img class="oi-img" src="${item.image_url}" alt="${item.name}"
           onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=200'"/>
      <div class="oi-info">
        <div class="oi-name">${item.name}</div>
        <div class="oi-price">${fmt(item.price)} × ${item.qty} = ${fmt(item.price * item.qty)}</div>
      </div>
      <div class="oi-controls">
        <button class="q-btn" data-action="dec" data-id="${item.id}">−</button>
        <span class="q-val">${item.qty}</span>
        <button class="q-btn" data-action="inc" data-id="${item.id}">+</button>
        <button class="rm-btn" data-id="${item.id}">✕</button>
      </div>
    `;
    div.querySelector('[data-action="inc"]').onclick  = () => updateQty(item.id, 1);
    div.querySelector('[data-action="dec"]').onclick  = () => updateQty(item.id, -1);
    div.querySelector('.rm-btn').onclick = () => removeFromCart(item.id);
    orderLines.insertBefore(div, emptyMsg);
  });

  if (subEl)   subEl.textContent  = fmt(total);
  if (totalEl) totalEl.textContent = fmt(total);
}

/* ─────────────────────────────────────────────────────────────
   20. CART SIDEBAR TOGGLE
   ───────────────────────────────────────────────────────────── */
function initCartSidebar() {
  const sidebar  = $('#cartSidebar');
  const overlay  = $('#cartOverlay');

  function open() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    gsap.from('.cs-item', { x: 30, opacity: 0, stagger: .06, duration: .35, ease: 'power2.out' });
  }
  function close() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  }

  $('#cartToggle')?.addEventListener('click', open);
  $('#floatCart')?.addEventListener('click', open);
  $('#cartClose')?.addEventListener('click', close);
  overlay.addEventListener('click', close);

  $('#cs-checkout')?.addEventListener('click', () => {
    close();
    if (lenis) lenis.scrollTo('#checkout', { offset: -72 });
    else $('#checkout').scrollIntoView({ behavior: 'smooth' });
  });
}

/* ─────────────────────────────────────────────────────────────
   21. CHECKOUT — PLACE ORDER
   ───────────────────────────────────────────────────────────── */
async function handlePlaceOrder() {
  if (STATE.cart.length === 0) { toast('Cart is empty!', 'error'); return; }

  const name    = $('#coName')?.value.trim();
  const phone   = $('#coPhone')?.value.trim();
  const address = $('#coAddress')?.value.trim();

  if (!name || !phone || !address) {
    toast('Please fill delivery details!', 'error'); return;
  }

  const order = {
    items: STATE.cart,
    total: getCartTotal(),
    customer: { name, phone, address },
    userId: STATE.user?.id || null,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  // Try backend
  let orderId = '#BB' + Date.now().toString().slice(-6);
  try {
    const res = await fetch(`${BACKEND_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.id) orderId = '#BB' + String(data.id).padStart(6, '0');
    }
  } catch (e) {
    console.log('[Order] Backend unavailable, saving locally');
    const orders = JSON.parse(localStorage.getItem('bb_v2_orders') || '[]');
    orders.push({ ...order, id: orderId });
    localStorage.setItem('bb_v2_orders', JSON.stringify(orders));
  }

  // Clear cart & show success
  clearCart();
  $('#coName').value = ''; $('#coPhone').value = ''; $('#coAddress').value = '';
  $('#successOrderId').textContent = orderId;

  openModal('successModal');
  gsap.from('.success-modal', { scale: .85, opacity: 0, duration: .5, ease: 'back.out(1.8)' });
}

/* ─────────────────────────────────────────────────────────────
   22. SUPABASE AUTH — GOOGLE LOGIN
   ───────────────────────────────────────────────────────────── */
function initSupabase() {
  if (SUPABASE_URL === 'https://your-project.supabase.co') {
    console.log('[Supabase] Not configured — auth in demo mode');
    return;
  }
  try {
    STATE.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
    // Listen for auth state
    STATE.supabase.auth.onAuthStateChange((event, session) => {
      STATE.user = session?.user || null;
      updateUserBar();
    });
    // Check existing session
    STATE.supabase.auth.getSession().then(({ data }) => {
      STATE.user = data.session?.user || null;
      updateUserBar();
    });
  } catch (e) {
    console.warn('[Supabase] Init failed:', e.message);
  }
}

function updateUserBar() {
  const bar   = $('#userBar');
  const email = $('#userEmail');
  const loginBtn = $('#loginBtn');
  if (STATE.user) {
    bar.style.display = 'flex';
    email.textContent = STATE.user.email || STATE.user.user_metadata?.full_name || 'User';
    if (loginBtn) loginBtn.textContent = 'MY ACCOUNT';
  } else {
    bar.style.display = 'none';
    if (loginBtn) loginBtn.textContent = 'LOGIN';
  }
}

async function handleGoogleLogin() {
  if (!STATE.supabase) {
    toast('⚠️ Supabase not configured. Add your keys to enable Google login.', 'error');
    return;
  }
  try {
    const { error } = await STATE.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.href }
    });
    if (error) throw error;
  } catch (e) {
    toast('Login failed: ' + e.message, 'error');
    setAuthMsg('Login failed: ' + e.message, 'err');
  }
}

async function handleEmailLogin() {
  const email = $('#authEmail').value.trim();
  const pass  = $('#authPassword').value;
  if (!email || !pass) { setAuthMsg('Fill all fields', 'err'); return; }

  if (!STATE.supabase) {
    // Demo mode
    STATE.user = { email, id: 'demo-' + Date.now() };
    updateUserBar();
    toast('Logged in (demo mode)', 'success');
    setAuthMsg('✅ Logged in!', 'ok');
    setTimeout(() => closeModal('authModal'), 1000);
    return;
  }

  try {
    const { error } = await STATE.supabase.auth.signInWithPassword({ email, password: pass });
    if (error) { setAuthMsg(error.message, 'err'); return; }
    toast('✅ Welcome back!', 'success');
    setAuthMsg('✅ Success!', 'ok');
    setTimeout(() => closeModal('authModal'), 900);
  } catch (e) {
    setAuthMsg(e.message, 'err');
  }
}

async function handleEmailSignup() {
  const email = $('#authEmail').value.trim();
  const pass  = $('#authPassword').value;
  if (!email || !pass) { setAuthMsg('Fill all fields', 'err'); return; }
  if (pass.length < 6) { setAuthMsg('Password min 6 chars', 'err'); return; }

  if (!STATE.supabase) {
    setAuthMsg('⚠️ Supabase not configured', 'err'); return;
  }
  try {
    const { error } = await STATE.supabase.auth.signUp({ email, password: pass });
    if (error) { setAuthMsg(error.message, 'err'); return; }
    setAuthMsg('✅ Check your email!', 'ok');
  } catch (e) {
    setAuthMsg(e.message, 'err');
  }
}

async function handleLogout() {
  if (STATE.supabase) await STATE.supabase.auth.signOut();
  STATE.user = null;
  updateUserBar();
  toast('Logged out', 'info');
}

function setAuthMsg(msg, cls) {
  const el = $('#authMsg');
  el.textContent = msg;
  el.className = 'auth-msg ' + cls;
}

/* ─────────────────────────────────────────────────────────────
   23. SEARCH
   ───────────────────────────────────────────────────────────── */
function initSearch() {
  const overlay = $('#searchOverlay');
  const input   = $('#searchInput');

  $('#searchToggle')?.addEventListener('click', () => {
    overlay.classList.add('open');
    setTimeout(() => input.focus(), 100);
  });
  $('#searchClose')?.addEventListener('click', () => overlay.classList.remove('open'));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') overlay.classList.remove('open');
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      overlay.classList.toggle('open');
    }
  });

  input.addEventListener('input', debounce(e => {
    STATE.searchQuery = e.target.value.toLowerCase().trim();
    applyFilters();
    overlay.classList.remove('open');
    if (STATE.searchQuery) {
      if (lenis) lenis.scrollTo('#shop', { offset: -72 });
      else $('#shop').scrollIntoView({ behavior: 'smooth' });
    }
  }, 350));
}

/* ─────────────────────────────────────────────────────────────
   24. ADMIN PANEL
   ───────────────────────────────────────────────────────────── */
function initAdmin() {
  $('#adminTrigger')?.addEventListener('click', () => openModal('adminModal'));
  $('#adminClose')?.addEventListener('click', () => closeModal('adminModal'));

  // Tabs
  $$('.atab').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.atab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      $$('.admin-pane').forEach(p => p.classList.add('hidden'));
      $(`#pane-${tab}`).classList.remove('hidden');
      if (tab === 'manage') loadAdminProducts();
      if (tab === 'orders') loadAdminOrders();
    });
  });

  // Add product
  $('#ap-submit')?.addEventListener('click', addProduct);
}

async function addProduct() {
  const name  = $('#ap-name').value.trim();
  const price = parseFloat($('#ap-price').value);
  const cat   = $('#ap-cat').value;
  const img   = $('#ap-img').value.trim();
  const desc  = $('#ap-desc').value.trim();
  const stock = parseInt($('#ap-stock').value) || 100;
  const msgEl = $('#ap-msg');

  if (!name || !price) { msgEl.textContent = '⚠️ Name and price required'; msgEl.className = 'admin-msg err'; return; }

  const product = { name, price, category: cat, image_url: img, description: desc, stock };

  // Try backend
  try {
    const res = await fetch(`${BACKEND_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (res.ok) {
      const data = await res.json();
      STATE.products.unshift(data.data || { ...product, id: Date.now() });
      applyFilters();
      msgEl.textContent = '✅ Product added to backend!';
      msgEl.className = 'admin-msg ok';
      ['ap-name','ap-price','ap-img','ap-desc','ap-stock'].forEach(id => { const el = $(`#${id}`); if (el) el.value = ''; });
      return;
    }
  } catch (e) {}

  // Local fallback
  STATE.products.unshift({ ...product, id: Date.now() });
  applyFilters();
  msgEl.textContent = '✅ Product added (demo mode)';
  msgEl.className = 'admin-msg ok';
  ['ap-name','ap-price','ap-img','ap-desc','ap-stock'].forEach(id => { const el = $(`#${id}`); if (el) el.value = ''; });
}

function loadAdminProducts() {
  const list = $('#adminList');
  if (!list) return;
  list.innerHTML = STATE.products.map(p => `
    <div class="a-item">
      <img src="${p.image_url || ''}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=100'"/>
      <div class="a-item-info">
        <div class="a-item-name">${p.name}</div>
        <div class="a-item-sub">${fmt(p.price)} · ${p.category}</div>
      </div>
      <button class="a-del" data-id="${p.id}">DELETE</button>
    </div>
  `).join('');

  list.querySelectorAll('.a-del').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('Delete this product?')) return;
      try {
        await fetch(`${BACKEND_URL}/api/products/${btn.dataset.id}`, { method: 'DELETE' });
      } catch (e) {}
      STATE.products = STATE.products.filter(p => String(p.id) !== btn.dataset.id);
      applyFilters();
      loadAdminProducts();
    });
  });
}

function loadAdminOrders() {
  const list = $('#adminOrders');
  if (!list) return;
  list.innerHTML = '<div style="font-family:var(--ff-mono);font-size:.75rem;color:var(--c-cyan);padding:1rem">Loading orders...</div>';

  fetch(`${BACKEND_URL}/api/orders`)
    .then(r => r.json())
    .then(data => {
      const orders = data.data || [];
      if (orders.length === 0) {
        list.innerHTML = '<div class="cs-empty">No orders yet</div>'; return;
      }
      list.innerHTML = orders.map(o => `
        <div class="order-card">
          <div class="order-card-id">ORDER ${o.id || o.createdAt?.slice(0,10) || 'N/A'}</div>
          <div class="order-card-info">${o.customer?.name || 'Anonymous'} · ${o.status || 'pending'}</div>
          <div class="order-card-total">${fmt(o.total)}</div>
        </div>
      `).join('');
    })
    .catch(() => {
      // Fallback: show local orders
      const local = JSON.parse(localStorage.getItem('bb_v2_orders') || '[]');
      if (local.length === 0) { list.innerHTML = '<div class="cs-empty">No orders yet</div>'; return; }
      list.innerHTML = local.map(o => `
        <div class="order-card">
          <div class="order-card-id">ORDER ${o.id || 'LOCAL'}</div>
          <div class="order-card-info">${o.customer?.name || 'Anonymous'} · ${o.status}</div>
          <div class="order-card-total">${fmt(o.total)}</div>
        </div>
      `).join('');
    });
}

/* ─────────────────────────────────────────────────────────────
   25. EVENT BINDINGS
   ───────────────────────────────────────────────────────────── */
function bindEvents() {
  // Category filter
  $$('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      $$('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      STATE.currentFilter = pill.dataset.cat;
      applyFilters();
    });
  });

  // Load more
  $('#loadMoreBtn')?.addEventListener('click', () => {
    STATE.currentPage++;
    renderProducts(true);
  });

  // Quick view qty
  $('#pmQtyInc')?.addEventListener('click', () => {
    STATE.modalQty = Math.min(STATE.modalQty + 1, 20);
    $('#pmQtyVal').textContent = STATE.modalQty;
  });
  $('#pmQtyDec')?.addEventListener('click', () => {
    STATE.modalQty = Math.max(STATE.modalQty - 1, 1);
    $('#pmQtyVal').textContent = STATE.modalQty;
  });
  $('#pmAddCart')?.addEventListener('click', () => {
    if (STATE.modalProduct) {
      addToCart(STATE.modalProduct, STATE.modalQty);
      closeModal('productModal');
    }
  });

  // Modals close
  $('#productModalClose')?.addEventListener('click', () => closeModal('productModal'));
  $('#authModalClose')?.addEventListener('click', () => closeModal('authModal'));
  $('#successClose')?.addEventListener('click', () => closeModal('successModal'));
  $$('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
  });

  // Auth
  $('#loginBtn')?.addEventListener('click', () => openModal('authModal'));
  $('#googleLoginBtn')?.addEventListener('click', handleGoogleLogin);
  $('#emailLoginBtn')?.addEventListener('click', handleEmailLogin);
  $('#emailSignupBtn')?.addEventListener('click', handleEmailSignup);
  $('#logoutBtn')?.addEventListener('click', handleLogout);

  // Checkout
  $('#placeOrderBtn')?.addEventListener('click', handlePlaceOrder);
  $('#clearCartBtn')?.addEventListener('click', () => {
    if (confirm('Clear all items from cart?')) clearCart();
  });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      $$('.modal-overlay').forEach(m => m.classList.remove('open'));
    }
  });

  // Admin
  initAdmin();
}

/* ─────────────────────────────────────────────────────────────
   26. MAIN INIT — Entry Point
   ───────────────────────────────────────────────────────────── */
function main() {
  // Register GSAP plugins
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  }

  // Init everything
  initLenis();
  initCursor();
  initScrollBar();
  initNavbar();
  initThreeJS();
  initParticleField();
  initGSAPHero();
  initStoryScroll();
  initFeaturesScroll();
  initShopAnimations();
  initCheckoutAnimations();
  initCartSidebar();
  initSearch();
  bindEvents();
  initSupabase();

  // Load products & restore cart
  loadProducts().then(() => {
    updateCartUI();
    updateCheckoutUI();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  runLoader(main);
});
