(() => {
  var p = new URLSearchParams(location.search);
  p.set("q", (p.get("q") || "") + " site:reddit.com");
  location.search = "" + p;
})();
