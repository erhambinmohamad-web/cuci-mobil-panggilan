(function () {
  // ---------- Navigasi ----------
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var on = menu.classList.toggle('show');
      burger.setAttribute('aria-expanded', on);
    });
  }
  document.querySelectorAll('.dd-toggle').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var li = b.parentElement, on = !li.classList.contains('open');
      document.querySelectorAll('.menu li.open').forEach(function (x) { x.classList.remove('open'); });
      if (on) li.classList.add('open');
      b.setAttribute('aria-expanded', on);
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.menu li.open').forEach(function (x) { x.classList.remove('open'); });
  });

  // ---------- Tab harga (sorot tab aktif saat scroll) ----------
  var tabs = document.querySelectorAll('.tabs a');
  if (tabs.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) {
          tabs.forEach(function (t) { t.classList.toggle('active', t.getAttribute('href') === '#' + en.target.id); });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('.tab-panel').forEach(function (p) { io.observe(p); });
  }

  // ---------- Form pemesanan ----------
  var form = document.getElementById('bookForm');
  if (!form || !window.SITE) return;
  var S = window.SITE, H = S.harga;
  var rp = function (n) { return 'Rp' + Number(n).toLocaleString('id-ID'); };
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var HARI = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  var POTONGAN = { 1: 0, 2: 5000, 3: 10000 };
  var step = 1, LAST = S.bayar ? 3 : 2;
  var q = new URLSearchParams(location.search);

  // Daftar mobil → ukuran (0 kecil, 1 sedang, 2 besar, 3 ekstra/mewah)
  var MOBIL = {
    'Toyota': 'Kijang:1,Agya:0,Yaris:0,Calya:1,Avanza:1,Veloz:1,Rush:1,Raize:1,Sienta:1,Vios:1,Yaris Cross:1,Corolla Cross:1,Corolla Altis:1,C-HR:1,Camry:1,bZ4X:1,Kijang Innova:2,Innova Zenix:2,Innova:2,Fortuner:2,Voxy:2,Alphard:2,Vellfire:2,Hilux:2,Land Cruiser:3,HiAce:3',
    'Daihatsu': 'Ayla:0,Sirion:0,Sigra:1,Xenia:1,Terios:1,Rocky:1,Luxio:1,Gran Max:1',
    'Honda': 'Brio:0,Jazz:0,City Hatchback:0,City:1,Civic:1,Accord:1,Mobilio:1,BR-V:1,HR-V:1,WR-V:1,Freed:1,CR-V:2,Odyssey:2',
    'Suzuki': 'Karimun Wagon R:0,S-Presso:0,Ignis:0,Swift:0,Baleno:0,Celerio:0,Ertiga:1,XL7:1,Jimny:1,Grand Vitara:1,APV:1,Carry:1',
    'Mitsubishi': 'Mirage:0,Xpander:1,Xpander Cross:1,Xforce:1,Outlander:2,Pajero Sport:2,Triton:2,Destinator:2',
    'Nissan': 'March:0,Livina:1,Grand Livina:1,Kicks:1,Magnite:1,Juke:1,Serena:2,X-Trail:2,Terra:2,Navara:2',
    'Wuling': 'Air ev:0,Binguo:0,Confero:1,Cortez:1,Alvez:1,Formo:1,Cloud EV:1,Almaz:2',
    'Hyundai': 'Creta:1,Stargazer:1,Kona:1,Ioniq 6:1,Ioniq 5:2,Santa Fe:2,Palisade:2,Staria:2',
    'Kia': 'Picanto:0,Sonet:1,Seltos:1,Carens:1,Sorento:2,Carnival:2,EV6:2',
    'Mazda': 'Mazda2:0,Mazda3:1,CX-3:1,CX-30:1,CX-5:2,CX-60:2,CX-8:2',
    'Chery': 'Omoda 5:1,Omoda E5:1,Tiggo 2 Pro:1,Tiggo 5x:1,Tiggo 7 Pro:2,Tiggo 8 Pro:2,J6:1',
    'BYD': 'Dolphin:0,Atto 1:0,Atto 3:1,Seal:1,M6:2,Sealion 7:2',
    'MG': 'MG 4 EV:1,MG ZS:1,MG 5:1,MG HS:2',
    'DFSK': 'Gelora:1,Glory 560:1,Glory i-Auto:1,Seres E1:0',
    'Isuzu': 'Panther:1,MU-X:2,D-Max:2',
    'Ford': 'EcoSport:1,Fiesta:0,Everest:2,Ranger:2',
    'Chevrolet': 'Spark:0,Spin:1,Trax:1,Captiva:2,Trailblazer:2',
    'Datsun': 'GO:0,GO+:1,Cross:1',
    'Renault': 'Kwid:0,Triber:1,Kiger:1',
    'Peugeot': '2008:1,3008:2,5008:2'
  };
  var MEWAH = ['BMW', 'Mercedes-Benz', 'Lexus', 'Audi', 'Porsche', 'Volvo', 'Land Rover', 'MINI', 'Jaguar', 'Volkswagen', 'Tesla', 'Subaru', 'Jeep'];
  MEWAH.forEach(function (m) { if (!MOBIL[m]) MOBIL[m] = ''; });
  var MEREK = Object.keys(MOBIL).sort();
  function tipeOf(merek) { var raw = MOBIL[merek]; return raw ? raw.split(',').map(function (x) { var p = x.split(':'); return { n: p[0], u: +p[1] }; }) : []; }
  function cariMerek(t) { t = t.trim().toLowerCase(); return MEREK.filter(function (m) { return m.toLowerCase() === t; })[0] || ''; }
  function ukuranDari(merekTxt, tipeTxt) {
    var m = cariMerek(merekTxt); if (!m) return -1;
    if (MEWAH.indexOf(m) > -1) return 3;
    var t = tipeTxt.trim().toLowerCase(); if (!t) return -1;
    var cocok = tipeOf(m).filter(function (x) { var n = x.n.toLowerCase(); return t === n || t.indexOf(n + ' ') === 0; })
      .sort(function (a, b) { return b.n.length - a.n.length; })[0];
    return cocok ? cocok.u : -1;
  }
  $('#dlMerek').innerHTML = MEREK.map(function (m) { return '<option value="' + esc(m) + '">'; }).join('');

  function opt(type, name, value, title, small, price, checked) {
    return '<label class="opt"><input type="' + type + '" name="' + name + '" value="' + value + '"' + (checked ? ' checked' : '') + '>' +
      '<span class="box"><b>' + title + '</b>' + (small ? '<small>' + small + '</small>' : '') + (price ? '<span class="p">' + price + '</span>' : '') + '</span></label>';
  }
  function layanan() { var r = $('input[name=layanan]:checked'); return r ? r.value : ''; }
  function val(name) { var r = $('input[name=' + name + ']:checked'); return r ? r.value : ''; }
  function vals(name) { return $$('input[name=' + name + ']:checked').map(function (x) { return x.value; }); }
  function perluUkuran() { var l = layanan(); return l === 'detailing' || l === 'banjir'; }

  // ---- Langkah 1: paket sesuai layanan ----
  var preUk = q.get('ukuran');
  function renderStep2() {
    var l = layanan(), h = '', pk = q.get('paket');
    if (l === 'langganan') {
      h = '<fieldset class="fieldset"><legend>Paket Kilap mana?</legend><div class="opt-grid c3">' +
        H.langganan.map(function (p) { return opt('radio', 'paket', p.id, p.nama + (p.label ? ' · ' + p.label : ''), p.frekuensi + ' (' + p.perMinggu + 'x seminggu) · ' + p.sampo + ' · fogging hemat ' + p.diskonFogging + '%', rp(p.harga) + '/bulan', pk === p.id); }).join('') +
        '</div></fieldset>';
    } else if (l === 'sekali') {
      h = '<fieldset class="fieldset"><legend>Tingkat cuci</legend><div class="opt-grid">' +
        H.sekaliCuci.map(function (p) { return opt('radio', 'paket', p.id, p.nama, p.isi.join(' · ') + ' · ±' + p.durasi, rp(p.harga), pk === p.id); }).join('') +
        '</div></fieldset><fieldset class="fieldset"><legend>Tambahan (boleh dilewati)</legend><div class="opt-grid c3">' +
        H.addOn.map(function (a) { return opt('checkbox', 'addon', a.id, a.nama, a.deskripsi, rp(a.harga)); }).join('') + '</div></fieldset>';
    } else if (l === 'detailing') {
      h = '<fieldset class="fieldset"><legend>Perawatan yang diinginkan (boleh lebih dari satu)</legend><div class="opt-grid c3">' +
        H.detailing.map(function (d) { return opt('checkbox', 'det', d.id, d.nama, d.id === 'complete' ? 'Gabungan 5 perawatan, lebih murah' : '', 'mulai ' + rp(d.harga[0]), pk === d.id); }).join('') +
        '</div></fieldset><p class="hint">Harga mengikuti ukuran mobil, otomatis terhitung setelah Anda mengisi merek & tipe mobil di langkah 2.</p>';
    } else if (l === 'banjir') {
      h = '<fieldset class="fieldset"><legend>Setinggi apa air masuk ke kabin?</legend><div class="opt-grid c3">' +
        H.banjir.level.map(function (lv, i) { return opt('radio', 'level', i, lv, H.banjir.durasi[i], ''); }).join('') + '</div></fieldset>' +
        '<p class="hint">Lokasi perlu listrik min. 2.000 watt. Harga mengikuti ukuran mobil yang Anda isi di langkah 2.</p>';
    }
    $('#step2').innerHTML = h;
    q = new URLSearchParams(); // prefill hanya sekali
    syncComplete();
    update();
  }
  function syncComplete() {
    var all = $$('input[name=det]');
    var comp = all.filter(function (x) { return x.value === 'complete'; })[0];
    if (!comp) return;
    all.forEach(function (x) {
      if (x !== comp) { x.disabled = comp.checked; if (comp.checked) x.checked = false; x.parentElement.style.opacity = comp.checked ? .45 : 1; }
    });
  }

  // ---- Langkah 2: daftar mobil ----
  var ukNama = S.ukuran.map(function (u) { return u.nama; });
  function renderCars() {
    var n = +val('jml') || 1, list = $('#carList'), ada = $$('.car-row', list);
    for (var i = ada.length; i < n; i++) {
      var row = document.createElement('div'); row.className = 'car-row'; row.dataset.i = i;
      row.innerHTML = '<span class="car-no">' + (i + 1) + '</span>' +
        '<div class="car-f"><label class="f" for="merek' + i + '">Merek <i>*</i></label><input class="input car-merek" id="merek' + i + '" list="dlMerek" placeholder="Cari mobil" autocomplete="off"></div>' +
        '<div class="car-f"><label class="f" for="tipe' + i + '">Tipe <i>*</i></label><input class="input car-tipe" id="tipe' + i + '" list="dlTipe' + i + '" placeholder="Cari tipe" autocomplete="off"><datalist id="dlTipe' + i + '"></datalist></div>' +
        '<div class="car-size"></div>';
      list.appendChild(row);
    }
    ada = $$('.car-row', list);
    ada.forEach(function (r, i) { r.hidden = i >= n; });
    ada.forEach(cekMobil);
  }
  function cekMobil(row) {
    var mi = $('.car-merek', row), ti = $('.car-tipe', row), box = $('.car-size', row), i = +row.dataset.i;
    var m = cariMerek(mi.value);
    $('#dlTipe' + i).innerHTML = m ? tipeOf(m).map(function (x) { return '<option value="' + esc(x.n) + '">'; }).join('') : '';
    var u = ukuranDari(mi.value, ti.value);
    row.dataset.auto = u;
    if (u > -1) { box.innerHTML = 'Ukuran: <span class="size-chip">' + esc(ukNama[u]) + '</span>' + (u === 3 ? ' · harga lewat chat' : ''); return; }
    if (mi.value.trim() && ti.value.trim()) {
      var sel = $('select', box), cur = sel ? sel.value : (i === 0 && preUk ? String(S.ukuran.map(function (x) { return x.id; }).indexOf(preUk)) : '');
      box.innerHTML = '<label class="f" for="uk' + i + '">Ukuran mobil ini?' + (perluUkuran() ? ' <i>*</i>' : '') + '</label><select class="input" id="uk' + i + '"><option value="">Pilih ukuran</option>' +
        S.ukuran.map(function (x, k) { return '<option value="' + k + '"' + (cur === String(k) ? ' selected' : '') + '>' + esc(x.nama + ' — ' + x.contoh.split(' — ')[0]) + '</option>'; }).join('') + '</select>';
    } else box.innerHTML = '';
  }
  function cars() {
    var n = +val('jml') || 1;
    return $$('.car-row').slice(0, n).map(function (r) {
      var u = +r.dataset.auto, sel = $('select', r);
      if (!(u > -1) && sel && sel.value !== '') u = +sel.value;
      if (!(u > -1)) u = -1;
      var mk = $('.car-merek', r).value.trim(), tp = $('.car-tipe', r).value.trim();
      return { merek: mk, tipe: tp, ui: u, label: (mk + ' ' + tp).trim() };
    });
  }

  // ---- Hitung ringkasan ----
  function calc() {
    var l = layanan(), rows = [], total = 0, konsul = false, C = cars(), n = C.length;
    var tag = function (k) { return n > 1 ? 'Mobil ' + (k + 1) + (C[k].label ? ' · ' + C[k].label : '') + ' – ' : ''; };
    var kali = n > 1 ? ' × ' + n + ' mobil' : '';
    if (l === 'langganan') {
      var p = H.langganan.filter(function (x) { return x.id === val('paket'); })[0];
      if (p) { rows.push([p.nama + ' (' + p.frekuensi + ')' + kali, p.harga * n]); total += p.harga * n; }
    } else if (l === 'sekali') {
      var s = H.sekaliCuci.filter(function (x) { return x.id === val('paket'); })[0];
      if (s) { rows.push(['Cuci sekali datang – ' + s.nama + kali, s.harga * n]); total += s.harga * n; }
      vals('addon').forEach(function (id) { var a = H.addOn.filter(function (x) { return x.id === id; })[0]; rows.push(['+ ' + a.nama + kali, a.harga * n]); total += a.harga * n; });
    } else if (l === 'detailing') {
      vals('det').forEach(function (id) {
        var d = H.detailing.filter(function (x) { return x.id === id; })[0];
        C.forEach(function (c, k) {
          if (c.ui < 0) rows.push([tag(k) + d.nama, null]);
          else if (c.ui > 2) { rows.push([tag(k) + d.nama + ' (' + ukNama[3] + ')', 'Lewat chat']); konsul = true; }
          else { rows.push([tag(k) + d.nama + ' (' + ukNama[c.ui] + ')', d.harga[c.ui]]); total += d.harga[c.ui]; }
        });
      });
    } else if (l === 'banjir') {
      var lv = val('level');
      if (lv !== '') C.forEach(function (c, k) {
        if (c.ui < 0) rows.push([tag(k) + 'Pascabanjir – ' + H.banjir.level[+lv].toLowerCase(), null]);
        else if (c.ui > 2) { rows.push([tag(k) + 'Pascabanjir (' + ukNama[3] + ')', 'Lewat chat']); konsul = true; }
        else { var hb = H.banjir.harga[c.ui][+lv]; rows.push([tag(k) + 'Pascabanjir – ' + H.banjir.level[+lv].toLowerCase() + ' (' + ukNama[c.ui] + ')', hb]); total += hb; }
      });
    }
    var pot = Math.min(POTONGAN[n] || 0, total);
    if (pot) { rows.push(['Potongan ' + n + ' mobil', -pot]); total -= pot; }
    return { rows: rows, total: total, konsul: konsul, per: l === 'langganan' ? '/bulan' : '', cars: C };
  }
  function fmt(v) { return v === null ? 'isi data mobil' : typeof v === 'number' ? (v < 0 ? '−' + rp(-v) : rp(v)) : v; }
  function update() {
    var r = calc();
    $('#sumBody').innerHTML = r.rows.length ? r.rows.map(function (x) {
      return '<div class="row"><span>' + esc(x[0]) + '</span><span>' + fmt(x[1]) + '</span></div>';
    }).join('') : '<p class="empty">Belum ada paket yang dipilih.</p>';
    $('#sumTotal').textContent = r.total ? rp(r.total) + r.per + (r.konsul ? ' + harga lewat chat' : '') : (r.konsul ? 'Lewat chat' : '—');
  }

  function err(n, msg) { var e = $('[data-err="' + n + '"]'); if (msg) e.textContent = msg; e.classList.toggle('on', !!msg || msg === undefined); }
  function clearErr() { $$('.err-msg').forEach(function (e) { e.classList.remove('on'); }); $$('.input.err').forEach(function (e) { e.classList.remove('err'); }); }

  function validate(n) {
    clearErr();
    var l = layanan();
    if (n === 1) {
      if (!l) return err(1, 'Pilih salah satu layanan dulu.'), false;
      if ((l === 'langganan' || l === 'sekali') && !val('paket')) return err(1, 'Pilih salah satu paket dulu.'), false;
      if (l === 'detailing' && !vals('det').length) return err(1, 'Centang minimal satu perawatan.'), false;
      if (l === 'banjir' && val('level') === '') return err(1, 'Pilih setinggi apa air masuk ke kabin.'), false;
    }
    if (n === 2) {
      var ok = true;
      $$('[data-p="2"] [required]').forEach(function (f) { if (!f.value.trim()) { f.classList.add('err'); ok = false; } });
      $$('.car-row').slice(0, +val('jml') || 1).forEach(function (r) { $$('.car-merek, .car-tipe', r).forEach(function (f) { if (!f.value.trim()) { f.classList.add('err'); ok = false; } }); });
      if (!ok) { err(2, 'Isi dulu kolom yang bertanda *.'); return false; }
      if (perluUkuran()) {
        var kosong = cars().map(function (c, i) { return c.ui < 0 ? i + 1 : 0; }).filter(Boolean);
        if (kosong.length) { kosong.forEach(function (k) { var s = $('#uk' + (k - 1)); if (s) s.classList.add('err'); }); err(2, 'Pilih ukuran untuk mobil ' + kosong.join(' & ') + '.'); return false; }
      }
      if (l === 'langganan') {
        var max = +$('#hariList').dataset.max || 1;
        if (vals('hari').length !== max) { err(2, 'Centang tepat ' + max + ' hari rutin sesuai paket.'); return false; }
      }
      if (!$('#maps').value && !$('#alamat').value.trim()) { $('#btnLoc').classList.add('err'); err(2, 'Bagikan lokasi atau ketik alamat dulu.'); return false; }
    }
    return true;
  }

  function renderHari() {
    var wrap = $('#hariWrap'), l = layanan();
    $('#lblTanggal').innerHTML = (l === 'langganan' ? 'Tanggal mulai' : 'Tanggal') + ' <i>*</i>';
    if (l !== 'langganan') { wrap.hidden = true; return; }
    var p = H.langganan.filter(function (x) { return x.id === val('paket'); })[0];
    var n = p ? (p.perMinggu || 1) : 1;
    wrap.hidden = false;
    var prev = vals('hari');
    $('#hariList').innerHTML = HARI.map(function (d) { return opt('checkbox', 'hari', d, d, '', '', prev.indexOf(d) > -1); }).join('');
    $('#hariHint').textContent = 'Centang ' + n + ' hari dalam seminggu' + (p ? ' untuk ' + p.nama : '') + '.';
    $('#hariList').dataset.max = n;
  }

  function go(n) {
    step = n;
    $$('.panel').forEach(function (p) { p.classList.toggle('on', +p.dataset.p === n); });
    $$('.stepper li').forEach(function (li) { li.classList.toggle('on', +li.dataset.s <= n); });
    if (n === 2) { renderHari(); renderCars(); }
    if (n === 3) { renderBayar(); kirimData(BY && bookAmt ? 'QR tampil' : 'Menunggu nominal admin'); }
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  form.addEventListener('change', function (e) {
    var t = e.target;
    if (t.name === 'layanan') renderStep2();
    if (t.name === 'det') syncComplete();
    if (t.name === 'jml') renderCars();
    if (t.classList.contains('car-merek')) { var cm = cariMerek(t.value); if (cm) t.value = cm; cekMobil(t.closest('.car-row')); }
    if (t.name === 'hari') {
      var max = +$('#hariList').dataset.max || 1, sel = vals('hari');
      if (sel.length > max) t.checked = false;
    }
    if (t.classList.contains('input')) t.classList.remove('err');
    update();
  });
  form.addEventListener('input', function (e) {
    var row = e.target.closest && e.target.closest('.car-row');
    if (row && (e.target.classList.contains('car-merek') || e.target.classList.contains('car-tipe'))) { e.target.classList.remove('err'); cekMobil(row); update(); }
  });
  $$('[data-next]').forEach(function (b) { b.addEventListener('click', function () { if (validate(step)) go(step + 1); }); });
  $$('[data-prev]').forEach(function (b) { b.addEventListener('click', function () { clearErr(); go(step - 1); }); });

  // ---- Lokasi: GPS + peta (di HP, ketuk peta untuk layar penuh) ----
  var btnLoc = $('#btnLoc'), locStatus = $('#locStatus'), peta = null, pin = null, lingkar = null, pantau = null, terbaik = null;
  var hp = window.matchMedia('(max-width: 720px)');
  function bukaAlamat(pesan) { $('#alamatWrap').hidden = false; $('#btnAlamat').setAttribute('aria-expanded', 'true'); if (pesan) locStatus.textContent = pesan; $('#alamat').focus(); }
  $('#btnAlamat').addEventListener('click', function () { bukaAlamat(); });
  function muatLeaflet(cb) {
    if (window.L) return cb();
    var css = document.createElement('link'); css.rel = 'stylesheet'; css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(css);
    var js = document.createElement('script'); js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; js.onload = cb; js.onerror = function () { cb(true); }; document.head.appendChild(js);
  }
  function simpan(lat, lng) { $('#maps').value = 'https://maps.google.com/?q=' + lat.toFixed(6) + ',' + lng.toFixed(6); }
  function tampilAkurasi(m, manual) {
    var box = $('#locAcc'), lvl = manual ? 'baik' : m <= 20 ? 'baik' : m <= 60 ? 'cukup' : 'kurang';
    var teks = manual ? 'Titik diatur manual' : { baik: 'Sangat presisi', cukup: 'Cukup presisi', kurang: 'Kurang presisi' }[lvl];
    box.hidden = false; box.className = 'loc-acc ' + lvl;
    $('#locAccTxt').textContent = teks + (manual ? '' : ' · ± ' + Math.round(m) + ' m');
    box.querySelector('.bar i').style.width = (manual ? 100 : Math.max(8, Math.min(100, 100 - (m - 5) * 0.8))) + '%';
  }
  var penuh = false;
  function interaktif(on) {
    if (!peta) return;
    ['dragging', 'touchZoom', 'doubleClickZoom', 'scrollWheelZoom', 'boxZoom', 'keyboard'].forEach(function (h) { if (peta[h]) peta[h][on ? 'enable' : 'disable'](); });
    if (pin && pin.dragging) pin.dragging[on ? 'enable' : 'disable']();
  }
  function aturMode() { interaktif(penuh || !hp.matches); var t = $('.map-tap'); if (t) t.hidden = penuh || !hp.matches; }
  function bukaPenuh() {
    if (!peta || penuh) return;
    penuh = true; $('#locMap').classList.add('full'); document.body.classList.add('map-open'); aturMode();
    try { history.pushState({ peta: 1 }, ''); } catch (e) {}
    setTimeout(function () { peta.invalidateSize(); peta.setView(pin.getLatLng(), Math.max(peta.getZoom(), 18)); }, 60);
  }
  function tutupPenuh(dariBack) {
    if (!penuh) return;
    penuh = false; $('#locMap').classList.remove('full'); document.body.classList.remove('map-open'); aturMode();
    setTimeout(function () { peta.invalidateSize(); peta.setView(pin.getLatLng(), peta.getZoom()); }, 60);
    if (!dariBack) { try { if (history.state && history.state.peta) history.back(); } catch (e) {} }
  }
  $('#mapDone').addEventListener('click', function () { tutupPenuh(false); });
  window.addEventListener('popstate', function () { if (penuh) tutupPenuh(true); });
  if (hp.addEventListener) hp.addEventListener('change', aturMode);
  function gambarPeta(lat, lng, acc) {
    var el = $('#locMap');
    if (!window.L) { el.innerHTML = '<div class="loc-ph">Peta tidak bisa dimuat, lokasi tetap tersimpan.</div>'; return; }
    if (!peta) {
      el.innerHTML = ''; el.classList.add('on');
      peta = L.map(el, { zoomControl: true, attributionControl: true }).setView([lat, lng], 17);
      peta.attributionControl.setPrefix(false);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(peta);
      lingkar = L.circle([lat, lng], { radius: acc, color: '#0b7285', weight: 2, fillColor: '#14a3b8', fillOpacity: .18 }).addTo(peta);
      pin = L.marker([lat, lng], { draggable: true }).addTo(peta);
      pin.on('dragend', function () { var p = pin.getLatLng(); if (pantau !== null) { navigator.geolocation.clearWatch(pantau); pantau = null; } lingkar.setLatLng(p).setRadius(5); simpan(p.lat, p.lng); tampilAkurasi(0, true); locStatus.textContent = 'Titik dipindah manual. Pastikan pin tepat di lokasi mobil.'; });
      peta.on('click', function (e) { if (!penuh && hp.matches) return; pin.setLatLng(e.latlng); pin.fire('dragend'); });
      var tap = document.createElement('button'); tap.type = 'button'; tap.className = 'map-tap'; tap.innerHTML = '<span>Ketuk untuk perbesar peta</span>';
      L.DomEvent.disableClickPropagation(tap); tap.addEventListener('click', function (e) { e.stopPropagation(); bukaPenuh(); }); el.appendChild(tap);
      aturMode();
    } else { pin.setLatLng([lat, lng]); lingkar.setLatLng([lat, lng]).setRadius(acc); }
    if (!penuh) peta.fitBounds(lingkar.getBounds(), { maxZoom: 18, padding: [20, 20] });
  }
  btnLoc.addEventListener('click', function () {
    btnLoc.classList.remove('err');
    if (!navigator.geolocation) { bukaAlamat('Ponsel ini tidak mendukung bagikan lokasi. Silakan ketik alamat.'); return; }
    if (pantau !== null) navigator.geolocation.clearWatch(pantau);
    terbaik = null; btnLoc.disabled = true; locStatus.textContent = 'Mencari lokasi… izinkan akses lokasi bila diminta.';
    muatLeaflet(function () {
      var mulai = Date.now();
      pantau = navigator.geolocation.watchPosition(function (p) {
        var c = p.coords;
        if (terbaik && c.accuracy >= terbaik.accuracy) return;
        terbaik = c; simpan(c.latitude, c.longitude); gambarPeta(c.latitude, c.longitude, c.accuracy); tampilAkurasi(c.accuracy);
        btnLoc.disabled = false; btnLoc.classList.add('done'); btnLoc.lastChild.textContent = ' Lokasi tersimpan (ketuk untuk ulang)';
        locStatus.textContent = c.accuracy <= 20 ? 'Lokasi sudah presisi.' + (hp.matches ? ' Ketuk peta untuk menggeser pin bila belum tepat.' : ' Geser pin bila belum tepat di mobil.') : 'Masih mempertajam lokasi…' + (hp.matches ? ' atau ketuk peta untuk menggeser pin.' : ' atau geser pin ke posisi mobil.');
        clearErr();
        if (c.accuracy <= 15 || Date.now() - mulai > 20000) { navigator.geolocation.clearWatch(pantau); pantau = null; }
      }, function (e) {
        btnLoc.disabled = false; if (pantau !== null) { navigator.geolocation.clearWatch(pantau); pantau = null; }
        if (terbaik) return;
        bukaAlamat(e.code === 1 ? 'Akses lokasi ditolak. Silakan ketik alamat, atau kirim lokasi lewat WhatsApp setelah pesanan terkirim.' : 'Lokasi belum terbaca. Silakan ketik alamat, atau coba lagi di tempat terbuka.');
      }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 });
      setTimeout(function () { if (pantau !== null) { navigator.geolocation.clearWatch(pantau); pantau = null; } }, 25000);
    });
  });

  var tgl = $('#tanggal');
  var d = new Date(); tgl.min = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  // Booking: QRIS (nominal otomatis) atau transfer
  var BY = S.bayar, bookAmt = 0, bayarVia = '';
  function crc16(str) { var x = 0xffff; for (var i = 0; i < str.length; i++) { x ^= str.charCodeAt(i) << 8; for (var j = 0; j < 8; j++) x = x & 0x8000 ? ((x << 1) ^ 0x1021) & 0xffff : (x << 1) & 0xffff; } return ('000' + x.toString(16).toUpperCase()).slice(-4); }
  function qrisNominal(statis, nominal) {
    var s = statis.trim(), t = [], i = 0;
    while (i < s.length) { var len = parseInt(s.substr(i + 2, 2), 10); if (isNaN(len)) break; t.push([s.substr(i, 2), s.substr(i + 4, len)]); i += 4 + len; }
    t = t.filter(function (x) { return ['54', '55', '56', '57', '63'].indexOf(x[0]) < 0; });
    t.forEach(function (x) { if (x[0] === '01') x[1] = '12'; });
    var at = t.length; for (var k = 0; k < t.length; k++) { if (t[k][0] > '54') { at = k; break; } }
    t.splice(at, 0, ['54', String(nominal)]);
    var body = t.map(function (x) { return x[0] + ('0' + x[1].length).slice(-2) + x[1]; }).join('') + '6304';
    return body + crc16(body);
  }
  function muatQR(cb) {
    if (window.qrcode) return cb();
    var js = document.createElement('script'); js.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js';
    js.onload = function () { cb(); }; js.onerror = function () { cb(true); }; document.head.appendChild(js);
  }
  function gambarQR(nominal) {
    var img = $('#qrImg'), ph = $('#qrPh'), save = $('#qrSave');
    img.hidden = true; ph.hidden = false; ph.textContent = 'Menyiapkan kode QR…'; save.classList.add('off');
    muatQR(function (gagal) {
      if (gagal || !window.qrcode) { ph.textContent = 'Kode QR tidak bisa dimuat.' + (BY.rek ? ' Silakan pakai transfer bank.' : ' Coba muat ulang halaman.'); return; }
      var q = qrcode(0, 'M'); q.addData(qrisNominal(BY.qris, nominal)); q.make();
      var n = q.getModuleCount(), cell = Math.max(6, Math.floor(480 / (n + 8))), side = (n + 8) * cell, top = 70, bot = 110;
      var cv = document.createElement('canvas'); cv.width = side; cv.height = side + top + bot;
      var g = cv.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, cv.width, cv.height);
      g.fillStyle = '#0b7285'; g.font = 'bold 30px sans-serif'; g.textAlign = 'center'; g.fillText('QRIS · ' + S.brand, side / 2, 46);
      g.fillStyle = '#111';
      for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) if (q.isDark(r, c)) g.fillRect((c + 4) * cell, top + (r + 4) * cell, cell, cell);
      g.font = 'bold 40px sans-serif'; g.fillText(rp(nominal), side / 2, top + side + 48);
      g.fillStyle = '#555'; g.font = '22px sans-serif'; g.fillText('Booking ' + BY.persen + '% · nominal sudah terisi', side / 2, top + side + 84);
      var url = cv.toDataURL('image/png'); img.src = url; save.href = url; img.hidden = false; ph.hidden = true; save.classList.remove('off');
    });
  }
  function pilihBayar(id) {
    bayarVia = id;
    $$('.pay-tab').forEach(function (b) { var on = b.dataset.pay === id; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
    $$('.pay-pane').forEach(function (p) { p.hidden = p.dataset.pane !== id; });
    var manual = id !== 'auto'; $('#btnKirim').hidden = !manual; $('#kirimHint').hidden = !manual;
  }
  // Pembayaran otomatis Midtrans (Snap): token dibuat di Apps Script, status lunas dicatat otomatis
  var MT = S.midtrans, mtStatus = '';
  function muatSnap(cb) {
    if (window.snap) return cb();
    var js = document.createElement('script');
    js.src = MT.mode === 'production' ? 'https://app.midtrans.com/snap/snap.js' : 'https://app.sandbox.midtrans.com/snap/snap.js';
    js.setAttribute('data-client-key', MT.clientKey); js.onload = function () { cb(); }; js.onerror = function () { cb(true); }; document.head.appendChild(js);
  }
  function hookJson(data) {
    return fetch(S.orderHook, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(data) }).then(function (r) { return r.json(); });
  }
  function bayarOtomatis() {
    var b = $('#btnMidtrans'), h = $('#mtHint'), gagal = function (m) { b.disabled = false; h.textContent = m || 'Pembayaran otomatis belum bisa dibuka. Coba lagi, atau pilih tab QRIS/Transfer.'; };
    b.disabled = true; h.textContent = 'Menyiapkan pembayaran…';
    var data = dataPesanan('Membuka pembayaran'); data.act = 'snap';
    hookJson(data).then(function (j) {
      if (!j || !j.token) return gagal(j && j.error ? 'Gagal: ' + j.error : '');
      muatSnap(function (err) {
        if (err || !window.snap) return gagal();
        var cek = function (lbl) { return hookJson({ k: 'kk1', id: idPesanan(), act: 'cek', order: j.order }).catch(function () {}).then(function () { mtStatus = lbl; kirimWA(); }); };
        window.snap.pay(j.token, {
          onSuccess: function () { h.textContent = 'Pembayaran berhasil. Membuka WhatsApp…'; cek('LUNAS (otomatis via Midtrans)'); },
          onPending: function () { h.textContent = 'Menunggu pembayaran. Status lunas tercatat otomatis setelah Anda membayar.'; cek('menunggu pembayaran (Virtual Account/QRIS)'); },
          onError: function () { gagal('Pembayaran gagal. Silakan coba lagi.'); },
          onClose: function () { gagal('Jendela pembayaran ditutup sebelum selesai. Tekan tombol lagi untuk melanjutkan.'); }
        });
      });
    }).catch(function () { gagal(); });
  }
  function salin(teks, btn) {
    var ok = function () { var t = btn.textContent; btn.textContent = 'Tersalin ✓'; setTimeout(function () { btn.textContent = t; }, 1500); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(teks).then(ok, function () {});
    else { var ta = document.createElement('textarea'); ta.value = teks; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); ok(); } catch (e) {} ta.remove(); }
  }
  function renderBayar() {
    if (!BY) return;
    var r = calc(), l = layanan();
    bookAmt = r.total && !r.konsul ? Math.ceil(r.total * BY.persen / 100 / 1000) * 1000 : 0;
    var lbl = $('#btnKirim span');
    if (!bookAmt) {
      $('#paySum').innerHTML = '<p class="mb0">Biaya mobil ukuran ekstra dihitung admin. Kirim pesanan dulu, nominal booking ' + BY.persen + '% kami kirim lewat WhatsApp.</p>';
      $('#payBox').hidden = true; $('#kirimHint').hidden = true; lbl.textContent = 'Kirim ke WhatsApp'; return;
    }
    $('#payBox').hidden = false; $('#kirimHint').hidden = false; lbl.textContent = 'Sudah bayar';
    $('#paySum').innerHTML =
      '<div class="row"><span>Total biaya' + (l === 'langganan' ? ' bulan pertama' : '') + '</span><span>' + rp(r.total) + '</span></div>' +
      '<div class="row big"><span>Booking ' + BY.persen + '%</span><b>' + rp(bookAmt) + '</b></div>' +
      '<div class="row"><span>Sisa setelah dicek</span><span>' + rp(r.total - bookAmt) + '</span></div>';
    var tabs = $$('.pay-tab'); if (!bayarVia || !$('.pay-tab[data-pay="' + bayarVia + '"]')) bayarVia = tabs[0].dataset.pay;
    pilihBayar(bayarVia);
    if (BY.qris) gambarQR(bookAmt);
    if (BY.rek) $('#rekAmt').textContent = rp(bookAmt);
    if ($('#mtAmt')) $('#mtAmt').textContent = rp(bookAmt);
  }
  if (BY) {
    $$('.pay-tab').forEach(function (b) { b.addEventListener('click', function () { pilihBayar(b.dataset.pay); }); });
    $$('[data-copy]').forEach(function (b) { b.addEventListener('click', function () { salin(b.dataset.copy, b); }); });
    if ($('#copyAmt')) $('#copyAmt').addEventListener('click', function () { salin(String(bookAmt), this); });
    $('#btnKirim').addEventListener('click', function () { kirimWA(); });
    if ($('#btnMidtrans')) $('#btnMidtrans').addEventListener('click', bayarOtomatis);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate(2)) return;
    if (BY) go(3); else kirimWA();
  });
  // Catat pesanan ke Google Sheet admin (tanpa menunggu balasan)
  var orderId = '';
  function idPesanan() {
    if (orderId) return orderId;
    var t = new Date(), p = function (x) { return ('0' + x).slice(-2); }, cs = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', r = '';
    for (var i = 0; i < 4; i++) r += cs.charAt(Math.floor(Math.random() * cs.length));
    return (orderId = 'KK-' + String(t.getFullYear()).slice(2) + p(t.getMonth() + 1) + p(t.getDate()) + '-' + r);
  }
  function kirimData(status) {
    if (!S.orderHook) return;
    try {
      fetch(S.orderHook, { method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(dataPesanan(status)) }).catch(function () {});
    } catch (e) {}
  }
  function metodeBayar() {
    if (!(BY && bookAmt)) return '';
    if (bayarVia === 'auto') return 'Midtrans';
    return bayarVia === 'qris' ? 'QRIS' : 'Transfer ' + (($('input[name=rekBank]:checked') || {}).value || (BY.rek ? BY.rek[0].bank : ''));
  }
  function dataPesanan(status) {
      var r = calc(), l = layanan(), g = function (id) { var el = $('#' + id); return el ? el.value.trim() : ''; };
      var data = {
        k: 'kk1', id: idPesanan(), status: status, nama: g('nama'),
        layanan: { langganan: 'Langganan Kilap', sekali: 'Cuci Sekali Datang', detailing: 'Salon & Perawatan', banjir: 'Pemulihan Pascabanjir' }[l] || '',
        rincian: r.rows.map(function (x) { return x[0] + (x[1] === null ? '' : ' – ' + fmt(x[1])); }).join('; '),
        jml: r.cars.length, mobil: r.cars.map(function (c, i) { return (i + 1) + '. ' + c.label + (c.ui > -1 ? ' (' + ukNama[c.ui] + ')' : ''); }).join('; '),
        maps: g('maps'), alamat: g('alamat'), tanggal: g('tanggal'), jam: g('jam'), hari: l === 'langganan' ? vals('hari').join(', ') : '',
        kondisi: g('kondisi'), sumber: g('sumber'), catatan: g('catatan'), promo: g('promo'),
        total: r.total || '', booking: BY && bookAmt ? bookAmt : '', sisa: BY && bookAmt ? r.total - bookAmt : '',
        bayar: metodeBayar()
      };
      return data;
  }
  function kirimWA() {
    kirimData(BY && bookAmt ? (bayarVia === 'auto' ? 'Dikirim ke WA' : 'Klik Sudah bayar') : 'Dikirim ke WA');
    var r = calc(), l = layanan(), g = function (id) { var el = $('#' + id); return el ? el.value.trim() : ''; };
    var namaLayanan = { langganan: 'Langganan Kilap', sekali: 'Cuci Sekali Datang', detailing: 'Salon & Perawatan', banjir: 'Pemulihan Pascabanjir' }[l];
    var tglFmt = new Date(g('tanggal') + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    var mobil = r.cars.map(function (c, i) { return (r.cars.length > 1 ? (i + 1) + '. ' : '') + c.label + (c.ui > -1 ? ' (' + ukNama[c.ui] + ')' : ''); });
    var lines = [
      '*JADWAL BARU – ' + S.brand.toUpperCase() + '*', '',
      '*ID pesanan:* ' + idPesanan(),
      '*Layanan:* ' + namaLayanan,
    ].concat(r.rows.map(function (x) { return '• ' + x[0] + (x[1] === null ? '' : ' – ' + fmt(x[1])); }))
      .concat([
        '*Perkiraan biaya:* ' + (r.total ? rp(r.total) + r.per : '-') + (r.konsul ? ' (+ mobil ekstra, harga lewat chat)' : ''),
        BY && bookAmt ? '*Booking ' + BY.persen + '%:* ' + rp(bookAmt) + ' via ' + (bayarVia === 'auto' ? 'Midtrans – ' + (mtStatus || 'menunggu') : (bayarVia === 'qris' ? 'QRIS' : 'transfer ' + (($('input[name=rekBank]:checked') || {}).value || BY.rek[0].bank)) + ' (bukti bayar terlampir)') : null,
        BY && bookAmt ? '*Sisa setelah dicek:* ' + rp(r.total - bookAmt) : null,
        BY && !bookAmt ? '*Booking:* menunggu nominal dari admin' : null, '',
        '*Nama:* ' + g('nama'),
        g('maps') ? '*Lokasi:* ' + g('maps') : null,
        g('alamat') ? '*Alamat:* ' + g('alamat') : null,
        '*Mobil (' + r.cars.length + '):* ' + (mobil.length > 1 ? '\n' + mobil.join('\n') : mobil[0]),
        '*' + (l === 'langganan' ? 'Mulai' : 'Jadwal') + ':* ' + tglFmt + ', jam ' + g('jam'),
        l === 'langganan' ? '*Hari rutin:* ' + vals('hari').join(', ') : null,
        '*Fasilitas lokasi:* ' + g('kondisi'),
        g('sumber') ? '*Kenal dari:* ' + g('sumber') : null,
        g('catatan') ? '*Catatan:* ' + g('catatan') : null,
        g('promo') ? '*Kode promo:* ' + g('promo') : null,
      ]).filter(function (x) { return x !== null; });
    var url = 'https://wa.me/' + S.whatsapp + '?text=' + encodeURIComponent(lines.join('\n'));
    var w = window.open(url, '_blank');
    if (w) w.opener = null; else location.href = url;
  }

  // Awal: layanan dari URL (?layanan=...&paket=...&ukuran=...) atau default cuci sekali datang
  var pre = q.get('layanan');
  var radio = pre && $('input[name=layanan][value="' + pre + '"]');
  if (radio) radio.checked = true;
  renderStep2();
  renderCars();
  if (radio) form.scrollIntoView({ block: 'start' });
})();
