const SET_SELECTED = 'SET_SELECTED';

export const currentPlaylist = (selected) => ({
    type: SET_SELECTED,
    selected
});


export const setSelectedPlaylist = (id, token) => async (dispatch) => {

    const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + token }
    })
    const data = await response.json()
    dispatch(currentPlaylist(data))
}


const initialState = {};

const selectedPlaylist = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED:
            return { current: action.selected }
        default:
            return state;
    }
};


export default selectedPlaylist;