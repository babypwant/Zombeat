const SET_CURRENT_SONG = 'SET_CURRENT_SONG';

export const setSong = (id) => ({
    type: SET_CURRENT_SONG,
    id
});

export const playCurrentSong = (id) => async (dispatch) => {

    dispatch(setSong(id))
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
