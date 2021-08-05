const SET_CURRENT_SONG = 'session/SET_CURRENT_SONG';

export const setCurrentSong = (id) => ({
    type: SET_CURRENT_SONG,
    id
});

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
