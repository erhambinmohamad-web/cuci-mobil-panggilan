// Generator situs statis tanpa dependensi. Jalankan: node src/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { icon, heroArt } from './icons.mjs';
import { detailPages, faq, posts as basePosts } from './content.mjs';
import { areas, extraPosts } from './seo.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'dist');
const c = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.config.json'), 'utf8'));
const H = c.harga;

// ---------- util ----------
const site = (c.customDomain ? `https://${c.customDomain}` : (process.env.SITE_URL || c.baseUrl)).replace(/\/$/, '');
const BASE = (new URL(site + '/').pathname).replace(/\/?$/, '/');
const u = (p = '') => BASE + p.replace(/^\//, '');
const abs = (p = '') => site + '/' + p.replace(/^\//, '');
const rp = (n) => 'Rp' + Number(n).toLocaleString('id-ID');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const wa = (text) => `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(text)}`;
const waChat = wa(`Halo ${c.brand}, saya mau tanya soal cuci/salon mobil di rumah.`);
const minOf = (arr) => Math.min(...arr);
const detail = Object.fromEntries(H.detailing.map((d) => [d.id, d]));
const SIZES = c.ukuran.slice(0, 3);
const posts = [...extraPosts(c, rp), ...basePosts];
const perCuci = (p) => Math.round(p.harga / parseInt(p.frekuensi, 10) / 50) * 50;
const inl = (svg) => svg.replace('<svg', '<svg style="display:inline;vertical-align:-2px"');

// Alamat halaman
const P = {
  langganan: 'cuci-mobil-langganan/',
  sekali: 'cuci-sekali-datang/',
  banjir: 'cuci-mobil-banjir/',
  harga: 'daftar-harga/',
  faq: 'tanya-jawab/',
  tentang: 'tentang-klikkilap/',
  tim: 'gabung-tim/',
  artikel: 'artikel/',
  area: 'area/',
  pesan: 'pesan/',
};
const dp = (id) => detailPages[id].slug + '/';

// ---------- layout ----------
const NAV = [
  { t: 'Cuci di Rumah', sub: [['Langganan Kilap', P.langganan], ['Cuci Sekali Datang', P.sekali]] },
  { t: 'Salon & Perawatan', sub: [['Salon Mobil Lengkap', dp('complete')], ['Interior & Jok', dp('interior')], ['Poles & Proteksi Cat', dp('exterior')], ['Perawatan Kaca', dp('kaca')], ['Cuci Ruang Mesin', dp('mesin')], ['Ban & Velg', dp('ban')], ['Pemulihan Pascabanjir', P.banjir]] },
  { t: 'Daftar Harga', href: P.harga },
  { t: 'Area', href: P.area },
  { t: 'Artikel', href: P.artikel },
  { t: 'Tanya Jawab', href: P.faq },
];

const brandParts = c.brand.match(/^(.+?)([A-Z][a-z0-9]*)$/) || [null, c.brand, ''];
const logo = `<span class="logo-mark">${icon.drop(20).replace('stroke="currentColor"', 'stroke="#fff"')}</span><span>${esc(brandParts[1])}<b>${esc(brandParts[2])}</b></span>`;

function header(cur) {
  const items = NAV.map((n) => {
    if (n.sub) {
      return `<li><button class="dd-toggle" type="button" aria-expanded="false">${n.t} ▾</button><ul class="dropdown">${n.sub
        .map(([t, h]) => `<li><a href="${u(h)}"${cur === h ? ' class="active"' : ''}>${t}</a></li>`)
        .join('')}</ul></li>`;
    }
    return `<li><a href="${u(n.href)}"${cur === n.href ? ' class="active"' : ''}>${n.t}</a></li>`;
  }).join('');
  return `<header class="site-header"><div class="container nav">
<a class="logo" href="${u()}" aria-label="${esc(c.brand)} beranda">${logo}</a>
<ul class="menu" id="menu">${items}</ul>
<div class="nav-cta"><a class="btn btn-primary" href="${u(P.pesan)}">Pesan Jadwal</a>
<button class="burger" id="burger" aria-label="Buka menu" aria-controls="menu" aria-expanded="false"><span></span><span></span><span></span></button></div>
</div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="container">
<div class="foot-grid">
  <div><a class="logo" href="${u()}">${logo}</a>
    <p class="mt24">${esc(c.brand)}: ${esc(c.tagline.charAt(0).toLowerCase() + c.tagline.slice(1))} untuk ${esc(c.area.length)} wilayah Jabodetabek. Tim yang datang, Anda tetap di rumah.</p>
    <p>${inl(icon.clock(16))} ${esc(c.jamOperasional)}</p>
  </div>
  <div><h4>Cuci & salon</h4><ul>
    <li><a href="${u(P.langganan)}">Langganan Kilap</a></li>
    <li><a href="${u(P.sekali)}">Cuci Sekali Datang</a></li>
    <li><a href="${u(dp('complete'))}">Salon Mobil Lengkap</a></li>
    <li><a href="${u(dp('interior'))}">Interior & Jok</a></li>
    <li><a href="${u(dp('exterior'))}">Poles & Proteksi Cat</a></li>
    <li><a href="${u(P.banjir)}">Pemulihan Pascabanjir</a></li></ul></div>
  <div><h4>Panduan</h4><ul>
    <li><a href="${u(P.harga)}">Daftar Harga</a></li>
    <li><a href="${u(P.area)}">Area Layanan</a></li>
    <li><a href="${u(P.faq)}">Tanya Jawab</a></li>
    <li><a href="${u(P.artikel)}">Artikel</a></li>
    <li><a href="${u(P.tentang)}">Tentang ${esc(c.brand)}</a></li>
    <li><a href="${u(P.tim)}">Gabung Tim</a></li></ul></div>
  <div><h4>Kontak</h4><ul>
    <li><a href="${waChat}" target="_blank" rel="noopener">WhatsApp ${esc(c.whatsappDisplay)}</a></li>
    ${c.email ? `<li><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></li>` : ''}
    ${c.instagram ? `<li><a href="https://instagram.com/${esc(c.instagram)}" target="_blank" rel="noopener">Instagram @${esc(c.instagram)}</a></li>` : ''}
  </ul></div>
</div>
<div class="copy"><span>© ${new Date().getFullYear()} ${esc(c.brand)}. Hak cipta dilindungi.</span><span>${esc(c.area.join(' · '))}</span></div>
</div></footer>
<a class="wa-float" href="${waChat}" target="_blank" rel="noopener" aria-label="Chat ${esc(c.brand)} via WhatsApp">${icon.wa(22)}<span>Chat ${esc(c.brand)}</span></a>`;
}

const ldBusiness = {
  '@context': 'https://schema.org',
  '@type': 'AutoWash',
  name: c.brand,
  description: `${c.tagline}. Cuci, poles, dan salon mobil dikerjakan di lokasi pelanggan.`,
  url: abs(),
  telephone: '+' + c.whatsapp,
  ...(c.email ? { email: c.email } : {}),
  areaServed: c.area.map((a) => ({ '@type': 'City', name: a })),
  priceRange: `${rp(H.sekaliCuci[0].harga)} – ${rp(detail.complete.harga[2])}`,
  openingHours: 'Mo-Su 06:00-18:00',
};

const sitemap = [];
function writeFile(file, html) {
  const out = path.join(OUT, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}
function page({ file, cur = '', title, desc, body, ld = [], extraHead = '', script = '' }) {
  const canonical = abs(file.replace(/index\.html$/, ''));
  const fullTitle = title.includes(c.brand) || title.length > 56 ? title : `${title} | ${c.brand}`;
  writeFile(file, `<!doctype html>
<html lang="id"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website"><meta property="og:title" content="${esc(fullTitle)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${canonical}"><meta property="og:locale" content="id_ID">
<meta name="theme-color" content="#0b7285">
<link rel="icon" href="${u('assets/favicon.svg')}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${u('assets/style.css')}">
${[ldBusiness, ...ld].map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
${extraHead}
</head><body>
${header(cur)}
<main>${body}</main>
${footer()}
${script}
<script src="${u('assets/app.js')}" defer></script>
</body></html>`);
  if (file !== '404.html') sitemap.push(canonical);
}
// Halaman lama dialihkan ke alamat baru (tidak masuk sitemap)
function redirect(from, to) {
  const target = abs(to);
  writeFile(`${from}index.html`, `<!doctype html><html lang="id"><head><meta charset="utf-8"><title>Dipindahkan</title><meta name="robots" content="noindex"><link rel="canonical" href="${target}"><meta http-equiv="refresh" content="0; url=${target}"><script>location.replace(${JSON.stringify(target)})</script></head><body><p>Halaman ini pindah ke <a href="${target}">${target}</a>.</p></body></html>`);
}

// ---------- blok komponen ----------
const pageHero = ({ crumb, eyebrow, h1, sub, benefits = [], cta = true, ctaHref = P.pesan, ctaText = 'Pesan Jadwal' }) => `
<section class="page-hero"><div class="container">
  <div class="crumbs"><a href="${u()}">Beranda</a> / ${esc(crumb)}</div>
  ${eyebrow ? `<span class="eyebrow">${esc(eyebrow)}</span>` : ''}
  <h1>${esc(h1)}</h1>
  <p class="lead">${esc(sub)}</p>
  ${cta ? `<div class="hero-actions"><a class="btn btn-primary" href="${u(ctaHref)}">${ctaText}</a><a class="btn btn-outline" href="${waChat}" target="_blank" rel="noopener">Chat WhatsApp</a></div>` : ''}
  ${benefits.length ? `<div class="benefits mt24">${benefits.map((b) => `<span>${esc(b)}</span>`).join('')}</div>` : ''}
</div></section>`;

const ctaBand = (h = 'Mobil kotor? Biar kami yang datang.', p = 'Isi form pemesanan atau chat langsung. Jadwal dikonfirmasi lewat WhatsApp.') => `
<section class="section"><div class="container"><div class="cta-band">
  <div><h2>${esc(h)}</h2><p>${esc(p)}</p></div>
  <div class="hero-actions"><a class="btn btn-primary" href="${u(P.pesan)}">Pesan Jadwal</a><a class="btn btn-outline" href="${waChat}" target="_blank" rel="noopener">Chat WhatsApp</a></div>
</div></div></section>`;

const langgananCards = (btn = true) => `<div class="grid g5">${H.langganan
  .map((p) => `<div class="card price-card${p.label ? ' featured' : ''}">
  ${p.label ? `<span class="tag">${esc(p.label)}</span>` : ''}
  <h3>${esc(p.nama)}</h3><div class="freq">${esc(p.frekuensi)}</div>
  <div class="price">${rp(p.harga)}<small>/bulan</small></div>
  <div class="per">± ${rp(perCuci(p))} / cuci</div>
  <ul><li>Jadwal ${esc(p.perMinggu)}x seminggu</li><li>${esc(p.sampo)}</li><li>Fogging hemat ${p.diskonFogging}%</li></ul>
  ${btn ? `<a class="btn btn-primary btn-sm" href="${u(P.pesan + '?layanan=langganan&paket=' + p.id)}">Pilih paket</a>` : ''}
</div>`).join('')}</div>`;

const sekaliCards = (btn = true) => `<div class="grid g4">${H.sekaliCuci
  .map((p) => `<div class="card">
  <h3>${esc(p.nama)}</h3>
  <p class="muted" style="font-size:.93rem">${esc(p.deskripsi)}</p>
  <ul class="check-list">${p.isi.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
  <div class="meta"><div class="price">${rp(p.harga)}</div><div class="dur">± ${esc(p.durasi)}</div></div>
  ${btn ? `<a class="btn btn-outline btn-sm mt24" href="${u(P.pesan + '?layanan=sekali&paket=' + p.id)}">Pilih ${esc(p.nama)}</a>` : ''}
</div>`).join('')}</div>`;

const addOnCards = () => `<div class="grid g5">${H.addOn
  .map((a) => `<div class="card"><h3 style="font-size:1rem">${esc(a.nama)}</h3><p class="muted" style="font-size:.9rem;flex:1">${esc(a.deskripsi)}</p>
  <div class="meta"><div class="price" style="font-size:1.1rem">${rp(a.harga)}</div><div class="dur">± ${esc(a.durasi)}</div></div></div>`)
  .join('')}</div>`;

const sizeTable = (d) => `<div class="table-wrap"><table class="size-table">
<thead><tr><th>Ukuran</th><th>Contoh mobil</th><th>Lama pengerjaan</th><th>Harga</th><th></th></tr></thead>
<tbody>${SIZES.map((s, i) => `<tr><td><b>${esc(s.nama)}</b></td><td class="muted">${esc(s.contoh)}</td><td>${esc(d.durasi[i])}</td><td class="num">${rp(d.harga[i])}</td>
<td><a class="btn btn-primary btn-sm" href="${u(`${P.pesan}?layanan=detailing&paket=${d.id}&ukuran=${s.id}`)}">Pesan</a></td></tr>`).join('')}
<tr><td><b>${esc(c.ukuran[3].nama)}</b></td><td class="muted">${esc(c.ukuran[3].contoh)}</td><td>—</td><td class="num">Lewat chat</td><td><a class="btn btn-outline btn-sm" href="${waChat}" target="_blank" rel="noopener">Tanya</a></td></tr>
</tbody></table></div>`;

const banjirTable = () => `<div class="table-wrap"><table class="size-table">
<thead><tr><th>Ukuran</th>${H.banjir.level.map((l, i) => `<th>${esc(l)}<br><small class="muted">${esc(H.banjir.durasi[i])}</small></th>`).join('')}</tr></thead>
<tbody>${SIZES.map((s, i) => `<tr><td><b>${esc(s.nama)}</b><br><small class="muted">${esc(s.contoh)}</small></td>${H.banjir.harga[i].map((h) => `<td class="num">${rp(h)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

const faqBlock = (items) => items.map(([q, a]) => `<details class="faq"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
const faqLd = (items) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const FAQ = faq(c);
const fq = (grup) => FAQ.find((g) => g.grup === grup).items;

const features = [
  ['tag', 'Harga tertulis sejak awal', 'Setiap paket dan ukuran mobil punya harga pasti. Tidak ada ongkos datang di dalam area layanan.'],
  ['wallet', 'Bayar setelah Anda cek', 'Periksa hasil kerja lebih dulu. Pembayaran dilakukan setelah Anda puas.'],
  ['wa', 'Semua lewat WhatsApp', 'Pesan, konfirmasi jadwal, dan pindah jadwal cukup lewat chat.'],
  ['home', 'Rumah, kantor, atau apartemen', 'Tim datang ke alamat mana pun di dalam area layanan, selama ada air dan izin pengelola.'],
  ['flask', 'Bahan kelas detailer', 'Kami memakai sampo pH-netral dan cairan khusus per bagian mobil, bukan sabun rumah tangga.'],
  ['refresh', `Cek ulang ${c.garansiJam} jam`, 'Ada bagian yang terlewat? Kirim fotonya, tim datang lagi tanpa biaya.'],
];
const featureGrid = (list = features) => `<div class="grid g3">${list
  .map(([ic, t, d]) => `<div class="feature"><div class="ic">${icon[ic]()}</div><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></div>`)
  .join('')}</div>`;

const howItWorks = `<div class="grid g4">${[
  ['Pilih paket', 'Lewat form pemesanan atau langsung chat WhatsApp.'],
  ['Konfirmasi jadwal', 'Admin mengonfirmasi hari, jam, dan alamat.'],
  ['Tim bekerja di lokasi', 'Peralatan dan bahan dibawa sendiri oleh tim.'],
  ['Cek, lalu bayar', 'Bayar lewat QRIS, transfer, atau tunai.'],
].map(([t, d], i) => `<div class="step"><div class="num">${i + 1}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>`;

const testimoniBlock = () => (c.testimoni && c.testimoni.length ? `
<section class="section soft"><div class="container">
  <div class="center"><span class="eyebrow">Ulasan</span><h2>Pengalaman pelanggan ${esc(c.brand)}</h2></div>
  <div class="grid g3 mt24">${c.testimoni.map((t) => `<div class="card testi"><div class="stars">★★★★★</div><p>“${esc(t.isi)}”</p><div class="who">${esc(t.nama)}<small>${esc(t.keterangan || '')}</small></div></div>`).join('')}</div>
</div></section>` : '');

const areaBlock = `<section class="section"><div class="container center">
  <span class="eyebrow">Area layanan</span><h2>${esc(c.area.length)} wilayah di Jabodetabek</h2>
  <p class="lead">Klik wilayah Anda untuk melihat kelurahan yang kami jangkau.</p>
  <div class="chips mt24">${c.area.map((a) => { const ar = areas.find((x) => x.nama === a); const pin = inl(icon.pin(14)); return ar ? `<a href="${u(ar.slug + '/')}">${pin} ${esc(a)}</a>` : `<span>${pin} ${esc(a)}</span>`; }).join('')}</div>
</div></section>`;

// ---------- HALAMAN ----------

// Beranda
const services = [
  ['drop', 'Langganan Kilap', 'Mobil dicuci di hari tetap setiap minggu, 4 sampai 24 kali sebulan.', `mulai ${rp(H.langganan[0].harga)}/bulan`, P.langganan],
  ['clock', 'Cuci Sekali Datang', 'Empat tingkat cuci, dari Kilat sampai Istimewa.', `mulai ${rp(H.sekaliCuci[0].harga)}`, P.sekali],
  ['seat', 'Interior & Jok', 'Jok, karpet, dan plafon dicuci sampai kering.', `mulai ${rp(detail.interior.harga[0])}`, dp('interior')],
  ['sparkle', 'Poles & Proteksi Cat', 'Bintik air dan baret halus ditangani, lalu dilapisi sealant.', `mulai ${rp(detail.exterior.harga[0])}`, dp('exterior')],
  ['window', 'Perawatan Kaca', 'Jamur kaca dihapus, pandangan malam tidak silau.', `mulai ${rp(detail.kaca.harga[0])}`, dp('kaca')],
  ['engine', 'Cuci Ruang Mesin', 'Kerak oli dan debu dibersihkan, kelistrikan dilindungi.', `mulai ${rp(detail.mesin.harga[0])}`, dp('mesin')],
  ['car', 'Salon Mobil Lengkap', 'Lima perawatan sekaligus dalam satu hari.', `mulai ${rp(detail.complete.harga[0])}`, dp('complete')],
  ['wave', 'Pemulihan Pascabanjir', 'Kabin yang terendam dibongkar, dicuci, dan dikeringkan.', `mulai ${rp(H.banjir.harga[0][0])}`, P.banjir],
];

page({
  file: 'index.html',
  title: `Cuci Mobil Panggilan & Salon Mobil ke Rumah | ${c.brand}`,
  desc: `Cuci mobil panggilan, poles, dan salon mobil ke rumah di Jabodetabek. Langganan mulai ${rp(H.langganan[0].harga)}/bulan, cuci sekali datang ${rp(H.sekaliCuci[0].harga)}. Bayar setelah dicek.`,
  body: `
<section class="hero"><div class="container hero-grid">
  <div>
    <span class="badge">${icon.shield(16)} Harga tertulis · Bayar setelah dicek</span>
    <h1>Cuci Mobil Panggilan & Salon Mobil, Datang ke Rumah Anda</h1>
    <p class="lead">Pesan lewat WhatsApp, tim ${esc(c.brand)} datang ke garasi Anda dengan alat dan bahan sendiri. Anda cukup menyediakan keran air.</p>
    <div class="hero-actions"><a class="btn btn-primary" href="${u(P.pesan)}">Pesan Jadwal</a><a class="btn btn-outline" href="${u(P.harga)}">Cek Daftar Harga</a></div>
  </div>
  <div class="hero-art">${heroArt}<div class="hero-price">Cuci di rumah mulai<b>${rp(H.sekaliCuci[0].harga)}</b></div></div>
</div></section>

<section class="section"><div class="container">
  <div class="center"><span class="eyebrow">Kenapa ${esc(c.brand)}</span><h2>Mobil dirawat, Anda tetap beraktivitas</h2>
  <p class="lead">Tidak perlu mengantar mobil atau menunggu di tempat cuci. Enam hal yang kami pegang di setiap kunjungan:</p></div>
  <div class="mt40">${featureGrid()}</div>
</div></section>

<section class="section soft"><div class="container">
  <div class="center"><span class="eyebrow">Layanan</span><h2>Semua layanan ${esc(c.brand)}</h2><p class="lead">Dari cuci mingguan sampai pemulihan setelah banjir, dikerjakan di tempat mobil Anda diparkir.</p></div>
  <div class="grid g4 mt40">${services.map(([ic, t, d, f, h]) => `<a class="card service-card" href="${u(h)}"><div class="ic">${icon[ic](28)}</div><h3>${t}</h3><p>${d}</p><div class="from">${f.replace(/(Rp[\d.]+)/, '<b>$1</b>')}</div><div class="more">Selengkapnya →</div></a>`).join('')}</div>
</div></section>

<section class="section"><div class="container">
  <div class="center"><span class="eyebrow">Langganan Kilap</span><h2>Jadwal tetap, makin sering makin murah</h2><p class="lead">Pilih 4 sampai 24 kedatangan per bulan. Angka di nama paket adalah jumlah kedatangannya.</p></div>
  <div class="mt40">${langgananCards()}</div>
  <p class="center mt24"><a href="${u(P.harga)}">Lihat seluruh daftar harga →</a></p>
</div></section>

<section class="section soft"><div class="container">
  <div class="center"><span class="eyebrow">Cara memesan</span><h2>Dari chat sampai mobil bersih</h2></div>
  <div class="mt40">${howItWorks}</div>
</div></section>

${testimoniBlock()}
${areaBlock}
${ctaBand()}`,
});

// Langganan
{
  const basis = H.sekaliCuci[0];
  page({
    file: `${P.langganan}index.html`, cur: P.langganan,
    title: 'Cuci Mobil Langganan di Rumah – Paket Kilap',
    desc: `Cuci mobil langganan di rumah mulai ${rp(H.langganan[0].harga)}/bulan untuk ${H.langganan[0].frekuensi.replace(' / ', ' per ')}. Hari tetap pilihan Anda, bisa berhenti kapan saja.`,
    body: `${pageHero({ crumb: 'Langganan Kilap', eyebrow: 'Langganan Kilap', h1: 'Cuci Mobil Langganan di Rumah', sub: 'Tentukan berapa kali mobil dicuci dalam sebulan dan hari apa saja. Tim datang sesuai jadwal tanpa perlu dipesan ulang.', benefits: ['Hari & jam tetap', 'Lebih murah per kedatangan', 'Tanpa biaya berhenti'] })}
<section class="section"><div class="container">
  <div class="center"><h2>Lima paket Kilap</h2><p class="lead">Kilap 4 berarti 4 kedatangan per bulan, Kilap 8 berarti 8, dan seterusnya. Paket Plus memakai snow foam dan sealant di setiap kedatangan.</p></div>
  <div class="mt40">${langgananCards()}</div>
  <div class="note">Setiap kedatangan berisi pekerjaan paket ${esc(basis.nama)}: ${esc(basis.isi.join(', ').toLowerCase())}. Satu paket bisa dibagi untuk dua mobil di alamat yang sama.</div>
</div></section>
<section class="section soft"><div class="container" style="max-width:900px">
  <h2 class="center">Hitungan hemat dibanding cuci sekali datang</h2>
  <p class="lead center">Paket ${esc(basis.nama)} sekali datang ${rp(basis.harga)}. Ini harga per kedatangan di tiap paket langganan:</p>
  <div class="table-wrap mt24"><table class="size-table"><thead><tr><th>Paket</th><th>Kedatangan</th><th>Harga / bulan</th><th>Per kedatangan</th></tr></thead>
  <tbody>${H.langganan.map((p) => `<tr><td><b>${esc(p.nama)}</b></td><td>${esc(p.frekuensi.split(' / ')[0])}</td><td class="num">${rp(p.harga)}</td><td class="num">± ${rp(perCuci(p))}</td></tr>`).join('')}</tbody></table></div>
  <p class="center mt24"><a href="${u(P.sekali)}">Belum mau langganan? Lihat paket cuci sekali datang →</a></p>
</div></section>
<section class="section"><div class="container"><h2 class="center">Tanya jawab langganan</h2><div class="mt24" style="max-width:820px;margin-left:auto;margin-right:auto">${faqBlock(fq('Langganan Kilap'))}</div></div></section>
${ctaBand('Mulai langganan minggu ini', 'Tanpa kontrak panjang. Berhenti cukup dengan kabar lewat WhatsApp.')}`,
    ld: [faqLd(fq('Langganan Kilap'))],
  });
}

// Sekali datang
page({
  file: `${P.sekali}index.html`, cur: P.sekali,
  title: 'Cuci Mobil Panggilan Sekali Datang',
  desc: `Cuci mobil panggilan tanpa langganan mulai ${rp(H.sekaliCuci[0].harga)}. Empat tingkat paket: ${H.sekaliCuci.map((p) => p.nama).join(', ')}, plus tambahan hapus jamur, clay bar, wax, dan fogging.`,
  body: `${pageHero({ crumb: 'Cuci Sekali Datang', eyebrow: 'Tanpa langganan', h1: 'Cuci Mobil Panggilan Sekali Datang', sub: 'Pesan saat dibutuhkan saja. Pilih tingkat pembersihan sesuai kondisi mobil hari ini.', benefits: ['Empat tingkat paket', 'Tambahan sesuai kebutuhan', 'Bayar setelah dicek'] })}
<section class="section"><div class="container">
  <div class="center"><h2>Pilih tingkat pembersihan</h2><p class="lead">Setiap tingkat sudah berisi semua pekerjaan di tingkat sebelumnya.</p></div>
  <div class="mt40">${sekaliCards()}</div>
</div></section>
<section class="section soft"><div class="container">
  <div class="center"><h2>Tambahan untuk paket apa pun</h2><p class="lead">Centang saat mengisi form pemesanan.</p></div>
  <div class="mt40">${addOnCards()}</div>
</div></section>
<section class="section"><div class="container">
  <div class="grid g2" style="align-items:center">
    <div><span class="eyebrow">Sering cuci?</span><h2>Langganan lebih murah per kedatangan</h2><p class="lead">Dengan ${esc(H.langganan[0].nama)}, satu kedatangan hanya sekitar ${rp(perCuci(H.langganan[0]))}, dan harinya sudah terjadwal.</p><a class="btn btn-primary" href="${u(P.langganan)}">Lihat paket Kilap</a></div>
    <div class="card shadow center"><div class="muted">${esc(H.langganan[0].nama)}</div><div class="price" style="font-size:2.2rem">${rp(H.langganan[0].harga)}<small>/bulan</small></div><div class="muted">${esc(H.langganan[0].frekuensi)}</div></div>
  </div>
</div></section>
${ctaBand()}`,
});

// Halaman perawatan (interior, exterior, kaca, mesin, ban)
const detailFaq = fq('Sebelum memesan').slice(2, 4).concat(fq('Pembayaran & garansi').slice(0, 1));
for (const id of ['interior', 'exterior', 'kaca', 'mesin', 'ban']) {
  const d = detail[id];
  const p = detailPages[id];
  page({
    file: `${dp(id)}index.html`, cur: dp(id),
    title: p.title,
    desc: `${p.meta} Mulai ${rp(d.harga[0])}.`,
    body: `${pageHero({ crumb: p.h1, eyebrow: 'Salon & perawatan', h1: p.h1, sub: p.sub, benefits: ['Dikerjakan di lokasi Anda', `Mulai ${rp(d.harga[0])}`, `Lama pengerjaan ${d.durasi[0].replace('± ', '±')}`], ctaHref: `${P.pesan}?layanan=detailing&paket=${id}` })}
<section class="section"><div class="container">
  <h2 class="center">Masalah yang sering kami temui</h2>
  <div class="grid g3 mt40">${p.masalah.map(([m, s]) => `<div class="card"><h3 style="font-size:1.05rem">${esc(m)}</h3><p class="muted mb0">${esc(s)}</p></div>`).join('')}</div>
</div></section>
<section class="section soft"><div class="container grid g2" style="align-items:start">
  <div><h2>Tentang layanan ini</h2><p class="lead">${esc(p.intro)}</p>
    <div class="note"><b>Yang dikerjakan:</b> ${esc(p.scope)}</div></div>
  <div class="card shadow process"><h3><span class="feature"><span class="ic">${icon[p.icon]()}</span></span> Urutan kerja tim</h3><ol>${p.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol></div>
</div></section>
<section class="section"><div class="container">
  <div class="center"><h2>Harga ${esc(d.nama)}</h2><p class="lead">Berdasarkan ukuran mobil. Tenaga, bahan, dan ongkos datang di dalam area layanan sudah termasuk.</p></div>
  <div class="mt40">${sizeTable(d)}</div>
  <p class="center mt24">Butuh beberapa perawatan sekaligus? <a href="${u(dp('complete'))}">Salon Mobil Lengkap mulai ${rp(detail.complete.harga[0])} →</a></p>
</div></section>
<section class="section soft"><div class="container" style="max-width:820px">
  <h2 class="center">Supaya hasilnya awet</h2>
  <ul class="check-list mt24">${p.rawat.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
  <h2 class="center mt40">Tanya jawab</h2><div class="mt24">${faqBlock(detailFaq)}</div>
</div></section>
${ctaBand()}`,
  });
}

// Salon mobil lengkap
{
  const d = detail.complete, p = detailPages.complete;
  const parts = ['interior', 'exterior', 'kaca', 'mesin', 'ban'];
  const satuan = SIZES.map((_, i) => parts.reduce((a, k) => a + detail[k].harga[i], 0));
  const q = fq('Perawatan & salon').slice(0, 2).concat(fq('Pembayaran & garansi').slice(0, 2));
  page({
    file: `${dp('complete')}index.html`, cur: dp('complete'),
    title: p.title,
    desc: `${p.meta} Mulai ${rp(d.harga[0])}.`,
    body: `${pageHero({ crumb: p.h1, eyebrow: 'Salon mobil lengkap', h1: p.h1, sub: p.sub, benefits: ['Lima perawatan, satu tim', `Hemat hingga ${rp(satuan[0] - d.harga[0])}`, 'Bayar setelah dicek'], ctaHref: `${P.pesan}?layanan=detailing&paket=complete` })}
<section class="section"><div class="container">
  <h2 class="center">Kapan salon lengkap masuk akal?</h2>
  <div class="grid g3 mt40">${p.masalah.map(([m, s]) => `<div class="card"><h3 style="font-size:1.05rem">${esc(m)}</h3><p class="muted mb0">${esc(s)}</p></div>`).join('')}</div>
  <p class="lead center mt40" style="max-width:760px;margin-left:auto;margin-right:auto">${esc(p.intro)}</p>
</div></section>
<section class="section soft"><div class="container">
  <h2 class="center">Isi paket</h2>
  <div class="grid g5 mt40">${parts.map((k) => `<a class="card service-card" href="${u(dp(k))}"><div class="ic">${icon[detailPages[k].icon](28)}</div><h3 style="font-size:1rem">${esc(detail[k].nama)}</h3><p style="font-size:.9rem">${esc(detailPages[k].sub)}</p><div class="from">satuan mulai <b>${rp(detail[k].harga[0])}</b></div></a>`).join('')}</div>
  <div class="note">Fogging dan bongkar karpet dasar tidak termasuk. Keduanya bisa ditambahkan saat memesan.</div>
</div></section>
<section class="section"><div class="container">
  <div class="center"><h2>Harga Salon Mobil Lengkap</h2><p class="lead">Untuk mobil kecil, harga satuan kelima perawatan ${rp(satuan[0])}. Dalam paket menjadi ${rp(d.harga[0])}.</p></div>
  <div class="mt40">${sizeTable(d)}</div>
</div></section>
<section class="section soft"><div class="container" style="max-width:820px">
  <h2 class="center">Setelah salon</h2>
  <ul class="check-list mt24">${p.rawat.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
  <h2 class="center mt40">Tanya jawab</h2><div class="mt24">${faqBlock(q)}</div>
</div></section>
${ctaBand('Siapkan mobil untuk dijual atau dipakai keluarga', `Salon lengkap mulai ${rp(d.harga[0])}, selesai dalam satu hari di rumah Anda.`)}`,
    ld: [faqLd(q)],
  });
}

// Pemulihan pascabanjir
page({
  file: `${P.banjir}index.html`, cur: P.banjir,
  title: 'Cuci Mobil Bekas Banjir – Pemulihan Kabin di Rumah',
  desc: `Pemulihan kabin mobil bekas terendam banjir di lokasi Anda: karpet dibongkar, dicuci, didisinfeksi, dan dikeringkan. Harga sesuai tinggi air, mulai ${rp(H.banjir.harga[0][0])}.`,
  body: `${pageHero({ crumb: 'Pemulihan Pascabanjir', eyebrow: 'Pascabanjir', h1: 'Pemulihan Mobil Pascabanjir', sub: 'Kabin yang terendam dibongkar, dicuci, didisinfeksi, dan dikeringkan di tempat mobil Anda berada.', benefits: ['Estimasi dari foto', 'Harga sesuai tinggi air', 'Dikerjakan di lokasi'], ctaHref: `${P.pesan}?layanan=banjir` })}
<section class="section"><div class="container grid g2" style="align-items:start">
  <div><h2>Pekerjaan yang kami lakukan</h2><ul class="check-list">
    <li>Mengeluarkan air dan endapan lumpur dari lantai kabin, karpet, dan sela jok</li>
    <li>Mencuci karpet dan jok dengan mesin extractor</li>
    <li>Menyemprotkan disinfektan ke seluruh kabin</li>
    <li>Mengeringkan kabin dengan blower sampai lembapnya hilang</li>
    <li>Membilas bodi dan kolong yang terkena lumpur</li></ul>
    <div class="note">Pengerjaan butuh listrik minimal 2.000 watt. Mesin dan kelistrikan tetap perlu diperiksa bengkel.</div></div>
  <div class="card shadow"><h3>Sambil menunggu tim</h3><ol class="muted" style="padding-left:20px"><li>Jangan menyalakan mesin.</li><li>Lepas terminal negatif aki.</li><li>Foto bekas garis air di kabin.</li><li>Kirim fotonya ke WhatsApp kami untuk estimasi.</li></ol>
  <a class="btn btn-wa mt24" href="${wa(`Halo ${c.brand}, mobil saya terendam banjir. Saya ingin estimasi pemulihan kabin.`)}" target="_blank" rel="noopener">${icon.wa(18)} Kirim foto via WhatsApp</a></div>
</div></section>
<section class="section soft"><div class="container">
  <div class="center"><h2>Harga pemulihan pascabanjir</h2><p class="lead">Tergantung ukuran mobil dan setinggi apa air masuk ke kabin.</p></div>
  <div class="mt40">${banjirTable()}</div>
  <p class="center mt24"><a href="${u(`${P.artikel}panduan-membersihkan-mobil-setelah-banjir/`)}">Baca: yang harus dilakukan sebelum mobil dinyalakan →</a></p>
</div></section>
${ctaBand('Mobil terendam? Kirim fotonya sekarang', 'Makin cepat ditangani, makin kecil risiko bau dan jamur menetap.')}`,
});

// Daftar harga
{
  const tabs = [
    ['cuci', 'Cuci di Rumah'], ['interior', 'Interior & Jok'], ['exterior', 'Poles Cat'], ['kaca', 'Kaca'], ['mesin', 'Ruang Mesin'], ['ban', 'Ban & Velg'], ['complete', 'Salon Lengkap'], ['banjir', 'Pascabanjir'],
  ];
  const detailPanel = (id) => `<div class="tab-panel" id="${id}"><h2>${esc(detail[id].nama)}</h2>${sizeTable(detail[id])}</div>`;
  page({
    file: `${P.harga}index.html`, cur: P.harga,
    title: 'Harga Cuci Mobil Panggilan, Poles & Salon Mobil 2026',
    desc: `Daftar harga ${c.brand}: langganan Kilap mulai ${rp(H.langganan[0].harga)}/bulan, cuci sekali datang ${rp(H.sekaliCuci[0].harga)}, poles, salon mobil, dan pemulihan pascabanjir.`,
    body: `${pageHero({ crumb: 'Daftar Harga', eyebrow: 'Daftar harga', h1: `Daftar Harga ${c.brand}`, sub: 'Harga sudah termasuk tenaga, bahan, peralatan, dan ongkos datang di dalam area layanan. Pembayaran setelah pekerjaan dicek.', cta: false })}
<section class="section"><div class="container">
  <nav class="tabs" aria-label="Kategori harga">${tabs.map(([id, t], i) => `<a href="#${id}"${i === 0 ? ' class="active"' : ''}>${t}</a>`).join('')}</nav>
  <div class="tab-panel" id="cuci">
    <h2>Langganan Kilap</h2>${langgananCards()}
    <h2 class="mt40">Cuci Sekali Datang</h2>${sekaliCards()}
    <h3 class="mt40">Tambahan</h3>${addOnCards()}
  </div>
  ${['interior', 'exterior', 'kaca', 'mesin', 'ban'].map(detailPanel).join('')}
  <div class="tab-panel" id="complete"><h2>${esc(detail.complete.nama)}</h2><p class="muted">${esc(detailPages.complete.scope)}</p>${sizeTable(detail.complete)}</div>
  <div class="tab-panel" id="banjir"><h2>Pemulihan Pascabanjir</h2>${banjirTable()}</div>
  <div class="note">Ukuran mobil: ${c.ukuran.map((s) => `<b>${esc(s.nama)}</b>: ${esc(s.contoh)}`).join('. ')}.</div>
</div></section>
${ctaBand()}`,
  });
}

// Tanya jawab
page({
  file: `${P.faq}index.html`, cur: P.faq,
  title: 'Tanya Jawab Cuci Mobil Panggilan',
  desc: `Jawaban seputar persiapan lokasi, jadwal, langganan Kilap, pembayaran, garansi, dan perawatan mobil di ${c.brand}.`,
  body: `${pageHero({ crumb: 'Tanya Jawab', eyebrow: 'Tanya jawab', h1: 'Tanya Jawab', sub: 'Pertanyaan Anda tidak ada di sini? Kirim lewat WhatsApp, admin kami yang menjawab.', cta: false })}
<section class="section"><div class="container" style="max-width:860px">${FAQ.map((g) => `<div class="faq-group"><h2>${esc(g.grup)}</h2>${faqBlock(g.items)}</div>`).join('')}</div></section>
${ctaBand('Masih ragu?', 'Tanyakan langsung lewat WhatsApp sebelum memesan.')}`,
  ld: [faqLd(FAQ.flatMap((g) => g.items))],
});

// Tentang
page({
  file: `${P.tentang}index.html`, cur: P.tentang,
  title: `Tentang ${c.brand}`,
  desc: `${c.brand} adalah layanan cuci mobil panggilan dan salon mobil di rumah untuk ${c.area.length} wilayah Jabodetabek.`,
  body: `${pageHero({ crumb: `Tentang ${c.brand}`, eyebrow: `Tentang ${c.brand}`, h1: `Tentang ${c.brand}`, sub: 'Layanan cuci dan salon mobil yang datang ke garasi Anda.', cta: false })}
<section class="section"><div class="container article">
  <p>${esc(c.brand)} berawal dari pertanyaan sederhana: kenapa merawat mobil harus menghabiskan akhir pekan di antrean? Kami memindahkan pekerjaan itu ke tempat mobil Anda diparkir, entah di rumah, kantor, atau apartemen.</p>
  <h2>Arti nama kami</h2>
  <p><b>Klik</b> karena memesan cukup dari ponsel. <b>Kilap</b> karena itulah hasil yang Anda cek sebelum membayar.</p>
  <h2>Cara kami bekerja</h2>
  <ul>
    <li><b>Dua ember, banyak lap.</b> Air bilas dipisah dari air sampo, dan lap microfiber dibedakan untuk bodi, kaca, dan velg.</li>
    <li><b>Bahan sesuai bagian.</b> ${esc(c.produk.charAt(0).toUpperCase() + c.produk.slice(1))}, dipakai sesuai bagian mobil.</li>
    <li><b>Harga di depan.</b> Harga setiap paket dan ukuran mobil tertulis di <a href="${u(P.harga)}">daftar harga</a>. Tidak ada tambahan ongkos datang di dalam area layanan.</li>
    <li><b>Anda cek dulu.</b> Pembayaran dilakukan setelah pekerjaan diperiksa. Bila ada yang terlewat dalam ${c.garansiJam} jam, tim datang lagi.</li>
  </ul>
  <h2>Area layanan</h2>
  <p>${esc(c.area.join(', '))}. Rincian kelurahan ada di halaman <a href="${u(P.area)}">area layanan</a>.</p>
</div></section>
${ctaBand()}`,
});

// Gabung tim
page({
  file: `${P.tim}index.html`, cur: P.tim,
  title: `Gabung Tim ${c.brand}`,
  desc: `Lowongan ${c.brand}: teknisi cuci, teknisi salon & poles, dan mitra wilayah di Jabodetabek.`,
  body: `${pageHero({ crumb: 'Gabung Tim', eyebrow: 'Gabung tim', h1: `Bekerja di ${c.brand}`, sub: 'Kami mencari orang yang teliti, tepat waktu, dan ramah kepada pelanggan.', cta: false })}
<section class="section"><div class="container"><div class="grid g3">${[
    ['Teknisi Cuci', 'Mengerjakan paket Kilat sampai Istimewa di lokasi pelanggan dan merawat peralatan.'],
    ['Teknisi Salon & Poles', 'Berpengalaman memoles cat, merawat kaca, dan mencuci interior.'],
    ['Mitra Wilayah', 'Punya peralatan sendiri? Terima pesanan di wilayah tempat Anda tinggal.'],
  ].map(([t, d]) => `<div class="card"><h3>${t}</h3><p class="muted" style="flex:1">${d}</p><a class="btn btn-outline btn-sm" href="${wa(`Halo ${c.brand}, saya ingin melamar sebagai ${t}.`)}" target="_blank" rel="noopener">Kirim lamaran via WhatsApp</a></div>`).join('')}</div></div></section>`,
});

// Artikel
page({
  file: `${P.artikel}index.html`, cur: P.artikel,
  title: 'Artikel Perawatan Mobil',
  desc: 'Tips perawatan cat, kabin, dan kaca mobil, daftar harga salon, serta panduan setelah mobil terendam banjir.',
  body: `${pageHero({ crumb: 'Artikel', eyebrow: 'Artikel', h1: 'Artikel Perawatan Mobil', sub: 'Tulisan singkat dari tim kami tentang merawat mobil di iklim tropis.', cta: false })}
<section class="section"><div class="container"><div class="grid g3">${posts.map((p) => `<article class="card post-card"><div class="date">${new Date(p.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div><h3><a href="${u(`${P.artikel}${p.slug}/`)}">${esc(p.title)}</a></h3><p>${esc(p.excerpt)}</p><a class="more" href="${u(`${P.artikel}${p.slug}/`)}">Baca artikel →</a></article>`).join('')}</div></div></section>`,
});
for (const p of posts) {
  page({
    file: `${P.artikel}${p.slug}/index.html`, cur: P.artikel,
    title: p.title, desc: p.excerpt,
    ld: [{ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, datePublished: p.date, author: { '@type': 'Organization', name: c.brand }, publisher: { '@type': 'Organization', name: c.brand } }],
    body: `<section class="page-hero"><div class="container article"><div class="crumbs"><a href="${u()}">Beranda</a> / <a href="${u(P.artikel)}">Artikel</a></div><h1 style="font-size:clamp(1.7rem,4vw,2.4rem)">${esc(p.title)}</h1><p class="muted">${new Date(p.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} · ${esc(c.brand)}</p></div></section>
<section class="section" style="padding-top:32px"><div class="container article">${p.body}</div></section>${ctaBand()}`,
  });
}

// Form pemesanan → WhatsApp
{
  const pub = { brand: c.brand, whatsapp: c.whatsapp, area: c.area, jam: c.jamPilihan, harga: H, ukuran: c.ukuran };
  page({
    file: `${P.pesan}index.html`, cur: P.pesan,
    title: 'Jadwalkan Cuci & Salon Mobil di Rumah',
    desc: `Jadwalkan kunjungan ${c.brand}: pilih layanan, paket, alamat, dan waktu. Pesanan terkirim ke WhatsApp kami untuk dikonfirmasi.`,
    script: `<script>window.SITE=${JSON.stringify(pub)};</script>`,
    body: `<section class="page-hero" style="padding-bottom:24px"><div class="container"><div class="crumbs"><a href="${u()}">Beranda</a> / Pesan Jadwal</div><h1>Jadwalkan Kunjungan ${esc(c.brand)}</h1><p class="lead mb0">Tiga langkah singkat. Setelah dikirim, pesanan masuk ke WhatsApp kami dan admin mengonfirmasi jadwalnya.</p></div></section>
<section class="section" style="padding-top:24px"><div class="container booking">
<form id="bookForm" class="card" novalidate>
  <ol class="stepper"><li class="on" data-s="1">1. Jenis layanan</li><li data-s="2">2. Pilihan paket</li><li data-s="3">3. Alamat & waktu</li></ol>

  <div class="panel on" data-p="1">
    <fieldset class="fieldset"><legend>Layanan apa yang Anda butuhkan?</legend>
    <div class="opt-grid">
      <label class="opt"><input type="radio" name="layanan" value="langganan"><span class="box"><b>Langganan Kilap</b><small>4–24 kedatangan per bulan, hari tetap</small><span class="p">mulai ${rp(H.langganan[0].harga)}/bln</span></span></label>
      <label class="opt"><input type="radio" name="layanan" value="sekali"><span class="box"><b>Cuci sekali datang</b><small>${esc(H.sekaliCuci[0].nama)} sampai ${esc(H.sekaliCuci[H.sekaliCuci.length - 1].nama)}, bisa pilih tambahan</small><span class="p">mulai ${rp(H.sekaliCuci[0].harga)}</span></span></label>
      <label class="opt"><input type="radio" name="layanan" value="detailing"><span class="box"><b>Salon & perawatan</b><small>Interior, poles cat, kaca, ruang mesin, ban & velg, salon lengkap</small><span class="p">mulai ${rp(minOf(H.detailing.map((d) => d.harga[0])))}</span></span></label>
      <label class="opt"><input type="radio" name="layanan" value="banjir"><span class="box"><b>Pemulihan pascabanjir</b><small>Kabin yang sempat terendam air</small><span class="p">mulai ${rp(H.banjir.harga[0][0])}</span></span></label>
    </div></fieldset>
    <div class="err-msg" data-err="1">Pilih salah satu jenis layanan dulu.</div>
    <div class="form-nav"><span></span><button type="button" class="btn btn-primary" data-next>Lanjut →</button></div>
  </div>

  <div class="panel" data-p="2">
    <div id="step2"></div>
    <div class="err-msg" data-err="2"></div>
    <div class="form-nav"><button type="button" class="btn btn-outline" data-prev>← Kembali</button><button type="button" class="btn btn-primary" data-next>Lanjut →</button></div>
  </div>

  <div class="panel" data-p="3">
    <fieldset class="fieldset"><legend>Kontak</legend><div class="form-grid">
      <div><label class="f" for="nama">Nama <i>*</i></label><input class="input" id="nama" name="nama" required autocomplete="name" placeholder="Nama Anda"></div>
      <div><label class="f" for="hp">Nomor WhatsApp <i>*</i></label><input class="input" id="hp" name="hp" required inputmode="tel" autocomplete="tel" placeholder="08xxxxxxxxxx"></div>
      <div class="full"><label class="f" for="alamat">Alamat <i>*</i></label><textarea class="input" id="alamat" name="alamat" rows="2" required placeholder="Jalan, nomor, RT/RW, dan patokan"></textarea></div>
      <div><label class="f" for="maps">Link lokasi Google Maps</label><input class="input" id="maps" name="maps" placeholder="Opsional"></div>
      <div><label class="f" for="kota">Wilayah <i>*</i></label><select class="input" id="kota" name="kota" required><option value="">Pilih wilayah</option>${c.area.map((a) => `<option>${esc(a)}</option>`).join('')}<option>Di luar daftar</option></select></div>
    </div></fieldset>
    <fieldset class="fieldset"><legend>Mobil</legend><div class="form-grid">
      <div><label class="f" for="merk">Merek & tipe</label><input class="input" id="merk" name="merk" placeholder="mis. Honda HR-V"></div>
      <div><label class="f" for="nopol">Pelat nomor</label><input class="input" id="nopol" name="nopol" placeholder="mis. B 1234 KJ"></div>
    </div></fieldset>
    <fieldset class="fieldset"><legend>Waktu kedatangan</legend><div class="form-grid">
      <div><label class="f" for="tanggal" id="lblTanggal">Tanggal <i>*</i></label><input class="input" type="date" id="tanggal" name="tanggal" required></div>
      <div><label class="f" for="jam">Jam <i>*</i></label><select class="input" id="jam" name="jam" required><option value="">Pilih jam</option>${c.jamPilihan.map((j) => `<option>${j}</option>`).join('')}</select></div>
      <div class="full" id="hariWrap" hidden><label class="f">Hari rutin langganan</label><div class="opt-grid c4" id="hariList"></div><div class="hint" id="hariHint"></div></div>
    </div></fieldset>
    <fieldset class="fieldset"><legend>Keterangan</legend><div class="form-grid">
      <div><label class="f" for="kondisi">Fasilitas di lokasi <i>*</i></label><select class="input" id="kondisi" name="kondisi" required><option value="">Pilih salah satu</option><option>Ada keran air & stop kontak</option><option>Ada keran air saja</option><option>Ada stop kontak saja</option><option>Belum ada keduanya</option></select></div>
      <div><label class="f" for="sumber">Kenal ${esc(c.brand)} dari</label><select class="input" id="sumber" name="sumber"><option value="">Pilih salah satu</option><option>Pencarian Google</option><option>Google Maps</option><option>Instagram</option><option>TikTok</option><option>Rekomendasi teman</option><option>Lainnya</option></select></div>
      <div class="full"><label class="f" for="catatan">Catatan untuk tim</label><input class="input" id="catatan" name="catatan" placeholder="mis. mobil di basement B2, akses lewat pintu samping"></div>
      <div><label class="f" for="promo">Kode promo</label><input class="input" id="promo" name="promo" placeholder="Bila ada"></div>
    </div></fieldset>
    <div class="err-msg" data-err="3">Isi dulu kolom yang bertanda *.</div>
    <div class="form-nav"><button type="button" class="btn btn-outline" data-prev>← Kembali</button><button type="submit" class="btn btn-wa">${icon.wa(18)} Kirim ke WhatsApp</button></div>
  </div>
</form>
<aside class="card shadow summary" aria-live="polite"><h3>Pesanan Anda</h3><div id="sumBody"><p class="empty">Belum ada layanan yang dipilih.</p></div>
  <div class="total"><span>Perkiraan biaya</span><span id="sumTotal">—</span></div>
  <p class="hint">Biaya akhir dikonfirmasi admin lewat WhatsApp. Pembayaran setelah pekerjaan dicek.</p>
  <p class="hint">Ada pertanyaan? <a href="${waChat}" target="_blank" rel="noopener">Chat ${esc(c.whatsappDisplay)}</a></p>
</aside>
</div></section>
<section class="section soft"><div class="container"><h2 class="center">Mobil saya masuk ukuran apa?</h2><div class="grid g4 mt24">${c.ukuran.map((s) => `<div class="card"><h3>${esc(s.nama)}</h3><p class="muted mb0">${esc(s.contoh)}</p></div>`).join('')}</div></div></section>`,
  });
}

// Halaman per wilayah (SEO lokal)
{
  const areaService = [
    ['Cuci mobil panggilan sekali datang', `mulai ${rp(H.sekaliCuci[0].harga)}`, P.sekali],
    ['Langganan Kilap', `mulai ${rp(H.langganan[0].harga)}/bulan`, P.langganan],
    ['Poles & proteksi cat', `mulai ${rp(detail.exterior.harga[0])}`, dp('exterior')],
    ['Cuci interior & jok', `mulai ${rp(detail.interior.harga[0])}`, dp('interior')],
    ['Salon mobil lengkap', `mulai ${rp(detail.complete.harga[0])}`, dp('complete')],
    ['Fogging kabin', rp(H.addOn.find((a) => a.id === 'fogging').harga), P.sekali],
  ];
  const areaLinks = (except) => `<div class="chips mt24">${areas.filter((a) => a.slug !== except).map((a) => `<a href="${u(a.slug + '/')}">${esc(a.nama)}</a>`).join('')}</div>`;
  for (const a of areas) {
    const q = [
      [`Apakah melayani seluruh ${a.nama}?`, `Ya. Kami menjangkau ${a.sekitar.join(', ')}, dan kelurahan lain di ${a.nama}. Kirim titik lokasi lewat WhatsApp untuk cek jadwal.`],
      [`Berapa harga cuci mobil panggilan di ${a.nama}?`, `Cuci sekali datang mulai ${rp(H.sekaliCuci[0].harga)}, langganan Kilap mulai ${rp(H.langganan[0].harga)} per bulan, dan salon mobil lengkap mulai ${rp(detail.complete.harga[0])}. Tidak ada ongkos datang tambahan di ${a.nama}.`],
      ['Apa yang perlu disiapkan?', 'Keran air dan ruang di sekitar mobil. Stop kontak membantu untuk vacuum. Alat dan bahan dibawa tim.'],
      ['Bisa di basement apartemen?', 'Bisa, selama pengelola gedung mengizinkan kegiatan mencuci.'],
    ];
    page({
      file: `${a.slug}/index.html`, cur: P.area,
      title: `Cuci Mobil Panggilan ${a.nama}`,
      desc: `Cuci mobil panggilan & salon mobil di ${a.nama} (${a.sekitar.slice(0, 4).join(', ')}). Mulai ${rp(H.sekaliCuci[0].harga)}, tim datang ke rumah, bayar setelah dicek.`,
      ld: [faqLd(q), { '@context': 'https://schema.org', '@type': 'Service', serviceType: 'Cuci mobil panggilan', provider: { '@type': 'AutoWash', name: c.brand, url: abs() }, areaServed: { '@type': 'City', name: a.nama }, url: abs(a.slug + '/') }],
      body: `${pageHero({ crumb: `Area / ${a.nama}`, eyebrow: 'Area layanan', h1: `Cuci Mobil Panggilan ${a.nama}`, sub: `Cuci, poles, dan salon mobil di alamat Anda di ${a.nama}. Tim membawa alat dan bahan sendiri.`, benefits: ['Tim datang ke alamat Anda', 'Bayar setelah dicek', `Cek ulang ${c.garansiJam} jam`] })}
<section class="section"><div class="container grid g2" style="align-items:start">
  <div><h2>Cuci mobil di rumah untuk warga ${esc(a.nama)}</h2><p class="lead">${esc(a.intro)}</p>
  <h3 class="mt24">Kelurahan & kawasan yang kami jangkau</h3><div class="chips" style="justify-content:flex-start">${a.sekitar.map((s) => `<span>${inl(icon.pin(14))} ${esc(s)}</span>`).join('')}</div></div>
  <div class="card shadow"><h3>Layanan & harga di ${esc(a.nama)}</h3>
  <table class="size-table area-price" style="border:0"><tbody>${areaService.map(([t, p, h]) => `<tr><td><a href="${u(h)}">${t}</a></td><td class="num">${p}</td></tr>`).join('')}</tbody></table>
  <a class="btn btn-wa btn-block mt24" href="${wa(`Halo ${c.brand}, saya di ${a.nama}. Saya mau pesan cuci/salon mobil di rumah.`)}" target="_blank" rel="noopener">${icon.wa(18)} Pesan via WhatsApp</a></div>
</div></section>
<section class="section soft"><div class="container">
  <div class="center"><h2>Yang Anda dapat dari ${esc(c.brand)}</h2></div>
  <div class="mt40">${featureGrid()}</div>
</div></section>
<section class="section"><div class="container" style="max-width:820px"><h2 class="center">Tanya jawab cuci mobil panggilan ${esc(a.nama)}</h2><div class="mt24">${faqBlock(q)}</div></div></section>
<section class="section soft"><div class="container center"><h2>Wilayah lain</h2>${areaLinks(a.slug)}</div></section>
${ctaBand(`Pesan cuci mobil panggilan di ${a.nama}`, 'Isi form pemesanan atau chat langsung, jadwal dikonfirmasi lewat WhatsApp.')}`,
    });
  }
  page({
    file: `${P.area}index.html`, cur: P.area,
    title: 'Area Layanan Cuci Mobil Panggilan Jabodetabek',
    desc: `${c.brand} melayani cuci mobil panggilan & salon mobil di ${areas.length} wilayah Jabodetabek: Jakarta, Depok, Bogor, Tangerang, Tangerang Selatan, dan Bekasi.`,
    body: `${pageHero({ crumb: 'Area Layanan', eyebrow: 'Area layanan', h1: 'Area Layanan Cuci Mobil Panggilan', sub: 'Tim kami menjangkau rumah, kantor, dan apartemen di sepuluh wilayah Jabodetabek. Pilih wilayah Anda.', cta: false })}
<section class="section"><div class="container"><div class="grid g3">${areas.map((a) => `<a class="card service-card" href="${u(a.slug + '/')}"><div class="ic">${icon.pin(28)}</div><h3>Cuci Mobil Panggilan ${esc(a.nama)}</h3><p>${esc(a.sekitar.slice(0, 5).join(', '))}, dan sekitarnya.</p><div class="more">Lihat wilayah →</div></a>`).join('')}</div></div></section>
${ctaBand()}`,
  });
}

// 404
page({
  file: '404.html', title: 'Halaman tidak ditemukan', desc: 'Halaman tidak ditemukan.',
  body: `<section class="section center"><div class="container"><h1>404</h1><p class="lead">Halaman ini tidak ada atau sudah dipindah.</p><a class="btn btn-primary" href="${u()}">Ke beranda</a> <a class="btn btn-outline" href="${u(P.harga)}">Daftar harga</a></div></section>`,
});

// Alamat lama → alamat baru
const oldToNew = {
  'cuci-berlangganan/': P.langganan, 'sekali-cuci/': P.sekali, 'salon-mobil/': dp('complete'),
  'interior/': dp('interior'), 'exterior/': dp('exterior'), 'kaca/': dp('kaca'), 'mesin/': dp('mesin'),
  'paket-banjir/': P.banjir, 'harga/': P.harga, 'faq/': P.faq, 'tentang-kami/': P.tentang, 'karir/': P.tim, 'blog/': P.artikel,
};
for (const p of posts) oldToNew[`blog/${p.slug}/`] = `${P.artikel}${p.slug}/`;
for (const [from, to] of Object.entries(oldToNew)) if (from !== to) redirect(from, to);

// ---------- aset & SEO ----------
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
for (const f of ['style.css', 'app.js', 'favicon.svg']) fs.copyFileSync(path.join(ROOT, 'assets', f), path.join(OUT, 'assets', f));
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap.map((l) => `  <url><loc>${l}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${abs('sitemap.xml')}\n`);
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
if (c.customDomain) fs.writeFileSync(path.join(OUT, 'CNAME'), c.customDomain + '\n');
console.log(`✓ ${sitemap.length} halaman dibuat di dist/ (base path: ${BASE}), ${Object.keys(oldToNew).length} alamat lama dialihkan`);
