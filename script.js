(function () {
    if (window.bagasXitLoaded) {
        alert("BagasXit Bookmarklet sudah aktif!");
        return;
    }

    // 1. BLOKIR POPUP / REDIRECT SEJAK AWAL
    window.open = function() { return null; };
    
    // 2. SUN SUNTIK CSS PEMBLOKIR IKLAN SECARA INSTAN (Sembunyikan semua elemen iklan & AliExpress)
    const hideAdsStyle = document.createElement('style');
    hideAdsStyle.id = "bagasxit-adblock-css";
    hideAdsStyle.innerHTML = `
        ins, iframe, 
        [id*="google_ads"], [class*="ads-"], [id*="ad-"], 
        .popunder, .popup, 
        a[href*="aliexpress"], img[src*="aliexpress"], [class*="aliexpress"], [id*="aliexpress"],
        div[style*="z-index: 9999"], div[style*="z-index: 2147483647"] {
            display: none !important; 
            visibility: hidden !important; 
            opacity: 0 !important;
            height: 0 !important; 
            pointer-events: none !important;
        }
    `;
    (document.head || document.documentElement).appendChild(hideAdsStyle);

    // 3. INPUT KEY
    const SECRET_KEY = "BAGASXIT2026";
    const URL_WHATSAPP = "https://whatsapp.com/channel/0029Vb6Eyam7oQhZLQKN9E3P";
    const URL_TELEGRAM = "https://t.me/BagasXIT";

    const userKey = prompt("Masukkan Key Akses BAGASXIT:");

    if (userKey === null || userKey.trim() !== SECRET_KEY) {
        // Jika Key Salah/Batal, batalkan injeksi & hapus CSS Adblock
        if (userKey !== null) alert("❌ KEY SALAH! Akses ditolak.");
        hideAdsStyle.remove();
        return;
    }

    window.bagasXitLoaded = true;

    // 4. BYPASS ADBLOCK DETECTOR & ADS VARIABLE
    window.google_ad_client = true;
    window.pubads = window.pubads || { addEventListener: function(){} };
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.loaded = true;
    window.canRunAds = true;
    window.isAdBlockActive = false;

    // 5. OBSERVER UNTUK MENGHAPUS ELEMEN IKLAN SECARA REALTIME SAAT HALAMAN DILOAD
    const cleanDOM = () => {
        // Hapus elemen iklan dari DOM
        const adSelectors = '[class*="adblock"], [id*="adblock"], [class*="anti-adblock"], [id*="anti-adblock"], .adb-overlay, #adb-modal, a[href*="aliexpress"], img[src*="aliexpress"]';
        document.querySelectorAll(adSelectors).forEach(el => el.remove());
        
        // Anti Click-Hijack pada Link
        document.querySelectorAll('a').forEach(anchor => {
            if (anchor.href && anchor.href.includes('aliexpress')) {
                anchor.remove();
            }
        });
        document.body.style.overflow = 'auto';
    };

    cleanDOM();
    const observer = new MutationObserver(cleanDOM);
    observer.observe(document.documentElement, { childList: true, subtree: true });

    // 6. ANIMASI NEON GLOW & FAB
    const style = document.createElement('style');
    style.innerHTML = `
        .bagasxit-glow-bar { position: fixed; left: 0; width: 100%; height: 3px; background: #2A0845; z-index: 99999; overflow: hidden; }
        .bagasxit-glow-bar.top { top: 0; }
        .bagasxit-glow-bar.bottom { bottom: 0; }
        .bagasxit-glow-line { width: 300px; height: 100%; background: linear-gradient(90deg, transparent, #E040FB, transparent); position: absolute; animation: glowMove 1.5s infinite linear; }
        @keyframes glowMove { 0% { left: -300px; } 100% { left: 100%; } }

        #bagasxit-fab-container { position: fixed; bottom: 30px; right: 20px; z-index: 99999; display: flex; flex-direction: column-reverse; align-items: center; gap: 12px; font-family: sans-serif; }
        .bagasxit-fab-item { width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #fff; text-decoration: none; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.3); transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .bagasxit-fab-hidden { opacity: 0; transform: translateY(20px) scale(0); pointer-events: none; }
        .bagasxit-fab-visible { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
    `;
    document.head.appendChild(style);

    const root = document.createElement('div');
    root.id = "bagasxit-root-container";
    root.innerHTML = `
        <div class="bagasxit-glow-bar top"><div class="bagasxit-glow-line"></div></div>
        <div class="bagasxit-glow-bar bottom"><div class="bagasxit-glow-line"></div></div>
    `;
    document.body.appendChild(root);

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

    fabMain.onclick = () => toggleFab();

    // TOAST NOTIFIKASI SUKSES
    const toast = document.createElement('div');
    toast.style = "position:fixed; bottom:90px; left:50%; transform:translateX(-50%); background:rgba(18,11,36,0.95); color:#E040FB; border:1px solid #8E24AA; padding:10px 20px; border-radius:20px; font-size:13px; font-weight:bold; z-index:100001; font-family:sans-serif; box-shadow:0 4px 12px rgba(0,0,0,0.5);";
    toast.innerText = "⚡ KEY VALID! ADS CLEARED & ACTIVE";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
})();
