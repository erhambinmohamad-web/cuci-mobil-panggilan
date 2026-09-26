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
  var HARI = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  var step = 1;
  var q = new URLSearchParams(location.search);

  function opt(type, name, value, title, small, price, checked) {
    return '<label class="opt"><input type="' + type + '" name="' + name + '" value="' + value + '"' + (checked ? ' checked' : '') + '>' +
      '<span class="box"><b>' + title + '</b>' + (small ? '<small>' + small + '</small>' : '') + (price ? '<span class="p">' + price + '</span>' : '') + '</span></label>';
  }
  function sizeOpts(pre) {
    return '<fieldset class="fieldset"><legend>Ukuran mobil</legend><div class="opt-grid c4">' +
      S.ukuran.map(function (u, i) { return opt('radio', 'ukuran', i, u.nama, u.contoh, '', pre === u.id); }).join('') + '</div></fieldset>';
  }
  function layanan() { var r = $('input[name=layanan]:checked'); return r ? r.value : ''; }
  function val(name) { var r = $('input[name=' + name + ']:checked'); return r ? r.value : ''; }
  function vals(name) { return $$('input[name=' + name + ']:checked').map(function (x) { return x.value; }); }

  function renderStep2() {
    var l = layanan(), h = '', pk = q.get('paket'), uk = q.get('ukuran');
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
        '</div></fieldset>' + sizeOpts(uk);
    } else if (l === 'banjir') {
      h = sizeOpts(uk).replace('Ukuran mobil</legend>', 'Ukuran mobil <small class="muted">(lokasi perlu listrik min. 2.000 watt)</small></legend>') +
        '<fieldset class="fieldset"><legend>Setinggi apa air masuk ke kabin?</legend><div class="opt-grid c3">' +
        H.banjir.level.map(function (lv, i) { return opt('radio', 'level', i, lv, H.banjir.durasi[i], ''); }).join('') + '</div></fieldset>';
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

  // Hitung ringkasan
  function calc() {
    var l = layanan(), rows = [], total = 0, konsul = false, uk = val('ukuran');
    var ui = uk === '' ? -1 : +uk;
    if (l === 'langganan') {
      var p = H.langganan.filter(function (x) { return x.id === val('paket'); })[0];
      if (p) { rows.push([p.nama + ' (' + p.frekuensi + ')', p.harga, '/bulan']); total += p.harga; }
    } else if (l === 'sekali') {
      var s = H.sekaliCuci.filter(function (x) { return x.id === val('paket'); })[0];
      if (s) { rows.push(['Cuci sekali datang – ' + s.nama, s.harga]); total += s.harga; }
      vals('addon').forEach(function (id) { var a = H.addOn.filter(function (x) { return x.id === id; })[0]; rows.push(['+ ' + a.nama, a.harga]); total += a.harga; });
    } else if (l === 'detailing') {
      vals('det').forEach(function (id) {
        var d = H.detailing.filter(function (x) { return x.id === id; })[0];
        if (ui < 0) rows.push([d.nama, null]);
        else if (ui > 2) { rows.push([d.nama + ' (' + S.ukuran[3].nama + ')', 'Lewat chat']); konsul = true; }
        else { rows.push([d.nama + ' (' + S.ukuran[ui].nama + ')', d.harga[ui]]); total += d.harga[ui]; }
      });
    } else if (l === 'banjir') {
      var lv = val('level');
      if (ui > 2) { rows.push(['Pascabanjir (' + S.ukuran[3].nama + ')', 'Lewat chat']); konsul = true; }
      else if (ui > -1 && lv !== '') { var hb = H.banjir.harga[ui][+lv]; rows.push(['Pascabanjir – ' + H.banjir.level[+lv].toLowerCase() + ' (' + S.ukuran[ui].nama + ')', hb]); total += hb; }
    }
    return { rows: rows, total: total, konsul: konsul, per: l === 'langganan' ? '/bulan' : '' };
  }

  function update() {
    var r = calc();
    $('#sumBody').innerHTML = r.rows.length ? r.rows.map(function (x) {
      return '<div class="row"><span>' + x[0] + '</span><span>' + (x[1] === null ? 'pilih ukuran' : typeof x[1] === 'number' ? rp(x[1]) : x[1]) + '</span></div>';
    }).join('') : '<p class="empty">Belum ada layanan yang dipilih.</p>';
    $('#sumTotal').textContent = r.total ? rp(r.total) + r.per + (r.konsul ? ' + harga lewat chat' : '') : (r.konsul ? 'Lewat chat' : '—');
  }

  function err(n, msg) { var e = $('[data-err="' + n + '"]'); if (msg) e.textContent = msg; e.classList.toggle('on', !!msg || msg === undefined); }
  function clearErr() { $$('.err-msg').forEach(function (e) { e.classList.remove('on'); }); $$('.input.err').forEach(function (e) { e.classList.remove('err'); }); }

  function validate(n) {
    clearErr();
    var l = layanan();
    if (n === 1 && !l) { err(1); return false; }
    if (n === 2) {
      if ((l === 'langganan' || l === 'sekali') && !val('paket')) return err(2, 'Pilih salah satu paket dulu.'), false;
      if (l === 'detailing' && !vals('det').length) return err(2, 'Centang minimal satu perawatan.'), false;
      if ((l === 'detailing' || l === 'banjir') && val('ukuran') === '') return err(2, 'Pilih ukuran mobil.'), false;
      if (l === 'banjir' && val('level') === '') return err(2, 'Pilih setinggi apa air masuk ke kabin.'), false;
    }
    if (n === 3) {
      var ok = true;
      $$('[data-p="3"] [required]').forEach(function (f) { if (!f.value.trim()) { f.classList.add('err'); ok = false; } });
      var hp = $('#hp'); if (hp.value && !/^(\+?62|0)8\d{7,12}$/.test(hp.value.replace(/[\s-]/g, ''))) { hp.classList.add('err'); ok = false; err(3, 'Nomor WhatsApp belum benar. Contoh: 081234567890.'); return false; }
      if (l === 'langganan') {
        var max = +$('#hariList').dataset.max || 1;
        if (vals('hari').length !== max) { err(3, 'Centang tepat ' + max + ' hari rutin sesuai paket.'); return false; }
      }
      if (!ok) { err(3, 'Isi dulu kolom yang bertanda *.'); return false; }
    }
    return true;
  }

  function go(n) {
    step = n;
    $$('.panel').forEach(function (p) { p.classList.toggle('on', +p.dataset.p === n); });
    $$('.stepper li').forEach(function (li) { li.classList.toggle('on', +li.dataset.s <= n); });
    if (n === 3) renderHari();
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  form.addEventListener('change', function (e) {
    var t = e.target;
    if (t.name === 'layanan') renderStep2();
    if (t.name === 'det') syncComplete();
    if (t.name === 'hari') {
      var max = +$('#hariList').dataset.max || 1, sel = vals('hari');
      if (sel.length > max) t.checked = false;
    }
    if (t.classList.contains('input')) t.classList.remove('err');
    update();
  });
  $$('[data-next]').forEach(function (b) { b.addEventListener('click', function () { if (validate(step)) go(step + 1); }); });
  $$('[data-prev]').forEach(function (b) { b.addEventListener('click', function () { clearErr(); go(step - 1); }); });

  var tgl = $('#tanggal');
  var d = new Date(); tgl.min = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate(3)) return;
    var r = calc(), l = layanan(), g = function (id) { return $('#' + id).value.trim(); };
    var namaLayanan = { langganan: 'Langganan Kilap', sekali: 'Cuci Sekali Datang', detailing: 'Salon & Perawatan', banjir: 'Pemulihan Pascabanjir' }[l];
    var tglFmt = new Date(g('tanggal') + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    var lines = [
      '*JADWAL BARU – ' + S.brand.toUpperCase() + '*', '',
      '*Layanan:* ' + namaLayanan,
    ].concat(r.rows.map(function (x) { return '• ' + x[0] + (typeof x[1] === 'number' ? ' – ' + rp(x[1]) : x[1] ? ' – ' + x[1] : ''); }))
      .concat([
        '*Perkiraan biaya:* ' + (r.total ? rp(r.total) + r.per : '-') + (r.konsul ? ' (+ mobil ekstra, harga lewat chat)' : ''), '',
        '*Nama:* ' + g('nama'),
        '*WhatsApp:* ' + g('hp'),
        '*Alamat:* ' + g('alamat'),
        '*Wilayah:* ' + g('kota'),
        g('maps') ? '*Maps:* ' + g('maps') : null,
        g('merk') ? '*Mobil:* ' + g('merk') + (g('nopol') ? ' (' + g('nopol') + ')' : '') : null,
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
  });

  // Prefill dari URL (?layanan=...&paket=...&ukuran=...)
  var pre = q.get('layanan');
  if (pre) {
    var radio = $('input[name=layanan][value="' + pre + '"]');
    if (radio) { radio.checked = true; renderStep2(); if (form.dataset.jump !== 'no') go(2); }
  }
})();
