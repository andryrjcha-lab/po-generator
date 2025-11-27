PO Generator - PT. RDG DAYA GEMILANG
=====================================

Cara pakai lokal:
1. Extract folder.
2. Buka file `index.html` di browser (double-click).
3. Jika ingin mengganti logo, gunakan tombol "Pilih / Upload Logo".
4. Untuk menambahkan tanda tangan digital, gunakan tombol "Upload Tanda Tangan".
5. Isi data PO, tambahkan atau hapus item, lalu klik "Generate PDF (A4)".

Cara deploy ke GitHub Pages (singkat):
1. Buat repository baru di GitHub.
2. Upload seluruh isi folder `po-generator`.
3. Pada Settings > Pages, pilih branch `main` (atau `gh-pages`) dan folder root.
4. Akses `https://<username>.github.io/<repo-name>/index.html`.

Catatan:
- Script menggunakan html2pdf (html2canvas + jsPDF). Untuk hasil paling akurat, jalankan di browser modern.
- Jika ingin penyesuaian font/padding lebih lanjut, beri tahu saya font yang diinginkan dan saya optimalkan CSS.
