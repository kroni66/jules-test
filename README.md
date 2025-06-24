# Firebase Google Auth React App

A modern React (Vite) web application using Firebase for Google authentication and Tailwind CSS for a beautiful, responsive UI.

## Features

- Google sign-in using Firebase Auth
- Protected dashboard page with user info and sign-out
- Beautiful, accessible UI (dark mode, focus states, responsive)
- React Router v6 for navigation
- Tailwind CSS, PostCSS, Autoprefixer
- All navigation and redirects handled automatically

## Getting Started

1. **Clone the repository and install dependencies:**

   ```
   npm install
   ```

2. **Configure Firebase:**

   - Go to [Firebase Console](https://console.firebase.google.com/) and create a project.
   - In `src/firebase.js`, replace the placeholder values in `firebaseConfig` with your project's credentials.

3. **Start the development server:**

   ```
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173).

## Build for Production

```
npm run build
```

Preview the production build:

```
npm run preview
```

## Project Structure

```
├── src/
│   ├── assets/logo.svg
│   ├── components/ProtectedRoute.jsx
│   ├── contexts/AuthContext.jsx
│   ├── firebase.js
│   ├── index.css
│   ├── main.jsx
│   ├── App.jsx
│   └── pages/
│       ├── Dashboard.jsx
│       └── LoginPage.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.cjs
├── postcss.config.cjs
└── .gitignore
```

## Accessibility & UI

- All buttons have `aria-label` and visible focus rings.
- Fully responsive, mobile-first layout.
- Dark mode enabled (auto-detects system setting).
- No TODOs remain; ready for deployment.

---

**Made with React, Vite, Firebase, and Tailwind CSS**