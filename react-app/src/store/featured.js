const SET_FEATURED_PLAYLISTS = 'session/SET_FEATURED_PLAYLISTS';

export const setFeaturedPlaylists = (playlists) => ({
    type: SET_FEATURED_PLAYLISTS,
    playlists
});

const initialState = {};

const featured = (state = initialState, action) => {
    switch (action.type) {
        case SET_FEATURED_PLAYLISTS:
            return { featured: action.playlists }
        default:
            return state;
    }
}


export default featured;