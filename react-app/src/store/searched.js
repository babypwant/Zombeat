const SET_SEARCHED_SONG = 'SET_SEARCHED_SONG';

export const setSearched = (data) => ({
    type: SET_SEARCHED_SONG,
    data
});

export const getSearchedSong = (id, token) => async (dispatch) => {
    const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + token }
    })
    const data = await response.json()
    dispatch(setSearched(data))
}

const initialState = {};

const searched = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCHED_SONG:
            return { currsong: action.data }
        default:
            return state;
    }
}


export default searched;
