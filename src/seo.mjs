// Konten SEO: halaman per wilayah + artikel yang menargetkan kata kunci populer.
// Kata kunci utama (riset Google Trends & saran pencarian Google, Sep 2026):
// cuci mobil panggilan [kota], salon mobil panggilan, poles mobil panggilan,
// cuci mobil di rumah / ke rumah, cuci mobil home service, cuci interior & jok mobil, fogging mobil.

export const areas = [
  {
    nama: 'Jakarta Selatan', slug: 'cuci-mobil-panggilan-jakarta-selatan',
    sekitar: ['Kebayoran Baru', 'Pondok Indah', 'Cilandak', 'Kemang', 'Tebet', 'Pancoran', 'Pasar Minggu', 'Jagakarsa', 'Pesanggrahan'],
    intro: 'Banyak pemilik mobil di Jakarta Selatan tinggal di apartemen, townhouse, atau rumah dengan carport sempit. Tim kami terbiasa bekerja di ruang terbatas, termasuk area cuci basement apartemen yang diizinkan pengelola.',
  },
  {
    nama: 'Jakarta Timur', slug: 'cuci-mobil-panggilan-jakarta-timur',
    sekitar: ['Cibubur', 'Ciracas', 'Duren Sawit', 'Jatinegara', 'Rawamangun', 'Cakung', 'Kramat Jati', 'Pulo Gadung'],
    intro: 'Dari perumahan di Cibubur sampai kawasan padat di Jatinegara, kami datang ke rumah Anda sehingga mobil tidak perlu ikut macet menuju car wash.',
  },
  {
    nama: 'Jakarta Barat', slug: 'cuci-mobil-panggilan-jakarta-barat',
    sekitar: ['Kebon Jeruk', 'Puri Indah', 'Kembangan', 'Grogol', 'Palmerah', 'Cengkareng', 'Kalideres', 'Taman Palem'],
    intro: 'Untuk kawasan Puri, Kebon Jeruk, hingga Cengkareng, layanan cuci dan salon mobil kami dikerjakan langsung di garasi atau halaman rumah Anda.',
  },
  {
    nama: 'Jakarta Utara', slug: 'cuci-mobil-panggilan-jakarta-utara',
    sekitar: ['Kelapa Gading', 'Sunter', 'Pluit', 'Pantai Indah Kapuk', 'Penjaringan', 'Tanjung Priok', 'Cilincing'],
    intro: 'Udara lembap dan dekat laut membuat cat dan kaca mobil di Jakarta Utara lebih cepat kusam dan berjamur. Cuci rutin dan perawatan exterior membantu menjaga kilap cat lebih lama.',
  },
  {
    nama: 'Jakarta Pusat', slug: 'cuci-mobil-panggilan-jakarta-pusat',
    sekitar: ['Menteng', 'Kemayoran', 'Gambir', 'Tanah Abang', 'Cempaka Putih', 'Senen', 'Sawah Besar'],
    intro: 'Di tengah kota yang serba padat, mencari waktu ke car wash itu sulit. Kami datang ke rumah atau kantor Anda di Jakarta Pusat sesuai jadwal yang Anda pilih.',
  },
  {
    nama: 'Depok', slug: 'cuci-mobil-panggilan-depok',
    sekitar: ['Margonda', 'Beji', 'Cinere', 'Sawangan', 'Cimanggis', 'Sukmajaya', 'Pancoran Mas', 'Limo'],
    intro: 'Warga Depok yang pulang-pergi ke Jakarta setiap hari bisa menyerahkan urusan cuci mobil kepada kami. Pilih jadwal pagi sebelum berangkat atau di akhir pekan.',
  },
  {
    nama: 'Bogor', slug: 'cuci-mobil-panggilan-bogor',
    sekitar: ['Bogor Kota', 'Sentul', 'Cibinong', 'Cileungsi', 'Bojonggede', 'Citeureup', 'Gunung Putri'],
    intro: 'Curah hujan Bogor yang tinggi membuat mobil cepat kotor dan kaca mudah berjamur. Cuci berlangganan dan window detailing adalah kombinasi yang paling banyak dibutuhkan di sini.',
  },
  {
    nama: 'Tangerang', slug: 'cuci-mobil-panggilan-tangerang',
    sekitar: ['Gading Serpong', 'Karawaci', 'Cikokol', 'Cipondoh', 'Ciledug', 'Citra Raya', 'Kelapa Dua'],
    intro: 'Kawasan perumahan besar seperti Gading Serpong dan Karawaci umumnya punya carport yang lega — cocok untuk salon mobil lengkap langsung di rumah.',
  },
  {
    nama: 'Tangerang Selatan', slug: 'cuci-mobil-panggilan-tangerang-selatan',
    sekitar: ['BSD City', 'Bintaro Jaya', 'Alam Sutera', 'Serpong', 'Pamulang', 'Ciputat', 'Pondok Aren'],
    intro: 'Untuk BSD, Bintaro, Alam Sutera, dan sekitarnya, tim kami melayani cuci mobil rutin di kluster perumahan maupun di apartemen yang menyediakan area cuci.',
  },
  {
    nama: 'Bekasi', slug: 'cuci-mobil-panggilan-bekasi',
    sekitar: ['Summarecon Bekasi', 'Harapan Indah', 'Galaxy', 'Jatiasih', 'Rawalumbu', 'Tambun', 'Cikarang'],
    intro: 'Dari Summarecon Bekasi sampai Cikarang, cuci mobil panggilan menghemat waktu akhir pekan Anda — tidak perlu antre di car wash yang penuh setiap Sabtu dan Minggu.',
  },
];

export const extraPosts = (c, rp) => {
  const H = c.harga;
  const d = Object.fromEntries(H.detailing.map((x) => [x.id, x]));
  const fog = H.addOn.find((a) => a.id === 'fogging');
  return [
    {
      slug: 'harga-salon-mobil-dan-poles-mobil-panggilan',
      title: 'Harga Salon Mobil & Poles Mobil Panggilan 2026 (Daftar Lengkap)',
      date: '2026-09-26',
      excerpt: 'Daftar harga cuci mobil panggilan, poles mobil, salon interior, dan complete detailing per ukuran mobil — plus cara memilih paket yang pas.',
      body: `
<p>Sebelum memesan salon mobil atau poles mobil panggilan, wajar kalau Anda ingin tahu kisaran harganya dulu. Berikut daftar harga ${c.brand} yang berlaku untuk area Jabodetabek. Harga sudah termasuk tenaga, produk, peralatan, dan transport.</p>
<h2>Harga cuci mobil panggilan</h2>
<ul>
<li>Cuci sekali datang (Basic): <b>${rp(H.sekaliCuci[0].harga)}</b> — cuci bodi, interior, vacuum, semir ban.</li>
<li>Paket Standard sampai Elite: <b>${rp(H.sekaliCuci[1].harga)} – ${rp(H.sekaliCuci[3].harga)}</b>.</li>
<li>Cuci berlangganan: mulai <b>${rp(H.langganan[0].harga)}/bulan</b> untuk 1x cuci per minggu.</li>
</ul>
<h2>Harga poles mobil (exterior detailing)</h2>
<p>Poles mobil panggilan mengangkat jamur, water spot, dan baret halus, lalu melapisi cat dengan sealant. Harganya <b>${rp(d.exterior.harga[0])}</b> (small), <b>${rp(d.exterior.harga[1])}</b> (medium), dan <b>${rp(d.exterior.harga[2])}</b> (large).</p>
<h2>Harga salon mobil interior</h2>
<p>Cuci interior dan jok mobil dengan steam dan extractor: <b>${rp(d.interior.harga[0])} – ${rp(d.interior.harga[2])}</b> sesuai ukuran mobil.</p>
<h2>Harga salon mobil lengkap (complete detailing)</h2>
<p>Paket lengkap interior, exterior, kaca, mesin, serta ban & velg: <b>${rp(d.complete.harga[0])}</b> (small) sampai <b>${rp(d.complete.harga[2])}</b> (large). Lebih hemat dibanding memesan satu per satu.</p>
<h2>Cara memilih paket</h2>
<ol>
<li><b>Mobil hanya berdebu?</b> Cukup cuci reguler atau berlangganan.</li>
<li><b>Cat kusam, ada jamur atau baret halus?</b> Pilih poles mobil (exterior detailing).</li>
<li><b>Kabin bau apek atau jok bernoda?</b> Pilih salon interior, bisa ditambah fogging.</li>
<li><b>Mobil bekas atau lama tidak dirawat?</b> Complete detailing sekaligus.</li>
</ol>
<p>Ukuran mobil: small (Agya, Brio, Jazz), medium (Avanza, Xpander, HR-V), large (Fortuner, Pajero, Alphard). Untuk mobil mewah atau ukuran ekstra, harga dikonfirmasi lewat WhatsApp.</p>`,
    },
    {
      slug: 'fogging-mobil-manfaat-harga-berapa-bulan-sekali',
      title: 'Fogging Mobil: Manfaat, Harga, dan Berapa Bulan Sekali Sebaiknya Dilakukan',
      date: '2026-09-26',
      excerpt: 'Apa itu fogging mobil, apakah ampuh untuk kecoa dan bau apek, berapa lama prosesnya, dan seberapa sering perlu dilakukan.',
      body: `
<p><b>Fogging mobil</b> adalah penyemprotan cairan disinfektan dalam bentuk kabut halus ke seluruh kabin. Kabut ini menjangkau sela jok, ventilasi AC, dan bawah dashboard yang sulit dibersihkan dengan lap biasa.</p>
<h2>Manfaat fogging mobil</h2>
<ul>
<li>Mengurangi bakteri dan jamur di kabin.</li>
<li>Menghilangkan bau apek, bau rokok, atau bau makanan.</li>
<li>Membantu mengusir serangga kecil seperti kecoa (untuk sarang yang parah, kabin perlu dibersihkan menyeluruh lebih dulu).</li>
</ul>
<h2>Berapa lama prosesnya?</h2>
<p>Sekitar 30 menit, termasuk waktu mendiamkan kabin tertutup lalu membuka pintu agar sirkulasi udara kembali normal.</p>
<h2>Berapa bulan sekali?</h2>
<p>Untuk pemakaian harian, fogging <b>3–6 bulan sekali</b> sudah cukup. Lakukan lebih sering bila mobil sering membawa anak kecil, hewan peliharaan, atau baru terkena banjir.</p>
<h2>Harga fogging mobil</h2>
<p>Di ${c.brand}, fogging disinfektan <b>${rp(fog.harga)}</b> dan bisa ditambahkan ke paket cuci mana pun. Pelanggan cuci berlangganan mendapat diskon fogging hingga ${Math.max(...c.harga.langganan.map((x) => x.diskonFogging))}%.</p>
<p>Tips: fogging paling efektif dilakukan <b>setelah</b> kabin dibersihkan (vacuum dan lap). Kalau kabin masih kotor, bau akan kembali lagi dalam waktu singkat.</p>`,
    },
    {
      slug: 'beda-poles-mobil-dan-coating-mobil',
      title: 'Poles Mobil vs Coating Mobil: Apa Bedanya dan Mana yang Anda Butuhkan?',
      date: '2026-09-26',
      excerpt: 'Poles, wax, sealant, dan coating sering dianggap sama. Ini perbedaan fungsi, daya tahan, dan kapan masing-masing dibutuhkan.',
      body: `
<p>Istilah <b>poles mobil</b> dan <b>coating mobil</b> sering tertukar. Padahal keduanya punya fungsi berbeda dan biasanya saling melengkapi.</p>
<h2>Poles mobil: memperbaiki permukaan cat</h2>
<p>Poles (polishing) mengikis sangat tipis lapisan clear coat untuk menghilangkan baret halus, swirl, water spot, dan cat kusam. Hasilnya cat kembali rata dan mengkilap.</p>
<h2>Wax dan sealant: melindungi sementara</h2>
<p>Setelah dipoles, cat perlu dilapisi. Wax memberi kilap hangat dan bertahan beberapa minggu. Sealant (lapisan sintetis) lebih awet, umumnya beberapa bulan.</p>
<h2>Coating: perlindungan jangka panjang</h2>
<p>Ceramic coating membentuk lapisan keras yang bisa bertahan jauh lebih lama dan membuat air serta kotoran mudah luntur. Coating tetap harus didahului poles, karena coating akan "mengunci" kondisi cat di bawahnya — termasuk baretnya.</p>
<h2>Mana yang Anda butuhkan?</h2>
<ul>
<li><b>Cat kusam atau berjamur:</b> poles + sealant sudah cukup untuk kebanyakan mobil harian.</li>
<li><b>Mobil baru atau ingin perlindungan bertahun-tahun:</b> poles ringan lalu coating.</li>
<li><b>Apa pun pilihannya:</b> cuci rutin dengan sampo pH netral agar lapisan pelindung awet.</li>
</ul>
<p>Layanan exterior detailing ${c.brand} mencakup dekontaminasi, poles, dan sealant protection, dikerjakan langsung di rumah Anda. Harga mulai ${rp(H.detailing.find((x) => x.id === 'exterior').harga[0])}.</p>`,
    },
  ];
};
