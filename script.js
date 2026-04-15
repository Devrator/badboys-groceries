

'use strict';


const SUPABASE_URL  = 'https://wfrjoclfymtglpjvqkuk.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmcmpvY2xmeW10Z2xwanZxa3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjI2ODksImV4cCI6MjA5MDQzODY4OX0.A8XaVgwdtQ9YJm6Zll0RbAtXbfpiBfRr4MAKr2OdUw0';
const BACKEND_URL   = 'http://localhost:3001'; // Node.js backend


const PRODUCTS_DATA = [
  {id:1, name:'Cyber Apple', price:45, category:'fruits', stock:120,
   description:'Nano-enhanced Fuji apples from the hydroponic towers of Neo-Mumbai.',
   image_url:'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500&q=80',
   weight:'1 kg', unit:'piece', rating:4.5, reviews:128,
   nutritional_info:{calories:52, protein:'0.3g', carbs:'14g', fat:'0.2g'}, featured:true},
  {id:2, name:'Quantum Mango', price:120, category:'fruits', stock:80,
   description:'Premium Alphonso mangoes irradiated for peak bio-ripeness.',
   image_url:'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&q=80',
   weight:'500 g', unit:'piece', rating:4.8, reviews:95,
   nutritional_info:{calories:60, protein:'0.8g', carbs:'15g', fat:'0.4g'}, featured:true},
  {id:3, name:'Synth Banana', price:40, category:'fruits', stock:200,
   description:'Molecularly-structured Cavendish. Potassium levels off-chart.',
   image_url:'https://images.unsplash.com/photo-1543218024-57a70143c369?w=500&q=80',
   weight:'1 dozen', unit:'bunch', rating:4.3, reviews:156,
   nutritional_info:{calories:105, protein:'1.3g', carbs:'27g', fat:'0.4g'}, featured:false},
  {id:4, name:'Pixel Berries', price:180, category:'fruits', stock:55,
   description:'Mixed antioxidant berries — lab-certified freshness.',
   image_url:'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=500&q=80',
   weight:'250 g', unit:'box', rating:4.7, reviews:87,
   nutritional_info:{calories:43, protein:'0.7g', carbs:'10g', fat:'0.3g'}, featured:true},
  {id:5, name:'Neon Broccoli', price:60, category:'veggies', stock:90,
   description:'Bioluminescent-grade organic broccoli packed with synth-vitamins.',
   image_url:'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&q=80',
   weight:'500 g', unit:'bunch', rating:4.4, reviews:64,
   nutritional_info:{calories:34, protein:'2.8g', carbs:'7g', fat:'0.4g'}, featured:false},
  {id:6, name:'Pixel Tomatoes', price:50, category:'veggies', stock:150,
   description:'Vine-ripened in LED farms. Resolution: 4K flavor output.',
   image_url:'https://images.unsplash.com/photo-1471194402529-8e0f5cf8d51f?w=500&q=80',
   weight:'1 kg', unit:'kg', rating:4.2, reviews:112,
   nutritional_info:{calories:18, protein:'0.9g', carbs:'3.9g', fat:'0.2g'}, featured:false},
  {id:7, name:'Matrix Spinach', price:75, category:'veggies', stock:110,
   description:'Iron-fortified nano-spinach. Grown in zero-G orbital stations.',
   image_url:'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&q=80',
   weight:'300 g', unit:'bunch', rating:4.6, reviews:73,
   nutritional_info:{calories:23, protein:'2.9g', carbs:'3.6g', fat:'0.4g'}, featured:true},
  {id:8, name:'Cyber Carrots', price:55, category:'veggies', stock:180,
   description:'Beta-carotene enhanced. Crunch rated 9.8 on the Mohs scale.',
   image_url:'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=500&q=80',
   weight:'500 g', unit:'bunch', rating:4.1, reviews:98,
   nutritional_info:{calories:41, protein:'0.9g', carbs:'10g', fat:'0.2g'}, featured:false},
  {id:9, name:'Holo Milk', price:55, category:'dairy', stock:75,
   description:'Ultra-pasteurized, zero-lag delivery. Full-fat cyber grade.',
   image_url:'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80',
   weight:'1 L', unit:'carton', rating:4.7, reviews:203,
   nutritional_info:{calories:61, protein:'3.2g', carbs:'4.8g', fat:'3.3g'}, featured:true},
  {id:10, name:'Zero Cheese', price:180, category:'dairy', stock:40,
   description:'Cryo-vault aged for 60 days. Sharp and cyber-smooth texture.',
   image_url:'https://images.unsplash.com/photo-1486297678162-eb2a19b0a318?w=500&q=80',
   weight:'200 g', unit:'block', rating:4.5, reviews:87,
   nutritional_info:{calories:402, protein:'25g', carbs:'1.3g', fat:'33g'}, featured:false},
  {id:11, name:'Volt Yoghurt', price:95, category:'dairy', stock:65,
   description:'Probiotic-enhanced live culture yoghurt with neon berry swirl.',
   image_url:'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&q=80',
   weight:'150 g', unit:'cup', rating:4.3, reviews:145,
   nutritional_info:{calories:59, protein:'10g', carbs:'3.6g', fat:'0.4g'}, featured:true},
  {id:12, name:'Plasma Chips', price:35, category:'snacks', stock:300,
   description:'Fried in arc-energy oil. Crunch intensity: maximum overdrive.',
   image_url:'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&q=80',
   weight:'150 g', unit:'pack', rating:4.0, reviews:215,
   nutritional_info:{calories:536, protein:'7g', carbs:'53g', fat:'32g'}, featured:false},
  {id:13, name:'Dark Matter Bar', price:65, category:'snacks', stock:220,
   description:'40g protein per bar — forged in the void. Zero sugar.',
   image_url:'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=500&q=80',
   weight:'60 g', unit:'bar', rating:4.6, reviews:178,
   nutritional_info:{calories:230, protein:'40g', carbs:'9g', fat:'7g'}, featured:true},
  {id:14, name:'Reactor Nuts', price:120, category:'snacks', stock:85,
   description:'Mixed premium nuts charged with nano-selenium. High energy.',
   image_url:'https://images.unsplash.com/photo-1536591375849-f63e67bae4f8?w=500&q=80',
   weight:'200 g', unit:'pack', rating:4.4, reviews:92,
   nutritional_info:{calories:607, protein:'20g', carbs:'21g', fat:'54g'}, featured:false},
  {id:15, name:'Grid Coffee', price:299, category:'beverages', stock:50,
   description:'Arabica beans processed in zero-G labs. Brews at warp speed.',
   image_url:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80',
   weight:'250 g', unit:'bag', rating:4.9, reviews:231,
   nutritional_info:{calories:2, protein:'0.3g', carbs:'0g', fat:'0g'}, featured:true},
  {id:16, name:'Volt Energy', price:80, category:'beverages', stock:180,
   description:'Electrolyte surge in every can. 100ms reaction time boost.',
   image_url:'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=500&q=80',
   weight:'250 ml', unit:'can', rating:4.2, reviews:156,
   nutritional_info:{calories:110, protein:'0g', carbs:'28g', fat:'0g'}, featured:false},
  {id:17, name:'Neon OJ', price:90, category:'beverages', stock:120,
   description:'Cold-pressed in fluorescent orchards of New Goa. 100% real.',
   image_url:'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&q=80',
   weight:'1 L', unit:'bottle', rating:4.5, reviews:134,
   nutritional_info:{calories:45, protein:'0.7g', carbs:'10g', fat:'0.2g'}, featured:true},
  {id:18, name:'Cyber Rice', price:85, category:'grains', stock:200,
   description:'Basmati aged in sealed vaults. Extra long grain, zero impurities.',
   image_url:'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80',
   weight:'5 kg', unit:'bag', rating:4.3, reviews:89,
   nutritional_info:{calories:130, protein:'2.7g', carbs:'28g', fat:'0.3g'}, featured:false},
  {id:19, name:'Quantum Wheat', price:70, category:'grains', stock:150,
   description:'Fortified whole wheat flour from orbital greenhouses.',
   image_url:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
   weight:'2 kg', unit:'bag', rating:4.1, reviews:76,
   nutritional_info:{calories:340, protein:'13g', carbs:'72g', fat:'2.5g'}, featured:false},
  {id:20, name:'Matrix Oats', price:110, category:'grains', stock:90,
   description:'Rolled in nano-mills. Steel-cut precision. High beta-glucan.',
   image_url:'https://images.unsplash.com/photo-1505253304499-671c55fb57fe?w=500&q=80',
   weight:'1 kg', unit:'canister', rating:4.4, reviews:112,
   nutritional_info:{calories:389, protein:'17g', carbs:'66g', fat:'7g'}, featured:true},
  {id:21, name:'Cyber Chicken Breast', price:220, category:'meat', stock:60,
   description:'Lab-cultured, zero-antibiotic chicken breast. High protein, low fat.',
   image_url:'https://images.unsplash.com/photo-1604503468506-a8da13919157?w=500&q=80',
   weight:'500 g', unit:'pack', rating:4.7, reviews:143,
   nutritional_info:{calories:165, protein:'31g', carbs:'0g', fat:'3.6g'}, featured:true},
  {id:22, name:'Quantum Salmon Fillet', price:350, category:'seafood', stock:35,
   description:'Omega-3 rich Atlantic salmon, sustainably sourced from deep-sea farms.',
   image_url:'https://images.unsplash.com/photo-1519708227418-c8fd9a3a2743?w=500&q=80',
   weight:'400 g', unit:'fillet', rating:4.8, reviews:97,
   nutritional_info:{calories:208, protein:'20g', carbs:'0g', fat:'13g'}, featured:true},
  {id:23, name:'Synth Beef Mince', price:180, category:'meat', stock:45,
   description:'Plant-based beef alternative with identical texture and flavor profile.',
   image_url:'https://images.unsplash.com/photo-1592187270271-9a4b84faa228?w=500&q=80',
   weight:'500 g', unit:'pack', rating:4.3, reviews:88,
   nutritional_info:{calories:250, protein:'22g', carbs:'8g', fat:'15g'}, featured:false},
  {id:24, name:'Neon Shrimp', price:280, category:'seafood', stock:25,
   description:'Wild-caught tiger prawns, flash-frozen at peak freshness.',
   image_url:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80',
   weight:'300 g', unit:'pack', rating:4.6, reviews:67,
   nutritional_info:{calories:99, protein:'24g', carbs:'0.2g', fat:'0.3g'}, featured:true},
  {id:25, name:'Cyber Croissant', price:45, category:'bakery', stock:100,
   description:'Buttery, flaky layers baked fresh daily in our nano-ovens.',
   image_url:'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80',
   weight:'80 g', unit:'piece', rating:4.5, reviews:178,
   nutritional_info:{calories:231, protein:'5g', carbs:'26g', fat:'12g'}, featured:true},
  {id:26, name:'Quantum Sourdough', price:85, category:'bakery', stock:40,
   description:'Traditional 72-hour fermentation with ancient grain blend.',
   image_url:'https://images.unsplash.com/photo-1586444248906-89e48c41f234?w=500&q=80',
   weight:'700 g', unit:'loaf', rating:4.7, reviews:134,
   nutritional_info:{calories:250, protein:'9g', carbs:'48g', fat:'1.5g'}, featured:false},
  {id:27, name:'Holo Ice Cream', price:120, category:'frozen', stock:70,
   description:'Creamy vanilla bean ice cream with zero artificial additives.',
   image_url:'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=500&q=80',
   weight:'500 ml', unit:'tub', rating:4.6, reviews:189,
   nutritional_info:{calories:207, protein:'3.5g', carbs:'24g', fat:'11g'}, featured:true},
  {id:28, name:'Matrix Frozen Pizza', price:150, category:'frozen', stock:55,
   description:'Wood-fired style pizza with premium toppings, ready in 12 mins.',
   image_url:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80',
   weight:'450 g', unit:'piece', rating:4.2, reviews:112,
   nutritional_info:{calories:266, protein:'11g', carbs:'34g', fat:'10g'}, featured:false},
  {id:29, name:'Cyber Olive Oil', price:190, category:'pantry', stock:80,
   description:'Extra virgin olive oil from Mediterranean cyber-groves.',
   image_url:'https://images.unsplash.com/photo-1474979266404-7f28db3e3f4e?w=500&q=80',
   weight:'750 ml', unit:'bottle', rating:4.8, reviews:156,
   nutritional_info:{calories:884, protein:'0g', carbs:'0g', fat:'100g'}, featured:true},
  {id:30, name:'Plasma Pasta', price:65, category:'pantry', stock:150,
   description:'Durum wheat semolina pasta, bronze-cut for perfect sauce adherence.',
   image_url:'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&q=80',
   weight:'500 g', unit:'box', rating:4.4, reviews:98,
   nutritional_info:{calories:371, protein:'13g', carbs:'75g', fat:'1.5g'}, featured:false}
];

/* ─────────────────────────────────────────────────────────────
   3. APP STATE
   ───────────────────────────────────────────────────────────── */
const STATE = {
  cart: JSON.parse(localStorage.getItem('bb_v2_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('bb_v2_wishlist') || '[]'),
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
   10. THREE.JS HERO — Enhanced Cyber Character
   ───────────────────────────────────────────────────────────── */
function initThreeJS() {
  if (typeof THREE === 'undefined') return;
  const canvas = $('#threeCanvas');
  const section = $('#hero');
  const W = section.clientWidth;
  const H = section.clientHeight;

  // Renderer with better settings
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  // Scene & Camera
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
  camera.position.set(0, 0.5, 9);

  // ── Enhanced Lights ──
  scene.add(new THREE.AmbientLight(0xffffff, 0.3));

  // Main blue light with shadow
  const blueLight = new THREE.PointLight(0x00d4ff, 8, 30);
  blueLight.position.set(4, 4, 4);
  blueLight.castShadow = true;
  blueLight.shadow.mapSize.width = 1024;
  blueLight.shadow.mapSize.height = 1024;
  scene.add(blueLight);

  // Pink accent light
  const pinkLight = new THREE.PointLight(0xff2d78, 5, 25);
  pinkLight.position.set(-4, -1, 3);
  scene.add(pinkLight);

  // Green fill light
  const greenLight = new THREE.PointLight(0x0dff6e, 3, 20);
  greenLight.position.set(0, 3, -3);
  scene.add(greenLight);

  // Top directional light
  const topLight = new THREE.DirectionalLight(0xffffff, 0.8);
  topLight.position.set(0, 8, 6);
  topLight.castShadow = true;
  scene.add(topLight);

  // Rim light for edge definition
  const rimLight = new THREE.PointLight(0xbf5af2, 4, 25);
  rimLight.position.set(0, 2, -5);
  scene.add(rimLight);

  // ── Glow disc (behind hero) ──
  const discGeo = new THREE.CircleGeometry(2, 64);
  const discMat = new THREE.MeshBasicMaterial({ 
    color: 0x00d4ff, 
    transparent: true, 
    opacity: 0.08,
    side: THREE.DoubleSide
  });
  const disc = new THREE.Mesh(discGeo, discMat);
  disc.position.z = -0.5;
  scene.add(disc);

  // Outer ring
  const ringGeo = new THREE.RingGeometry(2.02, 2.15, 64);
  const ringMat = new THREE.MeshBasicMaterial({ 
    color: 0x00d4ff, 
    side: THREE.DoubleSide, 
    transparent: true, 
    opacity: 0.4 
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  scene.add(ring);

  // Inner ring
  const innerRingGeo = new THREE.RingGeometry(1.5, 1.55, 64);
  const innerRingMat = new THREE.MeshBasicMaterial({ 
    color: 0xff2d78, 
    side: THREE.DoubleSide, 
    transparent: true, 
    opacity: 0.3 
  });
  const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
  innerRing.position.z = 0.1;
  scene.add(innerRing);

  // ── Cyber character (built with primitives) — Enhanced ──
  const cyberMat = new THREE.MeshStandardMaterial({ 
    color: 0x001428, 
    emissive: 0x001e40, 
    metalness: 0.95, 
    roughness: 0.15 
  });
  const glowMat  = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
  const panelMat = new THREE.MeshBasicMaterial({ color: 0x0077cc, transparent: true, opacity: 0.8 });
  const accentMat = new THREE.MeshStandardMaterial({ 
    color: 0xff2d78, 
    emissive: 0xff2d78, 
    emissiveIntensity: 0.5,
    metalness: 0.8, 
    roughness: 0.2 
  });

  const hero = new THREE.Group();

  // Head (enhanced with more geometry)
  const head = new THREE.Mesh(
    new THREE.BoxGeometry(.65, .72, .6, 2, 2, 2), 
    cyberMat
  );
  head.position.y = 1.1;
  head.castShadow = true;
  hero.add(head);

  // Visor (glowing)
  const visor = new THREE.Mesh(new THREE.BoxGeometry(.5, .14, .06), glowMat);
  visor.position.set(0, 1.13, .3);
  hero.add(visor);

  // Visor glow effect
  const visorGlow = new THREE.PointLight(0x00d4ff, 2, 3);
  visorGlow.position.set(0, 1.13, .4);
  hero.add(visorGlow);

  // Antenna dots (enhanced)
  [-0.12, 0.12].forEach(x => {
    const a = new THREE.Mesh(new THREE.SphereGeometry(.04, 8, 8), glowMat);
    a.position.set(x, 1.55, 0);
    hero.add(a);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(.015, .015, .15, 6), cyberMat);
    stem.position.set(x, 1.48, 0);
    hero.add(stem);
    // Antenna glow
    const antGlow = new THREE.PointLight(0x00d4ff, 0.5, 1);
    antGlow.position.set(x, 1.55, 0);
    hero.add(antGlow);
  });

  // Neck
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(.15, .18, .15, 8), cyberMat);
  neck.position.y = .68;
  hero.add(neck);

  // Torso (enhanced)
  const torso = new THREE.Mesh(
    new THREE.CylinderGeometry(.42, .32, 1.35, 8), 
    cyberMat
  );
  torso.position.y = 0;
  torso.castShadow = true;
  hero.add(torso);

  // Chest plate
  const chest = new THREE.Mesh(new THREE.BoxGeometry(.48, .36, .06), panelMat);
  chest.position.set(0, .18, .4);
  hero.add(chest);

  // Chest lines (animated glow)
  for (let i = 0; i < 3; i++) {
    const ln = new THREE.Mesh(new THREE.BoxGeometry(.32, .025, .02), glowMat);
    ln.position.set(0, .08 + i * .08, .43);
    hero.add(ln);
  }

  // Core reactor (center chest)
  const coreGeo = new THREE.CircleGeometry(.08, 16);
  const coreMat = new THREE.MeshBasicMaterial({ 
    color: 0x0dff6e, 
    transparent: true, 
    opacity: 0.9 
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  core.position.set(0, .18, .44);
  hero.add(core);

  // Core glow
  const coreGlow = new THREE.PointLight(0x0dff6e, 2, 3);
  coreGlow.position.set(0, .18, .5);
  hero.add(coreGlow);

  // Shoulder pads (enhanced)
  [-0.65, 0.65].forEach(x => {
    const sp = new THREE.Mesh(new THREE.SphereGeometry(.25, 8, 8), cyberMat);
    sp.position.set(x, .6, 0);
    sp.castShadow = true;
    hero.add(sp);
    // Shoulder accent
    const sa = new THREE.Mesh(new THREE.BoxGeometry(.1, .05, .26), accentMat);
    sa.position.set(x, .62, 0);
    hero.add(sa);
    // Shoulder glow ring
    const sRing = new THREE.Mesh(
      new THREE.TorusGeometry(.26, .02, 8, 16), 
      glowMat
    );
    sRing.position.set(x, .6, 0);
    sRing.rotation.x = Math.PI / 2;
    hero.add(sRing);
  });

  // Arms (enhanced with joints)
  [-0.65, 0.65].forEach((x, i) => {
    // Upper arm
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(.11, .09, 1, 6), cyberMat);
    arm.position.set(x, .08, 0);
    arm.rotation.z = i === 0 ? .22 : -.22;
    arm.castShadow = true;
    hero.add(arm);
    
    // Elbow joint
    const elbow = new THREE.Mesh(new THREE.SphereGeometry(.09, 8, 8), accentMat);
    elbow.position.set(x * 1.05, -.35, 0);
    hero.add(elbow);
    
    // Lower arm
    const lowerArm = new THREE.Mesh(new THREE.CylinderGeometry(.09, .08, .8, 6), cyberMat);
    lowerArm.position.set(x * 1.1, -.7, 0);
    lowerArm.rotation.z = i === 0 ? .15 : -.15;
    hero.add(lowerArm);
    
    // Hand
    const hand = new THREE.Mesh(new THREE.SphereGeometry(.11, 8, 8), cyberMat);
    hand.position.set(x * 1.1, -.45, 0);
    hand.castShadow = true;
    hero.add(hand);
    
    // Hand glow
    const handGlow = new THREE.PointLight(0x00d4ff, 0.3, 1);
    handGlow.position.set(x * 1.1, -.45, .1);
    hero.add(handGlow);
  });

  // Pelvis & legs (enhanced)
  const pelvis = new THREE.Mesh(new THREE.CylinderGeometry(.3, .26, .3, 6), cyberMat);
  pelvis.position.y = -.72;
  pelvis.castShadow = true;
  hero.add(pelvis);

  // Belt
  const belt = new THREE.Mesh(
    new THREE.TorusGeometry(.29, .03, 8, 16), 
    accentMat
  );
  belt.position.y = -.72;
  belt.rotation.x = Math.PI / 2;
  hero.add(belt);

  [-0.2, 0.2].forEach(x => {
    // Upper leg
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(.14, .11, 1.1, 6), cyberMat);
    leg.position.set(x, -1.3, 0);
    leg.castShadow = true;
    hero.add(leg);
    
    // Knee joint
    const knee = new THREE.Mesh(new THREE.BoxGeometry(.17, .1, .18), accentMat);
    knee.position.set(x, -.92, 0);
    hero.add(knee);
    
    // Knee glow
    const kneeGlow = new THREE.PointLight(0xff2d78, 0.3, 1);
    kneeGlow.position.set(x, -.92, .1);
    hero.add(kneeGlow);
    
    // Lower leg
    const lowerLeg = new THREE.Mesh(new THREE.CylinderGeometry(.11, .09, .9, 6), cyberMat);
    lowerLeg.position.set(x, -1.65, 0);
    lowerLeg.castShadow = true;
    hero.add(lowerLeg);
    
    // Boot
    const boot = new THREE.Mesh(new THREE.BoxGeometry(.18, .22, .28), cyberMat);
    boot.position.set(x, -1.91, .04);
    boot.castShadow = true;
    hero.add(boot);
    
    // Boot sole (glowing)
    const sole = new THREE.Mesh(
      new THREE.BoxGeometry(.19, .03, .29), 
      glowMat
    );
    sole.position.set(x, -2.03, .04);
    hero.add(sole);
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

  // ── Animation loop — Enhanced ──
  let t = 0;
  (function animate() {
    requestAnimationFrame(animate);
    t += .012;

    // Hero float + rotate (smoother)
    hero.rotation.y += .005;
    hero.position.y = -.1 + Math.sin(t * .7) * .12;
    
    // Subtle tilt
    hero.rotation.z = Math.sin(t * .5) * .02;
    hero.rotation.x = Math.sin(t * .6) * .015;

    // Camera: mouse parallax (smoother)
    camera.position.x += (mouse.x * .6 - camera.position.x) * .04;
    camera.position.y += (mouse.y * .4 + .5 - camera.position.y) * .04;

    // Camera: scroll around model
    camera.position.z = 9 - scrollProgress * 4;
    camera.position.x += -scrollProgress * 3;
    camera.lookAt(0, 0.2, 0);

    // Animate lights (more dynamic)
    blueLight.position.x = Math.sin(t*.6)*5;
    blueLight.position.z = Math.cos(t*.6)*5;
    blueLight.intensity = 8 + Math.sin(t * 2) * 2;
    
    pinkLight.position.x = Math.cos(t*.4)*4;
    pinkLight.position.y = Math.sin(t*.5)*3;
    pinkLight.intensity = 5 + Math.sin(t * 1.5) * 1.5;
    
    greenLight.intensity = 3 + Math.sin(t * 1.8) * 1;
    rimLight.intensity = 4 + Math.sin(t * 2.2) * 1.5;

    // Pulse disc and rings
    disc.scale.setScalar(1 + Math.sin(t*1.2)*.05);
    ring.scale.setScalar(1 + Math.sin(t*1.5)*.03);
    ring.rotation.z = t * .2;
    innerRing.scale.setScalar(1 + Math.sin(t*1.8)*.04);
    innerRing.rotation.z = -t * .3;

    // Core reactor pulse
    core.scale.setScalar(1 + Math.sin(t * 3) * .15);
    coreMat.opacity = 0.7 + Math.sin(t * 3) * .2;
    coreGlow.intensity = 2 + Math.sin(t * 3) * 1;

    // Visor glow pulse
    visorGlow.intensity = 2 + Math.sin(t * 2.5) * .5;

    // Rotate particles faster
    particles.rotation.y += .0008;
    
    // Animate grid floor
    grid.position.y = -2.4 + Math.sin(t * .3) * .05;

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
   12. GSAP ANIMATIONS — HERO & GENERAL (Enhanced)
   ───────────────────────────────────────────────────────────── */
function initGSAPHero() {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl
    .from('.hero-eyebrow', { opacity: 0, y: 40, duration: 1, ease: 'power3.out' })
    .from('.ht-line', { 
      opacity: 0, 
      y: 80, 
      rotationX: -90,
      transformOrigin: 'center bottom',
      stagger: .18, 
      duration: 1.2,
      ease: 'power4.out'
    }, '-=.5')
    .from('.hero-desc', { opacity: 0, y: 30, duration: .9, ease: 'power3.out' }, '-=.5')
    .from('.hero-cta', { opacity: 0, y: 25, duration: .8, ease: 'back.out(1.7)' }, '-=.4')
    .from('.scroll-hint', { opacity: 0, duration: .8, ease: 'power2.out' }, '-=.3')
    .from('.frame', { opacity: 0, scale: 0, rotation: 180, stagger: .08, duration: .6, ease: 'back.out(2)' }, '-=.5');

  gsap.from('#nav', { opacity: 0, y: -40, duration: .8, delay: .4, ease: 'power3.out' });
  
  // Continuous subtle animation for hero content
  gsap.to('.hero-content', {
    y: -8,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
}

/* ─────────────────────────────────────────────────────────────
   13. STORY SCROLL — Cyberfiction Sticky (Enhanced)
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
    
    // Animate chapter entrance
    const activeChapter = chapters[index];
    if (activeChapter) {
      gsap.fromTo(activeChapter, 
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: .8, ease: 'power3.out' }
      );
    }
  }

  activate(0);

  // Dot click with animation
  dots.forEach(d => d.addEventListener('click', () => {
    const idx = +d.dataset.i;
    activate(idx);
    gsap.to(d, { scale: 1.5, duration: .2, yoyo: true, repeat: 1, ease: 'power2.out' });
  }));

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

  // Section header reveal with better animation
  gsap.from('.chapter-title', {
    scrollTrigger: { trigger: '#story', start: 'top 80%' },
    opacity: 0, 
    y: 60, 
    rotationX: -45,
    transformOrigin: 'center top',
    duration: 1,
    ease: 'power3.out'
  });
}

/* ─────────────────────────────────────────────────────────────
   14. FEATURES — Horizontal Scroll Track (Enhanced)
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

  // Animate cards in with stagger and better easing
  gsap.from('.feat-card', {
    scrollTrigger: { trigger: '#features', start: 'top 80%', toggleActions: 'play none none reverse' },
    opacity: 0, 
    x: 80, 
    rotationY: -15,
    transformOrigin: 'center center',
    stagger: .15, 
    duration: 1, 
    ease: 'power3.out'
  });

  gsap.from('.features-title', {
    scrollTrigger: { trigger: '#features', start: 'top 85%' },
    opacity: 0, 
    x: -60, 
    duration: 1,
    ease: 'power3.out'
  });
}

/* ─────────────────────────────────────────────────────────────
   15. SHOP SECTION ANIMATIONS (Enhanced)
   ───────────────────────────────────────────────────────────── */
function initShopAnimations() {
  gsap.from('.shop-header', {
    scrollTrigger: { trigger: '#shop', start: 'top 80%' },
    opacity: 0, 
    y: 70, 
    duration: 1,
    ease: 'power3.out'
  });
  gsap.from('.cat-pills', {
    scrollTrigger: { trigger: '.cat-pills', start: 'top 90%' },
    opacity: 0, 
    y: 30, 
    duration: .7,
    ease: 'back.out(1.7)'
  });
}

/* ─────────────────────────────────────────────────────────────
   16. CHECKOUT SECTION ANIMATIONS (Enhanced)
   ───────────────────────────────────────────────────────────── */
function initCheckoutAnimations() {
  gsap.from('.checkout-title', {
    scrollTrigger: { trigger: '#checkout', start: 'top 80%' },
    opacity: 0, 
    y: 60, 
    duration: .9,
    ease: 'power3.out'
  });
  gsap.from('.summary-card', {
    scrollTrigger: { trigger: '#checkout', start: 'top 75%' },
    opacity: 0, 
    x: 60, 
    duration: .9,
    ease: 'power3.out'
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
    
    // Track mouse position for glow effect
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--mouse-x', x + '%');
      el.style.setProperty('--mouse-y', y + '%');
    });
  });
}

function makeProductCard(p) {
  const img = p.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80';
  const low = p.stock < 15;
  const rating = p.rating || 0;
  const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));

  const div = document.createElement('div');
  div.className = 'p-card';
  div.dataset.id = p.id;

  div.innerHTML = `
    <div class="p-card-img">
      <img src="${img}" alt="${p.name}" loading="lazy"
           onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80'"/>
      <span class="p-cat-tag">${p.category}</span>
      ${p.featured ? '<span class="feat-badge">FEATURED</span>' : ''}
      ${low ? `<span class="p-stock-badge">LOW STOCK</span>` : ''}
      <button class="wishlist-btn ${isInWishlist(p.id) ? 'active' : ''}" data-id="${p.id}" aria-label="Add to wishlist">
        ${isInWishlist(p.id) ? '❤️' : '🤍'}
      </button>
    </div>
    <div class="p-card-body">
      <div class="feat-rating">
        <span class="feat-stars">${stars}</span>
        <span class="feat-review-count">(${p.reviews || 0})</span>
      </div>
      <div class="p-card-name">${p.name}</div>
      <div class="feat-weight">${p.weight || ''}</div>
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

  // Wishlist button
  const wishlistBtn = div.querySelector('.wishlist-btn');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', e => {
      e.stopPropagation();
      addToWishlist(p);
      wishlistBtn.classList.toggle('active');
      wishlistBtn.textContent = isInWishlist(p.id) ? '❤️' : '🤍';
    });
  }

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

/* ─────────────────────────────────────────────────────────────
   WISHLIST MANAGEMENT
   ───────────────────────────────────────────────────────────── */
function saveWishlist() {
  localStorage.setItem('bb_v2_wishlist', JSON.stringify(STATE.wishlist));
}

function addToWishlist(product) {
  if (!STATE.wishlist.includes(product.id)) {
    STATE.wishlist.push(product.id);
    saveWishlist();
    toast('❤️ Added to wishlist', 'success');
  } else {
    STATE.wishlist = STATE.wishlist.filter(id => id !== product.id);
    saveWishlist();
    toast('💔 Removed from wishlist', 'info');
  }
}

function isInWishlist(productId) {
  return STATE.wishlist.includes(productId);
}

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
  const payment = document.querySelector('input[name="payment"]:checked')?.value || 'upi';

  if (!name || !phone || !address) {
    toast('Please fill delivery details!', 'error'); return;
  }

  const order = {
    items: STATE.cart,
    total: getCartTotal(),
    customer: { name, phone, address },
    payment: payment,
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
   25. FEATURED PRODUCTS CAROUSEL
   ───────────────────────────────────────────────────────────── */
function initFeaturedCarousel() {
  const track = $('#featuredTrack');
  if (!track) return;

  // Get featured products
  const featured = STATE.products.filter(p => p.featured).slice(0, 10);
  
  if (featured.length === 0) {
    $('#featuredCarousel')?.remove();
    return;
  }

  // Render featured products
  track.innerHTML = featured.map(p => {
    const img = p.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80';
    const rating = p.rating || 0;
    const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
    
    return `
      <div class="feat-product" data-id="${p.id}">
        <div class="p-card-img">
          <img src="${img}" alt="${p.name}" loading="lazy"
               onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80'"/>
          <span class="feat-badge">SPECIAL</span>
        </div>
        <div class="p-card-body">
          <div class="feat-rating">
            <span class="feat-stars">${stars}</span>
            <span class="feat-review-count">(${p.reviews || 0})</span>
          </div>
          <div class="p-card-name">${p.name}</div>
          <div class="feat-weight">${p.weight || ''}</div>
          <div class="p-card-footer">
            <div class="p-card-price">${fmt(p.price)}</div>
            <button class="p-card-add" data-id="${p.id}">+ CART</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Add click handlers
  track.querySelectorAll('.feat-product').forEach(card => {
    card.addEventListener('click', e => {
      if (!e.target.classList.contains('p-card-add')) {
        const product = STATE.products.find(p => String(p.id) === card.dataset.id);
        if (product) openQuickView(product);
      }
    });
  });

  track.querySelectorAll('.p-card-add').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const product = STATE.products.find(p => String(p.id) === btn.dataset.id);
      if (product) {
        addToCart(product, 1);
        btn.classList.add('added');
        btn.textContent = '✓ ADDED';
        setTimeout(() => { btn.classList.remove('added'); btn.textContent = '+ CART'; }, 1300);
      }
    });
  });

  // Carousel navigation
  const prevBtn = $('#featPrev');
  const nextBtn = $('#featNext');
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -300, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }
}

/* ─────────────────────────────────────────────────────────────
   26. NEWSLETTER SUBSCRIPTION
   ───────────────────────────────────────────────────────────── */
function initNewsletter() {
  const form = $('#newsletterForm');
  const msgEl = $('#nlMsg');
  
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = $('#nlEmail')?.value.trim();
    
    if (!email) {
      msgEl.textContent = '⚠️ Please enter your email';
      msgEl.className = 'nl-msg err';
      return;
    }

    // Simulate subscription (in real app, send to backend)
    const subscribers = JSON.parse(localStorage.getItem('bb_v2_subscribers') || '[]');
    
    if (subscribers.includes(email)) {
      msgEl.textContent = '⚠️ Already subscribed!';
      msgEl.className = 'nl-msg err';
      return;
    }

    subscribers.push(email);
    localStorage.setItem('bb_v2_subscribers', JSON.stringify(subscribers));
    
    msgEl.textContent = '✅ Welcome to the grid!';
    msgEl.className = 'nl-msg ok';
    $('#nlEmail').value = '';
    toast('📧 Subscribed successfully!', 'success');
    
    setTimeout(() => {
      msgEl.textContent = '';
      msgEl.className = 'nl-msg';
    }, 5000);
  });
}

/* ─────────────────────────────────────────────────────────────
   27. EVENT BINDINGS
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
  initFeaturedCarousel();
  initNewsletter();
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
