const TAB_ORDER = ['home', 'about', 'coding', 'creatives', 'leadership', 'skills'];
const TAB_ALIASES = {
  code: 'coding',
  creative: 'creatives',
  design: 'creatives',
  lead: 'leadership',
};

const tabs = Array.from(document.querySelectorAll('.tab'));
const panels = Array.from(document.querySelectorAll('.panel'));
const panelByName = new Map(panels.map((panel) => [panel.dataset.tab, panel]));
let busy = false;

function normalizeTabName(name) {
  return TAB_ALIASES[name] || name;
}

function setTabSelection(name) {
  tabs.forEach((tab) => {
    const isSelected = tab.dataset.tab === name;
    tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
  });
}

function syncActivePanel(name) {
  panels.forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.tab === name);
    if (panel.dataset.tab !== name) {
      panel.classList.remove('peeling', 'entering');
    }
  });
}

function finishTransition(curr, next) {
  curr.classList.remove('peeling');
  next.classList.remove('entering');
  busy = false;
}

function activate(name, options = {}) {
  const normalized = normalizeTabName(name);
  const next = panelByName.get(normalized);
  const curr = panels.find((panel) => panel.classList.contains('active'));

  if (!next) {
    return;
  }

  setTabSelection(normalized);

  if (normalized !== name) {
    history.replaceState(null, '', `#${normalized}`);
  }

  try {
    localStorage.setItem('sjl-tab', normalized);
  } catch (_error) {
    // Storage can fail in private browsing; ignore and continue.
  }

  if (next === curr) {
    return;
  }

  if (busy && !options.force) {
    return;
  }

  if (options.instant || !curr) {
    syncActivePanel(normalized);
    next.classList.add('active');
    history.replaceState(null, '', `#${normalized}`);
    return;
  }

  busy = true;
  next.classList.add('active', 'entering');
  curr.classList.add('peeling');
  curr.classList.remove('active');
  history.replaceState(null, '', `#${normalized}`);

  const cleanup = () => finishTransition(curr, next);
  curr.addEventListener('animationend', cleanup, { once: true });
  window.setTimeout(cleanup, 900);
}

async function loadPanels() {
  const fetches = panels.map(async (panel) => {
    const source = panel.dataset.src;
    if (!source) {
      return;
    }

    const response = await fetch(source + '?v=' + Date.now());
    if (!response.ok) {
      throw new Error(`Unable to load ${source}: ${response.status}`);
    }

    panel.innerHTML = await response.text();
  });

  await Promise.all(fetches);
}

function handleTabKeydown(event, tab) {
  const index = TAB_ORDER.indexOf(tab.dataset.tab);
  if (index === -1) {
    return;
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    const nextName = TAB_ORDER[(index + 1) % TAB_ORDER.length];
    activate(nextName);
    document.querySelector(`.tab[data-tab="${nextName}"]`)?.focus();
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    const previousName = TAB_ORDER[(index - 1 + TAB_ORDER.length) % TAB_ORDER.length];
    activate(previousName);
    document.querySelector(`.tab[data-tab="${previousName}"]`)?.focus();
  }
}

function resolveInitialTab() {
  const hashTab = normalizeTabName(window.location.hash.replace('#', ''));
  if (hashTab && TAB_ORDER.includes(hashTab)) {
    return hashTab;
  }

  try {
    const savedTab = normalizeTabName(localStorage.getItem('sjl-tab') || '');
    if (savedTab && TAB_ORDER.includes(savedTab)) {
      return savedTab;
    }
  } catch (_error) {
    // Ignore storage access failures.
  }

  return 'home';
}

tabs.forEach((tab) => {
  tab.addEventListener('click', (event) => {
    event.preventDefault();
    activate(tab.dataset.tab);
  });

  tab.addEventListener('keydown', (event) => {
    handleTabKeydown(event, tab);
  });
});

window.addEventListener('hashchange', () => {
  const nextName = normalizeTabName(window.location.hash.replace('#', ''));
  if (TAB_ORDER.includes(nextName)) {
    activate(nextName, { instant: true, force: true });
  }
});

async function bootstrap() {
  await loadPanels();

  const initialTab = resolveInitialTab();
  activate(initialTab, { instant: true, force: true });
}

bootstrap().catch((error) => {
  console.error(error);
  const activePanel = panelByName.get('home');
  if (activePanel) {
    activePanel.innerHTML = '<p class="red-comment">/* failed to load view partials. Serve the site over a static HTTP server instead of file:// */</p>';
  }
});