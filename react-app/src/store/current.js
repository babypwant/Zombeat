const SET_CURRENT_SONG = 'SET_CURRENT_SONG';

export const setSong = (id) => ({
    type: SET_CURRENT_SONG,
    id
});

export const playCurrentSong = (id, token) => async (dispatch) => {
    const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + token }
    })
    const data = await response.json()
    console.log(data)
    dispatch(setSong(data))
}

const initialState = {};

const current = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_SONG:
            return { currsong: action.id }
        default:
            return state;
    }
}


export default current;
