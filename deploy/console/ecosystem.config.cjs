/** PM2 process file for the Baota Node manager. Secrets stay in .env / the panel, not here. */
module.exports = {
  apps: [
    {
      name: "yuanshan-console",
      cwd: __dirname,
      script: "boot.cjs",
      env: {
        NODE_ENV: "production",
        CONSOLE_HOST: "127.0.0.1",
        CONSOLE_PORT: "4182",
        CONSOLE_BASE_PATH: "/console",
        CONSOLE_COOKIE_SECURE: "auto",
        CONSOLE_ONLINE_WINDOW_MS: "180000",
        TRUSTED_ORIGINS: "https://ys.tongzhoukuajing.com",
        UMAMI_API_URL: "http://127.0.0.1:3001",
        // Set on the server only:
        // CONSOLE_SESSION_SECRET
        // CONSOLE_ADMIN_EMAIL / CONSOLE_ADMIN_PASSWORD
        // UMAMI_WEBSITE_ID / UMAMI_API_TOKEN (or UMAMI_USERNAME / UMAMI_PASSWORD)
      },
    },
  ],
};
