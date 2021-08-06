const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

const setAccessToken = (accessToken) => ({
    type: SET_ACCESS_TOKEN,
    accessToken
});

export const getAccessToken = () => async (dispatch) => {
    const response = await fetch('/api/spotify/token', {
        mode: 'no-cors',
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const responseData = await response.json();
    dispatch(setAccessToken(responseData));
    return responseData
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