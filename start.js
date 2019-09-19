//https://stackoverflow.com/a/9517879/597419


const files = ["css/styles.css", "lib/jquery-3.3.1.min.js", "lib/d2s.bundle.min.js", "index.js"];

let init = function(i) {
  if(i >= files.length) {
    return;
  }
  let s = null;
  if(files[i].endsWith(".js")) {
    s = document.createElement('script');
    s.src = chrome.runtime.getURL(files[i]);
    s.onload = function() {
      this.remove();
      init(++i);
    };
  } else if(files[i].endsWith(".css")) {
    s = document.createElement('link');
    s.rel = 'stylesheet';
    s.href = chrome.runtime.getURL(files[i]);
    init(++i);
  }
  (document.head || document.documentElement).appendChild(s);
}
init(0);