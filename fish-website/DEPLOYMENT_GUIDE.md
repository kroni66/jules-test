# Deployment Guide for Fish Website

This Vue.js application is built as a Single Page Application (SPA). After running `npm run build`, the `dist/` directory will contain all the static assets needed for deployment.

## Common Deployment Methods

### 1. Static Hosting Providers
These platforms are often the easiest way to deploy Vue.js SPAs. They are optimized for serving static files and often offer free tiers and CI/CD integration.
*   **Netlify:** Drag and drop the `dist` folder or connect your Git repository for auto-deploys.
*   **Vercel:** Similar to Netlify, Vercel offers seamless deployment for frontend projects.
*   **GitHub Pages:** Host directly from your GitHub repository. You might need to configure the `publicPath` in `vue.config.js` if deploying to a subdirectory.
*   **AWS S3:** Configure an S3 bucket for static website hosting and upload the contents of `dist`. Use CloudFront for CDN and HTTPS.
*   **Firebase Hosting:** Easily deploy static assets using the Firebase CLI.

**SPA Configuration:** For most static hosts, you'll need to configure rewrite rules so that all routes serve `index.html`. This allows Vue Router to handle client-side routing.
*   Netlify: Automatically handles this for Vue projects, or you can add a `_redirects` file in the `public` folder (copied to `dist`) with the line `/* /index.html 200`.
*   Vercel: Typically auto-detected for Vue.js. A `vercel.json` can be used for custom rules.
*   Firebase Hosting: In `firebase.json`, configure rewrites:
    ```json
    "hosting": {
      "public": "dist",
      "rewrites": [
        {
          "source": "**",
          "destination": "/index.html"
        }
      ]
    }
    ```

### 2. Traditional Web Servers (Nginx, Apache)
You can host the `dist` folder on any web server.
*   **Copy Files:** Upload the contents of the `dist` directory to your server's web root (e.g., `/var/www/html` or `htdocs`).
*   **Configure Server for SPAs:**
    *   **Nginx:**
        ```nginx
        server {
          listen 80;
          server_name yourdomain.com;
          root /path/to/your/dist;
          index index.html;

          location / {
            try_files $uri $uri/ /index.html;
          }
        }
        ```
    *   **Apache:** Use `mod_rewrite`. Create or update the `.htaccess` file in your `dist` directory (or server config):
        ```apache
        <IfModule mod_rewrite.c>
          RewriteEngine On
          RewriteBase /
          RewriteRule ^index\.html$ - [L]
          RewriteCond %{REQUEST_FILENAME} !-f
          RewriteCond %{REQUEST_FILENAME} !-d
          RewriteRule . /index.html [L]
        </IfModule>
        ```

## Build Command
To generate the production-ready static files in the `dist/` directory, run:
```bash
npm run build
```
