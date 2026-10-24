/*
 * 远山频道在线心跳。每个标签页一个会话 id，约 45 秒一次 POST /console/api/presence。
 * 控制台用近 2–5 分钟（默认 3 分钟）内出现过的会话数当作「在线」。
 * 失败被吞掉，不打断页面。静态站构建不需要控制台进程。
 * 路径写死在域名根上。若改 CONSOLE_BASE_PATH，这里要一起改，然后重新构建静态站。
 */
(function () {
  try {
    var endpoint = "/console/api/presence";
    var key = "ys_presence_sid";
    var sid = "";
    try {
      sid = sessionStorage.getItem(key) || "";
    } catch (error) {
      sid = "";
    }
    if (!/^[A-Za-z0-9_-]{16,80}$/.test(sid)) {
      sid = randomSid();
      try {
        sessionStorage.setItem(key, sid);
      } catch (error) {
        /* 隐私模式写不进 sessionStorage 时，这次页面访问仍用内存里的 id。 */
      }
    }

    function randomSid() {
      var bytes = new Uint8Array(18);
      if (typeof crypto !== "undefined" && crypto.getRandomValues) crypto.getRandomValues(bytes);
      else {
        for (var i = 0; i < bytes.length; i += 1) bytes[i] = Math.floor(Math.random() * 256);
      }
      var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
      var out = "";
      for (var j = 0; j < bytes.length; j += 1) out += alphabet[bytes[j] & 63];
      return out;
    }

    function send() {
      var payload = JSON.stringify({
        sid: sid,
        path: String(location.pathname || "/").slice(0, 180),
      });
      try {
        if (navigator.sendBeacon) {
          var blob = new Blob([payload], { type: "application/json" });
          if (navigator.sendBeacon(endpoint, blob)) return;
        }
      } catch (error) {
        /* 落到 fetch。 */
      }
      if (typeof fetch !== "function") return;
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
        credentials: "omit",
      }).catch(function () {});
    }

    send();
    setInterval(send, 45000);
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") send();
    });
  } catch (error) {
    /* 心跳不能影响正文。 */
  }
})();
