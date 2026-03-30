/**
 * ════════════════════════════════════════════════════════
 * BADBOYS GROCERIES V2 — server.js
 * Node.js + Express — Single file backend
 * Handles: Products CRUD, Orders storage
 * Auth handled client-side via Supabase
 * ════════════════════════════════════════════════════════
 */

const express  = require('express');
const cors     = require('cors');
const fs       = require('fs');
const path     = require('path');

const app  = express();
const PORT = process.env.PORT || 3001;

/* ── Middleware ────────────────────────────────────────── */
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use((req, res, next) => {
  const ts = new Date().toISOString().slice(11, 19);
  console.log(`[${ts}] ${req.method.padEnd(6)} ${req.path}`);
  next();
});

/* ── Data Files (JSON persistence) ──────────────────────
   Products and orders are stored in local JSON files.
   Replace with a real DB (Postgres, MongoDB) in production.
   ─────────────────────────────────────────────────────── */
const DATA_DIR  = path.join(__dirname, 'data');
const PROD_FILE = path.join(DATA_DIR, 'products.json');
const ORD_FILE  = path.join(DATA_DIR, 'orders.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// Seed products if file doesn't exist
const SEED_PRODUCTS = [
  {id:1,name:'Cyber Apple',price:45,category:'fruits',stock:120,description:'Nano-enhanced Fuji apples from the hydroponic towers of Neo-Mumbai.',image_url:'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500&q=80'},
  {id:2,name:'Quantum Mango',price:120,category:'fruits',stock:80,description:'Premium Alphonso mangoes irradiated for peak bio-ripeness.',image_url:'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&q=80'},
  {id:3,name:'Synth Banana',price:40,category:'fruits',stock:200,description:'Molecularly-structured Cavendish. Potassium off-chart.',image_url:'https://images.unsplash.com/photo-1543218024-57a70143c369?w=500&q=80'},
  {id:4,name:'Pixel Berries',price:180,category:'fruits',stock:55,description:'Mixed antioxidant berries — lab-certified freshness.',image_url:'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=500&q=80'},
  {id:5,name:'Neon Broccoli',price:60,category:'veggies',stock:90,description:'Bioluminescent-grade organic broccoli.',image_url:'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&q=80'},
  {id:6,name:'Pixel Tomatoes',price:50,category:'veggies',stock:150,description:'Vine-ripened in LED farms. Resolution: 4K flavor.',image_url:'https://images.unsplash.com/photo-1471194402529-8e0f5cf8d51f?w=500&q=80'},
  {id:7,name:'Matrix Spinach',price:75,category:'veggies',stock:110,description:'Iron-fortified nano-spinach from orbital stations.',image_url:'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&q=80'},
  {id:8,name:'Cyber Carrots',price:55,category:'veggies',stock:180,description:'Beta-carotene enhanced. Max crunch rating.',image_url:'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=500&q=80'},
  {id:9,name:'Holo Milk',price:55,category:'dairy',stock:75,description:'Ultra-pasteurized. Full-fat cyber grade.',image_url:'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80'},
  {id:10,name:'Zero Cheese',price:180,category:'dairy',stock:40,description:'Cryo-vault aged 60 days. Sharp and cyber-smooth.',image_url:'https://images.unsplash.com/photo-1486297678162-eb2a19b0a318?w=500&q=80'},
  {id:11,name:'Plasma Chips',price:35,category:'snacks',stock:300,description:'Fried in arc-energy oil. Max overdrive crunch.',image_url:'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&q=80'},
  {id:12,name:'Dark Matter Bar',price:65,category:'snacks',stock:220,description:'40g protein — forged in the void. Zero sugar.',image_url:'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=500&q=80'},
  {id:13,name:'Grid Coffee',price:299,category:'beverages',stock:50,description:'Arabica in zero-G labs. Brews at warp speed.',image_url:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80'},
  {id:14,name:'Volt Energy',price:80,category:'beverages',stock:180,description:'Electrolyte surge in every can.',image_url:'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=500&q=80'},
  {id:15,name:'Neon OJ',price:90,category:'beverages',stock:120,description:'Cold-pressed in fluorescent orchards.',image_url:'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&q=80'},
  {id:16,name:'Cyber Rice',price:85,category:'grains',stock:200,description:'Basmati aged in sealed vaults. Extra long grain.',image_url:'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80'},
  {id:17,name:'Quantum Wheat',price:70,category:'grains',stock:150,description:'Fortified whole wheat from orbital greenhouses.',image_url:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80'},
  {id:18,name:'Matrix Oats',price:110,category:'grains',stock:90,description:'Rolled in nano-mills. High beta-glucan.',image_url:'https://images.unsplash.com/photo-1505253304499-671c55fb57fe?w=500&q=80'},
];

function readJSON(file, fallback = []) {
  try {
    if (!fs.existsSync(file)) return fallback;
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch { return fallback; }
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Seed if needed
if (!fs.existsSync(PROD_FILE)) {
  writeJSON(PROD_FILE, SEED_PRODUCTS);
  console.log('[Data] Seeded', SEED_PRODUCTS.length, 'products');
}
if (!fs.existsSync(ORD_FILE)) writeJSON(ORD_FILE, []);

/* ══════════════════════════════════════════════════════════
   ROUTES
══════════════════════════════════════════════════════════ */

// ── Health check ──────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'ONLINE', project: 'Badboys Groceries V2',
    version: '2.0.77',
    routes: ['GET /api/products','POST /api/products','DELETE /api/products/:id','GET /api/orders','POST /api/orders']
  });
});

// ── GET Products ──────────────────────────────────────────
app.get('/api/products', (req, res) => {
  let products = readJSON(PROD_FILE, SEED_PRODUCTS);
  const { category, search } = req.query;

  if (category && category !== 'all') {
    products = products.filter(p => p.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p => p.name.toLowerCase().includes(q) || (p.description||'').toLowerCase().includes(q));
  }

  res.json({ success: true, data: products, total: products.length });
});

// ── GET Single Product ────────────────────────────────────
app.get('/api/products/:id', (req, res) => {
  const products = readJSON(PROD_FILE, SEED_PRODUCTS);
  const product  = products.find(p => String(p.id) === req.params.id);
  if (!product) return res.status(404).json({ success: false, error: 'Not found' });
  res.json({ success: true, data: product });
});

// ── POST Add Product ──────────────────────────────────────
app.post('/api/products', (req, res) => {
  const { name, price, category, image_url, description, stock } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ success: false, error: 'Name and price required' });
  }

  const products = readJSON(PROD_FILE, SEED_PRODUCTS);
  const maxId    = products.reduce((m, p) => Math.max(m, p.id || 0), 0);

  const product = {
    id: maxId + 1,
    name: name.trim(),
    price: parseFloat(price),
    category: category || 'other',
    image_url: image_url || '',
    description: description || '',
    stock: parseInt(stock) || 100,
    createdAt: new Date().toISOString(),
  };

  products.unshift(product);
  writeJSON(PROD_FILE, products);
  res.status(201).json({ success: true, data: product });
});

// ── DELETE Product ────────────────────────────────────────
app.delete('/api/products/:id', (req, res) => {
  let products = readJSON(PROD_FILE, SEED_PRODUCTS);
  const before = products.length;
  products = products.filter(p => String(p.id) !== req.params.id);

  if (products.length === before) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  writeJSON(PROD_FILE, products);
  res.json({ success: true, message: 'Deleted' });
});

// ── GET Orders ────────────────────────────────────────────
app.get('/api/orders', (req, res) => {
  const orders = readJSON(ORD_FILE, []);
  res.json({ success: true, data: orders.reverse(), total: orders.length });
});

// ── POST Create Order ─────────────────────────────────────
app.post('/api/orders', (req, res) => {
  const { items, total, customer, userId, status } = req.body;

  if (!items || !total) {
    return res.status(400).json({ success: false, error: 'Items and total required' });
  }

  const orders = readJSON(ORD_FILE, []);
  const order  = {
    id: orders.length + 1,
    items,
    total: parseFloat(total),
    customer: customer || {},
    userId: userId || null,
    status: status || 'pending',
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  writeJSON(ORD_FILE, orders);

  console.log(`[Order] #${order.id} — ₹${order.total} — ${customer?.name || 'Anonymous'}`);
  res.status(201).json({ success: true, data: order });
});

// ── PUT Update Order Status ───────────────────────────────
app.put('/api/orders/:id', (req, res) => {
  const orders  = readJSON(ORD_FILE, []);
  const order   = orders.find(o => String(o.id) === req.params.id);
  if (!order)   return res.status(404).json({ success: false, error: 'Order not found' });

  const { status } = req.body;
  if (status) order.status = status;
  order.updatedAt = new Date().toISOString();

  writeJSON(ORD_FILE, orders);
  res.json({ success: true, data: order });
});

/* ── 404 ──────────────────────────────────────────────── */
app.use((req, res) => res.status(404).json({ success: false, error: 'Not found' }));

/* ── Error handler ───────────────────────────────────────── */
app.use((err, req, res, next) => {
  console.error('[Error]', err.message);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

/* ── Start ───────────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log('\n╔═══════════════════════════════════════════╗');
  console.log('║  BADBOYS GROCERIES V2 — BACKEND ONLINE   ║');
  console.log(`║  http://localhost:${PORT}                     ║`);
  console.log('║  Data: /backend/data/ (JSON files)       ║');
  console.log('╚═══════════════════════════════════════════╝\n');
});

module.exports = app;
