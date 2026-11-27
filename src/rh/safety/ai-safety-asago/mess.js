// Fragmentation graph for the "The fragmentation problem" slide.
// Draws the tool graph once, then replays the build-up each time the slide becomes active.
// In a static render (PDF/PNG export, print, reduced motion) the graph is shown complete.

(() => {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.getElementById('mess-canvas');
  if (!svg || svg.dataset.built) return;
  svg.dataset.built = '1';

  const W = 150, H = 46;
  const COL = [10, 196, 382, 568, 754, 940];
  const ROW = [8, 84, 160, 236, 312];
  const C = {
    red: '#ff5a5a', orange: '#f0ab00', blue: '#5b9bff',
    green: '#7bbf5e', purple: '#b18cff', grey: '#9aa0c0', teal: '#34bdbd'
  };

  const nodes = [
    { id: 'manual',   t: 'Manual testing',   s: 'test_plan.md',        c: 'red',    r: 3, col: 0 },
    { id: 'bash',     t: 'bash scripts',     s: 'run_eval_v7.sh',      c: 'grey',   r: 3, col: 1 },
    { id: 'vllm',     t: 'vLLM',             s: 'runtime',             c: 'orange', r: 2, col: 0 },
    { id: 'openai',   t: 'OpenAI API',       s: '/v1/completions',     c: 'blue',   r: 2, col: 1 },
    { id: 'lmeval',   t: 'LM Eval',          s: 'lm-eval-harness',     c: 'red',    r: 0, col: 0 },
    { id: 'garak',    t: 'Garak',            s: 'probes + detectors',  c: 'teal',   r: 4, col: 1 },
    { id: 'mlflow',   t: 'MLflow',           s: 'tracking server',     c: 'green',  r: 1, col: 0 },
    { id: 'ragas',    t: 'RAGAS',            s: 'rag metrics',         c: 'orange', r: 0, col: 2 },
    { id: 'deepeval', t: 'DeepEval',         s: 'pytest asserts',      c: 'blue',   r: 0, col: 4 },
    { id: 'hf',       t: 'HF Transformers',  s: 'local runner',        c: 'red',    r: 2, col: 3 },
    { id: 'ollama',   t: 'Ollama',           s: ':11434',              c: 'purple', r: 2, col: 5 },
    { id: 'wandb',    t: 'Weights & Biases', s: 'run history',         c: 'purple', r: 1, col: 2 },
    { id: 'csv',      t: 'CSV / JSON',       s: 'results/',            c: 'grey',   r: 1, col: 4 },
    { id: 'jenkins',  t: 'Jenkins',          s: 'Jenkinsfile.eval',    c: 'red',    r: 3, col: 2 },
    { id: 'jupyter',  t: 'Jupyter',          s: 'eval_analysis.ipynb', c: 'green',  r: 3, col: 4 },
    { id: 'sheet',    t: 'Spreadsheet',      s: 'final_v7.xlsx',       c: 'orange', r: 4, col: 3 },
    { id: 'slack',    t: 'Slack thread',     s: '#ai-safety',          c: 'purple', r: 4, col: 5 }
  ];

  const edges = [
    ['manual', 'bash', 1],
    ['bash', 'vllm', -1], ['bash', 'openai', 1],
    ['bash', 'lmeval', -1], ['lmeval', 'openai', 1],
    ['bash', 'garak', 1], ['garak', 'vllm', -1], ['garak', 'hf', -1],
    ['lmeval', 'mlflow', -1], ['garak', 'mlflow', 1],
    ['bash', 'ragas', 1], ['ragas', 'openai', -1],
    ['bash', 'deepeval', -1], ['deepeval', 'openai', 1],
    ['hf', 'ollama', 1], ['lmeval', 'hf', 1], ['bash', 'ollama', -1],
    ['mlflow', 'wandb', 1], ['ragas', 'wandb', -1],
    ['mlflow', 'csv', -1], ['garak', 'csv', 1], ['deepeval', 'csv', -1],
    ['bash', 'jenkins', 1], ['jenkins', 'csv', -1],
    ['jupyter', 'mlflow', -1], ['jupyter', 'csv', 1], ['jenkins', 'jupyter', 1],
    ['jupyter', 'sheet', -1], ['sheet', 'slack', 1],
    ['jupyter', 'slack', -1], ['bash', 'slack', 1],
    ['lmeval', 'sheet', 1], ['vllm', 'wandb', -1],
    ['ollama', 'mlflow', 1], ['openai', 'hf', 1], ['ragas', 'jupyter', -1]
  ];

  const gEdges = document.createElementNS(NS, 'g');
  const gNodes = document.createElementNS(NS, 'g');
  svg.appendChild(gEdges);
  svg.appendChild(gNodes);

  const map = {};
  nodes.forEach((n) => {
    n.x = COL[n.col];
    n.y = ROW[n.r];
    n.cx = n.x + W / 2;
    n.cy = n.y + H / 2;
    map[n.id] = n;
  });

  const el = (name, attrs) => {
    const node = document.createElementNS(NS, name);
    for (const key in attrs) node.setAttribute(key, attrs[key]);
    return node;
  };

  nodes.forEach((n) => {
    const g = el('g', { opacity: '0' });
    g.style.transformBox = 'fill-box';
    g.style.transformOrigin = 'center';

    const rect = el('rect', {
      x: n.x, y: n.y, width: W, height: H, rx: 7,
      fill: '#1a1654', stroke: C[n.c], 'stroke-width': 1.3
    });

    const title = el('text', {
      x: n.x + 12, y: n.y + 20, fill: C[n.c],
      'font-family': "'Red Hat Display', system-ui, sans-serif",
      'font-size': 13, 'font-weight': 600
    });
    title.textContent = n.t;

    const sub = el('text', {
      x: n.x + 12, y: n.y + 34, fill: '#9d9bcc',
      'font-family': "'Red Hat Mono', ui-monospace, monospace",
      'font-size': 9.5
    });
    sub.textContent = n.s;

    g.appendChild(rect);
    g.appendChild(title);
    g.appendChild(sub);
    gNodes.appendChild(g);
    n.el = g;
  });

  const anchor = (node, point) => {
    const dx = point.x - node.cx, dy = point.y - node.cy;
    const sx = dx ? (W / 2 + 3) / Math.abs(dx) : Infinity;
    const sy = dy ? (H / 2 + 3) / Math.abs(dy) : Infinity;
    const k = Math.min(sx, sy);
    return { x: node.cx + dx * k, y: node.cy + dy * k };
  };

  const paths = [];

  edges.forEach(([a, b, bias], i) => {
    const A = map[a], B = map[b];
    const mdx = B.cx - A.cx, mdy = B.cy - A.cy;
    const mlen = Math.hypot(mdx, mdy) || 1;
    const off = Math.min(62, Math.max(18, mlen * 0.2)) * bias;
    const c = {
      x: (A.cx + B.cx) / 2 - (mdy / mlen) * off,
      y: (A.cy + B.cy) / 2 + (mdx / mlen) * off
    };
    const p1 = anchor(A, c), p2 = anchor(B, c);
    const cx = c.x, cy = c.y;
    const f = (v) => v.toFixed(1);

    const g = el('g', { opacity: '0' });
    const path = el('path', {
      d: 'M' + f(p1.x) + ',' + f(p1.y) + ' Q' + f(cx) + ',' + f(cy) + ' ' + f(p2.x) + ',' + f(p2.y),
      fill: 'none', stroke: C[A.c], 'stroke-width': 1.3,
      'stroke-linecap': 'round', opacity: 0.55
    });

    const vx = p2.x - cx, vy = p2.y - cy;
    const vl = Math.hypot(vx, vy) || 1;
    const ux = vx / vl, uy = vy / vl;
    const bx = p2.x - ux * 7, by = p2.y - uy * 7;
    const px = -uy * 3.2, py = ux * 3.2;
    const head = el('polygon', {
      points: f(p2.x) + ',' + f(p2.y) + ' ' + f(bx + px) + ',' + f(by + py) + ' ' + f(bx - px) + ',' + f(by - py),
      fill: C[A.c], opacity: 0
    });

    g.appendChild(path);
    g.appendChild(head);
    gEdges.appendChild(g);

    const total = path.getTotalLength();
    path.style.strokeDasharray = total;
    path.style.strokeDashoffset = total;

    paths.push({ g, path, head, total, i });
  });

  const nodeTime = {};
  nodes.forEach((n, i) => {
    nodeTime[n.id] = i < 2 ? i * 0.35 : 1.4 + (i - 2) * 0.48;
  });

  const reveal = () => {
    gNodes.querySelectorAll('g').forEach((g) => g.setAttribute('opacity', '1'));
    paths.forEach(({ g, path, head }) => {
      g.setAttribute('opacity', '1');
      path.style.strokeDashoffset = 0;
      head.setAttribute('opacity', '1');
    });
  };

  const play = () => {
    nodes.forEach((n) => {
      n.el.animate(
        [{ opacity: 0, transform: 'scale(0.94)' }, { opacity: 1, transform: 'scale(1)' }],
        { duration: 340, delay: nodeTime[n.id] * 1000, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'both' }
      );
    });

    paths.forEach(({ g, path, head, total, i }) => {
      const from = edges[i][0], to = edges[i][1];
      const at = Math.max(nodeTime[from], nodeTime[to]) + 0.18 + (i % 7) * 0.09;

      g.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 120, delay: at * 1000, fill: 'both' });
      path.animate(
        [{ strokeDashoffset: total }, { strokeDashoffset: 0 }],
        { duration: 620, delay: at * 1000, easing: 'ease-out', fill: 'both' }
      );
      head.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160, delay: (at + 0.5) * 1000, fill: 'both' });
    });
  };

  const host = svg.closest('svg[data-marpit-svg]');

  const cancelAll = (node) => {
    if (node.getAnimations) node.getAnimations().forEach((a) => a.cancel());
  };

  const reset = () => {
    nodes.forEach((n) => {
      cancelAll(n.el);
      n.el.setAttribute('opacity', '0');
    });
    paths.forEach(({ g, path, head, total }) => {
      cancelAll(g);
      cancelAll(path);
      cancelAll(head);
      g.setAttribute('opacity', '0');
      head.setAttribute('opacity', '0');
      path.style.strokeDasharray = total;
      path.style.strokeDashoffset = total;
    });
  };

  const still =
    window.matchMedia('print').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    navigator.webdriver === true;

  if (still) {
    reveal();
    return;
  }

  reset();

  if (!host) {
    play();
    return;
  }

  const isActive = () => host.classList.contains('bespoke-marp-active');

  if (isActive()) play();

  new MutationObserver(() => {
    if (isActive()) {
      reset();
      play();
    } else {
      reset();
    }
  }).observe(host, { attributes: true, attributeFilter: ['class'] });
})();
