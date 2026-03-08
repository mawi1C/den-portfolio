# Den Cabria — Portfolio

Personal portfolio built with **React + Vite**.

---

## 🚀 Quick Setup

### 1. Install Node.js
Download and install from: https://nodejs.org (choose LTS version)

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 🖼️ Adding Your Photo

1. Put your photo file (e.g. `den.jpg`) inside the `/public` folder.
2. Open `src/App.jsx` and find the comment `── ADD YOUR PHOTO ──`.
3. Replace the placeholder `<div>` with:

```jsx
<img
  src="/den.jpg"
  alt="Den Cabria"
  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
/>
```

---

## ✏️ Updating Your Info

All content is in `src/App.jsx` at the top of the file:

- **PROJECTS** array → add your new projects here as you build them (TypoTerror & PawFind are already set up)
- **STACK** array → add or remove technologies
- **Contact section** → update email and social links (search for `── Update this`)

---

## ☁️ Deploy to Vercel

### Option A — Vercel CLI (recommended)
```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy (first time will ask you to log in)
vercel

# Deploy to production
vercel --prod
```

### Option B — GitHub + Vercel Dashboard
1. Push this project to a GitHub repository:
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/yourusername/den-portfolio.git
git push -u origin main
```

2. Go to https://vercel.com → **New Project**
3. Import your GitHub repo
4. Vercel auto-detects Vite — just click **Deploy**
5. Your site is live! 🎉

---

## 📁 Project Structure

```
den-portfolio/
├── public/
│   ├── favicon.svg        ← site icon
│   └── den.jpg            ← your photo goes here
├── src/
│   ├── App.jsx            ← all portfolio components & content
│   ├── index.css          ← global styles & animations
│   └── main.jsx           ← React entry point
├── index.html             ← HTML template
├── vite.config.js         ← Vite config
├── package.json           ← dependencies
└── .gitignore
```
