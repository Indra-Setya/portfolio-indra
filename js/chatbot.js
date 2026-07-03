document.addEventListener("DOMContentLoaded", () => {
  const chatBtn = document.getElementById("ai-chat-btn");
  const chatWindow = document.getElementById("ai-chat-window");
  const closeChat = document.getElementById("close-chat");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");
  const suggestionBtns = document.querySelectorAll(".suggestion-btn");

  if (!chatBtn) return; // Mencegah error jika chatbot tidak ada di halaman

  let isChatOpen = false;

  // Toggle Chat
  function toggleChat() {
    isChatOpen = !isChatOpen;
    if (isChatOpen) {
      chatWindow.classList.remove("scale-0", "opacity-0");
      chatWindow.classList.add("scale-100", "opacity-100");
      chatBtn
        .querySelectorAll("span")
        .forEach((el) => (el.style.display = "none"));
      setTimeout(() => chatInput.focus(), 300);
    } else {
      chatWindow.classList.remove("scale-100", "opacity-100");
      chatWindow.classList.add("scale-0", "opacity-0");
    }
  }

  chatBtn.addEventListener("click", toggleChat);
  closeChat.addEventListener("click", toggleChat);

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function appendMessage(text, isUser = false) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `flex gap-3 max-w-[85%] ${
      isUser ? "ml-auto flex-row-reverse" : ""
    }`;

    const avatarObj = isUser
      ? `<div class="w-8 h-8 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 text-xs"><i class="fa-solid fa-user"></i></div>`
      : `<div class="w-8 h-8 shrink-0 rounded-full bg-gradient-to-tr from-brand to-purple-500 flex items-center justify-center text-white text-xs shadow-sm"><i class="fa-solid fa-wand-magic-sparkles"></i></div>`;

    const bubbleColor = isUser
      ? `bg-brand text-white rounded-2xl rounded-tr-sm shadow-md`
      : `bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-sm rounded-2xl rounded-tl-sm`;

    msgDiv.innerHTML = `${avatarObj}<div class="p-3 ${bubbleColor} text-sm leading-relaxed">${text}</div>`;
    chatMessages.appendChild(msgDiv);
    scrollToBottom();
  }

  function showTyping() {
    const typingDiv = document.createElement("div");
    typingDiv.id = "typing-indicator";
    typingDiv.className = "flex gap-3 max-w-[85%]";
    typingDiv.innerHTML = `
        <div class="w-8 h-8 shrink-0 rounded-full bg-gradient-to-tr from-brand to-purple-500 flex items-center justify-center text-white text-xs"><i class="fa-solid fa-robot"></i></div>
        <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-2xl rounded-tl-sm flex items-center gap-1 w-16">
          <div class="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
          <div class="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
          <div class="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
        </div>
      `;
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
  }

  function removeTyping() {
    const typingIndicator = document.getElementById("typing-indicator");
    if (typingIndicator) typingIndicator.remove();
  }

  // NLP Engine Database
  function getAIResponse(input) {
    const text = input.toLowerCase();
    if (
      /(ai|nlp|kecerdasan buatan|machine learning|indobert|fasttext)/i.test(
        text
      )
    ) {
      return "Indra punya pengalaman kuat di <strong>AI & NLP</strong>! Dia membuat sistem rekomendasi video YouTube menggunakan <em>IndoBERT</em> untuk analisis sentimen dan <em>FastText</em> untuk kemiripan semantik. Keren kan? 🤖";
    } else if (/(cloud|gcp|google cloud|deploy|server)/i.test(text)) {
      return "Indra adalah lulusan <strong class='text-brand'>Bangkit Academy (Cloud Computing)</strong> dan punya lisensi resmi <strong>Google Cloud Engineer</strong>. Dia ahli melakukan deployment dan menjaga skalabilitas server menggunakan GCP. ☁️";
    } else if (
      /(backend|api|node|laravel|php|database|mysql|mongodb|c\+\+)/i.test(text)
    ) {
      return "Untuk Backend, Indra adalah ahlinya! 🛠️ Tech stack utamanya: <strong>Node.js, Python (Flask), Laravel (PHP), dan C++</strong>. Dia terbiasa merancang RESTful API dan mengoptimasi database MySQL & MongoDB.";
    } else if (
      /(frontend|mobile|android|kotlin|next\.js|javascript|ui|ux)/i.test(text)
    ) {
      return "Meski fokus di Backend/Cloud, Indra juga handal membuat Frontend modern dengan <strong>Next.js & Tailwind CSS</strong>. Dia juga bisa bikin aplikasi Android Native menggunakan <strong>Kotlin & Firebase</strong> (Proyek: LongoMate). 📱";
    } else if (/(pengalaman|kerja|intern|pt murgung|magang)/i.test(text)) {
      return "Indra bekerja sebagai <strong>Full Stack Developer di PT Murgung</strong> (membuat ERP, payroll & sistem GPS absensi) dan lulusan program elit <strong>Bangkit Academy 2024</strong>. 💼";
    } else if (/(kontak|hubungi|email|whatsapp|wa|hire|rekrut)/i.test(text)) {
      return "Wah, mau ngajak kolaborasi ya? Langsung saja hubungi Indra lewat email di <strong>indrasetya379@gmail.com</strong> atau WhatsApp di <strong>+62 881-7671-468</strong>. Dia akan balas dengan cepat! 🚀";
    } else if (/(halo|hai|pagi|siang|sore|malam|hei)/i.test(text)) {
      return "Halo! Ada yang bisa saya bantu jelaskan mengenai kualifikasi, skill, atau pengalaman Indra? Silakan tanya saja! ✨";
    } else {
      return "Hmm, saya belum dilatih untuk menjawab pertanyaan itu. Tapi Anda bisa bertanya soal <strong>Skill AI</strong>, <strong>Sistem Backend</strong>, <strong>Pengalaman Cloud</strong>, atau klik tombol di bawah untuk menghubungi Indra langsung! 👇";
    }
  }

  function handleSend(text) {
    if (!text.trim()) return;
    appendMessage(text, true);
    chatInput.value = "";

    setTimeout(() => {
      showTyping();
      setTimeout(() => {
        removeTyping();
        const response = getAIResponse(text);
        appendMessage(response, false);
      }, 1200 + Math.random() * 800);
    }, 300);
  }

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSend(chatInput.value);
  });

  suggestionBtns.forEach((btn) => {
    btn.addEventListener("click", () => handleSend(btn.innerText));
  });
});
