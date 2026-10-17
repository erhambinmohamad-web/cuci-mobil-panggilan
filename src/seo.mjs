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
  {
    nama: 'Surabaya', slug: 'cuci-mobil-panggilan-surabaya',
    sekitar: ['Darmo', 'Citraland', 'Pakuwon City', 'Gubeng', 'Sukolilo', 'Rungkut', 'Mulyorejo', 'Wiyung', 'Tegalsari', 'Kenjeran'],
    intro: 'Panas terik dan udara pesisir Surabaya membuat cat cepat kusam dan kaca mudah berjamur. Kami melayani 31 kecamatan di Surabaya Pusat, Utara, Timur, Selatan, dan Barat. Dari perumahan Citraland dan Pakuwon City sampai kawasan Darmo dan Rungkut, tim kami datang ke garasi Anda, jadi mobil tidak perlu antre di car wash.',
    wilayah: [
      {
        nama: 'Surabaya Pusat', slug: 'cuci-mobil-panggilan-surabaya-pusat',
        kecamatan: ['Bubutan', 'Genteng', 'Simokerto', 'Tegalsari'],
        kawasan: ['Tunjungan', 'Ketabang', 'Embong Kaliasin', 'Kedungdoro'],
        intro: 'Di pusat kota yang padat dan serba sibuk, parkir di car wash sering memakan waktu. Tim kami datang ke rumah, ruko, atau kantor Anda di Genteng, Tegalsari, Bubutan, dan Simokerto, jadi mobil bisa dicuci saat Anda bekerja.',
      },
      {
        nama: 'Surabaya Utara', slug: 'cuci-mobil-panggilan-surabaya-utara',
        kecamatan: ['Bulak', 'Kenjeran', 'Krembangan', 'Pabean Cantian', 'Semampir'],
        kawasan: ['Kenjeran', 'Tanjung Perak', 'Kedung Cowek', 'Sukolilo Baru'],
        intro: 'Angin laut di kawasan Kenjeran dan Tanjung Perak membawa uap garam yang menempel di cat, kaca, dan velg. Cuci rutin dan lapisan sealant membantu mencegah karat dan cat kusam lebih cepat.',
      },
      {
        nama: 'Surabaya Timur', slug: 'cuci-mobil-panggilan-surabaya-timur',
        kecamatan: ['Gubeng', 'Gunung Anyar', 'Mulyorejo', 'Rungkut', 'Sukolilo', 'Tambaksari', 'Tenggilis Mejoyo'],
        kawasan: ['Pakuwon City', 'Manyar', 'Dharmahusada', 'Klampis', 'Kalijudan', 'MERR'],
        intro: 'Perumahan di Pakuwon City, Manyar, dan sepanjang MERR umumnya punya carport yang cukup lega untuk salon mobil lengkap. Untuk apartemen di Gubeng dan Sukolilo, kami bekerja di area cuci yang diizinkan pengelola.',
      },
      {
        nama: 'Surabaya Selatan', slug: 'cuci-mobil-panggilan-surabaya-selatan',
        kecamatan: ['Dukuh Pakis', 'Gayungan', 'Jambangan', 'Karang Pilang', 'Sawahan', 'Wiyung', 'Wonocolo', 'Wonokromo'],
        kawasan: ['Darmo', 'Ketintang', 'Jemursari', 'Graha Famili', 'Kebraon', 'Dukuh Kupang'],
        intro: 'Dari rumah-rumah lama di kawasan Darmo sampai perumahan baru di Wiyung dan Karang Pilang, cuci mobil panggilan menghemat waktu Anda di akhir pekan tanpa perlu antre di car wash.',
      },
      {
        nama: 'Surabaya Barat', slug: 'cuci-mobil-panggilan-surabaya-barat',
        kecamatan: ['Asemrowo', 'Benowo', 'Lakarsantri', 'Pakal', 'Sambikerep', 'Sukomanunggal', 'Tandes'],
        kawasan: ['Citraland', 'Pakuwon Indah', 'Darmo Permai', 'Graha Natura', 'Lontar', 'Manukan'],
        intro: 'Kawasan perumahan besar di Citraland, Pakuwon Indah, dan Darmo Permai cocok untuk perawatan lengkap di rumah. Debu dari jalan utama dan proyek baru di Surabaya Barat membuat cuci berlangganan jadi pilihan yang praktis.',
      },
    ],
  },
  {
    nama: 'Gresik', slug: 'cuci-mobil-panggilan-gresik',
    sekitar: ['Gresik Kota Baru (GKB)', 'Kebomas', 'Kota Baru Driyorejo', 'Menganti', 'Manyar', 'Cerme', 'Driyorejo', 'Bungah'],
    kecamatan: ['Balongpanggang', 'Benjeng', 'Bungah', 'Cerme', 'Driyorejo', 'Duduksampeyan', 'Dukun', 'Gresik', 'Kebomas', 'Kedamean', 'Manyar', 'Menganti', 'Panceng', 'Sidayu', 'Ujungpangkah', 'Wringinanom'],
    intro: 'Debu kawasan industri dan udara pesisir membuat mobil di Gresik cepat kotor, cat kusam, dan kaca berjamur. Dari perumahan GKB di Kebomas, Kota Baru Driyorejo, sampai Menganti dan Manyar, tim kami datang ke rumah Anda, jadi mobil tetap terawat tanpa harus antre di car wash.',
  },
];

export const extraPosts = (c, rp) => {
  const H = c.harga;
  const d = Object.fromEntries(H.detailing.map((x) => [x.id, x]));
  const fog = H.addOn.find((a) => a.id === 'fogging');
  return [
    {
      slug: 'cuci-mobil-panggilan-surabaya',
      title: 'Cuci Mobil Panggilan Surabaya & Gresik: Area, Harga, dan Tips Merawat Mobil',
      date: '2026-10-17',
      excerpt: 'Panduan cuci dan salon mobil panggilan di Surabaya dan Gresik: kecamatan yang dilayani, kisaran harga, dan cara menjaga cat tetap kilap di cuaca panas dan udara pesisir.',
      body: `
<p>Surabaya terkenal panas. Suhu siang yang tinggi, debu jalan, dan udara pesisir di kawasan utara membuat cat mobil cepat kusam, kaca berjamur, dan kabin terasa pengap. Cuci mobil panggilan memudahkan perawatan rutin tanpa harus keluar rumah di tengah terik.</p>
<h2>Area cuci mobil panggilan di Surabaya</h2>
<p>${c.brand} melayani <b>seluruh 31 kecamatan</b> di Kota Surabaya:</p>
<ul>
<li><a href="/cuci-mobil-panggilan-surabaya-pusat/">Surabaya Pusat</a>: Bubutan, Genteng, Simokerto, Tegalsari.</li>
<li><a href="/cuci-mobil-panggilan-surabaya-utara/">Surabaya Utara</a>: Bulak, Kenjeran, Krembangan, Pabean Cantian, Semampir.</li>
<li><a href="/cuci-mobil-panggilan-surabaya-timur/">Surabaya Timur</a>: Gubeng, Gunung Anyar, Mulyorejo, Rungkut, Sukolilo, Tambaksari, Tenggilis Mejoyo.</li>
<li><a href="/cuci-mobil-panggilan-surabaya-selatan/">Surabaya Selatan</a>: Dukuh Pakis, Gayungan, Jambangan, Karang Pilang, Sawahan, Wiyung, Wonocolo, Wonokromo.</li>
<li><a href="/cuci-mobil-panggilan-surabaya-barat/">Surabaya Barat</a>: Asemrowo, Benowo, Lakarsantri, Pakal, Sambikerep, Sukomanunggal, Tandes.</li>
</ul>
<h2>Harga cuci & salon mobil panggilan Surabaya</h2>
<p>Harga di Surabaya sama dengan area lain dan sudah termasuk tenaga, bahan, peralatan, dan ongkos datang:</p>
<ul>
<li>Cuci sekali datang mulai <b>${rp(H.sekaliCuci[0].harga)}</b>.</li>
<li>Langganan ${H.langganan[0].nama} mulai <b>${rp(H.langganan[0].harga)}/bulan</b>.</li>
<li>Poles & proteksi cat mulai <b>${rp(d.exterior.harga[0])}</b>, salon interior & jok mulai <b>${rp(d.interior.harga[0])}</b>.</li>
<li>Salon mobil lengkap mulai <b>${rp(d.complete.harga[0])}</b>.</li>
</ul>
<h2>Tips merawat mobil di cuaca Surabaya</h2>
<ol>
<li><b>Jangan cuci di bawah terik siang.</b> Air sampo cepat mengering dan meninggalkan bintik. Pilih pagi atau sore hari.</li>
<li><b>Lapisi cat dengan sealant atau wax.</b> Lapisan pelindung mengurangi efek panas matahari dan uap garam.</li>
<li><b>Bilas velg dan kolong lebih sering</b> bila sering melintas di kawasan pesisir seperti Kenjeran dan Tanjung Perak.</li>
<li><b>Jaga kabin tetap sejuk dan kering.</b> Pakai pelindung dashboard dan buka jendela sebentar setelah mobil dijemur.</li>
<li><b>Hapus jamur kaca secara berkala</b> agar pandangan tetap jelas saat hujan deras di musim penghujan.</li>
</ol>
<h2>Juga melayani Gresik</h2>
<p>Tim yang sama juga menjangkau <a href="/cuci-mobil-panggilan-gresik/">Gresik</a>: Gresik Kota Baru (GKB), Kebomas, Kota Baru Driyorejo, Menganti, Manyar, Cerme, dan kecamatan lain di daratan Kabupaten Gresik, dengan harga yang sama.</p>
<p>Siap menjadwalkan? <a href="/pesan/">Pesan lewat form</a>, bagikan lokasi Anda, dan tim kami datang sesuai jadwal.</p>`,
    },
    {
      slug: 'harga-salon-mobil-dan-poles-mobil-panggilan',
      title: 'Harga Salon Mobil & Poles Mobil Panggilan 2026 (Daftar Lengkap)',
      date: '2026-09-26',
      excerpt: 'Daftar harga cuci mobil panggilan, poles mobil, salon interior, dan salon lengkap per ukuran mobil, plus cara memilih paket yang pas.',
      body: `
<p>Sebelum memesan salon mobil atau poles mobil panggilan, wajar kalau Anda ingin tahu kisaran harganya dulu. Berikut daftar harga ${c.brand} yang berlaku di semua area layanan kami, Jabodetabek, Surabaya, maupun Gresik. Harga sudah termasuk tenaga, produk, peralatan, dan transport.</p>
<h2>Harga cuci mobil panggilan</h2>
<ul>
<li>Cuci sekali datang paket ${H.sekaliCuci[0].nama}: <b>${rp(H.sekaliCuci[0].harga)}</b>, berisi ${H.sekaliCuci[0].isi.join(', ').toLowerCase()}.</li>
<li>Paket ${H.sekaliCuci[1].nama} sampai ${H.sekaliCuci[3].nama}: <b>${rp(H.sekaliCuci[1].harga)} – ${rp(H.sekaliCuci[3].harga)}</b>.</li>
<li>Langganan ${H.langganan[0].nama}: <b>${rp(H.langganan[0].harga)}/bulan</b> untuk ${H.langganan[0].frekuensi.replace(' / ', ' per ')}.</li>
</ul>
<h2>Harga poles mobil</h2>
<p>Poles mobil panggilan mengangkat bintik air dan menyamarkan baret halus, lalu melapisi cat dengan sealant. Harganya <b>${rp(d.exterior.harga[0])}</b> (mobil kecil), <b>${rp(d.exterior.harga[1])}</b> (sedang), dan <b>${rp(d.exterior.harga[2])}</b> (besar).</p>
<h2>Harga salon mobil interior</h2>
<p>Jok, karpet, dan plafon dicuci dengan uap dan mesin extractor: <b>${rp(d.interior.harga[0])} – ${rp(d.interior.harga[2])}</b> sesuai ukuran mobil.</p>
<h2>Harga salon mobil lengkap</h2>
<p>Kabin, cat, kaca, ruang mesin, serta ban & velg sekaligus: <b>${rp(d.complete.harga[0])}</b> (mobil kecil) sampai <b>${rp(d.complete.harga[2])}</b> (besar). Lebih murah dibanding memesan satu per satu.</p>
<h2>Cara memilih paket</h2>
<ol>
<li><b>Mobil hanya berdebu?</b> Cukup cuci sekali datang atau langganan.</li>
<li><b>Cat kusam, ada bintik air atau baret halus?</b> Pilih poles & proteksi cat.</li>
<li><b>Kabin bau apek atau jok bernoda?</b> Pilih salon interior, bisa ditambah fogging.</li>
<li><b>Mobil bekas atau lama tidak dirawat?</b> Salon mobil lengkap sekaligus.</li>
</ol>
<p>Ukuran mobil: kecil (${c.ukuran[0].contoh.split('mis. ')[1]}), sedang (${c.ukuran[1].contoh.split('mis. ')[1]}), besar (${c.ukuran[2].contoh.split('mis. ')[1]}). Untuk mobil mewah atau ukuran ekstra, harga dikonfirmasi lewat WhatsApp.</p>`,
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
<p>Di ${c.brand}, fogging disinfektan <b>${rp(fog.harga)}</b> dan bisa ditambahkan ke paket cuci mana pun. Pelanggan langganan Kilap mendapat diskon fogging hingga ${Math.max(...c.harga.langganan.map((x) => x.diskonFogging))}%.</p>
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
<p>Layanan poles & proteksi cat ${c.brand} mencakup pembersihan kontaminan, poles, dan sealant, dikerjakan langsung di rumah Anda. Harga mulai ${rp(H.detailing.find((x) => x.id === 'exterior').harga[0])}.</p>`,
    },
  ];
};
