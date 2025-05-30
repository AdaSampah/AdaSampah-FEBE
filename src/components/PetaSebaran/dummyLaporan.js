const dummyLaporan = [
  {
    id: 1,
    nama: "Siti Aminah",
    tanggal: "10 Januari 2024",
    provinsi: "Daerah Istimewa Yogyakarta",
    kabupaten: "Bantul",
    lon: 110.3000,
    lat: -8.0000,
    kategori: "Sampah",
    deskripsi: "Tumpukan sampah di sungai Cikapundung menyebabkan bau tidak sedap dan mengganggu warga sekitar.",
    foto: "../../assets/Laporan/contoh.png",
    upvote: 1300,
  },
  {
    id: 2,
    nama: "Budi Santoso",
    tanggal: "15 Februari 2024",
    provinsi: "Daerah Istimewa Yogyakarta",
    kabupaten: "Sleman",
    lon: 110.3500,
    lat: -7.7501,
    kategori: "Air",
    deskripsi: "Air bersih sulit didapat di daerah ini setelah kemarau panjang.",
    foto: "../../assets/Laporan/contoh.png",
    upvote: 980,
  },
  {
    id: 3,
    nama: "Rina Kartika",
    tanggal: "20 Maret 2024",
    provinsi: "Daerah Istimewa Yogyakarta",
    kabupaten: "Kota Yogyakarta",
    lon: 110.3695,
    lat: -7.7956,
    kategori: "Polusi",
    deskripsi: "Asap kendaraan menyebabkan sesak napas di kawasan Blok M.",
    foto: "../../assets/Laporan/contoh.png",
    upvote: 1100,
  },
  {
    id: 4,
    nama: "Agus Wirawan",
    tanggal: "5 April 2024",
    provinsi: "Daerah Istimewa Yogyakarta",
    kabupaten: "Gunung Kidul",
    lon: 110.6167,
    lat: -8.1291,
    kategori: "Sampah",
    deskripsi: "Pantai penuh sampah plastik setelah musim liburan.",
    foto: "../../assets/Laporan/contoh.png",
    upvote: 875,
  },
  {
    id: 5,
    nama: "Lina Marlina",
    tanggal: "12 Mei 2024",
    provinsi: "Daerah Istimewa Yogyakarta",
    kabupaten: "Kulon Progo",
    lon: 110.0500,
    lat: -8.00010,
    kategori: "Limbah",
    deskripsi: "Limbah pabrik mencemari sungai Batang Arau.",
    foto: "../../assets/Laporan/contoh.png",
    upvote: 920,
  },
  {
    id: 6,
    nama: "Yusuf Hidayat",
    tanggal: "25 Mei 2024",
    provinsi: "Daerah Istimewa Yogyakarta",
    kabupaten: "Bantul",
    lon: 110.3100,  // Diubah untuk menghindari duplikasi
    lat: -8.0900,   // Diubah untuk menghindari duplikasi
    kategori: "Polusi",
    deskripsi: "Udara di pusat kota terasa berat akibat kemacetan.",
    foto: "../../assets/Laporan/contoh.png",
    upvote: 1020,
  },
  {
    id: 7,
    nama: "Nani Rosdiana",
    tanggal: "1 Juni 2024",
    provinsi: "Daerah Istimewa Yogyakarta",
    kabupaten: "Sleman",
    lon: 110.3600,  // Diubah untuk menghindari duplikasi
    lat: -7.7400,   // Diubah untuk menghindari duplikasi
    kategori: "Sampah",
    deskripsi: "TPS liar muncul di pinggir jalan utama.",
    foto: "../../assets/Laporan/contoh.png",
    upvote: 760,
  },
  {
    id: 8,
    nama: "Fajar Pratama",
    tanggal: "9 Juni 2024",
    provinsi: "Daerah Istimewa Yogyakarta",
    kabupaten: "Kota Yogyakarta",
    lon: 110.3795,  // Diubah untuk menghindari duplikasi
    lat: -7.8400,   // Diubah untuk menghindari duplikasi
    kategori: "Limbah",
    deskripsi: "Limbah rumah tangga dibuang ke laut secara langsung.",
    foto: "../../assets/Laporan/contoh.png",
    upvote: 890,
  },
  {
    id: 9,
    nama: "Sari Lestari",
    tanggal: "18 Juni 2024",
    provinsi: "Daerah Istimewa Yogyakarta",
    kabupaten: "Gunung Kidul",
    lon: 110.6267,  // Diubah untuk menghindari duplikasi
    lat: -8.1391,   // Diubah untuk menghindari duplikasi
    kategori: "Kebakaran Hutan",
    deskripsi: "Asap pekat menyelimuti kota akibat kebakaran lahan.",
    foto: "../../assets/Laporan/contoh.png",
    upvote: 1400,
  },
  {
    id: 10,
    nama: "Dian Ramadhan",
    tanggal: "22 Juni 2024",
    provinsi: "Daerah Istimewa Yogyakarta",
    kabupaten: "Kulon Progo",
    lon: 110.1500,  // Diubah untuk menghindari duplikasi
    lat: -8.1896,   // Diubah untuk menghindari duplikasi
    kategori: "Sampah",
    deskripsi: "Sampah menumpuk di area pasar tradisional.",
    foto: "../../assets/Laporan/contoh.png",
    upvote: 610,
  },
  {
    id: 11,
    nama: "Ayu Wulandari",
    tanggal: "1 Juli 2024",
    provinsi: "Daerah Istimewa Yogyakarta",
    kabupaten: "Bantul",
    lon: 110.3200,  // Diubah untuk menghindari duplikasi
    lat: -8.0600,   // Diubah untuk menghindari duplikasi
    kategori: "Polusi",
    deskripsi: "Polusi suara dari industri mengganggu warga sekitar.",
    foto: "../../assets/Laporan/contoh.png",
    upvote: 720,
  },
  {
    id: 12,
    nama: "Rizky Maulana",
    tanggal: "4 Juli 2024",
    provinsi: "Daerah Istimewa Yogyakarta",
    kabupaten: "Sleman",
    lon: 110.3800,  // Diubah untuk menghindari duplikasi
    lat: -7.7600,   // Diubah untuk menghindari duplikasi
    kategori: "Sampah",
    deskripsi: "Tidak tersedia tempat sampah umum di kompleks perumahan.",
    foto: "../../assets/Laporan/contoh.png",
    upvote: 550,
  },
  {
    id: 13,
    nama: "Nadia Permata",
    tanggal: "10 Juli 2024",
    provinsi: "Daerah Istimewa Yogyakarta",
    kabupaten: "Kota Yogyakarta",
    lon: 110.3795,  // Diubah untuk menghindari duplikasi
    lat: -7.8056,   // Diubah untuk menghindari duplikasi
    kategori: "Limbah",
    deskripsi: "Cairan limbah industri meresap ke tanah warga.",
    foto: "../../assets/Laporan/contoh.png",
    upvote: 890,
  },
  {
    id: 14,
    nama: "Dede Sulaeman",
    tanggal: "14 Juli 2024",
    provinsi: "Daerah Istimewa Yogyakarta",
    kabupaten: "Bantul",
    lon: 110.3500,  // Diubah untuk menghindari duplikasi
    lat: -8.0200,   // Diubah untuk menghindari duplikasi
    kategori: "Sampah",
    deskripsi: "Sungai Cikeas tercemar oleh sampah domestik.",
    foto: "../../assets/Laporan/contoh.png",
    upvote: 1010,
  },
  {
    id: 15,
    nama: "Rosa Anggraini",
    tanggal: "20 Juli 2024",
    provinsi: "Daerah Istimewa Yogyakarta",
    kabupaten: "Gunung Kidul",
    lon: 110.6500,  // Diubah untuk menghindari duplikasi
    lat: -8.1400,   // Diubah untuk menghindari duplikasi
    kategori: "Polusi",
    deskripsi: "Debu batu bara dari pelabuhan mengganggu pernapasan.",
    foto: "../../assets/Laporan/contoh.png",
    upvote: 800,
  },
  {
    id: 16,
    nama: "Darmawan Putra",
    tanggal: "1 Agustus 2024",
    provinsi: "Daerah Istimewa Yogyakarta",
    kabupaten: "Kulon Progo",
    lon: 110.0500,
    lat: -8.1796,
    kategori: "Air",
    deskripsi: "Air keruh dan berbau di kran rumah warga.",
    foto: "../../assets/Laporan/contoh.png",
    upvote: 695,
  },
  {
    id: 17,
    nama: "Tiara Melati",
    tanggal: "9 Agustus 2024",
    provinsi: "Daerah Istimewa Yogyakarta",
    kabupaten: "Sleman",
    lon: 110.3700,
    lat: -7.7500,
    kategori: "Kebakaran Hutan",
    deskripsi: "Asap kebakaran hutan mengganggu aktivitas sekolah.",
    foto: "../../assets/Laporan/contoh.png",
    upvote: 1230,
  },
  {
    id: 18,
    nama: "Heri Gunawan",
    tanggal: "14 Agustus 2024",
    provinsi: "Daerah Istimewa Yogyakarta",
    kabupaten: "Bantul",
    lon: 110.3000,
    lat: -8.1000,   // Diubah untuk menghindari duplikasi
    kategori: "Sampah",
    deskripsi: "Pasar tradisional dipenuhi sampah sisa makanan.",
    foto: "../../assets/Laporan/contoh.png",
    upvote: 620,
  },
  {
    id: 19,
    nama: "Indah Puspita",
    tanggal: "22 Agustus 2024",
    provinsi: "Daerah Istimewa Yogyakarta",
    kabupaten: "Kota Yogyakarta",
    lon: 110.3750,
    lat: -7.7966,   
    kategori: "Limbah",
    deskripsi: "Limbah rumah tangga mengalir ke saluran irigasi sawah.",
    foto: "../../assets/Laporan/contoh.png",
    upvote: 760,
  },
  {
    id: 20,
    nama: "Anonymous",
    tanggal: "22 Agustus 2025",
    provinsi: "Daerah Istimewa Yogyakarta",
    kabupaten: "Kulon Progo",
    lon: 110.0189,
    lat: -7.9006,   
    kategori: "Limbah",
    deskripsi: "Limbah rumah tangga mengalir ke saluran irigasi sawah.",
    foto: "../../assets/Laporan/contoh.png",
    upvote: 760,
  }
];

export default dummyLaporan;
