require('dotenv').config();

const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

const setAccessToken = (accessToken) => ({
    type: SET_ACCESS_TOKEN,
    accessToken
});

export const getAccessToken = () => async (dispatch) => {

    dispatch(setAccessToken(data));
    return data
};

const initialState = {};
const token = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            return { token: action.accessToken }
        default:
            return state;
    };
};

export default token;