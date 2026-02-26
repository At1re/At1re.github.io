(function () {
  'use strict';
  var placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;
  fetch('components/footer.html')
    .then(function (r) { return r.text(); })
    .then(function (html) {
      placeholder.outerHTML = html;
    })
    .catch(function () {
      placeholder.innerHTML = '<p style="text-align:center;color:#999;">Footer could not be loaded.</p>';
    });
})();
