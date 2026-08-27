(function() {
    'use strict';

    // ==========================================
    // 1. AMPUH: PROTEKSI POPUNDER & ANTI-REDIRECT
    // ==========================================
    try {
        // Blokir pembukaan tab/window baru otomatis
        window.open = function() { return null; };
        
        // Netralkan objek adblocker
        window.google_ad_client = true;
        window.pubads = function() { return { addEventListener: function(){} }; };
        window.adsbygoogle = [];
        window.adsbygoogle.loaded = true;
        window.canRunAds = true;
        window.isAdBlockActive = false;

        // Pencegah redirect paksa via event listener
        window.addEventListener('beforeunload', function(e) {
            // Menghentikan navigasi tak dikenal jika dipicu script iklan
        }, true);
    } catch(e) {}

    // Inject CSS Presisi dari HTML Sketchware
    var styleId = 'bagasxit-ui-style';
    if (!document.getElementById(styleId)) {
        var style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            /* Sembunyikan iklan & anti-adblock overlay web asli */
            ins, iframe, [id*="google_ads"], [class*="ads-"], [id*="ad-"], .popunder, a[href*="aliexpress"], img[src*="aliexpress"],
            [class*="adblock"], [id*="adblock"], [class*="anti-adblock"], [id*="anti-adblock"], .adb-overlay, #adb-modal {
                display: none !important; visibility: hidden !important; height: 0 !important; pointer-events: none !important;
            }

            /* Container Modal Principal */
            #bgx-modal-root {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0, 0, 0, 0.85); z-index: 99999999;
                display: flex; align-items: center; justify-content: center;
                padding: 20px; box-sizing: border-box; font-family: 'Segoe UI', sans-serif;
            }
            .bgx-card {
                background: rgba(22,28,46,0.95); backdrop-filter: blur(12px); border-radius: 32px;
                padding: 30px 24px 40px; max-width: 420px; width: 100%;
                border: 1px solid rgba(255,215,0,0.15); box-shadow: 0 25px 50px -8px rgba(0,0,0,0.8);
                text-align: center; position: relative; color: #fff;
            }
            .bgx-badge {
                display: inline-block; background: rgba(255,215,0,0.12); padding: 6px 18px;
                border-radius: 40px; font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
                color: #f5c842; text-transform: uppercase; margin-bottom: 12px; border: 1px solid rgba(255,215,0,0.08);
            }
            .bgx-close-btn {
                position: absolute; top: 22px; right: 22px; width: 34px; height: 34px;
                border-radius: 50%; background: rgba(255,255,255,0.1); display: flex;
                align-items: center; justify-content: center; font-size: 16px; color: #fff;
                cursor: pointer; user-select: none; border: 1px solid rgba(255,255,255,0.2);
            }
            .bgx-card h1 { font-size: 26px; font-weight: 800; color: #fff; letter-spacing: -0.5px; margin-bottom: 4px; }
            .bgx-card h1 span { color: #f5c842; }
            .bgx-sub { font-size: 14px; color: #8892b0; font-weight: 400; margin-bottom: 6px; }
            .bgx-live {
                display: inline-flex; align-items: center; gap: 8px; background: rgba(255,50,50,0.12);
                padding: 6px 16px; border-radius: 40px; font-size: 12px; font-weight: 600; color: #ff6b6b;
                margin-top: 4px; margin-bottom: 28px;
            }
            .bgx-live .dot { width: 8px; height: 8px; background: #ff3b3b; border-radius: 50%; display: inline-block; animation: bgxPulse 1.2s infinite; }
            @keyframes bgxPulse { 0%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.7)} 100%{opacity:1;transform:scale(1)} }
            
            .bgx-grid { display: flex; flex-direction: column; gap: 14px; margin-top: 10px; }
            .bgx-btn {
                display: flex; align-items: center; justify-content: space-between;
                background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
                border-radius: 18px; padding: 18px 22px; text-decoration: none; cursor: pointer; text-align: left;
            }
            .bgx-btn:active { transform: scale(0.97); }
            .bgx-btn-left { display: flex; align-items: center; gap: 14px; }
            .bgx-btn-icon {
                width: 44px; height: 44px; border-radius: 12px; display: flex;
                align-items: center; justify-content: center; font-size: 20px; font-weight: 800; color: #fff; flex-shrink: 0;
            }
            .bgx-btn-icon.verif { background: linear-gradient(135deg,#00e5ff,#0091ea); }
            .bgx-btn-icon.dash { background: linear-gradient(135deg,#ffd700,#f57c00); }
            .bgx-btn-title { font-size: 16px; font-weight: 700; color: #fff; letter-spacing: -0.2px; }
            .bgx-btn-desc { font-size: 12px; color: #8892b0; margin-top: 2px; }
            .bgx-btn-arrow { color: #4a5568; font-size: 18px; }
            .bgx-footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.04); font-size: 12px; color: #4a5568; }
            .bgx-footer strong { color: #f5c842; font-weight: 600; }
        `;
        document.head.appendChild(style);
    }

    // Pembersih adblocker dinamis di background
    var observer = new MutationObserver(function() {
        var adElements = document.querySelectorAll('[class*="adblock"], [id*="adblock"], [class*="anti-adblock"], [id*="anti-adblock"], .adb-overlay, #adb-modal');
        for (var i = 0; i < adElements.length; i++) {
            adElements[i].remove();
        }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

    // ==========================================
    // 2. RENDERING UI 100% PERSIS SKETCHWARE
    // ==========================================
    var existingModal = document.getElementById('bgx-modal-root');
    if (existingModal) {
        existingModal.style.display = 'flex';
        return;
    }

    var modalRoot = document.createElement('div');
    modalRoot.id = 'bgx-modal-root';
    modalRoot.innerHTML = `
        <div class="bgx-card">
            <div class="bgx-close-btn" onclick="document.getElementById('bgx-modal-root').style.display='none'">✕</div>
            <div class="bgx-badge">⚡VERIFY UID & DASHBOARD SETTINGS⚡</div>
            <h1>BAGASXIT <span>APP</span></h1>
            <div class="bgx-sub">Bypass Ads • Fast & Secure</div>
            <div class="bgx-live"><span class="dot"></span> <span id="bgxUserCount">LIVE USERS ONLINE: 273</span></div>
            
            <div class="bgx-grid">
                <div class="bgx-btn" onclick="window.location.href='https://www.unlockffbeta.com/'">
                    <div class="bgx-btn-left">
                        <div class="bgx-btn-icon verif">⚡</div>
                        <div>
                            <div class="bgx-btn-title">VERIFICATION UID ID</div>
                            <div class="bgx-btn-desc">Verify No Ads • 24H Active</div>
                        </div>
                    </div>
                    <span class="bgx-btn-arrow">›</span>
                </div>

                <div class="bgx-btn" onclick="window.location.href='https://dash.unlockffbeta.com/'">
                    <div class="bgx-btn-left">
                        <div class="bgx-btn-icon dash">📊</div>
                        <div>
                            <div class="bgx-btn-title">DASHBOARD SETTINGS</div>
                            <div class="bgx-btn-desc">Access • Full Control</div>
                        </div>
                    </div>
                    <span class="bgx-btn-arrow">›</span>
                </div>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 14px;">
                <div class="bgx-btn" style="flex: 1; padding: 12px; justify-content: center;" onclick="window.open('https://whatsapp.com/channel/0029Vb6Eyam7oQhZLQKN9E3P', '_blank')">
                    💬 WhatsApp
                </div>
                <div class="bgx-btn" style="flex: 1; padding: 12px; justify-content: center;" onclick="window.open('https://t.me/BagasXIT', '_blank')">
                    ✈️ Telegram
                </div>
            </div>

            <div class="bgx-footer">© <strong>BAGASXIT OFFICIAL</strong> • PROGRAMMER REVERSE</div>
        </div>
    `;

    document.body.appendChild(modalRoot);

    // Fitur Live Count Pengguna
    (function() {
        var countEl = document.getElementById('bgxUserCount');
        if (!countEl) return;
        var current = Math.floor(Math.random() * 200) + 100;
        setInterval(function() {
            var change = Math.floor(Math.random() * 14) - 3;
            current += change;
            if (current < 50) current = 80;
            if (current > 500) current = 420;
            countEl.innerText = 'LIVE USERS ONLINE: ' + current;
        }, 3500);
    })();
})();
