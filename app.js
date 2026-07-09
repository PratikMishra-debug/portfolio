/* ==========================================================
   Pratik Kumar — Portfolio Engine
   Vanilla JS + Three.js (no build step required)
   ========================================================== */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;
  if (isTouch) document.body.classList.add('touch-device');

  /* ---------------- Loading Screen ---------------- */
  const loadFill = document.getElementById('loadBarFill');
  const loadPct = document.getElementById('loadPct');
  const loadScreen = document.getElementById('loading-screen');
  let pct = 0;
  const loadTimer = setInterval(() => {
    pct += Math.random() * 18 + 6;
    if (pct >= 100) {
      pct = 100;
      clearInterval(loadTimer);
      setTimeout(() => {
        loadScreen.classList.add('hide');
        document.body.style.overflow = '';
        runHeroTimeline();
      }, 350);
    }
    loadFill.style.width = pct + '%';
    loadPct.textContent = Math.floor(pct) + '%';
  }, 220);
  document.body.style.overflow = 'hidden';
  setTimeout(() => { document.body.style.overflow = ''; }, 3000); // safety unlock

  /* ---------------- Custom Cursor ---------------- */
  if (!isTouch) {
    const outer = document.getElementById('cursorOuter');
    const inner = document.getElementById('cursorInner');
    let ox = 0, oy = 0, ix = 0, iy = 0;
    window.addEventListener('mousemove', (e) => {
      ix = e.clientX; iy = e.clientY;
      inner.style.left = ix + 'px'; inner.style.top = iy + 'px';
    });
    (function loop() {
      ox += (ix - ox) * 0.18; oy += (iy - oy) * 0.18;
      outer.style.left = ox + 'px'; outer.style.top = oy + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, .tech-item, .project-card, .cert-card').forEach(el => {
      el.addEventListener('mouseenter', () => outer.classList.add('hover'));
      el.addEventListener('mouseleave', () => outer.classList.remove('hover'));
    });
  }

  /* ---------------- Navbar show/hide + active link ---------------- */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('solid', y > 40);
    if (y > lastScroll && y > 140) navbar.classList.add('nav-hidden');
    else navbar.classList.remove('nav-hidden');
    lastScroll = y;

    // active link
    const sections = document.querySelectorAll('main section[id]');
    let current = 'home';
    sections.forEach(sec => {
      if (y >= sec.offsetTop - 200) current = sec.id;
    });
    document.querySelectorAll('.nav-link').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  /* ---------------- Theme toggle ---------------- */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const savedTheme = null; // no localStorage per artifact rules; default dark each load
  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') !== 'light';
    root.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.textContent = isDark ? '☀' : '☾';
  });

  /* ---------------- Hero name word animation ---------------- */
  const heroName = document.getElementById('heroName');
  heroName.innerHTML = heroName.textContent.split(' ').map((w, i) =>
    `<span style="animation-delay:${0.15 * i + 0.2}s">${w}</span>`
  ).join(' ');

  /* ---------------- Tagline stagger ---------------- */
  const tagline = document.getElementById('heroTagline');
  const words = ['Learning.', 'Building.', 'Improving.', 'Every', 'single', 'day.'];
  tagline.innerHTML = words.map((w, i) => `<b style="animation-delay:${0.9 + i * 0.12}s">${w}</b>`).join(' ');

  /* ---------------- Rotating role titles ---------------- */
  const roles = [
    'Computer Science Student',
    'Full Stack Developer',
    'Cloud Computing Enthusiast',
    'Computer Vision Explorer',
    'Open Source Learner',
    'Problem Solver'
  ];
  const roleEl = document.getElementById('roleText');
  let roleIdx = 0;
  setInterval(() => {
    roleIdx = (roleIdx + 1) % roles.length;
    roleEl.style.transition = 'opacity .35s, filter .35s, transform .35s';
    roleEl.style.opacity = 0; roleEl.style.filter = 'blur(6px)'; roleEl.style.transform = 'translateY(6px)';
    setTimeout(() => {
      roleEl.textContent = roles[roleIdx];
      roleEl.style.opacity = 1; roleEl.style.filter = 'blur(0)'; roleEl.style.transform = 'translateY(0)';
    }, 350);
  }, 3000);

  function runHeroTimeline() {
    // hook for any additional cinematic sequencing post-load
  }

  /* ---------------- Scroll reveal ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); revealObserver.unobserve(en.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------- Timeline items ---------------- */
  const timelineItems = document.querySelectorAll('.timeline-item');
  const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); tlObserver.unobserve(en.target); } });
  }, { threshold: 0.2 });
  timelineItems.forEach(el => tlObserver.observe(el));

  /* ---------------- Stat counters ---------------- */
  const counters = document.querySelectorAll('.stat-num[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        const el = en.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        let cur = 0;
        const step = Math.max(1, Math.round(target / 40));
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(t); }
          el.textContent = cur + suffix;
        }, 30);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => countObserver.observe(el));

  /* ---------------- Tech Universe data ---------------- */
  const techData = {
    primary: [
      ['C++', 'Language'], ['JavaScript', 'Language'], ['TypeScript', 'Language'], ['React', 'Library'],
      ['Node.js', 'Runtime'], ['Express', 'Framework'], ['SQL', 'Database'], ['REST APIs', 'Architecture'],
      ['Git', 'Tooling'], ['GitHub', 'Tooling']
    ],
    working: [
      ['Python', 'Language'], ['MongoDB', 'Database'], ['OpenCV', 'CV Library'], ['Computer Vision', 'Field'], ['Cloud Fundamentals', 'Concepts']
    ],
    learning: [
      ['Docker', 'DevOps'], ['AWS', 'Cloud'], ['Kubernetes', 'DevOps'], ['Next.js', 'Framework'], ['CI/CD', 'DevOps'], ['System Design', 'Concepts'], ['Advanced Cloud', 'Cloud']
    ]
  };
  const exploreNext = ['Terraform', 'Kafka', 'Redis', 'RabbitMQ', 'GraphQL', 'PostgreSQL', 'GitHub Actions', 'Linux', 'Nginx', 'Prisma', 'Tailwind CSS'];

  const techGrid = document.getElementById('techGrid');
  function renderTech(tab) {
    techGrid.innerHTML = techData[tab].map(([name, tier]) => `
      <div class="tech-item glass" tabindex="0">
        <span class="glyph">${name.slice(0, 2).toUpperCase()}</span>
        <div class="name">${name}</div>
        <div class="tier">${tier}</div>
      </div>`).join('');
  }
  renderTech('primary');
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTech(btn.dataset.tab);
    });
  });
  document.getElementById('exploreChips').innerHTML = exploreNext.map(t => `<span class="chip">${t}</span>`).join('');

  /* ---------------- Project card tilt ---------------- */
  if (!prefersReducedMotion && !isTouch) {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ---------------- Command Palette ---------------- */
  const cmdkOverlay = document.getElementById('cmdkOverlay');
  const cmdkInput = document.getElementById('cmdkInput');
  const cmdkList = document.getElementById('cmdkList');
  const commands = [
    { label: 'Go to Home', action: () => scrollToId('home') },
    { label: 'Go to Projects', action: () => scrollToId('projects') },
    { label: 'Go to Skills', action: () => scrollToId('skills') },
    { label: 'Go to Achievements', action: () => scrollToId('achievements') },
    { label: 'Scroll to Contact', action: () => scrollToId('contact') },
    { label: 'Open GitHub', action: () => window.open('https://github.com/PratikMishra-debug', '_blank') },
    { label: 'Open LinkedIn', action: () => window.open('https://www.linkedin.com/in/pratik-kumar-a3a9bb332/', '_blank') },
    { label: 'Open LeetCode', action: () => window.open('https://leetcode.com/u/Snowball_/', '_blank') },
    { label: 'Download Resume (coming soon)', action: () => showToast('Resume coming soon — check back shortly!', 'info') },
    { label: 'Toggle Theme', action: () => themeToggle.click() },
    { label: 'Show Keyboard Shortcuts', action: () => showToast('Ctrl+K: Command palette · Ctrl+/: Shortcuts · ↑↑↓↓←→←→BA: ???', 'info') },
    { label: 'sudo', action: () => easterTerminal() }
  ];
  function renderCmdk(filter) {
    const f = (filter || '').toLowerCase();
    const items = commands.filter(c => c.label.toLowerCase().includes(f));
    cmdkList.innerHTML = items.map((c, i) => `<div class="cmdk-item" data-i="${i}">${c.label}</div>`).join('') || '<div class="cmdk-item">No results</div>';
    [...cmdkList.children].forEach((el, i) => {
      el.addEventListener('click', () => { items[i].action(); closeCmdk(); });
    });
  }
  function openCmdk() { cmdkOverlay.classList.add('open'); renderCmdk(''); cmdkInput.value = ''; setTimeout(() => cmdkInput.focus(), 50); }
  function closeCmdk() { cmdkOverlay.classList.remove('open'); }
  document.getElementById('cmdkOpenBtn').addEventListener('click', openCmdk);
  cmdkOverlay.addEventListener('click', (e) => { if (e.target === cmdkOverlay) closeCmdk(); });
  cmdkInput.addEventListener('input', () => renderCmdk(cmdkInput.value));

  function scrollToId(id) { document.getElementById(id).scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' }); }

  /* ---------------- Keyboard shortcuts + Easter eggs ---------------- */
  const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiPos = 0;
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); cmdkOverlay.classList.contains('open') ? closeCmdk() : openCmdk(); }
    if (e.ctrlKey && e.key === '/') { e.preventDefault(); showToast('Ctrl+K: Command palette · Ctrl+/: Shortcuts', 'info'); }
    if (e.key === 'Escape') closeCmdk();

    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === konami[konamiPos]) {
      konamiPos++;
      if (konamiPos === konami.length) { konamiPos = 0; showToast('🎮 Developer Mode unlocked!', 'success'); document.body.style.filter = 'hue-rotate(20deg)'; setTimeout(() => document.body.style.filter = '', 4000); }
    } else { konamiPos = (key === konami[0]) ? 1 : 0; }
  });

  document.getElementById('logoClick').addEventListener('click', (() => {
    let clicks = 0;
    return () => {
      clicks++;
      if (clicks === 5) { showToast('🟢 Matrix mode activated (briefly)', 'success'); flashMatrix(); clicks = 0; }
    };
  })());

  function flashMatrix() {
    const c = document.createElement('canvas');
    c.style.cssText = 'position:fixed;inset:0;z-index:9995;pointer-events:none;';
    document.body.appendChild(c);
    const ctx = c.getContext('2d');
    c.width = innerWidth; c.height = innerHeight;
    const cols = Math.floor(c.width / 16);
    const drops = new Array(cols).fill(0);
    let frames = 0;
    const iv = setInterval(() => {
      ctx.fillStyle = 'rgba(5,7,11,0.15)';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = '#00D4FF';
      ctx.font = '14px monospace';
      drops.forEach((y, i) => {
        const text = Math.random() > 0.5 ? '1' : '0';
        ctx.fillText(text, i * 16, y);
        drops[i] = y > c.height && Math.random() > 0.975 ? 0 : y + 16;
      });
      frames++;
      if (frames > 90) { clearInterval(iv); c.remove(); }
    }, 40);
  }

  function easterTerminal() {
    showToast('$ whoami → pratik-kumar --curious --building --learning', 'success');
  }

  window.addEventListener('scroll', (() => {
    let shown = false;
    return () => {
      if (!shown && (window.scrollY + innerHeight) >= document.body.scrollHeight - 40) {
        shown = true;
        showToast('👋 Thank you for visiting!', 'success');
      }
    };
  })(), { passive: true });

  /* ---------------- Toasts ---------------- */
  function showToast(msg, type) {
    const container = document.getElementById('toast-container');
    const el = document.createElement('div');
    el.className = 'toast glass';
    el.style.borderColor = type === 'success' ? 'rgba(102,255,180,.5)' : 'rgba(79,140,255,.5)';
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateX(30px)'; setTimeout(() => el.remove(), 400); }, 3800);
  }

  /* ---------------- Contact form ---------------- */
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const fields = [
      { id: 'fName', val: form.name.value.trim(), rule: v => v.length > 1, msg: 'Please enter your name' },
      { id: 'fEmail', val: form.email.value.trim(), rule: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Enter a valid email' },
      { id: 'fSubject', val: form.subject.value.trim(), rule: v => v.length > 2, msg: 'Please add a subject' },
      { id: 'fMessage', val: form.message.value.trim(), rule: v => v.length > 8, msg: 'Message is a bit short' }
    ];
    fields.forEach(f => {
      const errEl = document.querySelector(`.err[data-for="${f.id}"]`);
      if (!f.rule(f.val)) { errEl.textContent = f.msg; valid = false; }
      else errEl.textContent = '';
    });
    if (!valid) return;
    const btn = document.getElementById('submitBtn');
    const original = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Sent ✓';
      showToast('Message sent — thanks for reaching out!', 'success');
      form.reset();
      setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 1800);
    }, 1000);
  });

  /* ---------------- GitHub live data ---------------- */
  (async function loadGithub() {
    const user = 'PratikMishra-debug';
    const statsWrap = document.getElementById('ghStats');
    const reposWrap = document.getElementById('ghRepos');
    try {
      const [uRes, rRes] = await Promise.all([
        fetch(`https://api.github.com/users/${user}`),
        fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=6`)
      ]);
      if (!uRes.ok) throw new Error('user fetch failed');
      const u = await uRes.json();
      const repos = rRes.ok ? await rRes.json() : [];

      statsWrap.innerHTML = `
        <div class="stat-card glass"><div class="stat-num">${u.public_repos ?? '–'}</div><div class="stat-label">Repositories</div></div>
        <div class="stat-card glass"><div class="stat-num">${u.followers ?? '–'}</div><div class="stat-label">Followers</div></div>
        <div class="stat-card glass"><div class="stat-num">${u.following ?? '–'}</div><div class="stat-label">Following</div></div>
        <div class="stat-card glass"><div class="stat-num">${u.public_gists ?? '–'}</div><div class="stat-label">Gists</div></div>`;

      if (Array.isArray(repos) && repos.length) {
        reposWrap.innerHTML = repos.map(r => `
          <div class="repo-card glass">
            <h4>📦 ${r.name}</h4>
            <p>${r.description ? r.description.slice(0, 90) : 'No description provided.'}</p>
            <div class="repo-meta">
              <span>★ ${r.stargazers_count}</span>
              <span>⑂ ${r.forks_count}</span>
              <span>${r.language || '—'}</span>
            </div>
          </div>`).join('');
      } else {
        reposWrap.innerHTML = `<div class="repo-card glass"><h4>No public repositories found yet</h4><p>Check back soon — new projects are on the way.</p></div>`;
      }
    } catch (err) {
      statsWrap.innerHTML = `<div class="stat-card glass" style="grid-column:1/-1;"><div class="stat-label">Couldn't load live GitHub data right now. <a href="https://github.com/${user}" target="_blank" rel="noopener" style="color:var(--secondary)">View profile directly →</a></div></div>`;
      reposWrap.innerHTML = '';
    }
  })();

  /* ---------------- AI assistant (canned, local) ---------------- */
  const aiBubble = document.getElementById('aiBubble');
  const aiPanel = document.getElementById('aiPanel');
  const aiBody = document.getElementById('aiBody');
  aiBubble.addEventListener('click', () => aiPanel.classList.toggle('open'));
  const answers = {
    projects: "Pratik has built E‑Sanjeevni, a full‑stack telemedicine platform (React, Node.js, Express), and HydraShield, a computer‑vision flood‑monitoring project (Python, OpenCV).",
    skills: "Primary: C++, JavaScript, TypeScript, React, Node.js, Express, SQL, REST APIs, Git/GitHub. He's also comfortable with Python, MongoDB and OpenCV.",
    contact: "You can reach Pratik at Pratikkumar182006@gmail.com, by phone at +91 7042928161, or via the contact form on this page.",
    learning: "Right now he's learning Docker, AWS, Kubernetes, Next.js, CI/CD, and System Design — heading toward stronger cloud and DevOps fundamentals."
  };
  document.querySelectorAll('.ai-suggest').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.q;
      const msg = document.createElement('div');
      msg.className = 'ai-msg';
      msg.textContent = answers[q];
      aiBody.appendChild(msg);
      aiBody.scrollTop = aiBody.scrollHeight;
    });
  });

  /* ---------------- Footer year ---------------- */
  document.getElementById('footerYear').textContent =
    `© ${new Date().getFullYear()} Pratik Kumar · Built with Three.js, GSAP & TypeScript-minded JavaScript`;

  /* ---------------- Hamburger (mobile) ---------------- */
  document.getElementById('hamburgerBtn').addEventListener('click', () => {
    const nl = document.querySelector('.nav-links');
    const open = nl.style.display === 'flex';
    nl.style.cssText = open ? '' : 'display:flex;flex-direction:column;position:fixed;top:76px;left:0;right:0;background:rgba(5,7,11,.96);padding:20px;gap:8px;backdrop-filter:blur(20px);';
  });

  /* ==========================================================
     THREE.JS HERO SCENE — particle globe + orbiting nodes
     ========================================================== */
  (function initHeroScene() {
    const canvas = document.getElementById('hero-canvas');
    if (!window.THREE || !canvas) return;
    if (prefersReducedMotion) return;

    const heroSection = document.querySelector('.hero');
    let width = heroSection.clientWidth, height = heroSection.clientHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 34);

    // Particle sphere (constellation)
    const PARTICLE_COUNT = isTouch ? 700 : 1600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const radius = 16;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.7 + Math.random() * 0.35);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x66b3ff, size: 0.16, transparent: true, opacity: 0.85, sizeAttenuation: true
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Secondary drifting particle field (depth layer)
    const FIELD_COUNT = isTouch ? 300 : 900;
    const fieldGeo = new THREE.BufferGeometry();
    const fieldPos = new Float32Array(FIELD_COUNT * 3);
    for (let i = 0; i < FIELD_COUNT; i++) {
      fieldPos[i * 3] = (Math.random() - 0.5) * 90;
      fieldPos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      fieldPos[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10;
    }
    fieldGeo.setAttribute('position', new THREE.BufferAttribute(fieldPos, 3));
    const fieldMat = new THREE.PointsMaterial({ color: 0x4f8cff, size: 0.11, transparent: true, opacity: 0.5 });
    const field = new THREE.Points(fieldGeo, fieldMat);
    scene.add(field);

    // Wireframe icosahedron core
    const icoGeo = new THREE.IcosahedronGeometry(9, 1);
    const icoMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.18 });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / innerWidth - 0.5);
      mouseY = (e.clientY / innerHeight - 0.5);
    });

    function resize() {
      width = heroSection.clientWidth; height = heroSection.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize);

    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.05 + mouseX * 0.6;
      points.rotation.x = mouseY * 0.3;
      field.rotation.y = -t * 0.02;
      ico.rotation.y = t * 0.08;
      ico.rotation.x = t * 0.05;
      camera.position.x += (mouseX * 6 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 6 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    animate();
  })();

})();
