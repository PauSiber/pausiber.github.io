(() => {
  const header = document.getElementById("site-header");
  const navToggle = document.getElementById("nav-toggle");
  const navLinksEl = document.getElementById("nav-links");
  const yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const onScroll = () => {
    if (window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && navLinksEl) {
    navToggle.addEventListener("click", () => {
      const open = navLinksEl.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    navLinksEl.querySelectorAll("a[href^='#']").forEach((a) => {
      a.addEventListener("click", () => {
        navLinksEl.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const sections = document.querySelectorAll("main section[id], section[id]");
  const navAnchors = navLinksEl
    ? navLinksEl.querySelectorAll("a[href^='#']")
    : [];
  const linkMap = new Map();
  navAnchors.forEach((a) => linkMap.set(a.getAttribute("href").slice(1), a));

  if (linkMap.size > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navAnchors.forEach((a) => a.classList.remove("active"));
            const link = linkMap.get(id);
            if (link) link.classList.add("active");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }
})();

/* ===== Interactive Hero Console ===== */
(() => {
  const consoleEl = document.getElementById("console");
  const scrollback = document.getElementById("scrollback");
  const cmdInput = document.getElementById("cmdInput");
  const chipsEl = document.getElementById("chips");
  if (!consoleEl || !scrollback || !cmdInput || !chipsEl) return;

  const PROMPT_HTML =
    '<span class="prompt-frag"><span class="g">root</span><span class="d">@</span><span class="b">pausiber</span><span class="d">:</span><span class="a">~</span><span class="d">$</span></span>';

  const escapeHtml = (s) =>
    s.replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
    );

  const COMMANDS = {
    help() {
      const items = [
        ["whoami", "kim olduğumuzu göster"],
        ["whois", "whoami alias'ı"],
        ["ls", "bölümleri listele"],
        ["cat kimiz.txt", "karakterimizi oku"],
        ["cat kimiz", "cat kimiz.txt alias'ı"],
        ["cat what_we_do.sh --all", "neler yaptığımızı detaylı oku"],
        ["cat what_we_do.sh", "cat what_we_do.sh --all alias'ı"],
        ["cat yapiyoruz.log", "cat what_we_do.sh --all alias'ı"],
        ["cat yapiyoruz", "cat what_we_do.sh --all alias'ı"],
        ["social", "sosyal medya hesapları"],
        ["./join.sh", "kulübe katıl"],
        ["events", "yaklaşan etkinlikler"],
        ["date", "tarih ve saat"],
        ["pwd", "geçerli dizin"],
        ["uname", "sistem adı"],
        ["uname -a", "detaylı sistem bilgisi"],
        ["motd", "günün mesajı"],
        ["history", "komut geçmişi"],
        ["echo &lt;metin&gt;", "metni terminale yazdır"],
        ["man &lt;komut&gt;", "komut yardımını göster"],
        ["coffee", "kahve durumu"],
        ["hack", "eğlencelik tarama çıktısı"],
        ["sudo", "yetki denemesi cevabı"],
        ["rm -rf /", "güvenli şaka komutu"],
        ["exit", "oturumu kapatma denemesi"],
        ["clear", "ekranı temizle"],
        ["cls", "clear alias'ı"],
      ];
      let out = '<div class="accent">Available commands:</div>';
      items.forEach(([c, d]) => {
        out += `<div class="row-grid"><span class="k">${c}</span><span>${d}</span></div>`;
      });
      out += '<div class="muted" style="margin-top:6px">↑/↓ geçmiş · Tab tamamlama · Enter çalıştır</div>';
      return out;
    },
    whoami() {
      return '<span class="accent">paüsiber</span> — <span class="prose">Pamukkale Üniversitesi Siber Topluluğu.</span>';
    },
    ls() {
      const files = [
        ["kimiz.txt", ""],
        ["what_we_do.sh", "exe"],
        ["etkinlikler/", "dir"],
        ["sosyal.json", ""],
        ["join.sh", "exe"],
        ["github.url", ""],
        ["youtube.url", ""],
        ["coffee.lock", ""],
      ];
      let out = '<div class="ls-grid">';
      files.forEach(([f, cls]) => {
        out += `<span${cls ? ` class="${cls}"` : ""}>${f}</span>`;
      });
      out += "</div>";
      return out;
    },
    "cat kimiz.txt"() {
      return `<div class="prose">
        Özünde gece gündüz birşeyler öğrenmeye, insanlığa yarar sağlayacak çıkarımlarda bulunmaya çalışan insanlarız.
        <div style="margin-top:8px;font-family:var(--font-mono);color:var(--brand-amber)">
          → İstek · Zaman · Hedef Odaklı · Mobil · Kod · Kahve
        </div>
      </div>`;
    },
    "cat what_we_do.sh --all"() {
      const sections = [
        ["öğreniyoruz", "learn", [
          "Ders çalışıyor, blog okuyup yazıyoruz.",
          "Discord üzerinden <b>pair programming</b> yapıyoruz.",
          "Linux dağıtımlarını günlük olarak kullanıyoruz.",
        ]],
        ["üretiyoruz", "build", [
          "Kendi <b>mobil &amp; web</b> uygulamalarımızı yazıyoruz.",
          "<b>Git &amp; GitHub</b> ile kod versiyonluyoruz.",
          "Hedef odaklı projelerimizi sonuna kadar götürüyoruz.",
        ]],
        ["paylaşıyoruz", "share", [
          "Eğitimler ve <b>yarışmalar</b> düzenliyoruz.",
          "<b>YouTube</b> üzerinden online etkinlikler yapıyoruz.",
          "Yeni gelenleri ekibe katıp birlikte yetişiyoruz.",
        ]],
        ["hayatta kalıyoruz", "fuel", [
          "Goygoyu seviyoruz ama görevimizi de yapıyoruz.",
          "Kahvesiz yapamıyoruz; uzun geceleri onunla kapatıyoruz.",
          "Uyumuyoruz — kod yazılacaksa o kahve sıcakken yazılır.",
        ]],
      ];
      let out = '<div class="prose"><div class="muted"># Pamukkale Üniversitesi · Siber Topluluğu — günlük rutin</div>';
      sections.forEach(([title, tag, items]) => {
        out += `<div style="margin-top:10px"><span class="accent">› ${title}</span> <span class="muted">// ${tag}</span></div>`;
        items.forEach((i) => { out += `<div>· ${i}</div>`; });
      });
      out += "</div>";
      return out;
    },
    social() {
      return `<div>
        <div><span style="color:var(--brand-blue)">github&nbsp;&nbsp;</span> <a href="https://github.com/PauSiber" target="_blank" rel="noopener">github.com/PauSiber</a></div>
        <div><span style="color:var(--brand-blue)">youtube&nbsp;</span> <a href="https://www.youtube.com/channel/UCCwfbMmxhRkUqWyHWt5uwCw" target="_blank" rel="noopener">youtube.com/PaüSiber</a></div>
        <div><span style="color:var(--brand-blue)">twitter&nbsp;</span> <a href="https://twitter.com/SiberPau" target="_blank" rel="noopener">@SiberPau</a></div>
        <div><span style="color:var(--brand-blue)">telegram</span> <a href="https://t.me/siberpau" target="_blank" rel="noopener">t.me/siberpau</a></div>
        <div><span style="color:var(--brand-blue)">discord&nbsp;</span> <a href="https://discord.gg/dUwa68F" target="_blank" rel="noopener">discord.gg/dUwa68F</a></div>
      </div>`;
    },
    "./join.sh"() {
      return `<div>
        <div class="accent">$ initializing membership protocol...</div>
        <div class="ok">✓ handshake ok</div>
        <div class="ok">✓ coffee.lock acquired</div>
        <div class="prose" style="margin-top:6px">
          Pamukkale Teknokent · HackerSpace adresinde bizi bul.
          <a href="https://discord.gg/dUwa68F" target="_blank" rel="noopener">Discord'a katıl</a> ya da
          <a href="https://github.com/PauSiber" target="_blank" rel="noopener">GitHub'da takip et</a>.
          <span class="accent">Hoşgeldin.</span>
        </div>
      </div>`;
    },
    events() {
      return `<div class="prose">
        <div class="muted"># yaklaşan etkinlikler</div>
        <div>· <b>Coding Night</b> — yıllık 24 saatlik hackathon</div>
        <div>· <b>Atölyeler</b> — Discord & kampüste düzenli toplantılar</div>
        <div>· <b>YouTube canlı yayınları</b> — siber güvenlik konuları</div>
        <div class="muted" style="margin-top:6px">tam liste için: <a href="#etkinlikler">#etkinlikler</a></div>
      </div>`;
    },
    date() {
      const d = new Date();
      const tr = d.toLocaleString("tr-TR", { dateStyle: "full", timeStyle: "medium" });
      return `<span class="muted">${tr}</span>`;
    },
    pwd() {
      return '<span class="muted">/home/pausiber</span>';
    },
    uname() {
      return '<span class="muted">PauSiberOS</span>';
    },
    "uname -a"() {
      const y = new Date().getFullYear();
      return `<span class="muted">PauSiberOS ${y}.04 #denizli SMP x86_64 GNU/Linux · pamukkale-uni</span>`;
    },
    motd() {
      const lines = [
        "her gün biraz daha hacker'ız.",
        "kahve sıcakken kod soğumaz.",
        "pair > solo. her zaman.",
        "make it work, make it right, make it fast.",
        "rm -rf /etc/uyku — done.",
        "stay curious. ship things.",
      ];
      const pick = lines[Math.floor(Math.random() * lines.length)];
      return `<span class="accent">motd:</span> <span class="prose">${pick}</span>`;
    },
    coffee() {
      return '<div><span class="accent">☕</span> <span class="prose">brewing</span> <span class="muted">… (refill required)</span></div>';
    },
    hack() {
      return `<div>
        <div class="muted">[*] scanning network...</div>
        <div class="ok">[+] found 1 host: pausiber.xyz</div>
        <div class="muted">[*] running exploit...</div>
        <div class="out-error">[!] target is friendly. aborting.</div>
      </div>`;
    },
    clear: "__clear__",
    "rm -rf /"() {
      return '<span class="out-error">nice try, friend. permission denied.</span>';
    },
    sudo() {
      return '<span class="out-error">user \'guest\' is not in the sudoers file. this incident will be reported.</span>';
    },
    exit() {
      return '<span class="muted">connection persists. you can\'t leave that easily.</span>';
    },
  };
  // aliases
  COMMANDS["cat kimiz"] = COMMANDS["cat kimiz.txt"];
  COMMANDS["cat what_we_do.sh"] = COMMANDS["cat what_we_do.sh --all"];
  COMMANDS["cat yapiyoruz.log"] = COMMANDS["cat what_we_do.sh --all"];
  COMMANDS["cat yapiyoruz"] = COMMANDS["cat what_we_do.sh --all"];
  COMMANDS["cls"] = COMMANDS.clear;
  COMMANDS["whois"] = COMMANDS.whoami;

  const appendCmd = (text) => {
    const div = document.createElement("div");
    div.className = "ln cmd";
    div.innerHTML = `${PROMPT_HTML} <span>${escapeHtml(text)}</span>`;
    scrollback.appendChild(div);
  };
  const appendOut = (html) => {
    const div = document.createElement("div");
    div.className = "ln";
    div.innerHTML = html;
    scrollback.appendChild(div);
  };
  const scrollDown = () => {
    scrollback.scrollTop = scrollback.scrollHeight;
  };

  const history = [];
  let histIdx = -1;

  const MAN_PAGES = {
    help: "available komutları listeler",
    whoami: "kim olduğumuzu yazar",
    ls: "dosya/dizinleri listeler",
    cat: "dosya içeriğini yazdırır — kullanım: cat <dosya>",
    social: "sosyal medya linklerini gösterir",
    "./join.sh": "kulübe katılma protokolünü çalıştırır",
    events: "yaklaşan etkinlikleri özetler",
    date: "şu anki tarih ve saat",
    pwd: "geçerli dizini yazdırır",
    uname: "kernel/sistem bilgisi (-a ile detaylı)",
    motd: "günün mesajı — her seferinde farklı",
    history: "yazdığın komutların listesi",
    echo: "argümanları yansıtır — kullanım: echo <metin>",
    man: "komut için kısa kullanım — kullanım: man <komut>",
    clear: "scrollback'i temizler (cls)",
    coffee: "☕",
    hack: "elite hacker mode (joke)",
  };

  const run = (raw) => {
    const cmd = raw.trim();
    if (!cmd) return;
    history.unshift(cmd);
    histIdx = -1;

    let handler = COMMANDS[cmd] || COMMANDS[cmd.toLowerCase()];

    // Dynamic commands with arguments
    if (!handler) {
      const m = cmd.match(/^(\S+)\s+(.+)$/);
      if (m) {
        const head = m[1].toLowerCase();
        const arg = m[2];
        if (head === "echo") {
          handler = () => `<span>${escapeHtml(arg)}</span>`;
        } else if (head === "man") {
          const doc = MAN_PAGES[arg.toLowerCase()];
          handler = () =>
            doc
              ? `<div class="prose"><b>${escapeHtml(arg)}</b><br><span class="muted">${doc}</span></div>`
              : `<span class="out-error">no manual entry for ${escapeHtml(arg)}</span>`;
        }
      } else if (cmd.toLowerCase() === "history") {
        handler = () => {
          if (!history.length) return '<span class="muted">(empty)</span>';
          return history
            .slice()
            .reverse()
            .map((h, i) => `<div><span class="muted">${String(i + 1).padStart(3)}</span>  ${escapeHtml(h)}</div>`)
            .join("");
        };
      } else if (cmd.toLowerCase() === "echo") {
        handler = () => "";
      } else if (cmd.toLowerCase() === "man") {
        handler = () => '<span class="muted">what manual page do you want? — kullanım: man &lt;komut&gt;</span>';
      }
    }

    if (handler === "__clear__") {
      scrollback.innerHTML = "";
      return;
    }

    appendCmd(cmd);
    if (typeof handler === "function") {
      appendOut(handler());
    } else {
      appendOut(
        `<span class="out-error">command not found: ${escapeHtml(
          cmd
        )} — type 'help'</span>`
      );
    }
    scrollDown();
  };

  // boot
  appendOut(
    `<span class="muted">Welcome to PauSiber OS · v3.0.${
      new Date().getFullYear() % 100
    }<br>Type 'help' to see available commands.</span>`
  );
  appendCmd("whoami");
  appendOut(COMMANDS.whoami());
  scrollDown();

  cmdInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      run(cmdInput.value);
      cmdInput.value = "";
    } else if (e.key === "ArrowUp") {
      if (histIdx + 1 < history.length) {
        histIdx++;
        cmdInput.value = history[histIdx];
      }
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      if (histIdx > 0) {
        histIdx--;
        cmdInput.value = history[histIdx];
      } else {
        histIdx = -1;
        cmdInput.value = "";
      }
      e.preventDefault();
    } else if (e.key === "Tab") {
      const v = cmdInput.value;
      if (v) {
        const match = Object.keys(COMMANDS).find((k) => k.startsWith(v));
        if (match) cmdInput.value = match;
      }
      e.preventDefault();
    }
  });

  [
    "help",
    "ls",
    "cat kimiz.txt",
    "cat what_we_do.sh --all",
    "events",
    "social",
    "./join.sh",
    "motd",
    "clear",
  ].forEach((c) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = c;
    b.addEventListener("click", () => {
      run(c);
      cmdInput.focus();
    });
    chipsEl.appendChild(b);
  });

  consoleEl.addEventListener("click", (e) => {
    const t = e.target;
    if (t.tagName !== "BUTTON" && t.tagName !== "A" && t.tagName !== "INPUT") {
      cmdInput.focus();
    }
  });
})();
