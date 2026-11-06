/* ---------- NAV ---------- */
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => { if (e.target.tagName === 'A') menu.classList.remove('open'); });

const links = [...menu.querySelectorAll('a')];
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section').forEach(s => io.observe(s));
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- SKILLS ---------- */
const skills = {
  'Réseaux': ['OSPF', 'RIP', 'Routage statique', 'VLAN', 'Inter-VLAN', 'HSRP', 'VLSM', 'CIDR', 'IPv4 / IPv6', 'Modèles OSI et TCP/IP'],
  'Télécommunications': ['FTTH', 'Fibre optique', 'Architectures de transmission optique', 'Principes de transmission optique'],
  'Outils et systèmes': ['GNS3', 'Cisco Packet Tracer', 'Wireshark', 'VMware', 'Linux (utilisateurs, permissions, services)'],
  'Cloud et cybersécurité': ['Oracle Cloud Infrastructure', 'Microsoft Azure', 'Virtualisation', 'SIEM', 'Honeypot'],
  'Développement': ['Python', 'Java', 'C / C++', 'Programmation orientée objet', 'Sockets réseau', 'HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL']
};
const tabs = document.getElementById('tabs');
const chips = document.getElementById('chips');
function showSkills(name) {
  [...tabs.children].forEach(b => b.setAttribute('aria-selected', b.textContent === name));
  chips.innerHTML = '';
  skills[name].forEach((s, i) => {
    const c = document.createElement('span');
    c.className = 'chip';
    c.style.animationDelay = i * 40 + 'ms';
    c.textContent = s;
    chips.appendChild(c);
  });
}
Object.keys(skills).forEach(name => {
  const b = document.createElement('button');
  b.role = 'tab';
  b.textContent = name;
  b.addEventListener('click', () => showSkills(name));
  tabs.appendChild(b);
});
showSkills('Réseaux');

/* ---------- PROJECTS ---------- */
/* Remplacez "img" par le chemin d'une capture d'écran (ex: "img/siem.png") et "link" par vos vrais liens GitHub. */
function art(c1, c2, shapes) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="640" height="360" fill="url(#g)"/><g fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".9">${shapes}</g></svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}
const projects = [
  {
    title: 'Laboratoire SIEM et honeypot dans le cloud', tag: 'Projet personnel',
    desc: 'Mise en place sous Microsoft Azure d’un environnement de surveillance et d’analyse des menaces.',
    img: art('#0E7C7B', '#13233A', '<path d="M320 70l110 40v80c0 70-50 100-110 120-60-20-110-50-110-120v-80z"/><circle cx="320" cy="190" r="28"/><path d="M320 162v-30M348 190h30M320 218v30M292 190h-30"/>'),
    link: 'https://github.com/i1saac/Laboratoire-SIEM-et-honeypot-dans-le-cloud', label: 'Voir sur GitHub'
  },
  {
    title: 'Simulation et virtualisation de réseaux', tag: 'Projet académique',
    desc: 'Configuration de routeurs, commutateurs, VLAN, DHCP et NAT sous GNS3, avec virtualisation sous VMware.',
    img: art('#13233A', '#2F5D8A', '<circle cx="320" cy="90" r="30"/><circle cx="150" cy="260" r="30"/><circle cx="320" cy="260" r="30"/><circle cx="490" cy="260" r="30"/><path d="M320 120v110M300 112L170 235M340 112l130 123"/>'),
    link: 'https://github.com/i1saac/Simulation-et-virtualisation-de-r-seaux', label: 'Voir sur GitHub'
  },
  {
    title: 'Détection et classification de pièces de monnaie', tag: 'Projet académique',
    desc: 'Application Python de traitement d’image qui identifie des pièces à partir de leurs caractéristiques visuelles.',
    img: art('#E8A33D', '#B8601F', '<circle cx="230" cy="190" r="80"/><circle cx="230" cy="190" r="50"/><circle cx="420" cy="150" r="55"/><circle cx="420" cy="150" r="32"/><circle cx="440" cy="270" r="40"/>'),
    link: 'https://github.com/i1saac/D-tection-et-classification-de-pi-ces-de-monnaie', label: 'Voir sur GitHub'
  },
  {
    title: 'Jeu Tic-Tac-Toe en Java', tag: 'Projet académique',
    desc: 'Jeu multijoueur en réseau développé avec les sockets Java (client et serveur).',
    img: art('#51647A', '#13233A', '<path d="M255 80v200M385 80v200M170 150h300M170 220h300"/><path d="M190 100l50 40M240 100l-50 40"/><circle cx="320" cy="185" r="22"/>'),
    link: 'https://github.com/i1saac/Jeu-Tic-Tac-Toe-en-Java-Socket-Programming-', label: 'Voir sur GitHub'
  },
  {
    title: 'Plateforme web de gestion', tag: 'Projet réalisé',
    desc: 'Plateforme de gestion des stocks et des employés, en HTML, CSS, JavaScript, PHP et MySQL.',
    img: art('#37B5B3', '#0E5A7C', '<rect x="150" y="80" width="340" height="200" rx="14"/><path d="M150 125h340M200 170h120M200 210h200M200 250h80"/><circle cx="170" cy="102" r="3"/><circle cx="190" cy="102" r="3"/>'),
    link: 'https://waremanag.free.nf', label: 'Visiter le site'
  }
];
const cards = document.getElementById('cards');
projects.forEach(p => {
  const el = document.createElement('article');
  el.className = 'card';
  el.innerHTML = `<img src="${p.img}" alt="Illustration du projet : ${p.title}" loading="lazy">
    <div><small>${p.tag}</small><h3>${p.title}</h3><p>${p.desc}</p>
    <a href="${p.link}" target="_blank" rel="noopener">${p.label}</a></div>`;
  cards.appendChild(el);
});

/* ---------- CONTACT : ping ---------- */
const term = document.getElementById('term');
let pinging = false;
document.getElementById('ping').addEventListener('click', async () => {
  if (pinging) return;
  pinging = true;
  term.textContent = '$ ping ishak.boussaid@ensttic.dz\n';
  for (let i = 1; i <= 4; i++) {
    await new Promise(r => setTimeout(r, 450));
    term.textContent += `Réponse de Ishak : seq=${i} ttl=64 temps=${(8 + Math.random() * 6).toFixed(1)} ms\n`;
  }
  term.textContent += '4 paquets envoyés, 4 reçus, 0 % de perte.\nÉcrivez-moi par e-mail pour continuer la conversation.';
  pinging = false;
});

/* ---------- HERO : réseau animé ---------- */
(function () {
  const cv = document.getElementById('net');
  const ctx = cv.getContext('2d');
  const hint = document.getElementById('hint');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const labels = ['OSPF', 'VLAN', 'HSRP', 'NAT', 'Azure', 'SIEM', 'Fibre', 'Linux', 'Python', 'Java', 'GNS3', 'OCI', 'Wireshark', 'IPv6'];
  const info = {
    OSPF: 'OSPF : routage dynamique à état de liens.', VLAN: 'VLAN et inter-VLAN : segmentation du réseau local.',
    HSRP: 'HSRP : passerelle redondante pour la haute disponibilité.', NAT: 'NAT et DHCP : configurés dans mes labs GNS3.',
    Azure: 'Microsoft Azure : hébergement de mon labo de sécurité.', SIEM: 'SIEM et honeypot : surveillance et analyse des menaces.',
    Fibre: 'Fibre optique et FTTH : découverts chez Algérie Télécom.', Linux: 'Linux : utilisateurs, permissions et services.',
    Python: 'Python : traitement d’image et automatisation.', Java: 'Java : programmation orientée objet et sockets.',
    GNS3: 'GNS3 : simulation de réseaux complets.', OCI: 'Oracle Cloud Infrastructure : certifié Foundations Associate 2025.',
    Wireshark: 'Wireshark : analyse du trafic paquet par paquet.', IPv6: 'IPv4 / IPv6, VLSM et CIDR : plan d’adressage.'
  };
  let W, H, nodes = [], edges = [], packets = [], hover = -1, mouse = { x: -999, y: -999 };

  function build() {
    const r = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = W < 700 ? 9 : labels.length;
    nodes = labels.slice(0, n).map((l, i) => {
      const a = (i / n) * Math.PI * 2 + 0.4;
      const wide = W > 800;
      return { l, x: wide ? W * (0.62 + 0.3 * Math.cos(a) * (0.6 + (i % 3) * 0.2)) : W * (0.5 + 0.42 * Math.cos(a)),
               y: H * (0.5 + 0.38 * Math.sin(a) * (0.6 + (i % 2) * 0.35)), ph: Math.random() * 6 };
    });
    edges = [];
    nodes.forEach((a, i) => nodes.forEach((b, j) => {
      if (j > i && Math.hypot(a.x - b.x, a.y - b.y) < Math.max(W, H) * 0.3) edges.push([i, j]);
    }));
    packets = edges.map((e, k) => ({ e, t: Math.random(), s: 0.002 + Math.random() * 0.003, dir: k % 2 }));
  }

  function frame(time) {
    ctx.clearRect(0, 0, W, H);
    const teal = css('--teal'), amber = css('--amber'), line = css('--line'), ink = css('--ink');
    nodes.forEach(n => { n.px = n.x + (reduce ? 0 : Math.sin(time / 1500 + n.ph) * 6); n.py = n.y + (reduce ? 0 : Math.cos(time / 1700 + n.ph) * 6); });
    ctx.lineWidth = 1.5; ctx.strokeStyle = line;
    edges.forEach(([i, j]) => {
      const hot = hover === i || hover === j;
      ctx.strokeStyle = hot ? teal : line; ctx.lineWidth = hot ? 2.5 : 1.5;
      ctx.beginPath(); ctx.moveTo(nodes[i].px, nodes[i].py); ctx.lineTo(nodes[j].px, nodes[j].py); ctx.stroke();
    });
    packets.forEach(p => {
      if (!reduce) { p.t += p.s; if (p.t > 1) { p.t = 0; p.dir ^= 1; } }
      const a = nodes[p.e[p.dir]], b = nodes[p.e[1 - p.dir]];
      ctx.fillStyle = amber; ctx.beginPath();
      ctx.arc(a.px + (b.px - a.px) * p.t, a.py + (b.py - a.py) * p.t, 3.5, 0, 7); ctx.fill();
    });
    hover = -1;
    nodes.forEach((n, i) => { if (Math.hypot(n.px - mouse.x, n.py - mouse.y) < 26) hover = i; });
    nodes.forEach((n, i) => {
      const hot = i === hover;
      ctx.fillStyle = hot ? amber : teal; ctx.beginPath(); ctx.arc(n.px, n.py, hot ? 14 : 10, 0, 7); ctx.fill();
      ctx.strokeStyle = css('--paper'); ctx.lineWidth = 3; ctx.stroke();
      ctx.fillStyle = ink; ctx.font = '500 13px IBM Plex Sans, sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(n.l, n.px, n.py + 28);
    });
    hint.innerHTML = hover >= 0 ? '<b>' + info[nodes[hover].l] + '</b>' : 'Survolez le réseau : chaque routeur dévoile une de mes compétences.';
    cv.style.cursor = hover >= 0 ? 'pointer' : 'default';
    requestAnimationFrame(frame);
  }
  const hero = document.getElementById('home');
  hero.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; });
  hero.addEventListener('pointerleave', () => mouse = { x: -999, y: -999 });
  addEventListener('resize', build);
  build(); requestAnimationFrame(frame);
})();
