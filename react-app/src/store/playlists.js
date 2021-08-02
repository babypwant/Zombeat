const ADD_PLAYLIST = 'ADD_PLAYLIST';
const GET_PLAYLISTS = 'GET_PLAYLISTS';
const GET_SINGLE_PLAYLIST = 'GET_SINGLE_PLAYLIST';

const getAllPlaylists = (playlists) => {
    return {
        type: GET_PLAYLISTS,
        playlists
    };
}

const getSinglePlaylist = (playlist) => {
    return {
        type: GET_SINGLE_PLAYLIST,
        playlist
    };
}

export const getPlaylists = (userId) => async (dispatch) => {

    const response = await fetch(`/api/playlists/all/${userId}`);

    if (response.ok) {
        if (userId === undefined) {
            const playlists = await response.json();
            dispatch(getAllPlaylists(playlists.all_playlists));
            return response
        } else {
            const playlist = await response.json();
            const all_playlists = []
            playlist.all_playlists.forEach(playlist => {
                if (playlist.user_id === userId) {
                    all_playlists.push(playlist)
                }
            })
            dispatch(getAllPlaylists(all_playlists));
            return response
        }
    }

}


export const getOnePlaylist = (playlistId) => async (dispatch) => {
    let id = parseInt(playlistId);
    const response = await fetch(`/api/playlists/${id}`)
    if (response.ok) {
        const data = await response.json();
        dispatch(getSinglePlaylist(data));
        return response;
    }

}

export const editOnePlaylist = (userId, editedPlaylist) => async (dispatch) => {
    const { id, img, name, user } = editedPlaylist;
    const playlist = { playlist_id: id, playlist_name: name, playlist_image_url: img, user_id: user }

    const response = await fetch(`/api/playlists/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playlist_id: id, playlist_name: name, playlist_image_url: img, user_id: user })
    });

    if (response.ok) {

        const playlist = await response.json();
        const userPlaylists = []
        const filteredPlaylists = { "playlists": userPlaylists }
        playlist.playlists.forEach(playlist => {
            if (playlist.user === userId) {
                userPlaylists.push(playlist)
            }
        })
        dispatch(getAllPlaylists(filteredPlaylists));
        return response
    }
}

export const deletePlaylist = (userId, playlistId) => async (dispatch) => {

    let thisId = parseInt(playlistId);
    const response = await fetch(`/api/playlists/${thisId}`, {
        method: 'DELETE'
    });

    if (response.ok) {

        const playlist = await response.json();
        dispatch(getPlaylists(userId));
        return playlist;
    }
}
const initialState = {};
const playlists = (state = initialState, action) => {
    switch (action.type) {
        case GET_PLAYLISTS: {
            const allPlaylists = {}
            action.playlists.forEach(playlist => {
                allPlaylists[playlist.id] = playlist;
            })
            return {
                ...allPlaylists
            }
        }
        case GET_SINGLE_PLAYLIST: {
            const allPlaylists = {}
            action.playlist.playlists.forEach(playlist => {
                allPlaylists[playlist.user_id] = playlist.user_id;
            })
            return {
                ...allPlaylists
            }
        }
        case ADD_PLAYLIST: {
            if (!state[action.playlist.id]) {
                const newState = {
                    ...state,
                    [action.playlist.id]: action.playlist
                };
                return newState
            }
            return {
                [action.playlist.id]: {
                    ...state[action.playlist.id],
                    ...action.playlist
                }
            }
        }
        default:
            return state;
    }
}

export default playlists;
