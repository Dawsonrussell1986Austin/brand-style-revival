// @ts-nocheck
export function run() {

(function () {
  var track = document.getElementById('cTrack');
  if (!track) return;
  var cards = Array.prototype.slice.call(track.querySelectorAll('.pcard'));
  var prev = document.getElementById('cPrev');
  var next = document.getElementById('cNext');
  var dotsWrap = document.getElementById('cDots');
  var active = Math.min(1, cards.length - 1); // start with a card centered, neighbours on both sides

  // dots
  cards.forEach(function (_, i) {
    var b = document.createElement('button');
    b.setAttribute('aria-label', 'Go to post ' + (i + 1));
    b.addEventListener('click', function () { active = i; layout(); });
    dotsWrap.appendChild(b);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);

  function layout() {
    cards.forEach(function (c, i) { c.classList.toggle('is-active', i === active); });
    // center the active card within the viewport (measured on layout box, ignores scale)
    var vp = track.parentElement;
    var vpCenter = vp.clientWidth / 2;
    var ac = cards[active];
    var cardCenter = ac.offsetLeft + ac.offsetWidth / 2;
    track.style.transform = 'translateX(' + (vpCenter - cardCenter) + 'px)';
    dots.forEach(function (d, i) { d.classList.toggle('on', i === active); });
    prev.disabled = false;
    next.disabled = false;
  }

  prev.addEventListener('click', function () { active = (active - 1 + cards.length) % cards.length; layout(); });
  next.addEventListener('click', function () { active = (active + 1) % cards.length; layout(); });
  cards.forEach(function (c, i) {
    c.addEventListener('click', function (e) {
      if (i !== active && !e.target.closest('.rm')) { active = i; layout(); }
    });
  });

  var rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(layout, 120); });

  // keyboard support
  document.querySelector('.carousel').addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { prev.click(); }
    if (e.key === 'ArrowRight') { next.click(); }
  });

  if (document.readyState === 'complete') layout();
  else window.addEventListener('load', layout);
  layout();
})();


(function () {
  var track = document.getElementById('tTrack');
  if (!track) return;
  var cards = Array.prototype.slice.call(track.children);
  var prev = document.getElementById('tPrev');
  var next = document.getElementById('tNext');
  var dotsWrap = document.getElementById('tDots');
  var idx = 0;

  function metrics() {
    var cw = cards[0].getBoundingClientRect().width;
    var gap = parseFloat(getComputedStyle(track).gap) || 0;
    var vis = Math.max(1, Math.round((track.parentElement.clientWidth + gap) / (cw + gap)));
    return { cw: cw, gap: gap, vis: vis, max: Math.max(0, cards.length - vis) };
  }

  function buildDots(max) {
    dotsWrap.innerHTML = '';
    for (var i = 0; i <= max; i++) {
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Page ' + (i + 1));
      if (i === idx) b.className = 'on';
      (function (n) { b.addEventListener('click', function () { idx = n; render(); }); })(i);
      dotsWrap.appendChild(b);
    }
  }

  function render() {
    var m = metrics();
    if (idx > m.max) idx = m.max;
    track.style.transform = 'translateX(' + (-idx * (m.cw + m.gap)) + 'px)';
    buildDots(m.max);
    prev.disabled = idx <= 0;
    next.disabled = idx >= m.max;
  }

  prev.addEventListener('click', function () { if (idx > 0) { idx--; render(); } });
  next.addEventListener('click', function () { if (idx < metrics().max) { idx++; render(); } });

  var rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(render, 120); });

  if (document.readyState === 'complete') render();
  else window.addEventListener('load', render);
  render();
})();


}
