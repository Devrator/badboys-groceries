# 🛒 BADBOYS GROCERIES — V2 CYBER EDITION

Cyberfiction-inspired scroll storytelling grocery website with full 3D, GSAP animations, working cart, checkout, and Supabase Google auth.

---

## 📁 STRUCTURE

```
badboys-v2/
├── frontend/
│   ├── index.html    ← Complete single-page app
│   ├── style.css     ← Full cyberpunk design system
│   └── script.js     ← All logic (Three.js, GSAP, Lenis, Cart, Auth)
├── backend/
│   ├── server.js     ← Express API (single file)
│   ├── package.json
│   └── data/         ← Auto-created: products.json, orders.json
└── README.md
```

---

## ⚡ INSTANT START (No setup needed)

```bash
# Just open the frontend — works immediately with demo data
open frontend/index.html
```

20 products load from embedded data. Cart, checkout, admin all work in demo mode.

---

## 🖥️ WITH BACKEND

```bash
cd backend
npm install
npm start
# Backend runs at http://localhost:3001
```

Products and orders now persist in `backend/data/*.json`.

---

## 🔐 SUPABASE GOOGLE LOGIN SETUP

1. Create project at [supabase.com](https://supabase.com)
2. Go to **Authentication → Providers → Google**
3. Enable Google, add your OAuth client ID & secret from [console.cloud.google.com](https://console.cloud.google.com)
4. Add your domain to **Authorized redirect URLs**:
   ```
   https://your-project.supabase.co/auth/v1/callback
   ```
5. In `frontend/script.js`, replace lines 19-20:
   ```js
   const SUPABASE_URL  = 'https://YOUR-PROJECT.supabase.co';
   const SUPABASE_ANON = 'YOUR-ANON-PUBLIC-KEY';
   ```

**Email/password login** also works — just enter credentials in the login modal.

---

## 🎨 DESIGN FEATURES

| Feature | Tech |
|---------|------|
| Cyberfiction-style sticky scroll story | GSAP ScrollTrigger |
| 3D cyber hero model | Three.js (primitives) |
| Camera scroll animation | Three.js + ScrollTrigger |
| Horizontal scrolling features | GSAP + ScrollTrigger |
| Smooth scroll throughout | Lenis |
| Glitch hero text | CSS animations |
| Custom glow cursor | Vanilla JS |
| Scroll progress bar | Vanilla JS |
| Page loader | GSAP |
| Glassmorphism product cards | CSS backdrop-filter |
| Neon hover effects | CSS |
| Cart sidebar slide | CSS + GSAP |
| Toast notifications | Vanilla JS |
| Product quick view modal | Vanilla JS + GSAP |
| Floating particles (hero) | CSS + JS |

---

## 🛒 FUNCTIONAL FEATURES

| Feature | Status |
|---------|--------|
| Products load from backend/embedded data | ✅ |
| Category filter | ✅ |
| Search (Ctrl+K shortcut) | ✅ |
| Add to cart | ✅ |
| Remove from cart | ✅ |
| Qty controls | ✅ |
| Cart persists via localStorage | ✅ |
| Cart sidebar with animations | ✅ |
| Product quick view modal | ✅ |
| Checkout with delivery form | ✅ |
| Order placement + confirmation | ✅ |
| Orders stored (backend JSON) | ✅ |
| Admin panel (add/delete products) | ✅ |
| Admin orders view | ✅ |
| Google Login (Supabase) | ✅ (needs config) |
| Email/Password login | ✅ (needs config) |

---

## 🔑 ADMIN ACCESS

Click the **⚙** gear icon in the footer to open Admin Panel.

- Add products with image, price, category
- Delete existing products
- View all orders

---

## 🎬 SCROLL SECTIONS

1. **Hero** — 3D Three.js character, camera moves on scroll
2. **Story** — 4-panel sticky scroll storytelling (Cyberfiction style)
3. **Features** — Horizontal scroll track with progress bar
4. **Shop** — Dynamic product grid with filter & search
5. **Checkout** — Full checkout with delivery form
6. **Footer** — Links + admin access

---

## 📱 RESPONSIVE

✅ Desktop (1440px+)  ✅ Laptop (1024px)  ✅ Tablet (768px)  ✅ Mobile (375px+)

---

## 🎨 DESIGN SYSTEM

| Token | Value |
|-------|-------|
| Cyan/Blue | `#00d4ff` |
| Pink/Red | `#ff2d78` |
| Green | `#0dff6e` |
| Background | `#ffffff` |
| Font Display | Bebas Neue |
| Font Body | Syne |
| Font Mono | DM Mono |

---

*Built for Badboys Groceries — V2 Cyber Edition 2077*
