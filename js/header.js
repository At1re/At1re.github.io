(function () {
  'use strict';
  var placeholder = document.getElementById('header-placeholder');
  if (!placeholder) return;
  fetch('components/header.html')
    .then(function (r) { return r.text(); })
    .then(function (html) {
      placeholder.outerHTML = html;
      var s = document.createElement('script');
      s.src = 'js/nav.js';
      document.body.appendChild(s);
    })
    .catch(function () {
      placeholder.innerHTML = '<p style="padding:1rem;text-align:center;color:#999;">Header could not be loaded.</p>';
      var s = document.createElement('script');
      s.src = 'js/nav.js';
      document.body.appendChild(s);
    });
})();
