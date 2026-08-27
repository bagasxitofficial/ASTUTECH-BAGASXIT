(function () {
    // Cek jika skrip sudah pernah dijalankan
    if (window.bagasXitLoaded) {
        alert("BagasXit Bookmarklet sudah aktif!");
        return;
    }

    const SECRET_KEY = "BAGASXIT2026";
    const URL_WHATSAPP = "https://whatsapp.com/channel/0029Vb6Eyam7oQhZLQKN9E3P";
    const URL_TELEGRAM = "https://t.me/BagasXIT";

    // =========================================================================
    // 1. POPUP INPUT KEY
    // =========================================================================
    const userKey = prompt("Masukkan Key Akses BAGASXIT:");

    if (userKey === null) {
        return; // User menekan cancel
    }

    if (userKey.trim() !== SECRET_KEY) {
        alert("❌ KEY SALAH! Akses ditolak.");
        return;
    }

    // Tandai skrip sudah berjalan
    window.bagasXitLoaded = true;

    // =========================================================================
    // 2. INJEKSI STYLES & ADBLOCKER
    // =========================================================================
    const style = document.createElement('style');
    style.innerHTML = `
        /* Top & Bottom Neon Glow Animation */
        .bagasxit-glow-bar {
            position: fixed; left: 0; width: 100%; height: 3px; background: #2A0845; z-index: 99999; overflow: hidden;
        }
        .bagasxit-glow-bar.top { top: 0; }
        .bagasxit-glow-bar.bottom { bottom: 0; }
        .bagasxit-glow-line {
            width: 300px; height: 100%; background: linear-gradient(90deg, transparent, #E040FB, transparent); position: absolute;
            animation: glowMove 1.5s infinite linear;
        }
        @keyframes glowMove { 0% { left: -300px; } 100% { left: 100%; } }

        /* Floating Action Button (FAB) */
        #bagasxit-fab-container {
            position: fixed; bottom: 30px; right: 20px; z-index: 99999; display: flex;
            flex-direction: column-reverse; align-items: center; gap: 12px; font-family: sans-serif;
        }
        .bagasxit-fab-item {
            width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
            font-size: 20px; color: #fff; text-decoration: none; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .bagasxit-fab-hidden { opacity: 0; transform: translateY(20px) scale(0); pointer-events: none; }
        .bagasxit-fab-visible { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }

        /* Pemblokir Iklan & Anti-Adblock */
        ins, iframe, [id*="google_ads"], [class*="ads-"], [id*="ad-"], .popunder, a[href*="aliexpress"], img[src*="aliexpress"] {
            display: none !important; visibility: hidden !important; height: 0 !important;
        }
    `;
    document.head.appendChild(style);

    // =========================================================================
    // 3. LOGIKA BYPASS ADS & ANTI-ADBLOCK
    // =========================================================================
    window.google_ad_client = true;
    window.pubads = window.pubads || { addEventListener: function(){} };
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.loaded = true;
    window.canRunAds = true;
    window.isAdBlockActive = false;
    window.open = function(){ return null; }; // Block Pop-under

    const observer = new MutationObserver(function() {
        const adblockElements = document.querySelectorAll('[class*="adblock"], [id*="adblock"], [class*="anti-adblock"], [id*="anti-adblock"], .adb-overlay, #adb-modal');
        adblockElements.forEach(el => el.remove());
        document.body.style.overflow = 'auto';
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

    // =========================================================================
    // 4. INJEKSI GLOW LINE BAR (TOP & BOTTOM)
    // =========================================================================
    const root = document.createElement('div');
    root.id = "bagasxit-root-container";
    root.innerHTML = `
        <div class="bagasxit-glow-bar top"><div class="bagasxit-glow-line"></div></div>
        <div class="bagasxit-glow-bar bottom"><div class="bagasxit-glow-line"></div></div>
    `;
    document.body.appendChild(root);

    // =========================================================================
    // 5. FLOATING ACTION BUTTON (FAB) LOGO WA & TELEGRAM
    // =========================================================================
    const fabContainer = document.createElement('div');
    fabContainer.id = 'bagasxit-fab-container';
    fabContainer.innerHTML = `
        <a href="${URL_TELEGRAM}" target="_blank" id="fabTg" class="bagasxit-fab-item bagasxit-fab-hidden" style="background:#0088CC;">✈️</a>
        <a href="${URL_WHATSAPP}" target="_blank" id="fabWa" class="bagasxit-fab-item bagasxit-fab-hidden" style="background:#25D366;">💬</a>
        <div id="fabMain" class="bagasxit-fab-item" style="background:#A033FF;">💬</div>
    `;
    document.body.appendChild(fabContainer);

    const fabMain = document.getElementById('fabMain');
    const fabWa = document.getElementById('fabWa');
    const fabTg = document.getElementById('fabTg');
    let isExpanded = false;
    let autoLoopTimer;

    function toggleFab(open) {
        isExpanded = open !== undefined ? open : !isExpanded;
        if (isExpanded) {
            fabWa.classList.replace('bagasxit-fab-hidden', 'bagasxit-fab-visible');
            fabTg.classList.replace('bagasxit-fab-hidden', 'bagasxit-fab-visible');
            fabMain.innerText = '✕';
            fabMain.style.transform = 'rotate(135deg)';
        } else {
            fabWa.classList.replace('bagasxit-fab-visible', 'bagasxit-fab-hidden');
            fabTg.classList.replace('bagasxit-fab-visible', 'bagasxit-fab-hidden');
            fabMain.innerText = '💬';
            fabMain.style.transform = 'rotate(0deg)';
        }
    }

    function startFabAutoLoop() {
        autoLoopTimer = setInterval(() => {
            toggleFab(true);
            setTimeout(() => toggleFab(false), 3000);
        }, 8000);
    }

    fabMain.onclick = () => {
        clearInterval(autoLoopTimer);
        toggleFab();
    };

    startFabAutoLoop();

    // Notifikasi Sukses
    const toast = document.createElement('div');
    toast.style = "position:fixed; bottom:90px; left:50%; transform:translateX(-50%); background:rgba(18,11,36,0.9); color:#E040FB; border:1px solid #8E24AA; padding:10px 20px; border-radius:20px; font-size:13px; font-weight:bold; z-index:100001; font-family:sans-serif; box-shadow:0 4px 12px rgba(0,0,0,0.5);";
    toast.innerText = "⚡ KEY VALID! BAGASXIT ACTIVE";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
})();
