import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getPlaylists } from '../store/playlists';
import { getAllTimers } from '../store/timer';
import playlistIcon from '../components/styles/images/playlist-icon.jpg'
import timerIcon from '../components/styles/images/add-timer.png'
import playlistExample1 from '../components/styles/images/Example1.PNG'
import playlistExample2 from '../components/styles/images/Example2.PNG'
import MusicBar from './MusicBar';
import { createTimer } from '../store/timer';
import './styles/Dashboard.css'

const Timer = () => {
    const [timerName, setTimerName] = useState('');
    const [time, setTime] = useState(0);
    const [playlist_Id, setPlaylistId] = useState(0)
    const user = useSelector(state => state.session.user);
    const allPlaylists = useSelector(state => state.playlists)
    const allTimers = useSelector(state => state.timers?.undefined?.all_timers)
    const user_id = user.id;
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlaylists(user.id))
        dispatch(getAllTimers(user.id))
    }, []);

    const newTimer = (e) => {
        e.preventDefault();
        console.log("We're here")
        const playlist_id = 1
        const name = timerName
        dispatch(createTimer(name, playlist_id, user_id, time))
        history.push('/dashboard')
    }

    const makeNewPlaylist = async (e) => {
        history.push('/new/playlist')
    }


    const newtimer = (e) => {
        e.preventDefault()
        history.push('/new/timer')
    };

    const editTimer = (e) => {
        e.preventDefault();
        history.push(`/edit/timer/${e.target.value}`)
        console.log(1)
    };

    const editPlaylist = (e) => {
        e.preventDefault();
        history.push(`/edit/playlist/${e.target.value}`)
    };


    return (
        <div className='dashboard-main-container'>
            <div className='playlist-main-content'>
                <div className='all-playlist-form-items'>
                    <div className='make-playlist-form'>
                        <form className='album-form' method="POST" action="/playlists/">
                            <label className='your-playlist-label'> A perfect name for a perfect sleep</label>
                            <input placeholder='Your Sleep Timer Name' className='playlist-form-name-input' onChange={(e) => setTimerName(e.target.value)}>
                            </input>
                            <div >
                                <button onClick={newTimer}>Create</button>
                            </div>
                        </form>
                    </div>
                    <p className='p-label'>How to add songs:</p>
                    <p className='p-label'>On the Dashboard, pick a playlist that fits your style!</p>
                    <div>
                        <img className='example-1' src={playlistExample1} />
                    </div>
                    <p className='p-label'>Press play to hear the song or the plus icon to add it to a playlist!</p>
                    <img className='example-2' src={playlistExample2} />
                    <p className='p-label'>That's it! You're a pro!</p>

                </div>
            </div>
            {/* sidebar content */}
            <div className='content-container'>
                <div className='create-playlist-btn' onClick={makeNewPlaylist}>
                    <img className='new-playlist-icon' src={playlistIcon} />
                    <label className='create-playlist-label'> Create Playlist </label>
                </div>
                <div className='timers-container' onClick={newtimer}>
                    <img className='new-timer-icon' src={timerIcon} />
                    <label className='timer-label'>Create a Timer</label>
                </div>
                <div className='timers'>
                    <ul>

                        {allTimers &&
                            allTimers.map((timer) => {
                                return (
                                    <li value={timer.id}
                                        onClick={editTimer}
                                        className='timer-li'
                                        key={timer.id}
                                    >{timer.name}</li>
                                )
                            })

                        }
                    </ul>
                </div>
                <div className='all-playlists-container'>
                    <ul>
                        {allPlaylists &&
                            Object.values(allPlaylists).map((playlist) => {
                                return (
                                    <li key={playlist.id}
                                        className={`playlist-btn`}
                                        value={playlist.id}
                                        onClick={editPlaylist}
                                    >
                                        {playlist.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <MusicBar />
        </div >
    );
};

export default Timer;