# Situs Cuci & Salon Mobil Panggilan

Situs statis multi-halaman (19 halaman) untuk usaha cuci mobil & salon mobil panggilan. Situs ini gratis di-hosting lewat **GitHub Pages** dan pesanan langsung masuk ke **WhatsApp**.

## Isi situs

| Halaman | URL |
|---|---|
| Beranda | `/` |
| Cuci Berlangganan · Satu Kali Cuci | `/cuci-berlangganan/` · `/sekali-cuci/` |
| Salon Mobil (Complete Detailing) | `/salon-mobil/` |
| Interior · Exterior · Kaca · Mesin · Ban & Velg | `/interior/` `/exterior/` `/kaca/` `/mesin/` `/ban-velg/` |
| Paket Banjir | `/paket-banjir/` |
| Daftar Harga (8 kategori) | `/harga/` |
| Form Pesan 3 langkah → WhatsApp | `/pesan/` |
| FAQ · Tentang Kami · Karir | `/faq/` `/tentang-kami/` `/karir/` |
| Blog + 3 artikel | `/blog/` |

Fitur SEO: title & meta description per halaman, canonical, Open Graph, schema.org (AutoWash, FAQPage, BlogPosting), `sitemap.xml`, `robots.txt`.

## Cara upload ke GitHub (sekali saja)

1. Buka github.com → **New repository** → beri nama, misalnya `cuci-mobil-panggilan` → **Public** → Create.
2. Klik **uploading an existing file**, lalu seret **seluruh isi folder ini** (termasuk folder `.github`) → **Commit changes**.
   - Kalau folder `.github` tidak ikut terunggah: buka tab **Actions** → **set up a workflow yourself** → tempel isi `.github/workflows/deploy.yml` → Commit.
3. Buka **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Buka tab **Actions** dan tunggu ±1 menit sampai prosesnya centang hijau. Situs akan tayang di `https://erhambinmohamad-web.github.io/cuci-mobil-panggilan/`.

URL situs (canonical & sitemap) terisi otomatis dari GitHub Pages, jadi Anda tidak perlu mengeditnya.

## Mengubah nama brand, nomor WA, dan harga

Semua data ada di **satu file: `site.config.json`**. Edit file itu langsung di GitHub (ikon pensil) → Commit. Situs akan dibangun ulang otomatis dalam ±1 menit.

| Kolom | Isi |
|---|---|
| `brand`, `tagline` | Nama usaha |
| `whatsapp` | Nomor WA format 62 tanpa tanda + (contoh `6281234567890`) |
| `whatsappDisplay`, `email`, `instagram` | Kontak yang ditampilkan |
| `area` | Daftar kota/wilayah layanan |
| `jamOperasional`, `jamPilihan` | Jam kerja & pilihan jam di form |
| `pembayaran` | Bank, no. rekening, atas nama |
| `harga.*` | Semua harga (angka tanpa titik) |
| `testimoni` | Kosong secara default. Isi hanya dengan testimoni **asli** pelanggan, contoh: `[{"nama":"Pak Andi","keterangan":"Depok","isi":"Hasilnya rapi, tepat waktu."}]` |
| `customDomain` | Isi `www.domainanda.com` bila sudah punya domain sendiri |

Teks halaman (deskripsi layanan, FAQ, artikel blog) ada di `src/content.mjs`.

## Pakai domain sendiri (opsional)

1. Isi `"customDomain": "www.domainanda.com"` di `site.config.json`.
2. Di DNS domain Anda, buat **CNAME** `www` → `USERNAME.github.io`.
3. Buka **Settings → Pages → Custom domain**, isi domain yang sama, lalu centang **Enforce HTTPS**.

## Pratinjau di komputer (opsional)

Butuh Node.js 18 atau lebih baru:

```
npm run build        # hasil di folder dist/
npm run preview      # buka http://localhost:3000
```

## Hal yang perlu Anda cek sebelum tayang

- Nama brand, nomor WA, email, dan rekening masih **contoh** — ganti semuanya.
- Kebijakan garansi cuci ulang 24 jam, bonus 1x cuci untuk detailing, serta aturan batal H-1 adalah nilai default. Sesuaikan dengan kebijakan Anda (`garansiJam`, `bonusCuciDetailing`, dan teks di `src/content.mjs`).
- Foto: situs memakai ilustrasi SVG buatan sendiri. Untuk konversi yang lebih baik, tambahkan foto hasil kerja Anda sendiri.
