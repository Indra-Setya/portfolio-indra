export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI' | 'Backend' | 'Mobile' | 'Full Stack' | 'Software';
  desc: string;
  role: string;
  tech: string[];
  image: string | null;
  github: string;
  demo?: string;
  problem: string;
  solution: string;
  impact: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  type: 'work' | 'education';
  logo?: string;
  logoFallback?: string;
  desc: string;
  highlights: string[];
  skills: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  category: 'Google Cloud' | 'Dicoding' | 'Bangkit';
  period: string;
  skills: string[];
  verified: boolean;
}

export interface TechStackItem {
  name: string;
  category: 'backend' | 'frontend' | 'cloud_ai';
  color: string;
  level: string;
}

export const PERSONAL_INFO = {
  name: "Indra Setya Ari Irawan",
  shortName: "Indra Setya",
  title: "Backend, AI & Cloud Engineer",
  tagline: "Membangun Solusi Digital dengan Kode & Kecerdasan",
  bio: "Lulusan Teknik Informatika di Universitas Ahmad Dahlan dan alumni program elit Bangkit Academy (Google Cloud Cohort). Berfokus utama pada arsitektur sistem Backend, infrastruktur Cloud (GCP), integrasi Machine Learning / AI, dan pengembangan perangkat lunak yang scalable serta berpusat pada pengguna.",
  location: "Yogyakarta, Indonesia",
  email: "indrasetya379@gmail.com",
  phone: "+62 881-7671-468",
  whatsappUrl: "https://wa.me/628817671468",
  githubUrl: "https://github.com/Indra-Setya",
  linkedinUrl: "https://www.linkedin.com/in/indra-setya-ari-irawan-57a700327",
  resumePath: "/Indra Setya Ari Irawan - Resume.pdf",
  profileImg: "/IMG/STR01416 (1).JPG",
  avatarImg: "/IMG/IMG_9198.jpg",
  status: "Backend Intern @ PT SJP Bengkulu",
  ipk: "3.59",
  contributions: 129,
  streak: 1,
  longestStreak: 3,
};

export const TECH_STACK: TechStackItem[] = [
  // Backend & Core
  { name: "Node.js", category: "backend", color: "#339933", level: "Advanced" },
  { name: "Python (Flask)", category: "backend", color: "#3776AB", level: "Advanced" },
  { name: "PHP (Laravel 12)", category: "backend", color: "#FF2D20", level: "Advanced" },
  { name: "PostgreSQL & Redis", category: "backend", color: "#4169E1", level: "Advanced" },
  { name: "RESTful API", category: "backend", color: "#5B6CFF", level: "Expert" },
  { name: "C++", category: "backend", color: "#00599C", level: "Intermediate" },

  // Frontend & Mobile
  { name: "Next.js & React", category: "frontend", color: "#61DAFB", level: "Advanced" },
  { name: "Vue.js & Inertia", category: "frontend", color: "#4FC08D", level: "Advanced" },
  { name: "TypeScript / JS", category: "frontend", color: "#3178C6", level: "Advanced" },
  { name: "Tailwind CSS", category: "frontend", color: "#06B6D4", level: "Advanced" },
  { name: "Kotlin (Android)", category: "frontend", color: "#7F52FF", level: "Proficient" },

  // Cloud & AI
  { name: "Google Cloud (GCP)", category: "cloud_ai", color: "#4285F4", level: "Certified" },
  { name: "Docker & Linux", category: "cloud_ai", color: "#2496ED", level: "Advanced" },
  { name: "MySQL & MongoDB", category: "cloud_ai", color: "#4479A1", level: "Advanced" },
  { name: "NLP & IndoBERT", category: "cloud_ai", color: "#5B6CFF", level: "Advanced" },
  { name: "Git & GitHub", category: "cloud_ai", color: "#F05032", level: "Advanced" },
];

export const EXPERIENCES: Experience[] = [
  {
    id: "sjp-holding",
    role: "Backend & Full Stack Developer Intern",
    company: "PT Selamat Jaya Persada (SJP Holding Bengkulu)",
    period: "Okt 2026 - Sekarang",
    type: "work",
    logo: "/IMG/sjp_logo.png",
    logoFallback: "SJP",
    desc: "Merancang dan mengembangkan sistem terpusat HRIS & Smart Attendance berbasis biometrik wajah AI dan geofencing GPS untuk operasional site pertambangan batu bara dan seluruh entitas holding.",
    highlights: [
      "Mengembangkan modul Backend HRIS terpusat (BE-HRIS) untuk sinkronisasi profil dan data kepegawaian holding",
      "Mengintegrasikan inferensi biometrik wajah AI (YuNet & SFace) dan validasi GPS radius site tambang anti-spoofing",
      "Membangun arsitektur Single Sign-On (SSO IdP) holding berbasis token handshake HMAC-SHA256 untuk aplikasi satelit",
      "Merancang skema multi-entitas holding di PostgreSQL 16, Redis caching, dan pipeline container Docker",
    ],
    skills: ["Laravel 12", "PHP 8.4", "PostgreSQL", "Redis", "Docker", "REST API", "Inertia.js", "Vue 3", "Biometric AI"],
  },
  {
    id: "bangkit",
    role: "Backend Developer | QA Engineer",
    company: "Bangkit Academy (Google, Tokopedia, Gojek, Traveloka)",
    period: "Sep 2024 - Jan 2025",
    type: "work",
    logo: "/IMG/logo bangkit.png",
    logoFallback: "BA",
    desc: "Merancang arsitektur backend dan mengembangkan RESTful API menggunakan Node.js untuk Capstone Project (WizzMate). Melakukan pengujian QA dan mendeploy layanan cloud menggunakan Google Cloud Platform (GCP).",
    highlights: [
      "Mengembangkan RESTful API microservices dengan respons time rata-rata sub-200ms",
      "Deploy and configure Google Cloud Run & Cloud SQL with automatic scaling",
      "Memimpin pengujian QA komprehensif untuk memastikan 99.9% uptime Capstone",
    ],
    skills: ["Node.js", "Google Cloud", "REST API", "QA Engineering", "Cloud Run"],
  },
  {
    id: "murgung",
    role: "Full Stack Developer",
    company: "PT Murgung",
    period: "Mei 2023 - Sekarang",
    type: "work",
    logoFallback: "PT",
    desc: "Mengembangkan website company profile, merancang sistem absensi karyawan berbasis pelacakan lokasi GPS dengan geofencing presisi, dan membangun fitur manajemen payroll otomatis.",
    highlights: [
      "Membangun sistem presensi geofencing real-time mencegah manipulasi absensi",
      "Merancang modul payroll otomatis terintegrasi data jam kerja dan lembur",
      "Modernisasi UI website company profile untuk meningkatkan lead klien",
    ],
    skills: ["Laravel", "PHP", "MySQL", "JavaScript", "GPS Geolocation", "Tailwind CSS"],
  },
  {
    id: "uad",
    role: "Bachelor of Informatics Engineering",
    company: "Universitas Ahmad Dahlan",
    period: "2022 - 2026",
    type: "education",
    logo: "/IMG/logo UAD.png",
    logoFallback: "UAD",
    desc: "IPK: 3.59. Mendalami peminatan Rekayasa Perangkat Lunak, Kecerdasan Buatan (AI), Natural Language Processing (NLP), serta Keamanan Komputer.",
    highlights: [
      "IPK Kumulatif: 3.59 / 4.00",
      "Fokus riset tugas akhir pada sistem rekomendasi AI berbasis NLP IndoBERT & FastText",
      "Aktif dalam berbagai proyek rekayasa software dan komputasi awan",
    ],
    skills: ["AI / NLP", "Software Engineering", "Algorithms & Data Structures", "Database Architecture"],
  },
  {
    id: "sma",
    role: "Jurusan MIPA (Science)",
    company: "SMA N1 Ngawen",
    period: "2020 - 2024",
    type: "education",
    logo: "/IMG/Logo SMA.png",
    logoFallback: "SMA",
    desc: "Menempuh pendidikan tingkat menengah dengan fokus Matematika dan Ilmu Pengetahuan Alam, membangun landasan logika analitis dan komputasional yang kuat.",
    highlights: [
      "Fondasi kuat dalam logika matematika dan pemecahan masalah algoritma",
      "Awal eksplorasi pemrograman komputer dan teknologi digital",
    ],
    skills: ["Mathematics", "Logic & Problem Solving", "Analytical Thinking"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "presensi-sjp",
    title: "Presensi SJP — Smart HRIS & Face Biometrics",
    subtitle: "Enterprise Mining HRIS, Face Recognition AI & Holding SSO",
    category: "Backend",
    desc: "Platform terpusat HRIS & absensi pintar holding tambang batu bara PT Selamat Jaya Persada Bengkulu dengan verifikasi biometrik wajah AI, validasi geofencing GPS radius site, roster shift tambang, dan SSO IdP holding.",
    role: "Backend & Full Stack Developer Intern",
    tech: ["Laravel 12", "PHP 8.4", "PostgreSQL", "Redis", "Docker", "Face Biometrics", "Vue 3", "Inertia.js"],
    image: "/IMG/sjp_mining_bg.jpg",
    github: "https://github.com/IT-SJP/presensi-sjp",
    featured: true,
    problem: "Operasional pertambangan batu bara di site lapangan memerlukan presensi kehadiran akurat anti titip absen, manajemen roster dan shift kerja tambang yang dinamis, serta integrasi satu pintu (SSO) ke seluruh ekosistem aplikasi holding.",
    solution: "Merancang arsitektur monolitik modern berbasis Laravel 12 + Inertia.js terintegrasi microservice biometrik wajah AI (YuNet + SFace), GPS radius perimeter site tambang, arsitektur database multi-entitas PostgreSQL 16 & Redis, serta protokol SSO handshake HMAC-SHA256.",
    impact: "Menjadi Single Source of Truth bagi seluruh data kepegawaian holding PT Selamat Jaya Persada dan mengeliminasi manipulasi presensi site lapangan secara real-time.",
  },
  {
    id: "edu-video",
    title: "Edu Video Recommendation Plugin",
    subtitle: "AI-Powered Moodle Learning Assistant",
    category: "AI",
    desc: "Plugin Moodle berbasis AI untuk rekomendasi video YouTube edukatif dengan analisis sentimen menggunakan IndoBERT & kesamaan semantik FastText.",
    role: "AI / Backend Engineer",
    tech: ["Python", "IndoBERT", "FastText", "Moodle API", "NLP", "Flask"],
    image: "/IMG/Proyek 1.png",
    github: "https://github.com/Indra-Setya",
    featured: true,
    problem: "Mahasiswa sering kesulitan menemukan video pembelajaran yang relevan dengan topik silabus dan memiliki penjelasan berkualitas tinggi di platform e-learning.",
    solution: "Mengintegrasikan pipeline NLP ganda: model IndoBERT untuk analisis sentimen ulasan video YouTube dan algoritma FastText cosine similarity untuk pencocokan semantik konten kurikulum.",
    impact: "Meningkatkan relevansi materi kurikulum secara otomatis di dalam dashboard Moodle, memangkas waktu pencarian materi hingga 75%.",
  },
  {
    id: "wizzmate",
    title: "WizzMate: Travel Guide API",
    subtitle: "Smart Tourism Engine & Cloud Infrastructure",
    category: "Backend",
    desc: "Platform cerdas untuk rekomendasi pariwisata (Capstone Project Bangkit). Bertugas merancang, menguji reliabilitas, & deploy RESTful API menggunakan Node.js ke Google Cloud.",
    role: "Backend / Cloud Developer",
    tech: ["Node.js", "Express", "Google Cloud", "Cloud Run", "Cloud Storage", "REST API"],
    image: "/IMG/Screenshot 2026-02-04 125425.png",
    github: "https://github.com/Iq11k/Capstone-WizzMate",
    featured: true,
    problem: "Wisatawan memerlukan itinerari perjalanan personal yang responsif terhadap keterbatasan anggaran, estimasi waktu, dan titik rute di lapangan.",
    solution: "Membangun arsitektur backend RESTful modular yang efisien di Google Cloud Run, dilengkapi penanganan caching dan integrasi model machine learning rekomendasi wisata.",
    impact: "Sukses dipresentasikan sebagai Bangkit Academy Capstone Project dengan respons API sub-200ms dan zero downtime saat evaluasi beban.",
  },
  {
    id: "longomate",
    title: "LongoMate – Language Learning",
    subtitle: "Gamified Native Android Educational App",
    category: "Mobile",
    desc: "Aplikasi mobile Android interaktif untuk belajar bahasa dengan modul speaking, writing, kamus dwibahasa, dan sistem poin gamifikasi.",
    role: "Mobile Developer",
    tech: ["Kotlin", "Android SDK", "Firebase Auth", "Cloud Firestore", "Text-to-Speech"],
    image: "/IMG/Proyek 3.png",
    github: "https://github.com/Indra-Setya/PMOB-Slebew",
    featured: false,
    problem: "Kurangnya interaktivitas pada aplikasi belajar bahasa konvensional yang kerap membuat pengguna cepat bosan.",
    solution: "Mengembangkan aplikasi Android native dengan arsitektur MVVM, fitur latihan percakapan audio realtime menggunakan Text-to-Speech, serta leaderboards poin gamifikasi terdesentralisasi.",
    impact: "Tingkat retensi belajar mandiri meningkat dengan feedback pengguna yang mengapresiasi kecepatan respon dan tampilan antarmuka interaktif.",
  },
  {
    id: "constmg",
    title: "ConstMG – Construction Management",
    subtitle: "Enterprise Construction ERP & Material Tracker",
    category: "Backend",
    desc: "Sistem manajemen konstruksi yang dikembangkan untuk memfasilitasi bisnis klien nyata. Bertanggung jawab merancang database relasional dan RESTful API backend.",
    role: "Backend Developer",
    tech: ["Laravel", "PHP", "MySQL", "REST API", "Database Design"],
    image: null,
    github: "https://github.com/Indra-Setya",
    featured: false,
    problem: "Manajemen inventaris bahan baku bangunan dan pemantauan timeline proyek yang sebelumnya rentan human-error akibat pencatatan manual lintas spreadsheet.",
    solution: "Merancang skema database normalisasi tinggi serta API transaksi batch untuk melacak mutasi stok material, approval mandor, dan milestone proyek terpusat.",
    impact: "Mempercepat audit operasional proyek konstruksi dan mencegah selisih biaya material di lapangan.",
  },
  {
    id: "pt-murgung",
    title: "PT Murgung - ERP & Profile Web",
    subtitle: "Corporate System & GPS Geofenced Attendance",
    category: "Full Stack",
    desc: "Sistem operasional menyeluruh mencakup website profil bisnis perusahaan, sistem absensi karyawan dengan pelacakan lokasi GPS, dan fungsionalitas manajemen payroll.",
    role: "Full Stack Developer",
    tech: ["PHP", "Laravel", "MySQL", "HTML5 Geolocation", "JavaScript", "Tailwind CSS"],
    image: null,
    github: "https://github.com/Indra-Setya",
    featured: false,
    problem: "Perusahaan memerlukan verifikasi presensi yang akurat untuk staf lapangan serta simplifikasi perhitungan slip gaji bulanan yang sering terlambat.",
    solution: "Menerapkan modul absensi geofencing berbasis koordinat GPS perangkat dengan toleransi radius dinamis, langsung terintegrasi otomatis ke engine kalkulasi payroll bulanan.",
    impact: "Digunakan aktif sebagai tulang punggung operasional harian perusahaan, mengeliminasi kecurangan absensi secara total.",
  },
  {
    id: "desktop-cashier",
    title: "Desktop Cashier System",
    subtitle: "High-Speed POS Engine via Pure OOP",
    category: "Software",
    desc: "Aplikasi kasir desktop yang dibangun secara mandiri. Menerapkan konsep Object-Oriented Programming (OOP) untuk operasi pengelolaan transaksi dan kasir.",
    role: "Software Developer",
    tech: ["C++", "OOP Architecture", "File I/O", "Data Structures", "CLI / POS"],
    image: null,
    github: "https://github.com/Indra-Setya",
    featured: false,
    problem: "Kebutuhan sistem kasir offline yang sangat tangguh, tidak bergantung pada koneksi internet, serta dapat dijalankan pada perangkat keras minim memori.",
    solution: "Menerapkan prinsip OOP (Encapsulation, Inheritance, Polymorphism) dalam bahasa C++ dengan serialisasi penyimpanan transaksi file-based yang cepat dan aman dari corrupt data.",
    impact: "Waktu eksekusi checkout nol latency (< 5ms) dan footprint memori sistem di bawah 15MB.",
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "bangkit-cert",
    title: "Bangkit Academy 2024",
    issuer: "Cloud Computing Cohort (Google, Tokopedia, Gojek, Traveloka)",
    category: "Bangkit",
    period: "09/2024 - Sekarang",
    skills: ["Google Cloud Platform", "Cloud Architecture", "DevOps", "Node.js"],
    verified: true,
  },
  {
    id: "gcp-engineer",
    title: "Menjadi Google Cloud Engineer",
    issuer: "Google Cloud / Dicoding Indonesia",
    category: "Google Cloud",
    period: "11/2024 - 11/2027",
    skills: ["Compute Engine", "VPC & Networking", "Kubernetes", "IAM Security"],
    verified: true,
  },
  {
    id: "backend-pemula",
    title: "Membuat Aplikasi Back-End Pemula",
    issuer: "Google Cloud / Dicoding Indonesia",
    category: "Google Cloud",
    period: "11/2024 - 11/2027",
    skills: ["Node.js", "Hapi Framework", "RESTful API", "Unit Testing"],
    verified: true,
  },
  {
    id: "dasar-ai",
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    category: "Dicoding",
    period: "10/2024 - 10/2027",
    skills: ["Machine Learning Basics", "Supervised Learning", "Model Evaluation"],
    verified: true,
  },
  {
    id: "dasar-js",
    title: "Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    category: "Dicoding",
    period: "10/2024 - 10/2027",
    skills: ["ES6+", "Asynchronous JS", "OOP in JS", "Functional Programming"],
    verified: true,
  },
  {
    id: "dasar-web",
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    category: "Dicoding",
    period: "09/2024 - 09/2027",
    skills: ["Semantic HTML5", "Responsive CSS3", "Flexbox & Grid"],
    verified: true,
  },
  {
    id: "git-github",
    title: "Belajar Dasar Git dengan GitHub",
    issuer: "Dicoding Indonesia",
    category: "Dicoding",
    period: "09/2024 - 09/2027",
    skills: ["Git Workflow", "Branching & Merging", "Pull Requests", "Code Review"],
    verified: true,
  },
  {
    id: "logika-prog",
    title: "Pengenalan ke Logika Pemrograman",
    issuer: "Dicoding Indonesia (Logic 101)",
    category: "Dicoding",
    period: "09/2024 - 09/2027",
    skills: ["Algorithmic Thinking", "Flowcharts", "Pseudocode", "Complexity"],
    verified: true,
  },
  {
    id: "memulai-prog",
    title: "Memulai Dasar Pemrograman",
    issuer: "Dicoding Indonesia",
    category: "Dicoding",
    period: "09/2024 - 09/2027",
    skills: ["Software Engineering Fundamentals", "Data Types", "Control Flow"],
    verified: true,
  },
];
