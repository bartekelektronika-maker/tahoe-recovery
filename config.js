let currentTab = 'all';
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('results-container');

function setTab(tabName, e) {
    currentTab = tabName;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    if (e && e.target) e.target.classList.add('active');
    performSearch();
}

function performSearch() {
    const query = searchInput.value.trim().toLowerCase();

    // Zakładka Grafika
    if (currentTab === 'images' || query.includes('grafika') || query.includes('tapety')) {
        resultsContainer.innerHTML = `
            <p style="font-size: 14px; color: #64748b; margin-bottom: 15px;">${SITE_CONFIG.uiOverlay} — Wyniki wyszukiwania grafik dla: <strong>${query || 'Wszystkie'}</strong></p>
            <div class="image-gallery-grid">
                <div class="img-card"><span>🖼️</span> Tapeta iOS 8</div>
                <div class="img-card"><span>🖼️</span> iPhone 8 Render</div>
                <div class="img-card"><span>🖼️</span> Cydia Logo</div>
                <div class="img-card"><span>🖼️</span> Custom IPSW</div>
                <div class="img-card"><span>🖼️</span> Apple Wallpaper</div>
                <div class="img-card"><span>🖼️</span> UI Dark Mode</div>
            </div>
        `;
        return;
    }

    // Zakładka Wideo / YouTube
    if (currentTab === 'video' || query.includes('youtube') || query.includes('yt')) {
        resultsContainer.innerHTML = `
            <div class="youtube-ui-container">
                <div class="yt-ui-header">
                    <span class="yt-ui-title">🔴 YouTube — ${SITE_CONFIG.uiOverlay} Edition</span>
                    <span style="font-size: 12px; color: #94a3b8;">Silnik odtwarzania aktywny</span>
                </div>
                <p style="font-size: 13px; color: #94a3b8; margin-bottom: 15px;">Wybierz materiał wideo z odtwarzacza nakładki:</p>
                <div class="yt-videos-grid">
                    <div class="yt-card" onclick="window.open('${SITE_CONFIG.defaultVideos[0].url}', '_blank')">
                        <div class="yt-thumb">▶</div>
                        <div class="yt-info">${SITE_CONFIG.defaultVideos[0].title}</div>
                    </div>
                    <div class="yt-card" onclick="window.open('${SITE_CONFIG.defaultVideos[1].url}', '_blank')">
                        <div class="yt-thumb">▶</div>
                        <div class="yt-info">${SITE_CONFIG.defaultVideos[1].title}</div>
                    </div>
                </div>
            </div>
        `;
        return;
    }

    // Ekran główny / wyniki ogólne
    if (query) {
        resultsContainer.innerHTML = `
            <p style="font-size: 14px; color: #64748b; margin-bottom: 15px;">Wyniki w ${SITE_CONFIG.uiOverlay} dla: "<strong>${query}</strong>"</p>
            <div class="yt-videos-grid">
                <div class="yt-card" onclick="setTab('video')">
                    <div class="yt-thumb">📺</div>
                    <div class="yt-info">Szukaj wideo / YouTube dla: ${query}</div>
                </div>
                <div class="yt-card" onclick="setTab('images')">
                    <div class="yt-thumb">🖼️</div>
                    <div class="yt-info">Szukaj grafik dla: ${query}</div>
                </div>
            </div>
        `;
    } else {
        resultsContainer.innerHTML = `
            <p style="font-size: 14px; color: #64748b; margin-bottom: 15px;">Szybki dostęp w ${SITE_CONFIG.projectName}:</p>
            <div class="yt-videos-grid">
                <div class="yt-card" onclick="searchInput.value='YouTube'; setTab('video'); performSearch();">
                    <div class="yt-thumb">🔴</div>
                    <div class="yt-info">Otwórz aplikację YouTube (UI)</div>
                </div>
                <div class="yt-card" onclick="searchInput.value='Grafika'; setTab('images'); performSearch();">
                    <div class="yt-thumb">🖼️</div>
                    <div class="yt-info">Przeglądaj Grafiki i Tapety</div>
                </div>
            </div>
        `;
    }
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});
