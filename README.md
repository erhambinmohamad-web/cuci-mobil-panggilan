# KlikKilap — Situs Cuci Mobil Panggilan & Salon Mobil

Situs resmi **KlikKilap** ([klikkilap.com](https://klikkilap.com)): cuci mobil panggilan dan salon mobil yang datang ke rumah pelanggan di **Jabodetabek, Surabaya, dan Gresik**.

- Situs statis, dibangun dengan Node.js tanpa dependensi, di-hosting gratis di **GitHub Pages**.
- Pesanan masuk ke **WhatsApp** 0858-8801-0614.
- Booking 30% dibayar lewat **QRIS (nominal otomatis)** atau **transfer bank**.
- Hampir semua data cukup diubah di **satu file: `site.config.json`**.

---

## Daftar isi

1. [Halaman situs](#1-halaman-situs)
2. [Fitur utama](#2-fitur-utama)
3. [Struktur folder](#3-struktur-folder)
4. [Mengubah data situs (`site.config.json`)](#4-mengubah-data-situs-siteconfigjson)
5. [Pengaturan pembayaran: booking, QRIS, rekening](#5-pengaturan-pembayaran-booking-qris-rekening)
6. [Menambah atau mengubah area layanan](#6-menambah-atau-mengubah-area-layanan)
7. [Mengubah teks halaman & artikel](#7-mengubah-teks-halaman--artikel)
8. [Cara deploy (GitHub Pages)](#8-cara-deploy-github-pages)
9. [Domain sendiri](#9-domain-sendiri)
10. [Pratinjau di komputer](#10-pratinjau-di-komputer)
11. [SEO](#11-seo)
12. [Profil luar situs (Google, WhatsApp, Instagram)](#12-profil-luar-situs-google-whatsapp-instagram)
13. [Daftar periksa rutin](#13-daftar-periksa-rutin)
14. [Pemecahan masalah](#14-pemecahan-masalah)

---

## 1. Halaman situs

| Halaman | Alamat |
|---|---|
| Beranda | `/` |
| Langganan Kilap (Kilap 4 / 8 / 12 / 12 Plus / 24 Plus) | `/cuci-mobil-langganan/` |
| Cuci Sekali Datang (Kilat / Segar / Tuntas / Istimewa) | `/cuci-sekali-datang/` |
| Salon Mobil Lengkap | `/salon-mobil-panggilan/` |
| Salon Interior & Jok | `/cuci-interior-mobil/` |
| Poles & Proteksi Cat | `/poles-mobil/` |
| Perawatan Kaca | `/detailing-kaca-mobil/` |
| Cuci Ruang Mesin | `/cuci-mesin-mobil/` |
| Ban & Velg | `/ban-velg/` |
| Pemulihan Pascabanjir | `/cuci-mobil-banjir/` |
| Daftar Harga | `/daftar-harga/` |
| Form Pemesanan (4 langkah) | `/pesan/` |
| Tanya Jawab | `/tanya-jawab/` |
| Tentang KlikKilap | `/tentang-klikkilap/` |
| Gabung Tim | `/gabung-tim/` |
| Artikel | `/artikel/` |
| Area Layanan (indeks) | `/area/` |

**Halaman per wilayah:**

| Wilayah | Alamat |
|---|---|
| Jakarta Selatan · Timur · Barat · Utara · Pusat | `/cuci-mobil-panggilan-jakarta-selatan/` dst. |
| Depok · Bogor · Tangerang · Tangerang Selatan · Bekasi | `/cuci-mobil-panggilan-depok/` dst. |
| **Surabaya** (halaman induk, 31 kecamatan) | `/cuci-mobil-panggilan-surabaya/` |
| Surabaya Pusat · Utara · Timur · Selatan · Barat | `/cuci-mobil-panggilan-surabaya-pusat/` dst. |
| **Gresik** (16 kecamatan daratan) | `/cuci-mobil-panggilan-gresik/` |

**Artikel:**

- Cuci Mobil Panggilan Surabaya & Gresik: Area, Harga, dan Tips Merawat Mobil
- Harga Salon Mobil & Poles Mobil Panggilan 2026 (Daftar Lengkap)
- Poles Mobil vs Coating Mobil: Apa Bedanya dan Mana yang Anda Butuhkan?
- Fogging Mobil: Manfaat, Harga, dan Berapa Bulan Sekali Sebaiknya Dilakukan
- Beda Cuci Mobil Biasa dan Detailing: Mana yang Mobil Anda Butuhkan?
- 7 Tips Merawat Mobil di Musim Hujan agar Cat Tidak Berjamur
- Mobil Terendam Banjir? Lakukan Ini Sebelum Dinyalakan

Alamat lama (mis. `/harga/`, `/faq/`, `/blog/...`) otomatis dialihkan ke alamat baru.

---

## 2. Fitur utama

### Form pemesanan `/pesan/`

1. **Layanan:** langganan, cuci sekali datang, salon & perawatan, atau pascabanjir.
2. **Paket:** paket dan ukuran mobil (Kecil / Sedang / Besar / Ekstra), plus layanan tambahan. Ringkasan biaya dihitung otomatis.
3. **Alamat & waktu:**
   - Tombol **Bagikan lokasi saya** mengambil titik GPS ponsel.
   - Muncul **peta** dengan lingkaran jangkauan dan **indikator presisi** (Sangat / Cukup / Kurang presisi, ± meter).
   - Pin bisa digeser ke posisi mobil yang tepat.
   - Pelanggan yang tidak mau berbagi lokasi bisa mengetik alamat.
4. **Booking**, muncul bila QRIS atau rekening sudah diisi:
   - Rincian: total, booking 30%, dan sisa yang dibayar setelah dicek.
   - **QRIS dinamis:** QR dibuat dengan nominal booking sudah terisi, bisa disimpan sebagai gambar.
   - **Transfer:** pilihan bank (Mandiri / BCA / OCBC) dengan tombol Salin nomor rekening dan nominal.
   - Tombol **Sudah bayar** membuka WhatsApp berisi seluruh pesanan, nominal booking, dan bank yang dipilih.

Untuk mobil ukuran **Ekstra** (harga lewat chat), langkah bayar dilewati dan admin mengirim nominal booking lewat WhatsApp.

### Lainnya

- Tombol **WhatsApp** mengambang di semua halaman.
- Tombol **Beri ulasan di Google** di footer dan halaman Tentang.
- Link **Instagram @klikkilap** di footer dan halaman Tentang.
- Tampilan responsif, sudah dicek di lebar 320–1280 px.

---

## 3. Struktur folder

```
.
├── site.config.json        ← SEMUA data: brand, kontak, harga, area, pembayaran
├── src/
│   ├── build.mjs           ← generator: menyusun semua halaman ke folder dist/
│   ├── content.mjs         ← teks layanan, Tanya Jawab, artikel dasar, logika pembayaran
│   ├── seo.mjs             ← halaman per wilayah (area) + artikel SEO
│   └── icons.mjs           ← ikon SVG & ilustrasi
├── assets/
│   ├── app.js              ← interaksi form: hitung harga, lokasi & peta, QRIS, WhatsApp
│   ├── style.css           ← tampilan
│   └── favicon.svg
├── .github/workflows/deploy.yml  ← build & deploy otomatis ke GitHub Pages
├── package.json
└── dist/                   ← hasil build (dibuat otomatis, tidak perlu diedit)
```

---

## 4. Mengubah data situs (`site.config.json`)

Edit langsung di GitHub (ikon pensil pada file), lalu **Commit changes**. Situs dibangun ulang otomatis dalam sekitar 1 menit.

| Kolom | Isi |
|---|---|
| `brand`, `tagline` | Nama usaha dan slogan |
| `baseUrl`, `customDomain` | Alamat situs (`klikkilap.com`) |
| `whatsapp` | Nomor WA format 62 tanpa `+`, mis. `6285888010614` |
| `whatsappDisplay` | Nomor WA yang ditampilkan, mis. `0858-8801-0614` |
| `email` | Kosongkan bila belum aktif (tidak ditampilkan) |
| `instagram` | Username tanpa `@`, mis. `klikkilap` |
| `googleReview` | Link ulasan Google, mis. `https://g.page/r/.../review`. Kosongkan untuk menyembunyikan tombol ulasan |
| `jamOperasional` | Teks jam kerja, mis. `Setiap hari, pukul 06.00–18.00 WIB` |
| `orderTerakhir` | Batas jam pesan untuk hari yang sama |
| `jamPilihan` | Daftar jam di form pemesanan |
| `area` | Daftar wilayah di footer, beranda, dan pilihan wilayah form |
| `cakupan` | Ringkasan cakupan untuk judul & deskripsi, mis. `Jabodetabek, Surabaya & Gresik` |
| `pembayaran` | Lihat [bagian 5](#5-pengaturan-pembayaran-booking-qris-rekening) |
| `garansiJam` | Masa cek ulang gratis (jam) |
| `produk` | Teks bahan yang dipakai |
| `harga.langganan` | Paket Kilap: nama, frekuensi, sampo, `diskonFogging` (%), harga |
| `harga.sekaliCuci` | Paket Kilat / Segar / Tuntas / Istimewa |
| `harga.addOn` | Hapus jamur cat & kaca, clay bar, wax, fogging |
| `harga.detailing` | Interior, poles, kaca, mesin, ban & velg, salon lengkap. Harga `[Kecil, Sedang, Besar]` |
| `harga.banjir` | Harga pascabanjir per tinggi air × ukuran mobil |
| `ukuran` | Definisi ukuran mobil dan contoh merek |
| `testimoni` | Kosong secara default. Isi **hanya** dengan testimoni asli pelanggan |

Semua harga ditulis sebagai angka tanpa titik, mis. `85000`.

Contoh testimoni:

```json
"testimoni": [
  { "nama": "Pak Andi", "keterangan": "Depok", "isi": "Hasilnya rapi, tepat waktu." }
]
```

---

## 5. Pengaturan pembayaran: booking, QRIS, rekening

Semua ada di blok `pembayaran` pada `site.config.json`:

```json
"pembayaran": {
  "rekening": [
    { "bank": "Mandiri", "noRekening": "NOMOR_REKENING", "atasNama": "NAMA PEMILIK" },
    { "bank": "BCA",     "noRekening": "NOMOR_REKENING", "atasNama": "NAMA PEMILIK" },
    { "bank": "OCBC",    "noRekening": "NOMOR_REKENING", "atasNama": "NAMA PEMILIK" }
  ],
  "tunai": true,
  "qris": true,
  "bookingPersen": 30,
  "qrisPayload": "000201...."
}
```

| Kolom | Fungsi |
|---|---|
| `rekening` | Daftar rekening tujuan transfer. Bisa 1 sampai beberapa bank. Rekening berisi angka 0 semua tidak ditampilkan |
| `bookingPersen` | Persentase booking dari total biaya. Isi `0` untuk mematikan langkah booking |
| `qrisPayload` | Isi teks dari QRIS statis merchant (diawali `000201`, diakhiri `6304` + 4 karakter). Situs mengubahnya jadi QRIS dengan nominal otomatis |
| `tunai`, `qris` | Menampilkan metode tunai dan QRIS di teks Tanya Jawab |

**Aturan otomatis:**

- Langkah **4. Booking** hanya muncul bila `bookingPersen` > 0 **dan** minimal satu dari QRIS atau rekening sudah diisi dengan benar.
- Saat booking aktif, teks situs berubah sendiri: badge "Lunas setelah dicek", langkah "Pilih & booking", serta penjelasan booking dan pembatalan di Tanya Jawab.
- Nominal booking dibulatkan ke atas per Rp1.000.
- Pembatalan paling lambat H-1: uang booking kembali penuh. Batal di hari H: uang booking hangus.

**Mengganti QRIS** (misalnya setelah nama merchant GoPay berubah):

1. Unduh gambar QRIS terbaru dari aplikasi GoPay Merchant.
2. Baca isi teksnya dengan aplikasi pemindai QR, lalu salin.
3. Tempel di `qrisPayload`, lalu commit.
4. Tes sekali bayar Rp1.000 dari HP lain untuk memastikan nama toko dan uang masuk dengan benar.

QRIS dengan kode pengecekan (CRC) yang salah otomatis diabaikan, sehingga situs hanya menampilkan transfer.

**Catatan:** QRIS dinamis di situs **tidak** menandai pesanan lunas secara otomatis. Cocokkan pembayaran lewat notifikasi aplikasi GoBiz / mutasi rekening dan bukti bayar di WhatsApp.

---

## 6. Menambah atau mengubah area layanan

1. Tambahkan nama wilayah di `area` pada `site.config.json`, dan sesuaikan `cakupan` bila perlu.
2. Tambahkan data halaman wilayah di `src/seo.mjs`, pada daftar `areas`:

```js
{
  nama: 'Sidoarjo', slug: 'cuci-mobil-panggilan-sidoarjo',
  sekitar: ['Kawasan A', 'Kawasan B'],          // kelurahan/kawasan terkenal
  kecamatan: ['Kec. 1', 'Kec. 2'],              // opsional: daftar kecamatan
  intro: 'Paragraf pembuka yang khas untuk wilayah ini.',
},
```

Untuk kota besar yang dibagi per wilayah (seperti Surabaya), isi `wilayah: [...]`. Setiap wilayah berisi `nama`, `slug`, `kecamatan`, `kawasan`, dan `intro`. Halaman induk dan halaman per wilayah dibuat otomatis, lengkap dengan tautan antarhalaman, tanya jawab, schema, dan sitemap.

---

## 7. Mengubah teks halaman & artikel

| Yang diubah | File |
|---|---|
| Deskripsi layanan (interior, poles, kaca, mesin, ban, salon lengkap) | `src/content.mjs` → `detailPages` |
| Tanya Jawab | `src/content.mjs` → `faq` |
| Artikel dasar | `src/content.mjs` → `posts` |
| Artikel SEO (harga, Surabaya & Gresik, fogging, poles vs coating) | `src/seo.mjs` → `extraPosts` |
| Halaman wilayah | `src/seo.mjs` → `areas` |
| Tata letak & teks halaman lain | `src/build.mjs` |

Artikel baru cukup ditambahkan ke daftar `posts`/`extraPosts` dengan kolom `slug`, `title`, `date`, `excerpt`, dan `body` (HTML). Halaman, indeks artikel, dan sitemap dibuat otomatis.

---

## 8. Cara deploy (GitHub Pages)

Repo: `erhambinmohamad-web/cuci-mobil-panggilan`, cabang `main`.

- Setiap commit ke `main` menjalankan **Actions → "Build & Deploy ke GitHub Pages"** (`node src/build.mjs` lalu unggah folder `dist/`).
- Cek hasilnya di tab **Actions**. Centang hijau berarti situs sudah diperbarui, biasanya dalam sekitar 1 menit.
- Bila build gagal (silang merah), situs **tetap menampilkan versi terakhir yang berhasil**. Buka run yang gagal untuk melihat pesan errornya.

Pengaturan awal (sekali saja): **Settings → Pages → Build and deployment → Source: GitHub Actions**.

---

## 9. Domain sendiri

Situs sudah memakai `klikkilap.com` (`customDomain` di config, file `CNAME` dibuat otomatis). Untuk memindah ke domain lain:

1. Ubah `customDomain` dan `baseUrl` di `site.config.json`.
2. Di DNS domain, arahkan record ke GitHub Pages (CNAME `www` → `erhambinmohamad-web.github.io`, atau A record GitHub Pages untuk domain utama).
3. Buka **Settings → Pages → Custom domain**, isi domain yang sama, lalu centang **Enforce HTTPS**.

---

## 10. Pratinjau di komputer

Butuh Node.js 18 atau lebih baru.

```bash
npm run build      # hasil di folder dist/
npm run preview    # build lalu buka http://localhost:3000
```

---

## 11. SEO

Yang sudah terpasang otomatis:

- `title` & meta description per halaman, canonical, dan Open Graph.
- Schema.org:
  - `AutoWash` dengan area layanan, jam buka, dan `sameAs` Instagram.
  - `FAQPage`.
  - `Service` per wilayah dengan daftar kecamatan.
  - `BlogPosting` untuk artikel.
- `sitemap.xml` dan `robots.txt`.
- Halaman per wilayah dan per kecamatan untuk pencarian lokal, mis. "cuci mobil panggilan Surabaya Timur" atau "salon mobil panggilan Gresik".

**Setelah menambah halaman baru:**

1. Di **Google Search Console**, kirim ulang `https://klikkilap.com/sitemap.xml`.
2. Minta pengindeksan untuk halaman baru lewat *URL Inspection*.

---

## 12. Profil luar situs (Google, WhatsApp, Instagram)

| Kanal | Yang perlu sama dengan situs |
|---|---|
| **Google Business Profile** | Nama, nomor WA, situs, jam (06.00–18.00), area layanan termasuk Surabaya & Gresik. Link ulasan: `https://g.page/r/CYroSPzDbWEMEBM/review` |
| **WhatsApp Business** | Sampul baru (`klikkilap-sampul-wa-v2.png`), deskripsi tanpa link, Situs web 1 `https://klikkilap.com`, Situs web 2 `https://klikkilap.com/pesan/`, jam 06.00–18.00, kategori Layanan Otomotif |
| **Instagram @klikkilap** | Foto profil logo, link bio `https://klikkilap.com/pesan/`, post sematan (`klikkilap-ig-post-sematkan.png`) |
| **GoPay Merchant (QRIS)** | Nama merchant: **Mitra Bangun, Jasa Servis**. Bila berubah, perbarui `qrisPayload` |

Aturan ulasan Google: jangan memberi imbalan untuk ulasan, minta ke semua pelanggan (tidak hanya yang puas), dan jangan menulis ulasan sendiri.

---

## 13. Daftar periksa rutin

- [ ] Harga di `site.config.json` sesuai harga yang berlaku.
- [ ] Nomor WA, rekening, dan QRIS masih aktif (tes bayar Rp1.000 bila ada perubahan).
- [ ] Jam operasional sama di situs, Google, dan WhatsApp.
- [ ] Testimoni hanya dari pelanggan asli.
- [ ] Kebijakan cek ulang 24 jam & pembatalan H-1 masih sesuai.
- [ ] Tambahkan foto hasil kerja sendiri (sebelum–sesudah) untuk meningkatkan kepercayaan.
- [ ] Setelah menambah area/artikel: kirim ulang sitemap di Search Console.

---

## 14. Pemecahan masalah

| Masalah | Penyebab & solusi |
|---|---|
| Perubahan tidak muncul di situs | Tunggu sekitar 1 menit, cek tab **Actions**, lalu refresh situs (tarik layar ke bawah di HP) |
| Build gagal (silang merah) | Biasanya salah format JSON di `site.config.json`, seperti koma atau tanda kutip yang hilang. Buka log run untuk melihat baris yang salah |
| Langkah Booking tidak muncul | `bookingPersen` = 0, atau QRIS & rekening belum diisi / QRIS tidak valid |
| QR tidak terbaca aplikasi bank | Pastikan `qrisPayload` disalin utuh dari QRIS merchant terbaru, tanpa spasi tambahan |
| Peta lokasi tidak tampil | Pelanggan menolak izin lokasi atau sinyal GPS lemah. Form otomatis menawarkan isian alamat |
| Tombol ulasan / Instagram hilang | Kolom `googleReview` / `instagram` di config kosong |
