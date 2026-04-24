(function () {
  const viewer = document.getElementById('results-viewer');
  if (!viewer) return;

  const stage = viewer.querySelector('.viewer-stage');
  const videos = {
    render: viewer.querySelector('.v-render'),
    gt:     viewer.querySelector('.v-gt'),
    error:  viewer.querySelector('.v-error'),
  };
  const dividers = {
    left:  viewer.querySelector('.divider-left'),
    right: viewer.querySelector('.divider-right'),
  };
  const prevBtn   = viewer.querySelector('.nav-prev');
  const nextBtn   = viewer.querySelector('.nav-next');
  const indicator = document.getElementById('case-indicator');

  // Case 1..4 maps to these scene names (displayed in the caption).
  const CASE_NAMES = ['Carnation', 'Hat', 'alocasia', 'Telephone'];
  const TOTAL      = CASE_NAMES.length;
  const MIN_GAP    = 4;         // minimum horizontal gap between handles, %
  let   current    = parseInt(viewer.dataset.case, 10) || 1;
  let   active     = null;      // 'left' | 'right' | null

  // ---------- Case loading ----------
  function loadCase(n) {
    current = ((n - 1 + TOTAL) % TOTAL) + 1;
    viewer.dataset.case = current;
    if (indicator) indicator.textContent = CASE_NAMES[current - 1];
    Object.entries(videos).forEach(([role, v]) => {
      v.src = `./static/videos/${role}-${current}.mp4`;
      v.load();
      const play = v.play();
      if (play && play.catch) play.catch(() => {});
    });
  }

  // ---------- Geometry helpers ----------
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

  // ---------- Hover-to-engage dragging ----------
  function setActive(side) {
    if (active === side) return;
    active = side;
    dividers.left.classList.toggle('active',  side === 'left');
    dividers.right.classList.toggle('active', side === 'right');
  }

  function moveActive(clientX) {
    if (!active) return;
    let pct = Math.max(0, Math.min(100, pctFromClientX(clientX)));
    const L = readVar('--left');
    const R = readVar('--right');
    if (active === 'left') {
      pct = Math.max(0, Math.min(pct, R - MIN_GAP));
      writeVar('--left', pct);
    } else {
      pct = Math.min(100, Math.max(pct, L + MIN_GAP));
      writeVar('--right', pct);
    }
  }

  // Mouse (and touch-down) on a divider → that divider latches onto the pointer.
  dividers.left.addEventListener('pointerenter',  () => setActive('left'));
  dividers.right.addEventListener('pointerenter', () => setActive('right'));

  // While inside the stage, an active divider follows the pointer.
  stage.addEventListener('pointermove', (e) => {
    if (!active) return;
    moveActive(e.clientX);
  });

  // Pointer leaves the stage → release.
  stage.addEventListener('pointerleave', () => setActive(null));

  // Safety: if the pointer is released (e.g., touch lift) also release.
  stage.addEventListener('pointerup',     () => setActive(null));
  stage.addEventListener('pointercancel', () => setActive(null));

  // Swallow any stray click on dividers so it doesn't trigger anything else.
  dividers.left.addEventListener('click',  (e) => e.preventDefault());
  dividers.right.addEventListener('click', (e) => e.preventDefault());

  // ---------- Case navigation ----------
  prevBtn.addEventListener('click', () => loadCase(current - 1));
  nextBtn.addEventListener('click', () => loadCase(current + 1));

  viewer.setAttribute('tabindex', '0');
  viewer.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { loadCase(current - 1); e.preventDefault(); }
    if (e.key === 'ArrowRight') { loadCase(current + 1); e.preventDefault(); }
  });

  // ---------- Keep the three videos in lockstep ----------
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
