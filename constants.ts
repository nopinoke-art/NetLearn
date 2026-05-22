
import { TopologyType, TopologyInfo } from './types';

export const KEY_TERMS: Record<string, string> = {
  "Node": "Perangkat apa pun yang terhubung ke jaringan, seperti komputer, printer, atau server.",
  "Backbone": "Kabel utama yang menghubungkan berbagai segmen jaringan dan menangani lalu lintas data terbesar.",
  "Switch": "Perangkat pintar yang menghubungkan beberapa node dan mengirimkan data hanya ke node tujuan.",
  "Collision": "Kondisi ketika dua perangkat mengirim data secara bersamaan di jalur yang sama, menyebabkan gangguan.",
  "Redundansi": "Penyediaan jalur cadangan dalam jaringan untuk memastikan koneksi tetap berjalan jika jalur utama gagal.",
  "Latency": "Waktu yang dibutuhkan data untuk berpindah dari sumber ke tujuan dalam jaringan.",
  "Throughput": "Jumlah data sebenarnya yang berhasil dikirim melalui jaringan dalam waktu tertentu."
};

export const TOPOLOGIES: TopologyInfo[] = [
  {
    id: TopologyType.STAR,
    title: 'Topologi Star (Bintang)',
    description: 'Setiap node terhubung langsung ke satu hub atau switch pusat. Hub ini bertindak sebagai server pusat yang menangani semua transmisi data.',
    pros: [
      'Mudah dipasang dan dikelola',
      'Kegagalan satu kabel tidak mempengaruhi komputer lain',
      'Deteksi kesalahan yang sangat mudah'
    ],
    cons: [
      'Jika switch pusat rusak, seluruh jaringan lumpuh',
      'Membutuhkan lebih banyak kabel dibandingkan topologi bus',
      'Biaya lebih mahal karena butuh hub/switch'
    ],
    implementation: 'Standar jaringan kantor modern dan WiFi rumah.',
    caseStudy: {
      title: 'Lab Komputer Sekolah',
      scenario: 'Sebuah sekolah ingin membangun lab komputer dengan 20 unit PC yang harus mudah dipantau kerusakannya.',
      solution: 'Topologi Star digunakan dengan switch pusat 24-port. Jika PC nomor 5 mengalami kabel putus, sisa 19 PC lainnya tetap dapat mengakses internet tanpa gangguan.'
    },
    comparisonTable: [
      { feature: 'Manajemen', advantage: 'Terpusat dan mudah', disadvantage: 'Titik kegagalan tunggal (Switch)' },
      { feature: 'Biaya', advantage: 'Kabel relatif murah', disadvantage: 'Harus beli Hub/Switch' },
      { feature: 'Skalabilitas', advantage: 'Mudah tambah node', disadvantage: 'Terbatas port Switch' }
    ],
    questions: [
      {
        question: "Apa perangkat pusat yang menjadi penghubung utama pada Topologi Star?",
        options: ["Terminator", "Switch/Hub", "Kabel Coaxial", "Repeater"],
        correctAnswerIndex: 1,
        explanation: "Topologi Star menggunakan Switch atau Hub sebagai titik pusat yang mengatur komunikasi antar perangkat."
      },
      {
        question: "Jika salah satu kabel komputer client putus pada Topologi Star, apa yang terjadi?",
        options: ["Seluruh jaringan mati", "Hanya komputer tersebut yang terputus", "Koneksi menjadi lambat", "Data terpantul kembali"],
        correctAnswerIndex: 1,
        explanation: "Karena setiap client memiliki kabel sendiri ke pusat, kerusakan satu kabel tidak mengganggu perangkat lain."
      },
      {
        question: "Apa kelemahan fatal dari Topologi Star?",
        options: ["Boros kabel", "Sulit dipasang", "Jika Switch pusat rusak, seluruh jaringan mati", "Sering terjadi tabrakan data"],
        correctAnswerIndex: 2,
        explanation: "Seluruh jaringan bergantung pada perangkat pusat. Jika Switch/Hub mati, semua koneksi terputus."
      }
    ]
  },
  {
    id: TopologyType.BUS,
    title: 'Topologi Bus',
    description: 'Semua node terhubung ke satu kabel pusat yang disebut "backbone". Data dikirim sepanjang kabel dan hanya node yang dituju yang menerima data tersebut.',
    pros: [
      'Sangat hemat kabel',
      'Instalasi sangat sederhana untuk jaringan kecil',
      'Tidak memerlukan switch atau hub'
    ],
    cons: [
      'Jika kabel utama putus, seluruh jaringan mati',
      'Performa menurun seiring bertambahnya jumlah node',
      'Sulit mendeteksi masalah pada kabel'
    ],
    implementation: 'Jaringan ethernet awal (10Base2) dan sistem CCTV sederhana.',
    caseStudy: {
      title: 'Sistem CCTV Lorong',
      scenario: 'Pemasangan 5 kamera CCTV di sepanjang lorong gedung yang sangat panjang.',
      solution: 'Menggunakan satu kabel coaxial panjang (Bus) lebih efisien daripada menarik 5 kabel berbeda dari ujung lorong ke ruang monitor.'
    },
    comparisonTable: [
      { feature: 'Kabel', advantage: 'Sangat sedikit', disadvantage: 'Batas panjang kabel tertentu' },
      { feature: 'Instalasi', advantage: 'Cepat & simple', disadvantage: 'Sulit troubleshoot' },
      { feature: 'Traffic', advantage: 'Bagus untuk data kecil', disadvantage: 'Sering terjadi tabrakan data' }
    ],
    questions: [
      {
        question: "Kabel utama tempat semua komputer terhubung pada topologi bus disebut...",
        options: ["Gateway", "Backbone", "Drop Cable", "T-Connector"],
        correctAnswerIndex: 1,
        explanation: "Backbone adalah kabel tunggal yang menjadi jalur utama transmisi data pada topologi bus."
      },
      {
        question: "Apa fungsi Terminator pada ujung-ujung kabel topologi bus?",
        options: ["Membagi sinyal", "Menghapus data", "Menyerap sinyal agar tidak memantul", "Memperkuat sinyal"],
        correctAnswerIndex: 2,
        explanation: "Terminator menyerap sinyal di ujung kabel untuk mencegah pantulan sinyal (echo) yang dapat merusak data."
      },
      {
        question: "Apa keuntungan utama menggunakan Topologi Bus?",
        options: ["Kecepatan tinggi", "Paling andal", "Sangat hemat kabel", "Mudah mendeteksi kerusakan"],
        correctAnswerIndex: 2,
        explanation: "Topologi Bus sangat populer di masa lalu karena hanya membutuhkan satu jalur kabel panjang, sehingga biaya kabel sangat murah."
      }
    ]
  },
  {
    id: TopologyType.RING,
    title: 'Topologi Ring (Cincin)',
    description: 'Setiap node terhubung ke dua node lainnya, membentuk jalur melingkar. Data mengalir dalam satu arah melalui setiap node hingga mencapai tujuannya.',
    pros: [
      'Aliran data searah mengurangi kemungkinan tabrakan data (collision)',
      'Performa tetap stabil di bawah beban berat',
      'Hemat kabel dibandingkan topologi star'
    ],
    cons: [
      'Satu node rusak akan memutus seluruh koneksi',
      'Penambahan atau pemindahan node memerlukan pemutusan jaringan sementara',
      'Sulit untuk memecahkan masalah koneksi'
    ],
    implementation: 'Token Ring (IBM) dan jaringan FDDI (Fiber Distributed Data Interface).',
    caseStudy: {
      title: 'Jaringan Fiber Optik Kampus',
      scenario: 'Menghubungkan 4 gedung utama kampus dalam satu loop untuk stabilitas transmisi.',
      solution: 'Menggunakan FDDI Dual-Ring. Jika satu jalur putus, jalur cadangan (cincin kedua) akan mengambil alih sehingga koneksi tetap berjalan.'
    },
    comparisonTable: [
      { feature: 'Collision', advantage: 'Hampir tidak ada', disadvantage: 'Data harus melewati banyak node' },
      { feature: 'Konfigurasi', advantage: 'Sirkuit tertutup rapi', disadvantage: 'Tergantung pada setiap node' },
      { feature: 'Kecepatan', advantage: 'Konsisten', disadvantage: 'Node lambat memperlambat semua' }
    ],
    questions: [
      {
        question: "Bagaimana arah aliran data pada Topologi Ring standar?",
        options: ["Dua arah secara bebas", "Hanya satu arah", "Acak", "Bergantung pada server"],
        correctAnswerIndex: 1,
        explanation: "Data pada topologi ring biasanya mengalir satu arah (unidirectional) melalui setiap komputer."
      },
      {
        question: "Apa konsekuensi jika salah satu komputer pada Ring mengalami kerusakan?",
        options: ["Jaringan tetap normal", "Seluruh jaringan terputus", "Hanya pengirim yang lambat", "Terjadi tabrakan data"],
        correctAnswerIndex: 1,
        explanation: "Karena setiap node berfungsi sebagai repeater untuk meneruskan data ke node berikutnya, kerusakan satu node memutus mata rantai aliran data."
      },
      {
        question: "Topologi Ring sering menggunakan metode akses yang disebut...",
        options: ["CSMA/CD", "Token Passing", "Direct Access", "Broadcasting"],
        correctAnswerIndex: 1,
        explanation: "Token Passing adalah metode di mana sebuah 'token' digital berputar di ring, dan hanya node pemegang token yang boleh mengirim data."
      }
    ]
  },
  {
    id: TopologyType.MESH,
    title: 'Topologi Mesh (Jala)',
    description: 'Setiap node terhubung ke banyak atau semua node lainnya. Ini memberikan redundansi maksimum dan keandalan tinggi.',
    pros: [
      'Sangat andal karena memiliki banyak jalur alternatif',
      'Privasi dan keamanan lebih terjaga',
      'Mudah mendeteksi kegagalan link spesifik'
    ],
    cons: [
      'Instalasi dan konfigurasi sangat rumit',
      'Biaya kabel dan interface hardware sangat tinggi',
      'Memakan banyak ruang fisik untuk perkabelan'
    ],
    implementation: 'Backbone Internet dan infrastruktur kritis militer.',
    caseStudy: {
      title: 'Pusat Data Perbankan',
      scenario: 'Bank memerlukan koneksi antar server yang tidak boleh mati sedetikpun.',
      solution: 'Full Mesh menghubungkan setiap server database. Jika 2 kabel putus sekaligus, sistem masih memiliki 3 jalur lain untuk sinkronisasi data.'
    },
    comparisonTable: [
      { feature: 'Redundansi', advantage: 'Maksimum (Sangat Aman)', disadvantage: 'Boros resource' },
      { feature: 'Fault Tolerance', advantage: 'Terbaik di kelasnya', disadvantage: 'Sangat mahal' },
      { feature: 'Setup', advantage: 'Dedicated link', disadvantage: 'Sangat rumit dikelola' }
    ],
    questions: [
      {
        question: "Apa keunggulan utama dari Topologi Mesh?",
        options: ["Murah harganya", "Redundansi (jalur cadangan) yang tinggi", "Hemat kabel", "Instalasi sangat cepat"],
        correctAnswerIndex: 1,
        explanation: "Topologi Mesh menyediakan banyak jalur antar node, sehingga jika satu jalur putus, masih banyak jalur alternatif lainnya."
      },
      {
        question: "Mengapa Topologi Mesh jarang digunakan untuk jaringan rumah biasa?",
        options: ["Sinyal lemah", "Tidak aman", "Sangat mahal dan rumit dalam perkabelan", "Hanya bisa untuk 2 komputer"],
        correctAnswerIndex: 2,
        explanation: "Biaya kabel dan jumlah port yang dibutuhkan sangat besar karena setiap perangkat harus terhubung ke banyak perangkat lain."
      },
      {
        question: "Jenis mesh di mana setiap node terhubung ke SEMUA node lainnya disebut...",
        options: ["Partial Mesh", "Full Mesh", "Hybrid Mesh", "Double Mesh"],
        correctAnswerIndex: 1,
        explanation: "Full Mesh adalah kondisi di mana setiap node memiliki koneksi langsung ke seluruh node lain dalam jaringan."
      }
    ]
  },
  {
    id: TopologyType.TREE,
    title: 'Topologi Tree (Pohon)',
    description: 'Gabungan dari topologi star dan bus. Terdiri dari kelompok-kelompok node star yang terhubung ke satu kabel bus utama.',
    pros: [
      'Sangat skalabel untuk jaringan yang luas',
      'Manajemen jaringan lebih terorganisir per kelompok',
      'Isolasi kesalahan lebih mudah dilakukan'
    ],
    cons: [
      'Bergantung sepenuhnya pada kabel backbone pusat',
      'Konfigurasi lebih sulit daripada topologi sederhana lainnya',
      'Semakin tinggi level hirarki, semakin rumit perawatannya'
    ],
    implementation: 'Jaringan sekolah bertingkat atau gedung perkantoran besar.',
    caseStudy: {
      title: 'Gedung Kantor 5 Lantai',
      scenario: 'Menyusun jaringan untuk kantor dengan banyak departemen di lantai berbeda.',
      solution: 'Setiap lantai memiliki Switch (Star), dan semua Switch lantai terhubung ke Switch Utama (Backbone) di ruang server pusat.'
    },
    comparisonTable: [
      { feature: 'Hierarki', advantage: 'Sangat terstruktur', disadvantage: 'Root rusak = Kiamat' },
      { feature: 'Skala', advantage: 'Bisa sangat luas', disadvantage: 'Kabel backbone jadi beban' },
      { feature: 'Troubleshoot', advantage: 'Bisa per-segmen', disadvantage: 'Butuh keahlian tinggi' }
    ],
    questions: [
      {
        question: "Topologi Tree merupakan gabungan dari topologi apa saja?",
        options: ["Star dan Mesh", "Bus dan Ring", "Star dan Bus", "Ring dan Mesh"],
        correctAnswerIndex: 2,
        explanation: "Topologi Tree mengombinasikan karakteristik Topologi Star (kelompok client) dan Topologi Bus (jalur utama/backbone)."
      },
      {
        question: "Node yang berada di tingkat paling atas pada Topologi Tree disebut...",
        options: ["Root Node", "Branch Node", "Leaf Node", "Trunk Node"],
        correctAnswerIndex: 0,
        explanation: "Root Node (Akar) adalah perangkat pusat di puncak hirarki yang mengelola seluruh cabang di bawahnya."
      },
      {
        question: "Apa resiko terbesar pada Topologi Tree?",
        options: ["Kabel client putus", "Kegagalan pada kabel backbone utama (Root)", "Penambahan node terlalu sulit", "Tabrakan data di setiap node"],
        correctAnswerIndex: 1,
        explanation: "Jika jalur utama atau root node rusak, maka seluruh cabang (sub-jaringan) di bawahnya akan kehilangan koneksi."
      }
    ]
  }
];