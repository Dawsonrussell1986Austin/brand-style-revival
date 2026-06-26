// @ts-nocheck
export function run() {

(function () {
  var chips = document.querySelectorAll('.ev-filterbar .chip');
  var rows = document.querySelectorAll('.evlist .evrow');
  var empty = document.querySelector('.ev-empty');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      var f = chip.getAttribute('data-filter');
      var shown = 0;
      rows.forEach(function (row) {
        var match = f === 'all' || row.getAttribute('data-cat') === f;
        row.style.display = match ? '' : 'none';
        if (match) shown++;
      });
      if (empty) empty.style.display = shown === 0 ? 'block' : 'none';
    });
  });
})();


}
