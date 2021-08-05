require('dotenv').config();

const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

const setAccessToken = (accessToken) => ({
    type: SET_ACCESS_TOKEN,
    accessToken
});

export const getAccessToken = () => async (dispatch) => {
    var scopes = 'user-read-private user-read-email'
    var client_id = process.env.CLIENT_ID;
    // 'e0a081299571483cba0a00ed8dd15a96';
    var client_secret = process.env.CLIENT_SECRET;
    // 'fbbc6109c0424b06b088a168beb3f012';

    const response = await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(`` + ':' + ``),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    console.log(data)
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