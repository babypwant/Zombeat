import { useHistory } from 'react-router';
import MusicBar from './MusicBar';
import './styles/Dashboard.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import playlistIcon from '../components/styles/images/playlist-icon.jpg'
import timerIcon from '../components/styles/images/add-timer.png'
import { getPlaylists } from '../store/playlists';
import { getAllTimers } from '../store/timer';

const Dashboard = () => {
    const user = useSelector(state => state.session.user);
    const allPlaylists = useSelector(state => state.playlists)
    const allTimers = useSelector(state => state.timers?.undefined?.all_timers)
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {

        (async () => {
            dispatch(getPlaylists(user.id))
            dispatch(getAllTimers(user.id))
        })()
    }, [dispatch, user.id])

    const makeNewPlaylist = (e) => {
        e.preventDefault();
        history.push('/new/playlist')
    }
    const editPlaylist = (e) => {
        e.preventDefault();
        history.push(`/edit/playlist/${e.target.value}`)
    }

    const createTimer = (e) => {
        e.preventDefault();
        history.push('/new/timer')
    }

    const editTimer = (e) => {
        e.preventDefault();
        history.push(`/edit/timer/${e.target.value}`)
        console.log(1)
    }

    return (
        <div className='dashboard-main-container'>
            <div className='dashboard-main-content'>
                <div className='timers'>
                    {allTimers &&
                        allTimers.map((timer) => {
                            return (
                                <li value={timer.id}
                                    onClick={editTimer}
                                >{timer.name}</li>
                            )
                        })

                    }
                </div>
            </div>
            <div className='content-container'>
                <div className='create-playlist-btn' onClick={makeNewPlaylist}>
                    <img className='new-playlist-icon' src={playlistIcon} />
                    <label className='create-playlist-label'> Create Playlist </label>
                </div>
                <div className='create-timer-btn' onClick={createTimer}>
                    <img className='new-timer-icon' src={timerIcon} />
                    <label>Create a Timer</label>
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

export default Dashboard;