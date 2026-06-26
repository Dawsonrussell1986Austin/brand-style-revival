// @ts-nocheck
export function run() {

(function () {
  function initCarousel(ids) {
    var track = document.getElementById(ids.track);
    if (!track) return;
    var cards = Array.prototype.slice.call(track.querySelectorAll('.pcard'));
    if (!cards.length) return;
    var prev = document.getElementById(ids.prev);
    var next = document.getElementById(ids.next);
    var dotsWrap = document.getElementById(ids.dots);
    var active = Math.min(1, cards.length - 1);

    cards.forEach(function (_, i) {
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Go to item ' + (i + 1));
      b.addEventListener('click', function () { active = i; layout(); });
      dotsWrap.appendChild(b);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function layout() {
      cards.forEach(function (c, i) { c.classList.toggle('is-active', i === active); });
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

    var carEl = track.closest('.carousel');
    if (carEl) carEl.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { prev.click(); }
      if (e.key === 'ArrowRight') { next.click(); }
    });

    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(layout, 120); });
    if (document.readyState === 'complete') layout();
    else window.addEventListener('load', layout);
    layout();
  }

  initCarousel({ track: 'oTrack', prev: 'oPrev', next: 'oNext', dots: 'oDots' });
  initCarousel({ track: 'cTrack', prev: 'cPrev', next: 'cNext', dots: 'cDots' });
})();


}
