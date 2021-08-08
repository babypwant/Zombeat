const SET_PLAYLIST_SONGS = 'SET_PLAYLIST_SONGS';

export const saveSong = (id) => ({
    type: SET_PLAYLIST_SONGS,
    id
});

export const seedSongAndPlaylist = (song_id, playlist_id) => async (dispatch) => {
    const response = await fetch(`/api/playlists/add/song`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ song_id, playlist_id })
    })
    const data = await response.json()
    console.log(data)

}

export const storeSavedSong = (song_link, song_name, artist_name, album_name, song_length, song_img, playlist_id) => async (dispatch) => {
    const response = await fetch(`/api/playlists/new/song`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ song_link, song_name, artist_name, album_name, song_length, song_img })
    })
    const data = await response.json()
    const song_id = data.id
    dispatch(seedSongAndPlaylist(song_id, playlist_id))
}

export const getPlaylistSongs = () => async (dispatch) => {
    const response = await fetch(`/api/playlists/new/song`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    })
    const data = await response.json()
    console.log(data)
    // dispatch(saveSong())
}

const initialState = {};

const saved = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLAYLIST_SONGS:
            return { saved: action.id }
        default:
            return state;
    }
}


export default saved;
