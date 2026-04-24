(function () {
  const viewer = document.getElementById('results-viewer');
  if (!viewer) return;

  const stage = viewer.querySelector('.viewer-stage');
  const videos = {
    render: viewer.querySelector('.v-render'),
    gt:     viewer.querySelector('.v-gt'),
    error:  viewer.querySelector('.v-error'),
  };
  const prevBtn   = viewer.querySelector('.nav-prev');
  const nextBtn   = viewer.querySelector('.nav-next');
  const indicator = document.getElementById('case-indicator');

  const TOTAL    = parseInt(viewer.dataset.total, 10) || 4;
  const MIN_GAP  = 4;            // minimum horizontal gap between handles, %
  let   current  = parseInt(viewer.dataset.case,  10) || 1;
  let   dragging = null;         // 'left' | 'right' | null

  // ---------- Case loading ----------
  function loadCase(n) {
    current = ((n - 1 + TOTAL) % TOTAL) + 1;
    viewer.dataset.case = current;
    if (indicator) indicator.textContent = current;
    Object.entries(videos).forEach(([role, v]) => {
      v.src = `./static/videos/${role}-${current}.mp4`;
      v.load();
      const play = v.play();
      if (play && play.catch) play.catch(() => {});
    });
  }

  // ---------- Dragging ----------
  function pctFromClientX(clientX) {
    const rect = stage.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }

  function readVar(name) {
    return parseFloat(getComputedStyle(stage).getPropertyValue(name));
  }

  function writeVar(name, pct) {
    stage.style.setProperty(name, pct + '%');
  }

  function onMove(e) {
    if (!dragging) return;
    e.preventDefault();
    let pct  = Math.max(0, Math.min(100, pctFromClientX(e.clientX)));
    const L  = readVar('--left');
    const R  = readVar('--right');
    if (dragging === 'left') {
      pct = Math.min(pct, R - MIN_GAP);
      pct = Math.max(pct, 0);
      writeVar('--left', pct);
    } else {
      pct = Math.max(pct, L + MIN_GAP);
      pct = Math.min(pct, 100);
      writeVar('--right', pct);
    }
  }

  function endDrag() {
    dragging = null;
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerup', endDrag);
    document.removeEventListener('pointercancel', endDrag);
  }

  function startDrag(side) {
    return function (e) {
      dragging = side;
      e.preventDefault();
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', endDrag);
      document.addEventListener('pointercancel', endDrag);
    };
  }

  viewer.querySelector('.divider-left').addEventListener('pointerdown',  startDrag('left'));
  viewer.querySelector('.divider-right').addEventListener('pointerdown', startDrag('right'));

  // ---------- Case navigation ----------
  prevBtn.addEventListener('click', () => loadCase(current - 1));
  nextBtn.addEventListener('click', () => loadCase(current + 1));

  // Keyboard: arrow keys when viewer is focused
  viewer.setAttribute('tabindex', '0');
  viewer.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { loadCase(current - 1); e.preventDefault(); }
    if (e.key === 'ArrowRight') { loadCase(current + 1); e.preventDefault(); }
  });

  // ---------- Sync the three videos ----------
  // Use `render` as master; nudge the others if they drift > 0.1s.
  const master = videos.render;
  setInterval(() => {
    if (master.paused || master.readyState < 2) return;
    const t = master.currentTime;
    ['gt', 'error'].forEach((role) => {
      const v = videos[role];
      if (v.readyState < 2 || v.seeking) return;
      if (Math.abs(v.currentTime - t) > 0.1) v.currentTime = t;
    });
  }, 400);

  // ---------- Boot ----------
  loadCase(current);
})();
