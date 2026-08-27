(function() {
    // 1. BYPASS ADBLOCK & IKLAN (Diambil dari logika bypassScript Sketchware)
    window.google_ad_client = true;
    window.pubads = window.pubads || { addEventListener: function(){} };
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.loaded = true;
    window.canRunAds = true;
    window.isAdBlockActive = false;
    window.open = function(){ return null; }; // Block Popunder

    // Inject Styling Anti-Iklan & Neon UI Theme
    var style = document.createElement('style');
    style.id = 'bagasxit-styles';
    style.innerHTML = `
        ins, iframe, [id*="google_ads"], [class*="ads-"], [id*="ad-"], .popunder, a[href*="aliexpress"], img[src*="aliexpress"] { 
            display: none !important; visibility: hidden !important; height: 0 !important; 
        }
        #bagasxit-overlay {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(11, 14, 20, 0.95); z-index: 999999;
            display: flex; align-items: center; justify-content: center;
            font-family: 'Segoe UI', sans-serif; backdrop-filter: blur(8px);
        }
        .bgx-card {
            background: rgba(22, 28, 46, 0.95); border-radius: 28px; padding: 25px;
            max-width: 380px; width: 90%; border: 1px solid rgba(224, 64, 251, 0.3);
            box-shadow: 0 0 25px rgba(142, 36, 170, 0.4); text-align: center; color: #fff;
            position: relative;
        }
        .bgx-badge {
            background: rgba(255, 215, 0, 0.15); padding: 5px 14px; border-radius: 20px;
            font-size: 10px; font-weight: bold; color: #f5c842; letter-spacing: 1px;
        }
        .bgx-title { font-size: 22px; margin: 12px 0 4px; font-weight: 800; }
        .bgx-title span { color: #f5c842; }
        .bgx-sub { font-size: 12px; color: #8892b0; margin-bottom: 20px; }
        .bgx-btn {
            background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
            border-radius: 14px; padding: 14px; margin-bottom: 10px; color: #fff;
            display: flex; align-items: center; justify-content: space-between;
            cursor: pointer; font-weight: bold; text-decoration: none;
        }
        .bgx-btn:hover { border-color: #E040FB; background: rgba(224, 64, 251, 0.1); }
        .bgx-close {
            position: absolute; top: 15px; right: 20px; font-size: 20px;
            color: #aaa; cursor: pointer;
        }
    `;
    if (!document.getElementById('bagasxit-styles')) {
        document.head.appendChild(style);
    }

    // Pembersih anti-adblocker otomatis (Observer)
    var observer = new MutationObserver(function() {
        var adblockElements = document.querySelectorAll('[class*="adblock"], [id*="adblock"], [class*="anti-adblock"], [id*="anti-adblock"], .adb-overlay, #adb-modal');
        for (var i = 0; i < adblockElements.length; i++) {
            adblockElements[i].remove();
        }
        document.body.style.overflow = 'auto';
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

    // 2. INJECT IN-GAME UI OVERLAY
    if (document.getElementById('bagasxit-overlay')) {
        document.getElementById('bagasxit-overlay').style.display = 'flex';
        return;
    }

    var overlay = document.createElement('div');
    overlay.id = 'bagasxit-overlay';
    overlay.innerHTML = `
        <div class="bgx-card">
            <span class="bgx-close" onclick="document.getElementById('bagasxit-overlay').style.display='none'">✕</span>
            <span class="bgx-badge">⚡ VERIFY UID & DASHBOARD ⚡</span>
            <h1 class="bgx-title">BAGASXIT <span>APP</span></h1>
            <div class="bgx-sub">Bypass Ads • Fast & Secure</div>
            
            <div class="bgx-btn" onclick="window.location.href='https://www.unlockffbeta.com/'">
                <span>⚡ VERIFICATION UID ID</span>
                <span>›</span>
            </div>
            
            <div class="bgx-btn" onclick="window.location.href='https://dash.unlockffbeta.com/'">
                <span>📊 DASHBOARD SETTINGS</span>
                <span>›</span>
            </div>

            <div class="bgx-btn" onclick="window.open('https://whatsapp.com/channel/0029Vb6Eyam7oQhZLQKN9E3P', '_blank')">
                <span>💬 WhatsApp Channel</span>
                <span>›</span>
            </div>

            <div class="bgx-btn" onclick="window.open('https://t.me/BagasXIT', '_blank')">
                <span>✈️ Telegram Channel</span>
                <span>›</span>
            </div>
            
            <div style="font-size:11px; color:#666; margin-top:15px;">© BAGASXIT OFFICIAL</div>
        </div>
    `;
    document.body.appendChild(overlay);

    console.log("BAGASXIT Bypass & UI Loaded Successfully!");
})();
