// Spotify Web API Integration for Listen Together Feature

class SpotifyIntegration {
    constructor() {
        this.clientId = 'YOUR_SPOTIFY_CLIENT_ID'; // Get from Spotify Developer Dashboard
        this.redirectUri = window.location.origin + '/callback'; // Your app's callback URL
        this.scopes = [
            'streaming',                    // Play music in the browser
            'user-read-email',             // Read user's email
            'user-read-private',           // Read user's subscription details
            'user-read-playback-state',    // Read current playback state
            'user-modify-playback-state',  // Control playback
            'playlist-read-private',       // Read private playlists
            'playlist-read-collaborative', // Read collaborative playlists
            'user-library-read'           // Read saved tracks
        ].join(' ');
        
        this.accessToken = null;
        this.player = null;
        this.deviceId = null;
    }

    // Step 1: Redirect user to Spotify authorization
    authenticate() {
        const authUrl = `https://accounts.spotify.com/authorize?` +
            `client_id=${this.clientId}&` +
            `response_type=token&` +
            `redirect_uri=${encodeURIComponent(this.redirectUri)}&` +
            `scope=${encodeURIComponent(this.scopes)}`;
        
        window.location.href = authUrl;
    }

    // Step 2: Extract access token from URL after redirect
    getAccessTokenFromUrl() {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        this.accessToken = params.get('access_token');
        
        if (this.accessToken) {
            // Clear the hash from URL
            window.history.replaceState({}, document.title, window.location.pathname);
            return true;
        }
        return false;
    }

    // Step 3: Initialize Spotify Web Playback SDK
    async initializePlayer() {
        if (!this.accessToken) {
            throw new Error('No access token available');
        }

        // Load Spotify Web Playback SDK
        if (!window.Spotify) {
            await this.loadSpotifySDK();
        }

        this.player = new Spotify.Player({
            name: 'LycheePhone Music Player',
            getOAuthToken: cb => cb(this.accessToken),
            volume: 0.5
        });

        // Set up event listeners
        this.setupPlayerEvents();

        // Connect to Spotify
        const success = await this.player.connect();
        if (success) {
            console.log('Successfully connected to Spotify!');
        }
    }

    // Load Spotify SDK script
    loadSpotifySDK() {
        return new Promise((resolve, reject) => {
            if (window.Spotify) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://sdk.scdn.co/spotify-player.js';
            script.onload = () => {
                window.onSpotifyWebPlaybackSDKReady = resolve;
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Set up player event listeners
    setupPlayerEvents() {
        // Ready
        this.player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            this.deviceId = device_id;
        });

        // Not Ready
        this.player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        // Player state changed
        this.player.addListener('player_state_changed', (state) => {
            if (!state) return;
            
            this.updateMusicState(state);
        });
    }

    // Update your app's music state based on Spotify state
    updateMusicState(spotifyState) {
        const track = spotifyState.track_window.current_track;
        
        // Update your existing musicState object
        if (window.musicState) {
            window.musicState.isPlaying = !spotifyState.paused;
            window.musicState.currentTrack = {
                name: track.name,
                artist: track.artists.map(a => a.name).join(', '),
                album: track.album.name,
                image: track.album.images[0]?.url,
                spotifyUri: track.uri,
                duration: track.duration_ms
            };
            
            // Update UI
            if (window.updatePlayerUI) {
                window.updatePlayerUI();
            }
        }
    }

    // Search for tracks
    async searchTracks(query, limit = 20) {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        });
        
        const data = await response.json();
        return data.tracks.items.map(track => ({
            name: track.name,
            artist: track.artists.map(a => a.name).join(', '),
            album: track.album.name,
            image: track.album.images[0]?.url,
            uri: track.uri,
            duration: track.duration_ms,
            isSpotify: true
        }));
    }

    // Get user's playlists
    async getUserPlaylists() {
        const response = await fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        });
        
        const data = await response.json();
        return data.items;
    }

    // Play a specific track
    async playTrack(uri) {
        await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uris: [uri]
            })
        });
    }

    // Control playback
    async togglePlayPause() {
        const state = await this.player.getCurrentState();
        if (state.paused) {
            await this.player.resume();
        } else {
            await this.player.pause();
        }
    }

    async nextTrack() {
        await this.player.nextTrack();
    }

    async previousTrack() {
        await this.player.previousTrack();
    }

    async setVolume(volume) {
        await this.player.setVolume(volume);
    }
}

// Initialize Spotify integration
const spotifyIntegration = new SpotifyIntegration();