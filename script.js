(function () {
    if (window.bagasXitLoaded) {
        alert("BagasXit Bookmarklet sudah aktif!");
        return;
    }

    // =========================================================================
    // 1. ISOLASI NAVIGASI & BLOKIR SPAM WINDOW.OPEN
    // =========================================================================
    window.open = function() { 
        console.log("BAGASXIT: Pop-up diblokir.");
        return null; 
    };

    const isBadUrl = (url) => {
        if (!url) return false;
        const str = String(url).toLowerCase();
        return str.includes('ay267') || str.includes('afu.php') || str.includes('qqslot') || 
               str.includes('google.com/search') || str.includes('rtp-') || str.includes('koko') ||
               str.includes('aliexpress') || str.includes('directlink') || str.includes('bonus');
    };

    const originalClick = HTMLElement.prototype.click;
    HTMLElement.prototype.click = function() {
        if (this.tagName === 'A' && isBadUrl(this.href)) return;
        return originalClick.apply(this, arguments);
    };

    // =========================================================================
    // 2. INPUT KEY
    // =========================================================================
    const SECRET_KEY = "BAGASXIT2026";
    const URL_WHATSAPP = "https://whatsapp.com/channel/0029Vb6Eyam7oQhZLQKN9E3P";
    const URL_TELEGRAM = "https://t.me/BagasXIT";

    const userKey = prompt("Masukkan Key Akses BAGASXIT:");

    if (userKey === null || userKey.trim() !== SECRET_KEY) {
        if (userKey !== null) alert("❌ KEY SALAH! Akses ditolak.");
        return;
    }

    window.bagasXitLoaded = true;

    // =========================================================================
    // 3. PEMBERSIH IKLAN PRESISI (AMAN UNTUK CLOUDFLARE TURNSTILE)
    // =========================================================================
    const cleanDOM = () => {
        // CSS pemblokir banner iklan tanpa merusak Turnstile
        if (!document.getElementById("bagasxit-v11-css")) {
            const hideAdsStyle = document.createElement('style');
            hideAdsStyle.id = "bagasxit-v11-css";
            hideAdsStyle.innerHTML = `
                ins, 
                [id*="google_ads"], [class*="ads-"], [id*="ad-"],
                .popunder, .popup, 
                a[href*="aliexpress"], img[src*="aliexpress"],
                a[href*="koko"], a[href*="rtp"], a[href*="afu.php"], a[href*="ay267"] {
                    display: none !important;
                    pointer-events: none !important;
                }
            `;
            (document.head || document.documentElement).appendChild(hideAdsStyle);
        }

        // Hapus banner iklan yang muncul di atas (BONUS MEWAH TERBUKA, dll)
        document.querySelectorAll('div, iframe, a, span, img').forEach(el => {
            // Lindungi UI BagasXit & Cloudflare Turnstile Widget
            if (el.closest('#bagasxit-root-container') || 
                el.closest('#bagasxit-fab-container') || 
                el.closest('iframe[src*="cloudflare"]') || 
                el.closest('iframe[src*="turnstile"]') ||
                el.id?.includes('cf-') || el.className?.includes('cf-')) {
                return;
            }

            // Hapus berdasarkan teks banner iklan judi/bonus
            const text = el.innerText || "";
            if (text.includes("BONUS MEWAH TERBUKA") || text.includes("WOW! Kamu BERUNTUNG") || text.includes("Cek BONUS di sini")) {
                el.remove();
                return;
            }

            // Hapus overlay transparan penuh layar yang melayang di atas form
            const style = window.getComputedStyle(el);
            const isFixedOrAbs = style.position === 'fixed' || style.position === 'absolute';
            const isFullScreen = el.offsetWidth >= window.innerWidth * 0.7 && el.offsetHeight >= window.innerHeight * 0.7;

            if (isFixedOrAbs && isFullScreen && style.zIndex !== '0' && style.zIndex !== 'auto') {
                if (style.opacity === "0" || style.backgroundColor.includes("rgba(0, 0, 0, 0)")) {
                    el.remove();
                }
            }
        });
    };

    // CEGAT EVENT TRANSPARENT OVERLAY
    const stopInvisibleTraps = (e) => {
        const path = e.composedPath ? e.composedPath() : [];
        let isUIOrTurnstile = false;

        for (let el of path) {
            // Izinkan jika klik dilakukan di UI Bookmarklet, Form Input UID, Tombol Verify, atau Turnstile
            if (el.id === 'bagasxit-root-container' || 
                el.id === 'bagasxit-fab-container' || 
                el.tagName === 'INPUT' || 
                el.tagName === 'BUTTON' ||
                el.tagName === 'IFRAME') {
                isUIOrTurnstile = true;
                break;
            }
            if (el.tagName === 'A' && isBadUrl(el.href)) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                return false;
            }
        }

        if (isUIOrTurnstile) return;

        const target = e.target;
        if (target && target !== document.body && target !== document.documentElement) {
            const style = window.getComputedStyle(target);
            const isTransparent = style.opacity === "0" || style.backgroundColor === "rgba(0, 0, 0, 0)";
            const isFixed = style.position === "fixed" || style.position === "absolute";
            
            if (isFixed && isTransparent) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                target.remove();
                return false;
            }
        }
    };

    ['click', 'touchstart', 'pointerdown', 'mousedown'].forEach(evt => {
        window.addEventListener(evt, stopInvisibleTraps, true);
    });

    cleanDOM();
    setInterval(cleanDOM, 400);

    // =========================================================================
    // 4. ANIMASI NEON GLOW & FAB UI
    // =========================================================================
    const style = document.createElement('style');
    style.innerHTML = `
        .bagasxit-glow-bar { position: fixed; left: 0; width: 100%; height: 3px; background: #2A0845; z-index: 999999; overflow: hidden; }
        .bagasxit-glow-bar.top { top: 0; }
        .bagasxit-glow-bar.bottom { bottom: 0; }
        .bagasxit-glow-line { width: 300px; height: 100%; background: linear-gradient(90deg, transparent, #E040FB, transparent); position: absolute; animation: glowMove 1.5s infinite linear; }
        @keyframes glowMove { 0% { left: -300px; } 100% { left: 100%; } }

        #bagasxit-fab-container { position: fixed; bottom: 30px; right: 20px; z-index: 999999; display: flex; flex-direction: column-reverse; align-items: center; gap: 12px; font-family: sans-serif; }
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

    // TOAST NOTIFIKASI
    const toast = document.createElement('div');
    toast.style = "position:fixed; bottom:90px; left:50%; transform:translateX(-50%); background:rgba(18,11,36,0.95); color:#E040FB; border:1px solid #8E24AA; padding:10px 20px; border-radius:20px; font-size:13px; font-weight:bold; z-index:999999; font-family:sans-serif; box-shadow:0 4px 12px rgba(0,0,0,0.5);";
    toast.innerText = "⚡ V11 TURNSTILE SAFE ENGINE ACTIVE!";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
})();
