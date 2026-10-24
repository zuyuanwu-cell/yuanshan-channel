(function () {
  var root = document.querySelector("[data-stats]");
  if (!root) return;
  var endpoint = root.getAttribute("data-endpoint");
  if (!endpoint) return;

  function text(field, value) {
    var node = root.querySelector('[data-field="' + field + '"]');
    if (node) node.textContent = value;
  }

  function format(n) {
    if (typeof n !== "number" || !isFinite(n)) return "—";
    var sign = n < 0 ? "-" : "";
    var digits = String(Math.round(Math.abs(n)));
    return sign + digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function apply(data) {
    if (!data || !data.online) return;
    text("online", format(data.online.count));
    var umami = data.umami || {};
    if (umami.message) text("umami-note", umami.message);
    if (!umami.ok || !umami.ranges) return;
    ["today", "d7", "d30"].forEach(function (key) {
      var row = umami.ranges[key] || {};
      text(key + "-pageviews", format(row.pageviews));
      text(key + "-visitors", format(row.visitors));
    });
  }

  function tick() {
    fetch(endpoint, { headers: { Accept: "application/json" }, credentials: "same-origin" })
      .then(function (res) {
        if (!res.ok) throw new Error("bad");
        return res.json();
      })
      .then(apply)
      .catch(function () {});
  }

  setInterval(tick, 30000);
})();
