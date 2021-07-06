//https://stackoverflow.com/a/9517879/597419


let files = ["css/styles.css", "lib/jquery-3.3.1.min.js", "lib/constants.bundle.min.js"];

const armory_files = ["lib/constants.bundle.min.js", "lib/d2s.bundle.min.js", "armory.js"];
const grail_files = ["lib/constants.bundle.min.js", "grail.js"];

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

if(location.host.startsWith('armory')) {
  files = files.concat(...armory_files);
} else if(location.host.startsWith('grail')) {
  files = files.concat(...grail_files);
}

init(0);