# Xentora Creative Studio Portfolio

High-impact portfolio showcase for Xentora featuring 3D cream PVC balloons, 37 commercial design assets, and full Discord/Email integration.

## 🚀 How to Deploy on Render (render.com)

### Option 1: Static Site (Recommended - 100% Free & Fast)
1. Push this project to GitHub (or create a new GitHub repo with these files).
2. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **Static Site**.
3. Connect your GitHub repository.
4. Set the following settings:
   - **Name:** `xentora-portfolio`
   - **Branch:** `main` (or `master`)
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
5. Click **Create Static Site**.
   Render will automatically build and publish your site with a free SSL certificate!
   You can also connect your custom domain (e.g. `xentora.digital`) in the **Settings** -> **Custom Domains** section.

### Option 2: Web Service (Node.js)
1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **Web Service**.
2. Connect your repo and set:
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

---

## 💻 Local Development
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`
