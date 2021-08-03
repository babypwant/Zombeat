const ADD_TIMER = 'ADD_TIMER';

const getTimers = (timers) => {
    return {
        type: ADD_TIMER,
        timers
    };
}


export const getAllTimers = (user_id) => async (dispatch) => {
    const response = await fetch('/api/timers/all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id })
    });
    if (response.ok) {
        if (user_id === undefined) {
            const timers = await response.json();
            dispatch(getTimers(timers));
            return response
        } else {
            const timers = await response.json();
            const allTimers = []
            timers.all_timers.forEach(timer => {
                allTimers.push(timer)
            })
            dispatch(getTimers(timers));
            return response
        }
    }
}

export const createTimer = (name, playlist_id, user_id, time) => async (dispatch) => {
    console.log(1)
    const response = await fetch(`/api/timers/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, playlist_id, user_id, time })
    });

    if (response.ok) {
        const timer = await response.json();
        dispatch(getAllTimers(user_id));
        return timer;
    }
}

const initialState = {};
const timers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TIMER: {
            if (!state[action.timers.id]) {
                const newState = {
                    ...state,
                    [action.timers.id]: action.timers
                };
                return newState
            }
            return {
                [action.timers.id]: {
                    ...state[action.timers.id],
                    ...action.timers
                }
            }
        }
        default:
            return state;
    }
}

export default timers;
