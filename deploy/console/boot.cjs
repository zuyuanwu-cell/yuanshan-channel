"use strict";

/**
 * PM2 5.3.1 loads this file with require() (.cjs), then we load ESM server.js.
 * A direct PM2 import() of server.js leaves process.argv[1] as ProcessContainerFork.js,
 * so isDirectRun() (import.meta.url vs pathToFileURL(argv[1])) stays false and main()
 * never listens. Point ecosystem.config.cjs `script` here. `npm start` is still
 * `node server.js` and does not use this file.
 */
const path = require("path");

process.argv[1] = path.resolve(__dirname, "server.js");

import("./server.js").catch((error) => {
  console.error("[console]", error && error.message ? error.message : error);
  process.exit(1);
});
