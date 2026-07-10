# 💎 Dingo Golds | Handcrafted Luxury & Elegance

Dingo Golds is a premium, fully responsive, and single-page (SPA) e-commerce website designed for a luxury jewellery store. Built using modern semantic HTML5, high-end vanilla CSS (with custom properties, grid layouts, and glassmorphism elements), and vanilla JavaScript.

Live Order processing is integrated directly with **WhatsApp Order Integration**, allowing seamless customer purchases.

---

## ✨ Features

- 🌟 **Premium Theme**: Sleek dark-mode aesthetic featuring deep midnight-sapphire tones and warm champagne-gold accents.
- 📱 **Fully Responsive Layout**: Fits beautifully on desktop, tablet, and mobile screens.
- 📦 **SPA Navigation**: Smooth, instantaneous section switching (Home, Shop, About Us, Contact Us) using URL hash routing.
- 🔍 **Real-Time Product Filter & Search**: Instant query search by title or category description, paired with interactive category filters.
- 👜 **Active Shopping Drawer**: Dynamic subtotal computations, quantity modification controls, and cross-session cart saving (via `localStorage`).
- 💬 **WhatsApp Order System**: Compiles the selected cart items, prices, quantities, and order values into a clean, pre-formatted message that redirects automatically to WhatsApp.
- 👁️ **Bespoke Product Details Modal**: Features macro product views, pricing details, and lists certification/gem specifications.
- ✉️ **Custom Consultation Enquiry**: Clean, animated form for bespoke design inquiries.

---

## 🛠️ Tech Stack & Architecture

- **Structure**: Semantic HTML5 markup
- **Styling**: Vanilla CSS (Fluid variables, Flexbox, CSS Grid, Glassmorphism, Keyframe animations)
- **Logic**: Vanilla ES6 JavaScript (LocalStorage state management, URL hash router, string template query filters)
- **Assets**: Hand-matched high-definition AI product renderings (Rings, Necklaces, Earrings, Bracelets)
- **Typography**: Google Fonts (Italiana, Playfair Display, Montserrat)
- **Icons**: FontAwesome v6 CDN

---

## 🚀 How to Run Locally

You can launch the site instantly using any local HTTP static server:

### Option 1: Using Python (Recommended)
Open a terminal in the project directory and run:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000/`.

### Option 2: Using Node.js (Live Server / HTTP Server)
If you have Node installed, you can use `npx`:
```bash
npx live-server
```
or
```bash
npx http-server -p 8000
```

---

## 🌐 Deployment & Hosting Guide

This project is a static web application, making it 100% free and easy to host on any of the following platforms:

### 1. GitHub Pages (Highly Recommended)
1. Initialize Git in the project root:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Dingo Golds store"
   ```
2. Create a new repository on GitHub (e.g., `dingo-golds`) and link it:
   ```bash
   git remote add origin https://github.com/your-username/dingo-golds.git
   git branch -M main
   git push -u origin main
   ```
3. Enable Pages: Go to repository **Settings** -> **Pages** -> Under *Build and deployment*, set Source to **Deploy from a branch**, choose `main` branch, and click **Save**.

### 2. Vercel (Instant CLI Deployment)
1. Install Vercel CLI globally or run it via npx:
   ```bash
   npx vercel
   ```
2. Follow the terminal prompts (choose default settings, set project root to `./`).
3. Vercel will instantly build, upload, and deploy your site, providing you with a live `https://*.vercel.app` URL.

### 3. Netlify (Drag-and-Drop)
1. Go to [Netlify App](https://app.netlify.com/).
2. Log in and head to the **Sites** tab.
3. Drag the entire project folder (`Fortumars`) and drop it into the designated drop zone.
4. Netlify will deploy it in seconds and output a production URL.
