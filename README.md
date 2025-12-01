# Sai Akhil - Technical Portfolio

![PWA Ready](https://img.shields.io/badge/PWA-Ready-success?style=flat-square)

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat-square&logo=vite&logoColor=white)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white)

![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white)

A high-performance technical portfolio built with modern web technologies. This project is a fully installable **Progressive Web App (PWA)**, allowing it to work offline and be installed on mobile/desktop devices as a native application.

## 🚀 Features

- **⚡ Blazing Fast:** Built with Vite for instant server start and hot module replacement (HMR).
- **📱 PWA Enabled:** Installable on Android, iOS, and Desktop. Works offline via service workers.
- **🎨 Glassmorphic UI:** Custom modern design using Tailwind CSS utility classes.
- **🔒 Type Safe:** Fully typed with TypeScript for robust code quality.
- *☁️ Auto-Deploy:** Configured for seamless deployment to GitHub Pages.

## 🛠️ Tech Stack

- **Core:** React 19, TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **PWA:** `vite-plugin-pwa` (Auto-update strategy)
- **Icons:** Lucide React

## 💻 Running Locally

Follow these steps to get the project running on your local machine.

### 1. Clone the repository

```bash
git clone [<https://github.com/sai-akhil-y/technical-portfolio.git>](<https://github.com/sai-akhil-y/technical-portfolio.git>)
cd technical-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000&authuser=1) (or the port shown in your terminal) to view it in the browser.

> Note: PWA features (like "Install App") may not fully trigger in standard dev mode. To test PWA features locally, use the preview command below.
> 

### 4. Test Production Build (PWA Test)

To verify the PWA installability and service worker locally:

```bash
npm run build
npm run preview
```

## 🌍 Deployment

This project is configured to deploy to **GitHub Pages**.

### One-Command Deploy

To build and deploy the latest version:

```bash
npm run deploy
```

> Note: Make sure to update all relavent component files with your information and update the repo link in package.json and vite.config.js before deployment
>
