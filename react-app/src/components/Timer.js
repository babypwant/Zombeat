import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import MusicBar from './MusicBar';
import { createTimer } from '../store/timer';
import './styles/Dashboard.css'

const Timer = () => {
    const [timerName, setTimerName] = useState('');
    const [time, setTime] = useState(0);
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    // const allPlaylists = useSelector(state => state.playlists)
    // const timers = useSelector(state => state.timers)
    const user_id = user.id;
    const dispatch = useDispatch();

    useEffect(() => {
    }, []);

    const newTimer = (e) => {
        e.preventDefault();
        console.log("We're here")
        const playlist_id = 1
        const name = timerName
        dispatch(createTimer(name, playlist_id, user_id, time))
        // history.push('/dashboard')
    }


    return (
        <div className='dashboard-main-container'>
            <div className='playlist-main-content'>
                <form className='album-form' method="POST" action="/timers/" onSubmit={(e) => e.preventDefault()} >
                    <label>New timer name</label>
                    <input className='timer-name-input'
                        onChange={(e) => setTimerName(e.target.value)}
                    >
                    </input>
                    <label>Sleep time</label>
                    <input className='timer-time-input'
                        onChange={(e) => setTime(e.target.value)}>
                    </input>
                    <button type='submit' onClick={newTimer}>Here</button>
                </form>
            </div>
            <div className='content-container'>
                <div className='here'>
                    Create Playlist
                </div>
            </div>
            <MusicBar />
        </div >
    );
};

export default Timer;