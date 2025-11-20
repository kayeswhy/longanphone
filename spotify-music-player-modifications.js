// Modifications to integrate Spotify with existing music player

// Enhanced music state to support Spotify
const enhancedMusicState = {
    ...musicState, // Your existing musicState
    spotifyConnected: false,
    spotifyPlayer: null,
    currentSource: 'local', // 'local', 'url', or 'spotify'
    spotifyPlaylists: [],
    spotifySearchResults: []
};

// Modified playSong function to handle Spotify tracks
async function playSpotifyTrack(track) {
    if (!spotifyIntegration.player || !track.isSpotify) {
        return false;
    }

    try {
        await spotifyIntegration.playTrack(track.uri);
        enhancedMusicState.currentSource = 'spotify';
        return true;
    } catch (error) {
        console.error('Failed to play Spotify track:', error);
        return false;
    }
}

// Enhanced playSong function
async function enhancedPlaySong(index) {
    if (index < 0 || index >= musicState.playlist.length) return;

    musicState.currentIndex = index;
    const track = musicState.playlist[index];

    // Handle Spotify tracks
    if (track.isSpotify && enhancedMusicState.spotifyConnected) {
        const success = await playSpotifyTrack(track);
        if (success) {
            updatePlaylistUI();
            updatePlayerUI();
            return;
        }
    }

    // Fallback to original implementation for local/URL tracks
    if (track.isLocal && track.src instanceof Blob) {
        audioPlayer.src = URL.createObjectURL(track.src);
    } else if (!track.isLocal && !track.isSpotify) {
        audioPlayer.src = track.src;
    } else {
        console.error('Cannot play track:', track);
        return;
    }

    audioPlayer.play();
    enhancedMusicState.currentSource = track.isLocal ? 'local' : 'url';
    updatePlaylistUI();
    updatePlayerUI();
}

// Enhanced toggle play/pause
async function enhancedTogglePlayPause() {
    if (enhancedMusicState.currentSource === 'spotify' && enhancedMusicState.spotifyConnected) {
        await spotifyIntegration.togglePlayPause();
    } else {
        // Original implementation
        if (audioPlayer.paused) {
            if (musicState.currentIndex === -1 && musicState.playlist.length > 0) {
                enhancedPlaySong(0);
            } else if (musicState.currentIndex > -1) {
                audioPlayer.play();
            }
        } else {
            audioPlayer.pause();
        }
    }
}

// Enhanced next/previous functions
async function enhancedPlayNext() {
    if (musicState.playlist.length === 0) return;

    let nextIndex;
    switch (musicState.playMode) {
        case 'random':
            nextIndex = Math.floor(Math.random() * musicState.playlist.length);
            break;
        case 'single':
            enhancedPlaySong(musicState.currentIndex);
            return;
        case 'order':
        default:
            nextIndex = (musicState.currentIndex + 1) % musicState.playlist.length;
            break;
    }

    if (enhancedMusicState.currentSource === 'spotify' && enhancedMusicState.spotifyConnected) {
        // For Spotify, we can use their next track function or play specific track
        const track = musicState.playlist[nextIndex];
        if (track.isSpotify) {
            await spotifyIntegration.playTrack(track.uri);
            musicState.currentIndex = nextIndex;
            updatePlaylistUI();
            updatePlayerUI();
            return;
        }
    }

    enhancedPlaySong(nextIndex);
}

async function enhancedPlayPrev() {
    if (musicState.playlist.length === 0) return;

    const newIndex = (musicState.currentIndex - 1 + musicState.playlist.length) % musicState.playlist.length;

    if (enhancedMusicState.currentSource === 'spotify' && enhancedMusicState.spotifyConnected) {
        const track = musicState.playlist[newIndex];
        if (track.isSpotify) {
            await spotifyIntegration.playTrack(track.uri);
            musicState.currentIndex = newIndex;
            updatePlaylistUI();
            updatePlayerUI();
            return;
        }
    }

    enhancedPlaySong(newIndex);
}

// Add Spotify search functionality
async function addSpotifyTrack() {
    if (!enhancedMusicState.spotifyConnected) {
        alert('请先连接到Spotify');
        return;
    }

    const query = await showCustomPrompt("搜索Spotify歌曲", "请输入歌曲名或艺术家");
    if (!query) return;

    try {
        const tracks = await spotifyIntegration.searchTracks(query);
        if (tracks.length === 0) {
            alert('没有找到相关歌曲');
            return;
        }

        // Show search results in a modal
        showSpotifySearchResults(tracks);
    } catch (error) {
        console.error('Spotify search failed:', error);
        alert('搜索失败，请检查网络连接');
    }
}

// Show Spotify search results
function showSpotifySearchResults(tracks) {
    enhancedMusicState.spotifySearchResults = tracks;

    // Create and show search results modal
    const modal = document.createElement('div');
    modal.className = 'modal visible';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <span>选择歌曲</span>
                <span onclick="this.closest('.modal').remove()" style="cursor: pointer;">&times;</span>
            </div>
            <div class="modal-body" style="max-height: 400px; overflow-y: auto;">
                ${tracks.map((track, index) => `
                    <div class="spotify-search-item" onclick="addSpotifyTrackToPlaylist(${index})" style="
                        display: flex; 
                        align-items: center; 
                        padding: 10px; 
                        border-bottom: 1px solid #eee; 
                        cursor: pointer;
                    ">
                        <img src="${track.image}" style="width: 50px; height: 50px; margin-right: 10px; border-radius: 4px;">
                        <div>
                            <div style="font-weight: 500;">${track.name}</div>
                            <div style="color: #666; font-size: 14px;">${track.artist}</div>
                            <div style="color: #999; font-size: 12px;">${track.album}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

// Add selected Spotify track to playlist
async function addSpotifyTrackToPlaylist(index) {
    const track = enhancedMusicState.spotifySearchResults[index];
    if (!track) return;

    musicState.playlist.push(track);
    await saveGlobalPlaylist();
    updatePlaylistUI();

    if (musicState.currentIndex === -1) {
        musicState.currentIndex = musicState.playlist.length - 1;
        updatePlayerUI();
    }

    // Close modal
    document.querySelector('.modal').remove();
}

// Connect to Spotify
async function connectToSpotify() {
    try {
        // Check if already have token
        if (!spotifyIntegration.getAccessTokenFromUrl()) {
            // Need to authenticate
            spotifyIntegration.authenticate();
            return;
        }

        // Initialize player
        await spotifyIntegration.initializePlayer();
        enhancedMusicState.spotifyConnected = true;
        enhancedMusicState.spotifyPlayer = spotifyIntegration.player;

        // Update UI to show Spotify is connected
        updateSpotifyConnectionStatus(true);

        alert('成功连接到Spotify！');
    } catch (error) {
        console.error('Failed to connect to Spotify:', error);
        alert('连接Spotify失败，请重试');
    }
}

// Update UI to show Spotify connection status
function updateSpotifyConnectionStatus(connected) {
    const spotifyBtn = document.getElementById('spotify-connect-btn');
    if (spotifyBtn) {
        spotifyBtn.textContent = connected ? '已连接Spotify' : '连接Spotify';
        spotifyBtn.style.backgroundColor = connected ? '#1db954' : '#ccc';
    }
}

// Make functions globally available
window.enhancedPlaySong = enhancedPlaySong;
window.enhancedTogglePlayPause = enhancedTogglePlayPause;
window.enhancedPlayNext = enhancedPlayNext;
window.enhancedPlayPrev = enhancedPlayPrev;
window.addSpotifyTrack = addSpotifyTrack;
window.addSpotifyTrackToPlaylist = addSpotifyTrackToPlaylist;
window.connectToSpotify = connectToSpotify;