/** PM2 process file for Baota Node manager / pm2 */
module.exports = {
  apps: [
    {
      name: "yuanshan-decap-oauth",
      cwd: __dirname,
      script: "server.js",
      env: {
        NODE_ENV: "production",
        OAUTH_HOST: "127.0.0.1",
        OAUTH_PORT: "4181",
        TRUSTED_ORIGINS: "https://ys.tongzhoukuajing.com",
        // Set secrets via Baota env / system env, not here:
        // OAUTH_CLIENT_ID
        // OAUTH_CLIENT_SECRET
      },
    },
  ],
};
