const SET_PLAYLIST_SONGS = 'SET_PLAYLIST_SONGS';

export const saveSong = (songs) => ({
    type: SET_PLAYLIST_SONGS,
    songs
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

export const getData = (songs) => async (dispatch) => {
    let metadata = []
    songs.forEach(async (song) => {
        const response = await fetch(`/api/playlists/get/metadata`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ song })
        })
        const data = await response.json()
        metadata.push(data)
    })
    dispatch(saveSong(metadata))
}


export const getPlaylistSongs = (id) => async (dispatch) => {
    const response = await fetch(`/api/playlists/get/songs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    })
    const data = await response.json()
    const res = data.songs
    const songs = []
    res.forEach((song) => {
        songs.push(song[0])
    })
    dispatch(getData(songs))
}

export const removeFromPlaylist = (song_id, playlist_id) => async (dispatch) => {
    const response = await fetch(`/api/playlists/delete/song`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ song_id, playlist_id })
    })
    const data = await response.json()
    if (data.success) {
        dispatch(getPlaylistSongs(data.success))
    } else {
        console.log("not there yet")
    }
}

let initialState = {};

const saved = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLAYLIST_SONGS:
            return { saved: action.songs }
        default:
            return state;
    }
}


export default saved;