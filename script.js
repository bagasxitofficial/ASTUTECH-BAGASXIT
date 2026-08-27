(function() {
    'use strict';

    // 1. BLOKIR REDIRECT & POPUNDER IKLAN
    try {
        window.open = function() { return null; };
        window.google_ad_client = true;
        window.pubads = function() { return { addEventListener: function(){} }; };
        window.adsbygoogle = [];
        window.adsbygoogle.loaded = true;
        window.canRunAds = true;
        window.isAdBlockActive = false;
    } catch(e) {}

    // 2. INJECT STYLE RESMI BAGASXIT (FULL AD-BLOCK & RESPONSIVE IFRAME)
    var styleId = 'bgx-shield-style';
    if (!document.getElementById(styleId)) {
        var style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            ins, iframe:not(.bgx-view-frame), [id*="google_ads"], [class*="ads-"], [id*="ad-"], .popunder, 
            a[href*="aliexpress"], img[src*="aliexpress"], [class*="adblock"], [id*="adblock"], .adb-overlay, #adb-modal {
                display: none !important; visibility: hidden !important; height: 0 !important; pointer-events: none !important;
            }

            #bgx-app-overlay {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(11, 14, 20, 0.95); z-index: 99999999;
                display: flex; align-items: center; justify-content: center;
                padding: 15px; box-sizing: border-box; font-family: 'Segoe UI', sans-serif;
            }
            .bgx-main-card {
                background: rgba(22, 28, 46, 0.95); backdrop-filter: blur(12px); border-radius: 28px;
                padding: 24px 20px 30px; max-width: 420px; width: 100%;
                border: 1px solid rgba(224, 64, 251, 0.3); box-shadow: 0 0 30px rgba(142, 36, 170, 0.4);
                text-align: center; position: relative; color: #fff;
            }
            .bgx-close-top {
                position: absolute; top: 18px; right: 18px; width: 32px; height: 32px;
                border-radius: 50%; background: rgba(255,255,255,0.1); display: flex;
                align-items: center; justify-content: center; font-size: 16px; color: #fff; cursor: pointer;
            }
            .bgx-badge-title {
                display: inline-block; background: rgba(255,215,0,0.12); padding: 5px 14px;
                border-radius: 40px; font-size: 10px; font-weight: 700; letter-spacing: 1.2px;
                color: #f5c842; text-transform: uppercase; margin-bottom: 10px; border: 1px solid rgba(255,215,0,0.1);
            }
            .bgx-main-card h1 { font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 2px; }
            .bgx-main-card h1 span { color: #f5c842; }
            .bgx-subtitle { font-size: 12px; color: #8892b0; margin-bottom: 20px; }

            .bgx-action-btn {
                display: flex; align-items: center; justify-content: space-between;
                background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
                border-radius: 16px; padding: 14px 18px; margin-bottom: 12px; cursor: pointer; text-align: left;
            }
            .bgx-action-btn:active { transform: scale(0.97); }
            .bgx-btn-flex { display: flex; align-items: center; gap: 12px; }
            .bgx-icon-box {
                width: 40px; height: 40px; border-radius: 10px; display: flex;
                align-items: center; justify-content: center; font-size: 18px; font-weight: bold; color: #fff;
            }
            .bgx-icon-box.verif { background: linear-gradient(135deg,#00e5ff,#0091ea); }
            .bgx-icon-box.dash { background: linear-gradient(135deg,#ffd700,#f57c00); }
            .bgx-btn-text-main { font-size: 14px; font-weight: 700; color: #fff; }
            .bgx-btn-text-sub { font-size: 11px; color: #8892b0; }

            /* IFRAME MODAL CONTAINER (ANTI MENTAL) */
            #bgx-iframe-wrapper {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: #0b0e14; z-index: 999999999; display: none;
                flex-direction: column;
            }
            .bgx-iframe-header {
                height: 50px; background: #161c2e; display: flex; align-items: center;
                justify-content: space-between; padding: 0 16px; border-bottom: 1px solid rgba(255,255,255,0.1);
            }
            .bgx-iframe-title { color: #E040FB; font-weight: bold; font-size: 14px; }
            .bgx-btn-back {
                background: #4A148C; color: #fff; border: none; padding: 6px 14px;
                border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 12px;
            }
            .bgx-view-frame { width: 100%; height: calc(100vh - 50px); border: none; }
        `;
        document.head.appendChild(style);
    }

    // 3. OBSERVER ANTI-ADBLOCK DYNAMICAL
    var observer = new MutationObserver(function() {
        var adEls = document.querySelectorAll('[class*="adblock"], [id*="adblock"], [class*="anti-adblock"], .adb-overlay, #adb-modal');
        for (var i = 0; i < adEls.length; i++) adEls[i].remove();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

    // 4. BUAT LAYAR UI MODAL & IFRAME
    if (document.getElementById('bgx-app-overlay')) {
        document.getElementById('bgx-app-overlay').style.display = 'flex';
        return;
    }

    var root = document.createElement('div');
    root.innerHTML = `
        <div id="bgx-app-overlay">
            <div class="bgx-main-card">
                <div class="bgx-close-top" onclick="document.getElementById('bgx-app-overlay').style.display='none'">✕</div>
                <div class="bgx-badge-title">⚡ VERIFY UID & DASHBOARD SETTINGS ⚡</div>
                <h1>BAGASXIT <span>APP</span></h1>
                <div class="bgx-subtitle">Bypass Ads • Fast & Secure</div>

                <div class="bgx-action-btn" id="btnOpenVerif">
                    <div class="bgx-btn-flex">
                        <div class="bgx-icon-box verif">⚡</div>
                        <div>
                            <div class="bgx-btn-text-main">VERIFICATION UID ID</div>
                            <div class="bgx-btn-text-sub">Verify No Ads • 24H Active</div>
                        </div>
                    </div>
                    <span style="color:#4a5568">›</span>
                </div>

                <div class="bgx-action-btn" id="btnOpenDash">
                    <div class="bgx-btn-flex">
                        <div class="bgx-icon-box dash">📊</div>
                        <div>
                            <div class="bgx-btn-text-main">DASHBOARD SETTINGS</div>
                            <div class="bgx-btn-text-sub">Access • Full Control</div>
                        </div>
                    </div>
                    <span style="color:#4a5568">›</span>
                </div>

                <div style="display:flex; gap:10px; margin-top:10px;">
                    <div class="bgx-action-btn" style="flex:1; justify-content:center; padding:10px;" onclick="window.open('https://whatsapp.com/channel/0029Vb6Eyam7oQhZLQKN9E3P', '_blank')">💬 WhatsApp</div>
                    <div class="bgx-action-btn" style="flex:1; justify-content:center; padding:10px;" onclick="window.open('https://t.me/BagasXIT', '_blank')">✈️ Telegram</div>
                </div>
                <div style="margin-top:20px; font-size:11px; color:#4a5568;">© <strong>BAGASXIT OFFICIAL</strong></div>
            </div>
        </div>

        <div id="bgx-iframe-wrapper">
            <div class="bgx-iframe-header">
                <span class="bgx-iframe-title" id="bgxFrameTitle">BAGASXIT BYPASS</span>
                <button class="bgx-btn-back" id="btnCloseFrame">⬅️ KEMBALI KE MENU</button>
            </div>
            <iframe class="bgx-view-frame" id="bgxFrameView"></iframe>
        </div>
    `;
    document.body.appendChild(root);

    // LOGIKA BUKA WEB DI DALAM IFRAME (BEBAS MENTAL)
    var frameWrapper = document.getElementById('bgx-iframe-wrapper');
    var frameView = document.getElementById('bgxFrameView');
    var frameTitle = document.getElementById('bgxFrameTitle');

    document.getElementById('btnOpenVerif').onclick = function() {
        document.getElementById('bgx-app-overlay').style.display = 'none';
        frameTitle.innerText = "⚡ VERIFICATION UID ID";
        frameView.src = "https://www.unlockffbeta.com/";
        frameWrapper.style.display = 'flex';
    };

    document.getElementById('btnOpenDash').onclick = function() {
        document.getElementById('bgx-app-overlay').style.display = 'none';
        frameTitle.innerText = "📊 DASHBOARD SETTINGS";
        frameView.src = "https://dash.unlockffbeta.com/";
        frameWrapper.style.display = 'flex';
    };

    document.getElementById('btnCloseFrame').onclick = function() {
        frameView.src = "about:blank";
        frameWrapper.style.display = 'none';
        document.getElementById('bgx-app-overlay').style.display = 'flex';
    };
})();
