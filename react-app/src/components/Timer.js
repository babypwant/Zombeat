import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getPlaylists } from '../store/playlists';
import { getAllTimers } from '../store/timer';
import MusicBar from './MusicBar';
import { createTimer } from '../store/timer';
import './styles/Dashboard.css'
import SideBar from './Sidebar';

//come back during sprint week
//try out github copilot

const Timer = () => {
    const [timerName, setTimerName] = useState('');
    const [time, setTime] = useState(0);
    const [playlistId, setPlaylistId] = useState(1)
    const user = useSelector(state => state.session.user);
    const allPlaylists = useSelector(state => state.playlists)
    const user_id = user.id;
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlaylists(user.id))
        dispatch(getAllTimers(user.id))
    }, [dispatch, user?.id]);

    const newTimer = (e) => {
        e.preventDefault();
        console.log("We're here")
        const playlist_id = playlistId
        const name = timerName
        setTime(0);
        dispatch(createTimer(name, playlist_id, user_id, time))
        history.push('/dashboard')
    }


    return (
        <div className='dashboard-main-container'>
            <div className='playlist-main-content'>
                <div className='all-playlist-form-items'>
                    <div className='make-playlist-form'>
                        <form className='album-form' method="POST" action="/playlists/">
                            <label className='your-playlist-label'> A perfect name for a perfect sleep</label>
                            <input placeholder=' A Very Sleepy Name Here' className='playlist-form-name-input' onChange={(e) => setTimerName(e.target.value)}>
                            </input>
                            <div className='pick-a-playlist'>
                                <select className='playlist-options' onChange={(e) => setPlaylistId(e.target.value)} >
                                    {
                                        Object.values(allPlaylists).map((playlist) => {
                                            return (
                                                <option
                                                    key={playlist.name}
                                                    value={playlist.id}>
                                                    {playlist.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div >
                                <button className='create-timer-btn' onClick={newTimer}>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <SideBar />
            <MusicBar />
        </div >
    );
};

export default Timer;