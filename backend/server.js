
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


const DATA_DIR  = path.join(__dirname, 'data');
const PROD_FILE = path.join(DATA_DIR, 'products.json');
const ORD_FILE  = path.join(DATA_DIR, 'orders.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });


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

/* ROUTES*/

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
  const { name, price, category, image_url, description, stock, weight, unit, rating, reviews, nutritional_info, featured } = req.body;

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
    weight: weight || '',
    unit: unit || 'piece',
    rating: parseFloat(rating) || 0,
    reviews: parseInt(reviews) || 0,
    nutritional_info: nutritional_info || {},
    featured: featured || false,
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
  const { items, total, customer, userId, status, payment } = req.body;

  if (!items || !total) {
    return res.status(400).json({ success: false, error: 'Items and total required' });
  }

  const orders = readJSON(ORD_FILE, []);
  const order  = {
    id: orders.length + 1,
    items,
    total: parseFloat(total),
    customer: customer || {},
    payment: payment || 'upi',
    userId: userId || null,
    status: status || 'pending',
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  writeJSON(ORD_FILE, orders);

  console.log(`[Order] #${order.id} — ₹${order.total} — ${customer?.name || 'Anonymous'} — ${payment || 'upi'}`);
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
