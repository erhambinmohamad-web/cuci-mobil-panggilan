// Generator situs statis tanpa dependensi. Jalankan: node src/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { icon, heroArt } from './icons.mjs';
import { detailPages, processAll, faq, posts } from './content.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'dist');
const c = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.config.json'), 'utf8'));
const H = c.harga;

// ---------- util ----------
const site = (process.env.SITE_URL || (c.customDomain ? `https://${c.customDomain}` : c.baseUrl)).replace(/\/$/, '');
const BASE = (new URL(site + '/').pathname).replace(/\/?$/, '/'); // mis. "/cuci-mobil-panggilan/"
const u = (p = '') => BASE + p.replace(/^\//, '');
const abs = (p = '') => site + '/' + p.replace(/^\//, '');
const rp = (n) => 'Rp' + Number(n).toLocaleString('id-ID');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const wa = (text) => `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(text)}`;
const waKonsul = wa(`Halo ${c.brand}, saya ingin konsultasi soal cuci/salon mobil panggilan.`);
const minOf = (arr) => Math.min(...arr);
const detail = Object.fromEntries(H.detailing.map((d) => [d.id, d]));
const SIZES = c.ukuran.slice(0, 3);

// ---------- layout ----------
const NAV = [
  { t: 'Cuci Mobil', sub: [['Cuci Berlangganan', 'cuci-berlangganan/'], ['Satu Kali Cuci', 'sekali-cuci/']] },
  { t: 'Salon Mobil', sub: [['Complete Detailing', 'salon-mobil/'], ['Interior Detailing', 'interior/'], ['Exterior Detailing', 'exterior/'], ['Window Detailing', 'kaca/'], ['Engine Detailing', 'mesin/'], ['Ban & Velg Detailing', 'ban-velg/'], ['Paket Banjir', 'paket-banjir/']] },
  { t: 'Harga', href: 'harga/' },
  { t: 'Blog', href: 'blog/' },
  { t: 'FAQ', href: 'faq/' },
  { t: 'Tentang Kami', href: 'tentang-kami/' },
];

const logo = `<span class="logo-mark">${icon.drop(20).replace('stroke="currentColor"', 'stroke="#fff"')}</span><span>${esc(c.brand.replace(/(Go|go)$/, ''))}<b>${esc((c.brand.match(/(Go|go)$/) || [''])[0])}</b></span>`;

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
<div class="nav-cta"><a class="btn btn-primary" href="${u('pesan/')}">Pesan Sekarang</a>
<button class="burger" id="burger" aria-label="Buka menu" aria-controls="menu" aria-expanded="false"><span></span><span></span><span></span></button></div>
</div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="container">
<div class="foot-grid">
  <div><a class="logo" href="${u()}">${logo}</a>
    <p class="mt24">${esc(c.tagline)} untuk area ${esc(c.area.slice(0, 3).join(', '))} dan sekitarnya. Kami datang ke rumah, Anda cukup menunggu.</p>
    <p>${icon.clock(16).replace('<svg', '<svg style="display:inline;vertical-align:-3px"')} ${esc(c.jamOperasional)}</p>
  </div>
  <div><h4>Layanan</h4><ul>
    <li><a href="${u('cuci-berlangganan/')}">Cuci Berlangganan</a></li>
    <li><a href="${u('sekali-cuci/')}">Satu Kali Cuci</a></li>
    <li><a href="${u('salon-mobil/')}">Salon Mobil</a></li>
    <li><a href="${u('interior/')}">Interior Detailing</a></li>
    <li><a href="${u('exterior/')}">Exterior Detailing</a></li>
    <li><a href="${u('paket-banjir/')}">Paket Banjir</a></li></ul></div>
  <div><h4>Informasi</h4><ul>
    <li><a href="${u('harga/')}">Daftar Harga</a></li>
    <li><a href="${u('faq/')}">FAQ</a></li>
    <li><a href="${u('blog/')}">Blog</a></li>
    <li><a href="${u('tentang-kami/')}">Tentang Kami</a></li>
    <li><a href="${u('karir/')}">Karir</a></li></ul></div>
  <div><h4>Hubungi Kami</h4><ul>
    <li><a href="${waKonsul}" target="_blank" rel="noopener">WhatsApp ${esc(c.whatsappDisplay)}</a></li>
    <li><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></li>
    ${c.instagram ? `<li><a href="https://instagram.com/${esc(c.instagram)}" target="_blank" rel="noopener">Instagram @${esc(c.instagram)}</a></li>` : ''}
  </ul></div>
</div>
<div class="copy"><span>© ${new Date().getFullYear()} ${esc(c.brand)}. Hak cipta dilindungi.</span><span>Area layanan: ${esc(c.area.join(' · '))}</span></div>
</div></footer>
<a class="wa-float" href="${waKonsul}" target="_blank" rel="noopener" aria-label="Konsultasi gratis via WhatsApp">${icon.wa(22)}<span>Konsultasi gratis</span></a>`;
}

const ldBusiness = {
  '@context': 'https://schema.org',
  '@type': 'AutoWash',
  name: c.brand,
  description: `${c.tagline} — cuci mobil & detailing di rumah Anda.`,
  url: abs(),
  telephone: '+' + c.whatsapp,
  email: c.email,
  areaServed: c.area.map((a) => ({ '@type': 'City', name: a })),
  priceRange: `${rp(H.sekaliCuci[0].harga)} – ${rp(detail.complete.harga[2])}`,
  openingHours: 'Mo-Su 06:00-18:00',
};

function page({ file, cur = '', title, desc, body, ld = [], extraHead = '', script = '' }) {
  const canonical = abs(file.replace(/index\.html$/, ''));
  const fullTitle = title.includes(c.brand) ? title : `${title} | ${c.brand}`;
  const html = `<!doctype html>
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
</body></html>`;
  const out = path.join(OUT, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  sitemap.push(canonical);
}
const sitemap = [];

// ---------- blok komponen ----------
const pageHero = ({ crumb, eyebrow, h1, sub, benefits = [], cta = true, ctaHref = 'pesan/', ctaText = 'Pesan Sekarang' }) => `
<section class="page-hero"><div class="container">
  <div class="crumbs"><a href="${u()}">Beranda</a> / ${esc(crumb)}</div>
  ${eyebrow ? `<span class="eyebrow">${esc(eyebrow)}</span>` : ''}
  <h1>${esc(h1)}</h1>
  <p class="lead">${esc(sub)}</p>
  ${cta ? `<div class="hero-actions"><a class="btn btn-primary" href="${u(ctaHref)}">${ctaText}</a><a class="btn btn-outline" href="${waKonsul}" target="_blank" rel="noopener">Tanya via WhatsApp</a></div>` : ''}
  ${benefits.length ? `<div class="benefits mt24">${benefits.map((b) => `<span>${esc(b)}</span>`).join('')}</div>` : ''}
</div></section>`;

const ctaBand = (h = 'Siap bikin mobil kinclong tanpa keluar rumah?', p = 'Pilih layanan, atur jadwal, tim kami datang ke lokasi Anda.') => `
<section class="section"><div class="container"><div class="cta-band">
  <div><h2>${esc(h)}</h2><p>${esc(p)}</p></div>
  <div class="hero-actions"><a class="btn btn-primary" href="${u('pesan/')}">Pesan Sekarang</a><a class="btn btn-outline" href="${waKonsul}" target="_blank" rel="noopener">Konsultasi Gratis</a></div>
</div></div></section>`;

const langgananCards = (btn = true) => `<div class="grid g5">${H.langganan
  .map((p) => `<div class="card price-card${p.label ? ' featured' : ''}">
  ${p.label ? `<span class="tag">${esc(p.label)}</span>` : ''}
  <h3>${esc(p.nama)}</h3><div class="freq">${esc(p.frekuensi)}</div>
  <ul><li>${esc(p.sampo)}</li><li>Diskon fogging ${p.diskonFogging}%</li><li>Jadwal tetap, tanpa pesan ulang</li></ul>
  <div class="muted" style="font-size:.85rem">Harga per bulan</div>
  <div class="price">${rp(p.harga)}</div>
  ${btn ? `<a class="btn btn-primary btn-sm" href="${u('pesan/?layanan=langganan&paket=' + p.id)}">Pilih ${esc(p.nama)}</a>` : ''}
</div>`).join('')}</div>`;

const sekaliCards = (btn = true) => `<div class="grid g4">${H.sekaliCuci
  .map((p) => `<div class="card">
  <h3>${p.ikon} ${esc(p.nama)}</h3>
  <p class="muted" style="font-size:.93rem">${esc(p.deskripsi)}</p>
  <ul class="check-list">${p.isi.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
  <div class="meta"><div class="price">${rp(p.harga)}</div><div class="dur">± ${esc(p.durasi)}</div></div>
  ${btn ? `<a class="btn btn-outline btn-sm mt24" href="${u('pesan/?layanan=sekali&paket=' + p.id)}">Pesan ${esc(p.nama)}</a>` : ''}
</div>`).join('')}</div>`;

const addOnCards = () => `<div class="grid g5">${H.addOn
  .map((a) => `<div class="card"><h3 style="font-size:1rem">${esc(a.nama)}</h3><p class="muted" style="font-size:.9rem;flex:1">${esc(a.deskripsi)}</p>
  <div class="meta"><div class="price" style="font-size:1.1rem">${rp(a.harga)}</div><div class="dur">± ${esc(a.durasi)}</div></div></div>`)
  .join('')}</div>`;

const sizeTable = (d) => `<div class="table-wrap"><table class="size-table">
<thead><tr><th>Ukuran mobil</th><th>Contoh</th><th>Estimasi</th><th>Harga</th><th></th></tr></thead>
<tbody>${SIZES.map((s, i) => `<tr><td><b>${esc(s.nama)} Car</b></td><td class="muted">${esc(s.contoh)}</td><td>${esc(d.durasi[i])}</td><td class="num">${rp(d.harga[i])}</td>
<td><a class="btn btn-primary btn-sm" href="${u(`pesan/?layanan=detailing&paket=${d.id}&ukuran=${s.id}`)}">Pesan</a></td></tr>`).join('')}
<tr><td><b>XL / Luxury</b></td><td class="muted">Mobil mewah & ukuran ekstra</td><td>—</td><td class="num">Konsultasi</td><td><a class="btn btn-outline btn-sm" href="${waKonsul}" target="_blank" rel="noopener">Tanya</a></td></tr>
</tbody></table></div>`;

const banjirTable = () => `<div class="table-wrap"><table class="size-table">
<thead><tr><th>Ukuran mobil</th><th>Estimasi</th>${H.banjir.level.map((l) => `<th>${esc(l)}</th>`).join('')}</tr></thead>
<tbody>${SIZES.map((s, i) => `<tr><td><b>${esc(s.nama)} Car</b><br><small class="muted">${esc(s.contoh)}</small></td><td>${esc(H.banjir.durasi[i])}</td>${H.banjir.harga[i].map((h) => `<td class="num">${rp(h)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

const faqBlock = (items) => items.map(([q, a]) => `<details class="faq"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
const faqLd = (items) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });

const features = [
  ['clock', 'Tanpa antre', 'Tidak perlu ke car wash dan menunggu berjam-jam. Kami yang datang.'],
  ['users', 'Tim terlatih & responsif', 'Petugas berpengalaman, konfirmasi jadwal cepat lewat WhatsApp.'],
  ['calendar', 'Jadwal fleksibel', `Pilih hari dan jam sendiri. Buka ${c.jamOperasional}.`],
  ['flask', 'Produk bermerek', `Memakai ${c.produk} — bukan cairan oplosan.`],
  ['shield', 'Mobil aman di rumah', 'Kendaraan tidak perlu dibawa ke mana-mana, tetap dalam pengawasan Anda.'],
  ['refresh', `Garansi cuci ulang ${c.garansiJam} jam`, 'Kurang puas? Kami cuci ulang tanpa biaya tambahan.'],
];
const featureGrid = (list = features) => `<div class="grid g3">${list
  .map(([ic, t, d]) => `<div class="feature"><div class="ic">${icon[ic]()}</div><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></div>`)
  .join('')}</div>`;

const howItWorks = `<div class="grid g4">${[
  ['Pilih layanan', 'Cuci reguler, berlangganan, atau salon mobil.'],
  ['Atur jadwal', 'Tentukan tanggal, jam, dan alamat lokasi.'],
  ['Kami datang', 'Tim tiba dengan peralatan & produk lengkap.'],
  ['Bayar setelah beres', 'Cek hasilnya dulu, baru bayar.'],
].map(([t, d], i) => `<div class="step"><div class="num">${i + 1}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>`;

const testimoniBlock = () => (c.testimoni && c.testimoni.length ? `
<section class="section soft"><div class="container">
  <div class="center"><span class="eyebrow">Testimoni</span><h2>Kata pelanggan kami</h2></div>
  <div class="grid g3 mt24">${c.testimoni.map((t) => `<div class="card testi"><div class="stars">★★★★★</div><p>“${esc(t.isi)}”</p><div class="who">${esc(t.nama)}<small>${esc(t.keterangan || '')}</small></div></div>`).join('')}</div>
</div></section>` : '');

const areaBlock = `<section class="section"><div class="container center">
  <span class="eyebrow">Area layanan</span><h2>Kami melayani ${esc(c.area.length)} wilayah</h2>
  <p class="lead">Tim kami siap datang ke rumah, kantor, atau apartemen Anda di:</p>
  <div class="chips mt24">${c.area.map((a) => `<span>${icon.pin(14).replace('<svg', '<svg style="display:inline;vertical-align:-2px"')} ${esc(a)}</span>`).join('')}</div>
</div></section>`;

// ---------- HALAMAN ----------

// Beranda
const services = [
  ['drop', 'Cuci Mobil', 'Cuci reguler atau berlangganan mingguan di rumah Anda.', `mulai ${rp(H.sekaliCuci[0].harga)}`, 'cuci-berlangganan/'],
  ['seat', 'Salon Mobil Interior', 'Jok, karpet, plafon & dashboard bersih, wangi, anti-bakteri.', `mulai ${rp(detail.interior.harga[0])}`, 'interior/'],
  ['sparkle', 'Salon Mobil Eksterior', 'Hilangkan jamur & water spot, poles, dan lapisi sealant.', `mulai ${rp(detail.exterior.harga[0])}`, 'exterior/'],
  ['window', 'Salon Mobil Kaca', 'Kaca bening bebas jamur untuk berkendara lebih aman.', `mulai ${rp(detail.kaca.harga[0])}`, 'kaca/'],
  ['engine', 'Salon Mobil Mesin', 'Ruang mesin bersih dari debu dan kerak oli.', `mulai ${rp(detail.mesin.harga[0])}`, 'mesin/'],
  ['tire', 'Salon Ban & Velg', 'Velg mengkilap, ban hitam pekat.', `mulai ${rp(detail.ban.harga[0])}`, 'ban-velg/'],
  ['car', 'Complete Detailing', 'Paket lengkap 5 layanan detailing, lebih hemat.', `mulai ${rp(detail.complete.harga[0])}`, 'salon-mobil/'],
  ['wave', 'Paket Banjir', 'Pembersihan kabin menyeluruh setelah mobil terendam.', `mulai ${rp(H.banjir.harga[0][0])}`, 'paket-banjir/'],
];

page({
  file: 'index.html',
  title: `Cuci & Salon Mobil Panggilan ${c.area.includes('Bekasi') ? 'Jabodetabek' : ''} – Harga Hemat, Bergaransi | ${c.brand}`.replace('  ', ' '),
  desc: `Jasa cuci mobil & salon mobil panggilan ke rumah. Cuci berlangganan mulai ${rp(H.langganan[0].harga)}/bulan, sekali cuci ${rp(H.sekaliCuci[0].harga)}. Garansi cuci ulang ${c.garansiJam} jam, bayar setelah selesai.`,
  body: `
<section class="hero"><div class="container hero-grid">
  <div>
    <span class="badge">${icon.shield(16)} Bayar setelah selesai · Garansi cuci ulang</span>
    <h1>Cuci & Salon Mobil Panggilan, Datang ke Rumah Anda</h1>
    <p class="lead">Tidak perlu antre di car wash. Tim ${esc(c.brand)} datang membawa peralatan & produk lengkap — Anda cukup menyiapkan air dan menunggu mobil kinclong.</p>
    <ul class="steps-inline"><li>Pesan</li><li>Kami datang</li><li>Mobil bersih</li></ul>
    <div class="hero-actions"><a class="btn btn-primary" href="${u('pesan/')}">Atur Jadwal Sekarang</a><a class="btn btn-outline" href="${u('harga/')}">Lihat Harga</a></div>
  </div>
  <div class="hero-art">${heroArt}<div class="hero-price">Cuci di rumah mulai<b>${rp(H.sekaliCuci[0].harga)}</b></div></div>
</div></section>

<section class="section"><div class="container">
  <div class="center"><span class="eyebrow">Kenapa ${esc(c.brand)}</span><h2>Punya car wash pribadi di rumah</h2>
  <p class="lead">Layanan berlangganan membuat mobil Anda selalu bersih tanpa perlu memikirkan jadwal cuci lagi.</p></div>
  <div class="mt40">${featureGrid()}</div>
</div></section>

<section class="section soft"><div class="container">
  <div class="center"><span class="eyebrow">Layanan</span><h2>Pilihan paket lengkap</h2><p class="lead">Dari cuci rutin sampai salon mobil menyeluruh, semua dikerjakan di lokasi Anda.</p></div>
  <div class="grid g4 mt40">${services.map(([ic, t, d, f, h]) => `<a class="card service-card" href="${u(h)}"><div class="ic">${icon[ic](28)}</div><h3>${t}</h3><p>${d}</p><div class="from">${f.replace(/(Rp[\d.]+)/, '<b>$1</b>')}</div><div class="more">Lihat detail →</div></a>`).join('')}</div>
</div></section>

<section class="section"><div class="container">
  <div class="center"><span class="eyebrow">Cuci berlangganan</span><h2>Paket bulanan, jadwal tetap</h2><p class="lead">Pilih 1 sampai 6 kali cuci per minggu. Tim datang otomatis sesuai jadwal.</p></div>
  <div class="mt40">${langgananCards()}</div>
  <p class="center mt24"><a href="${u('harga/')}">Lihat semua harga →</a></p>
</div></section>

<section class="section soft"><div class="container">
  <div class="center"><span class="eyebrow">Cara pesan</span><h2>4 langkah mudah</h2></div>
  <div class="mt40">${howItWorks}</div>
</div></section>

${testimoniBlock()}
${areaBlock}
${ctaBand()}`,
});

// Cuci berlangganan
page({
  file: 'cuci-berlangganan/index.html', cur: 'cuci-berlangganan/',
  title: 'Cuci Mobil Berlangganan di Rumah',
  desc: `Cuci mobil berlangganan di rumah mulai ${rp(H.langganan[0].harga)}/bulan. Jadwal tetap 1–6x per minggu, tim datang otomatis, bebas berhenti kapan saja.`,
  body: `${pageHero({ crumb: 'Cuci Berlangganan', eyebrow: 'Cuci berlangganan', h1: 'Cuci Mobil Berlangganan di Rumah', sub: 'Sekarang Anda bisa punya car wash pribadi. Pilih paket, atur jadwal, dan mobil selalu bersih tanpa repot memesan ulang.', benefits: ['Mobil selalu bersih', 'Aman di rumah sendiri', `Garansi cuci ulang ${c.garansiJam} jam`] })}
<section class="section"><div class="container">
  <div class="center"><h2>Pilih jadwal sesuai kebutuhan</h2><p class="lead">Tentukan jumlah cuci per minggu, mulai dari 1 hingga 6 kali. Hari dan jam bisa Anda pilih sendiri.</p></div>
  <div class="mt40">${langgananCards()}</div>
  <div class="note">Semua paket termasuk cuci bodi, lap & bersihkan interior, vacuum kabin, dan semir ban. Satu paket bisa dipakai untuk lebih dari satu mobil di alamat yang sama.</div>
</div></section>
<section class="section soft"><div class="container">
  <div class="grid g2" style="align-items:center">
    <div><span class="eyebrow">Masih ragu?</span><h2>Coba satu kali cuci dulu</h2><p class="lead">Buktikan hasilnya lewat layanan satu kali datang. Bebas pilih cuci reguler atau paket detailing.</p>
    <a class="btn btn-primary" href="${u('sekali-cuci/')}">Lihat paket sekali cuci</a></div>
    <div class="card shadow center"><div class="muted">Harga mulai</div><div class="price" style="font-size:2.2rem">${rp(H.sekaliCuci[0].harga)}</div><div class="muted">per kedatangan · ± ${esc(H.sekaliCuci[0].durasi)}</div></div>
  </div>
</div></section>
<section class="section"><div class="container"><h2 class="center">Pertanyaan seputar berlangganan</h2><div class="mt24" style="max-width:820px;margin-left:auto;margin-right:auto">${faqBlock(faq(c)[2].items)}</div></div></section>
${ctaBand('Mulai berlangganan hari ini', 'Tanpa kontrak panjang, tanpa penalti berhenti.')}`,
  ld: [faqLd(faq(c)[2].items)],
});

// Sekali cuci
page({
  file: 'sekali-cuci/index.html', cur: 'sekali-cuci/',
  title: 'Cuci Mobil Panggilan Sekali Datang',
  desc: `Cuci mobil panggilan satu kali mulai ${rp(H.sekaliCuci[0].harga)}. Paket Basic, Standard, Professional, Elite + add-on spot remover, claying, wax, fogging.`,
  body: `${pageHero({ crumb: 'Satu Kali Cuci', eyebrow: 'Satu kali cuci', h1: 'Cuci Mobil Panggilan Sekali Datang', sub: 'Buktikan sendiri kualitas kami. Pesan sekali, kami datang, mobil bersih — tanpa komitmen berlangganan.', benefits: ['Mudah & cepat', 'Bersih maksimal', 'Bayar setelah selesai'] })}
<section class="section"><div class="container">
  <div class="center"><h2>Paket satu kali cuci</h2><p class="lead">Pilih paket sesuai kondisi mobil Anda. Semakin tinggi paket, semakin dalam pembersihannya.</p></div>
  <div class="mt40">${sekaliCards()}</div>
</div></section>
<section class="section soft"><div class="container">
  <div class="center"><h2>Tambahan (add-on)</h2><p class="lead">Tambahkan ke paket mana pun saat memesan.</p></div>
  <div class="mt40">${addOnCards()}</div>
</div></section>
<section class="section"><div class="container">
  <div class="grid g2" style="align-items:center">
    <div><span class="eyebrow">Lebih hemat</span><h2>Rutin cuci? Pilih berlangganan</h2><p class="lead">Atur jadwal cuci mingguan sendiri dan hemat dibanding pesan satuan.</p><a class="btn btn-primary" href="${u('cuci-berlangganan/')}">Lihat paket berlangganan</a></div>
    <div class="card shadow center"><div class="muted">Harga mulai</div><div class="price" style="font-size:2.2rem">${rp(H.langganan[0].harga)}<small>/bulan</small></div><div class="muted">${esc(H.langganan[0].frekuensi)}</div></div>
  </div>
</div></section>
${ctaBand()}`,
});

// Halaman detailing (interior, exterior, kaca, mesin, ban)
const detailSlugs = { interior: 'interior', exterior: 'exterior', kaca: 'kaca', mesin: 'mesin', ban: 'ban-velg' };
for (const [id, slug] of Object.entries(detailSlugs)) {
  const d = detail[id];
  const p = detailPages[id];
  page({
    file: `${slug}/index.html`, cur: `${slug}/`,
    title: p.title,
    desc: `${p.meta} Mulai ${rp(d.harga[0])}.`,
    body: `${pageHero({ crumb: p.h1, eyebrow: 'Salon mobil', h1: p.h1, sub: p.sub, benefits: p.benefits, ctaHref: `pesan/?layanan=detailing&paket=${id}` })}
<section class="section"><div class="container grid g2" style="align-items:start">
  <div><h2>Kenapa perlu ${esc(p.h1.toLowerCase())}?</h2><p class="lead">${esc(p.intro)}</p>
    <div class="note"><b>Cakupan:</b> ${esc(p.scope)}</div></div>
  <div class="card shadow process"><h3><span class="feature"><span class="ic">${icon[p.icon]()}</span></span> Langkah pengerjaan</h3><ol>${p.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
  <p class="muted mt24 mb0" style="font-size:.93rem">Produk: ${esc(c.produk)} dan peralatan standar detailer profesional.</p></div>
</div></section>
<section class="section soft"><div class="container">
  <div class="center"><h2>Harga ${esc(p.h1)}</h2><p class="lead">Harga sesuai ukuran mobil. Sudah termasuk tenaga, produk, dan transport dalam area layanan.</p></div>
  <div class="mt40">${sizeTable(d)}</div>
  ${c.bonusCuciDetailing && (id === 'interior' || id === 'exterior') ? `<div class="bonus"><div class="ic">🎁</div><div><h3>Bonus 1x cuci GRATIS</h3><p>Untuk setiap pemesanan ${esc(p.h1)}.</p></div></div>` : ''}
  <div class="cta-band mt40" style="background:linear-gradient(135deg,#10242b,#0b7285)"><div><h2>Lebih hemat dengan Complete Detailing</h2><p>Interior, exterior, kaca, mesin, serta ban & velg sekaligus — mulai ${rp(detail.complete.harga[0])}.</p></div><a class="btn btn-primary" href="${u('salon-mobil/')}">Lihat paket lengkap</a></div>
</div></section>
<section class="section"><div class="container" style="max-width:820px"><h2 class="center">Pertanyaan umum</h2><div class="mt24">${faqBlock(faq(c)[3].items.slice(0, 2).concat(faq(c)[0].items.slice(0, 2)))}</div></div></section>
${ctaBand()}`,
  });
}

// Salon mobil (complete detailing)
{
  const d = detail.complete, p = detailPages.complete;
  const satuan = SIZES.map((_, i) => ['interior', 'exterior', 'kaca', 'mesin', 'ban'].reduce((a, k) => a + detail[k].harga[i], 0));
  page({
    file: 'salon-mobil/index.html', cur: 'salon-mobil/',
    title: 'Salon Mobil Panggilan – Complete Detailing di Rumah',
    desc: `${p.meta} Mulai ${rp(d.harga[0])}.`,
    body: `${pageHero({ crumb: 'Salon Mobil', eyebrow: 'Complete detailing', h1: p.h1, sub: p.sub, benefits: p.benefits, ctaHref: 'pesan/?layanan=detailing&paket=complete' })}
<section class="section"><div class="container">
  <div class="grid g2" style="align-items:center"><div><h2>Kapan mobil perlu salon?</h2><p class="lead">${esc(p.intro)}</p><p class="muted">Pengerjaan dibagi per bagian: exterior untuk menyamarkan baret dan mengembalikan kilap cat, interior untuk mencerahkan jok yang kusam, serta kaca dan mesin untuk noda yang tidak luntur dengan sampo biasa.</p></div>
  <div class="card shadow"><h3>Isi paket</h3><ul class="check-list">${['Interior Detailing', 'Exterior Detailing', 'Window Detailing', 'Engine Detailing', 'Ban & Velg Detailing'].map((x) => `<li>${x}</li>`).join('')}</ul><div class="note mt0">Tidak termasuk fogging, bongkar jok, dan karpet dasar.</div></div></div>
</div></section>
<section class="section soft"><div class="container">
  <h2 class="center">Langkah pengerjaan</h2>
  <div class="grid g3 mt40">${processAll.map((g) => `<div class="card process"><h3><span class="feature"><span class="ic">${icon[g.ic]()}</span></span>${esc(g.t)}</h3><ol>${g.li.map((x) => `<li>${esc(x)}</li>`).join('')}</ol></div>`).join('')}</div>
  <div class="note">Kami hanya memakai produk standar detailer profesional seperti ${esc(c.produk)}, tanpa cairan oplosan yang berisiko merusak cat dan material kabin.</div>
</div></section>
<section class="section"><div class="container">
  <div class="center"><h2>Harga Salon Mobil</h2><p class="lead">Hemat hingga ${rp(satuan[0] - d.harga[0])} dibanding memesan kelima layanan secara terpisah.</p></div>
  <div class="mt40">${sizeTable(d)}</div>
</div></section>
<section class="section soft"><div class="container" style="max-width:820px"><h2 class="center">FAQ Salon Mobil</h2><div class="mt24">${faqBlock(faq(c)[3].items.concat(faq(c)[0].items.slice(0, 2)))}</div></div></section>
${ctaBand('Bikin mobil seperti baru lagi', `Complete detailing mulai ${rp(d.harga[0])}, dikerjakan di rumah Anda.`)}`,
    ld: [faqLd(faq(c)[3].items)],
  });
}

// Paket banjir
page({
  file: 'paket-banjir/index.html', cur: 'paket-banjir/',
  title: 'Paket Cuci Mobil Terendam Banjir',
  desc: `Jasa pembersihan mobil terendam banjir di rumah: lumpur & bau apek hilang. Harga sesuai ketinggian air, mulai ${rp(H.banjir.harga[0][0])}.`,
  body: `${pageHero({ crumb: 'Paket Banjir', eyebrow: 'Paket banjir', h1: 'Mobil Bersih Lagi Setelah Terendam Banjir', sub: 'Jangan biarkan lumpur dan bau apek tertinggal di kabin. Kami datang, bongkar, cuci, dan keringkan menyeluruh.', benefits: ['Sisa lumpur hilang', 'Bau apek lenyap', 'Kabin higienis kembali'], ctaHref: 'pesan/?layanan=banjir' })}
<section class="section"><div class="container grid g2" style="align-items:start">
  <div><h2>Yang kami kerjakan</h2><ul class="check-list">
    <li>Pembersihan lumpur dari lantai kabin, karpet, dan sela jok</li>
    <li>Pencucian karpet dan jok dengan extractor</li>
    <li>Disinfeksi kabin untuk bakteri dan jamur</li>
    <li>Pengeringan menyeluruh agar bau tidak menetap</li>
    <li>Cuci bodi luar dan kolong yang terkena lumpur</li></ul>
    <div class="note">Pengerjaan membutuhkan listrik minimal 2.000 watt. Pemeriksaan mesin & kelistrikan tetap perlu dilakukan di bengkel.</div></div>
  <div class="card shadow"><h3>Sebelum kami datang</h3><ol class="muted" style="padding-left:20px"><li>Jangan menyalakan mesin.</li><li>Lepas terminal negatif aki.</li><li>Foto batas lumpur di kabin untuk menentukan paket.</li><li>Kirim foto ke WhatsApp kami untuk estimasi.</li></ol>
  <a class="btn btn-wa mt24" href="${wa(`Halo ${c.brand}, mobil saya terendam banjir. Saya ingin estimasi paket banjir.`)}" target="_blank" rel="noopener">${icon.wa(18)} Kirim foto via WhatsApp</a></div>
</div></section>
<section class="section soft"><div class="container">
  <div class="center"><h2>Harga Paket Banjir</h2><p class="lead">Ditentukan oleh ukuran mobil dan setinggi apa air masuk ke kabin.</p></div>
  <div class="mt40">${banjirTable()}</div>
  ${c.bonusCuciDetailing ? `<div class="bonus"><div class="ic">🎁</div><div><h3>Bonus 1x cuci GRATIS</h3><p>Untuk setiap pemesanan paket banjir.</p></div></div>` : ''}
  <p class="center mt24"><a href="${u('blog/panduan-membersihkan-mobil-setelah-banjir/')}">Baca: yang harus dilakukan sebelum mobil dinyalakan →</a></p>
</div></section>
${ctaBand('Mobil terendam? Hubungi kami sekarang', 'Semakin cepat ditangani, semakin kecil risiko bau dan jamur menetap.')}`,
});

// Harga
{
  const tabs = [
    ['cuci', 'Cuci Mobil'], ['interior', 'Interior'], ['exterior', 'Exterior'], ['kaca', 'Kaca'], ['mesin', 'Mesin'], ['ban', 'Ban & Velg'], ['complete', 'Complete Detailing'], ['banjir', 'Paket Banjir'],
  ];
  const detailPanel = (id) => `<div class="tab-panel" id="${id}"><h2>${esc(detail[id].nama)}</h2>${sizeTable(detail[id])}</div>`;
  page({
    file: 'harga/index.html', cur: 'harga/',
    title: 'Daftar Harga Cuci & Salon Mobil Panggilan',
    desc: `Daftar harga lengkap ${c.brand}: cuci berlangganan mulai ${rp(H.langganan[0].harga)}/bulan, sekali cuci ${rp(H.sekaliCuci[0].harga)}, detailing, dan paket banjir.`,
    body: `${pageHero({ crumb: 'Harga', eyebrow: 'Harga transparan', h1: `Daftar Harga ${c.brand}`, sub: 'Semua harga sudah termasuk tenaga, produk, peralatan, dan transport dalam area layanan. Bayar setelah pekerjaan selesai.', cta: false })}
<section class="section"><div class="container">
  <nav class="tabs" aria-label="Kategori harga">${tabs.map(([id, t], i) => `<a href="#${id}"${i === 0 ? ' class="active"' : ''}>${t}</a>`).join('')}</nav>
  <div class="tab-panel" id="cuci">
    <h2>Paket Cuci Berlangganan</h2>${langgananCards()}
    <h2 class="mt40">Paket Satu Kali Cuci</h2>${sekaliCards()}
    <h3 class="mt40">Add-on</h3>${addOnCards()}
  </div>
  ${['interior', 'exterior', 'kaca', 'mesin', 'ban'].map(detailPanel).join('')}
  <div class="tab-panel" id="complete"><h2>Complete Detailing</h2><p class="muted">Paket lengkap Interior, Exterior, Kaca, Mesin, serta Ban & Velg Detailing. Tidak termasuk fogging, bongkar jok & karpet dasar.</p>${sizeTable(detail.complete)}</div>
  <div class="tab-panel" id="banjir"><h2>Paket Banjir</h2>${banjirTable()}</div>
  <div class="note">Ukuran mobil: <b>Small</b> — ${esc(c.ukuran[0].contoh)}. <b>Medium</b> — ${esc(c.ukuran[1].contoh)}. <b>Large</b> — ${esc(c.ukuran[2].contoh)}. <b>XL/Luxury</b> — konsultasi via WhatsApp.</div>
</div></section>
${ctaBand()}`,
  });
}

// FAQ
{
  const groups = faq(c);
  page({
    file: 'faq/index.html', cur: 'faq/',
    title: 'FAQ – Pertanyaan Seputar Cuci Mobil Panggilan',
    desc: `Jawaban seputar pembayaran, jam kerja, garansi, berlangganan, dan detailing di ${c.brand}.`,
    body: `${pageHero({ crumb: 'FAQ', eyebrow: 'FAQ', h1: 'Pertanyaan yang Sering Diajukan', sub: 'Belum menemukan jawabannya? Chat kami via WhatsApp, kami balas secepatnya.', cta: false })}
<section class="section"><div class="container" style="max-width:860px">${groups.map((g) => `<div class="faq-group"><h2>${esc(g.grup)}</h2>${faqBlock(g.items)}</div>`).join('')}</div></section>
${ctaBand('Masih ada pertanyaan?', 'Konsultasi gratis via WhatsApp.')}`,
    ld: [faqLd(groups.flatMap((g) => g.items))],
  });
}

// Tentang kami
page({
  file: 'tentang-kami/index.html', cur: 'tentang-kami/',
  title: `Tentang ${c.brand}`,
  desc: `${c.brand} adalah layanan cuci & salon mobil panggilan di ${c.area.slice(0, 3).join(', ')} dan sekitarnya.`,
  body: `${pageHero({ crumb: 'Tentang Kami', eyebrow: 'Tentang kami', h1: `Tentang ${c.brand}`, sub: 'Car wash profesional yang datang ke rumah Anda.', cta: false })}
<section class="section"><div class="container article">
  <p>${esc(c.brand)} adalah layanan cuci mobil dan salon mobil panggilan yang melayani ${esc(c.area.join(', '))}. Kami menyediakan cuci reguler, cuci berlangganan, detailing interior dan exterior, perawatan kaca, mesin, ban & velg, hingga pembersihan mobil pascabanjir — semuanya dikerjakan di lokasi Anda.</p>
  <h2>Kenapa kami hadir</h2>
  <p>Waktu adalah hal yang paling berharga. Antre di car wash di akhir pekan, atau meninggalkan mobil di salon seharian, bukan pilihan yang nyaman untuk banyak orang. Karena itu kami membawa car wash ke rumah Anda: tim datang sesuai jadwal, membawa peralatan dan produk sendiri, lalu mengerjakan semuanya sementara Anda tetap beraktivitas.</p>
  <h2>Komitmen kami</h2>
  <ul>
    <li><b>Harga transparan</b> — tertulis jelas per paket dan ukuran mobil, tanpa biaya tersembunyi.</li>
    <li><b>Produk bermerek</b> — ${esc(c.produk)}, bukan cairan oplosan.</li>
    <li><b>Bayar setelah puas</b> — cek hasilnya dulu, baru bayar.</li>
    <li><b>Garansi cuci ulang ${c.garansiJam} jam</b> bila hasil kurang memuaskan.</li>
  </ul>
  <h2>Wilayah kerja</h2>
  <p>Saat ini kami melayani ${esc(c.area.join(', '))}. Di luar area tersebut? Hubungi kami — kami usahakan menjangkau lokasi Anda.</p>
</div></section>
${ctaBand()}`,
});

// Karir
page({
  file: 'karir/index.html', cur: 'karir/',
  title: 'Karir – Bergabung Bersama Kami',
  desc: `Lowongan kerja ${c.brand}: car washer, car detailer, dan mitra cuci mobil panggilan.`,
  body: `${pageHero({ crumb: 'Karir', eyebrow: 'Karir', h1: 'Tumbuh Bersama Kami', sub: 'Kami mencari orang-orang yang teliti, jujur, dan suka mobil bersih.', cta: false })}
<section class="section"><div class="container"><div class="grid g3">${[
    ['Car Washer', 'Mencuci mobil pelanggan sesuai SOP, menjaga peralatan, dan tepat waktu.'],
    ['Car Detailer', 'Berpengalaman poles, paint correction, dan interior detailing.'],
    ['Mitra Cuci (freelance)', 'Punya peralatan sendiri? Bergabung sebagai mitra dan dapatkan order di area Anda.'],
  ].map(([t, d]) => `<div class="card"><h3>${t}</h3><p class="muted" style="flex:1">${d}</p><a class="btn btn-outline btn-sm" href="${wa(`Halo ${c.brand}, saya ingin melamar posisi ${t}.`)}" target="_blank" rel="noopener">Lamar via WhatsApp</a></div>`).join('')}</div></div></section>`,
});

// Blog
page({
  file: 'blog/index.html', cur: 'blog/',
  title: 'Blog – Tips Cuci & Perawatan Mobil',
  desc: 'Tips cuci mobil di rumah, perawatan cat, detailing, dan panduan setelah banjir.',
  body: `${pageHero({ crumb: 'Blog', eyebrow: 'Blog', h1: 'Tips & Panduan Perawatan Mobil', sub: 'Artikel seputar cuci mobil di rumah, detailing, dan cara menjaga mobil tetap kinclong.', cta: false })}
<section class="section"><div class="container"><div class="grid g3">${posts.map((p) => `<article class="card post-card"><div class="date">${new Date(p.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div><h3><a href="${u(`blog/${p.slug}/`)}">${esc(p.title)}</a></h3><p>${esc(p.excerpt)}</p><a class="more" href="${u(`blog/${p.slug}/`)}">Baca selengkapnya →</a></article>`).join('')}</div></div></section>`,
});
for (const p of posts) {
  page({
    file: `blog/${p.slug}/index.html`, cur: 'blog/',
    title: p.title, desc: p.excerpt,
    ld: [{ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, datePublished: p.date, author: { '@type': 'Organization', name: c.brand }, publisher: { '@type': 'Organization', name: c.brand } }],
    body: `<section class="page-hero"><div class="container article"><div class="crumbs"><a href="${u()}">Beranda</a> / <a href="${u('blog/')}">Blog</a></div><h1 style="font-size:clamp(1.7rem,4vw,2.4rem)">${esc(p.title)}</h1><p class="muted">${new Date(p.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} · ${esc(c.brand)}</p></div></section>
<section class="section" style="padding-top:32px"><div class="container article">${p.body}</div></section>${ctaBand()}`,
  });
}

// Pesan (form multi-step → WhatsApp)
{
  const pub = { brand: c.brand, whatsapp: c.whatsapp, area: c.area, jam: c.jamPilihan, harga: H, ukuran: c.ukuran, bonus: c.bonusCuciDetailing };
  page({
    file: 'pesan/index.html', cur: 'pesan/',
    title: 'Pesan Cuci & Salon Mobil Panggilan',
    desc: `Pesan layanan ${c.brand} online: pilih paket, ukuran mobil, jadwal, dan kirim pesanan langsung via WhatsApp.`,
    script: `<script>window.SITE=${JSON.stringify(pub)};</script>`,
    body: `<section class="page-hero" style="padding-bottom:24px"><div class="container"><div class="crumbs"><a href="${u()}">Beranda</a> / Pesan</div><h1>Pesan Layanan ${esc(c.brand)}</h1><p class="lead mb0">Isi 3 langkah singkat. Pesanan terkirim ke WhatsApp kami dan akan dikonfirmasi secepatnya.</p></div></section>
<section class="section" style="padding-top:24px"><div class="container booking">
<form id="bookForm" class="card" novalidate>
  <ol class="stepper"><li class="on" data-s="1">1. Layanan</li><li data-s="2">2. Paket</li><li data-s="3">3. Jadwal</li></ol>

  <div class="panel on" data-p="1">
    <fieldset class="fieldset"><legend>Mau pilih layanan apa?</legend>
    <div class="opt-grid">
      <label class="opt"><input type="radio" name="layanan" value="langganan"><span class="box"><b>Cuci mobil berlangganan</b><small>1–6x cuci per minggu, jadwal tetap</small><span class="p">mulai ${rp(H.langganan[0].harga)}/bln</span></span></label>
      <label class="opt"><input type="radio" name="layanan" value="sekali"><span class="box"><b>Satu kali cuci</b><small>Basic sampai Elite, bisa tambah add-on</small><span class="p">mulai ${rp(H.sekaliCuci[0].harga)}</span></span></label>
      <label class="opt"><input type="radio" name="layanan" value="detailing"><span class="box"><b>Salon mobil / detailing</b><small>Interior, exterior, kaca, mesin, ban, complete</small><span class="p">mulai ${rp(minOf(H.detailing.map((d) => d.harga[0])))}</span></span></label>
      <label class="opt"><input type="radio" name="layanan" value="banjir"><span class="box"><b>Paket banjir</b><small>Pembersihan kabin pascabanjir</small><span class="p">mulai ${rp(H.banjir.harga[0][0])}</span></span></label>
    </div></fieldset>
    <div class="err-msg" data-err="1">Silakan pilih salah satu layanan.</div>
    <div class="form-nav"><span></span><button type="button" class="btn btn-primary" data-next>Lanjutkan →</button></div>
  </div>

  <div class="panel" data-p="2">
    <div id="step2"></div>
    <div class="err-msg" data-err="2"></div>
    <div class="form-nav"><button type="button" class="btn btn-outline" data-prev>← Kembali</button><button type="button" class="btn btn-primary" data-next>Lanjutkan →</button></div>
  </div>

  <div class="panel" data-p="3">
    <fieldset class="fieldset"><legend>Data diri</legend><div class="form-grid">
      <div><label class="f" for="nama">Nama <i>*</i></label><input class="input" id="nama" name="nama" required autocomplete="name" placeholder="Nama lengkap"></div>
      <div><label class="f" for="hp">Nomor WhatsApp <i>*</i></label><input class="input" id="hp" name="hp" required inputmode="tel" autocomplete="tel" placeholder="08xxxxxxxxxx"></div>
      <div class="full"><label class="f" for="alamat">Alamat lengkap <i>*</i></label><textarea class="input" id="alamat" name="alamat" rows="2" required placeholder="Nama jalan, nomor rumah, RT/RW, patokan"></textarea></div>
      <div><label class="f" for="maps">Link Google Maps</label><input class="input" id="maps" name="maps" placeholder="Tempel link share lokasi (opsional)"></div>
      <div><label class="f" for="kota">Kota <i>*</i></label><select class="input" id="kota" name="kota" required><option value="">Pilih kota</option>${c.area.map((a) => `<option>${esc(a)}</option>`).join('')}<option>Lainnya</option></select></div>
    </div></fieldset>
    <fieldset class="fieldset"><legend>Kendaraan</legend><div class="form-grid">
      <div><label class="f" for="merk">Merk & tipe</label><input class="input" id="merk" name="merk" placeholder="mis. Toyota Avanza"></div>
      <div><label class="f" for="nopol">Nomor polisi</label><input class="input" id="nopol" name="nopol" placeholder="mis. B 1234 XYZ"></div>
    </div></fieldset>
    <fieldset class="fieldset"><legend>Jadwal</legend><div class="form-grid">
      <div><label class="f" for="tanggal" id="lblTanggal">Tanggal <i>*</i></label><input class="input" type="date" id="tanggal" name="tanggal" required></div>
      <div><label class="f" for="jam">Jam <i>*</i></label><select class="input" id="jam" name="jam" required><option value="">Pilih jam</option>${c.jamPilihan.map((j) => `<option>${j}</option>`).join('')}</select></div>
      <div class="full" id="hariWrap" hidden><label class="f">Hari rutin (untuk berlangganan)</label><div class="opt-grid c4" id="hariList"></div><div class="hint" id="hariHint"></div></div>
    </div></fieldset>
    <fieldset class="fieldset"><legend>Informasi lain</legend><div class="form-grid">
      <div><label class="f" for="kondisi">Kondisi lokasi <i>*</i></label><select class="input" id="kondisi" name="kondisi" required><option value="">Pilih salah satu</option><option>Ada air & listrik</option><option>Hanya ada air</option><option>Hanya ada listrik</option><option>Tidak ada air & listrik</option></select></div>
      <div><label class="f" for="sumber">Tahu kami dari mana?</label><select class="input" id="sumber" name="sumber"><option value="">Pilih salah satu</option><option>Google</option><option>Instagram</option><option>TikTok</option><option>Facebook</option><option>Teman / keluarga</option><option>Brosur</option><option>Lainnya</option></select></div>
      <div class="full"><label class="f" for="catatan">Catatan tambahan</label><input class="input" id="catatan" name="catatan" placeholder="mis. parkir di basement, tolong bawa selang 10 m"></div>
      <div><label class="f" for="promo">Kode promo / referal</label><input class="input" id="promo" name="promo" placeholder="Jika ada"></div>
    </div></fieldset>
    <div class="err-msg" data-err="3">Lengkapi kolom bertanda * terlebih dulu.</div>
    <div class="form-nav"><button type="button" class="btn btn-outline" data-prev>← Kembali</button><button type="submit" class="btn btn-wa">${icon.wa(18)} Kirim via WhatsApp</button></div>
  </div>
</form>
<aside class="card shadow summary" aria-live="polite"><h3>Ringkasan pesanan</h3><div id="sumBody"><p class="empty">Belum ada layanan dipilih.</p></div>
  <div class="total"><span>Estimasi</span><span id="sumTotal">—</span></div>
  <p class="hint">Harga final dikonfirmasi admin via WhatsApp. Bayar setelah pekerjaan selesai.</p>
  <p class="hint">Butuh bantuan? <a href="${waKonsul}" target="_blank" rel="noopener">Chat ${esc(c.whatsappDisplay)}</a></p>
</aside>
</div></section>
<section class="section soft"><div class="container"><h2 class="center">Cari tahu ukuran mobil Anda</h2><div class="grid g4 mt24">${c.ukuran.map((s) => `<div class="card"><h3>${esc(s.nama)}</h3><p class="muted mb0">${esc(s.contoh)}</p></div>`).join('')}</div></div></section>`,
  });
}

// 404
page({
  file: '404.html', title: 'Halaman tidak ditemukan', desc: 'Halaman tidak ditemukan.',
  body: `<section class="section center"><div class="container"><h1>404</h1><p class="lead">Halaman yang Anda cari tidak ada.</p><a class="btn btn-primary" href="${u()}">Kembali ke beranda</a></div></section>`,
});
sitemap.pop(); // jangan masukkan 404 ke sitemap

// ---------- aset & SEO ----------
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
for (const f of ['style.css', 'app.js', 'favicon.svg']) fs.copyFileSync(path.join(ROOT, 'assets', f), path.join(OUT, 'assets', f));
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap.map((l) => `  <url><loc>${l}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${abs('sitemap.xml')}\n`);
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
if (c.customDomain) fs.writeFileSync(path.join(OUT, 'CNAME'), c.customDomain + '\n');
console.log(`✓ ${sitemap.length} halaman dibuat di dist/ (base path: ${BASE})`);
