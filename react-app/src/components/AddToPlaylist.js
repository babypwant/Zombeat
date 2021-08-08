import React from 'react';
import { useHistory, useParams } from 'react-router';
import MusicBar from './MusicBar';
import './styles/Featured.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import playlistIcon from '../components/styles/images/playlist-icon.jpg'
import timerIcon from '../components/styles/images/add-timer.png'
import addIcon from '../components/styles/images/add-icon.png'
import pauseIcon from '../components/styles/images/pause_icon.png'
import playIcon from '../components/styles/images/playIcon.png'
import { getPlaylists } from '../store/playlists';
import { getAllTimers } from '../store/timer';


//match params with featuredplaylist and from useEffect make call in dashboard

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundImage: 'linear-gradient(280deg, #454545,#262222)',
    },
};


const AddToPlaylist = () => {
    const playlistName = useSelector(state => state.searched?.currsong?.name)
    const description = useSelector(state => state.searched?.current?.description)
    const user = useSelector(state => state.session.user);
    const allPlaylists = useSelector(state => state.playlists)
    const allTimers = useSelector(state => state.timers?.undefined?.all_timers)
    const songs = useSelector(state => state.searched?.current?.tracks?.items)
    const image = useSelector(state => state.searched?.currsong?.album?.images[0]?.url)
    let subtitle;


    const history = useHistory();
    const dispatch = useDispatch();
    let amountOfTracks = 0;

    useEffect(() => {
        (async () => {
            dispatch(getPlaylists(user.id))
            dispatch(getAllTimers(user.id))
        })()

    }, [dispatch, user.id]);

    const makeNewPlaylist = (e) => {
        e.preventDefault();
        history.push('/new/playlist')
    };
    const editPlaylist = (e) => {
        e.preventDefault();
        history.push(`/edit/playlist/${e.target.value}`)
    };

    const createTimer = (e) => {
        e.preventDefault();
        history.push('/new/timer')
    };

    const editTimer = (e) => {
        e.preventDefault();
        history.push(`/edit/timer/${e.target.value}`)
    };

    return (
        <div className='dashboard-main-container'>
            <div className='featured-main-content'>
                <div className='featured-header'>
                    <img className='playlist-img' src={image} />
                    <div className='playlist-name-top'>
                        Song
                        <div className='playlist-name-bottom'>
                            {playlistName}
                            <i className="fa-solid fa-circle-minus"></i>
                        </div>
                        <div className='playlist-desc-bottom'>
                            {description}
                        </div>
                    </div>
                    <div>
                        <div className='delete-playlist-Icon'>
                            <img className='' />
                        </div>
                    </div>
                </div>
                <div className='songs-container'>
                    
                </div>
            </div>
            <div className='content-container'>
                <div className='create-playlist-btn' onClick={makeNewPlaylist}>
                    <img className='new-playlist-icon' src={playlistIcon} />
                    <label className='create-playlist-label'> Create Playlist </label>
                </div>
                <div className='timers-container' onClick={createTimer}>
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
                                        key={playlist.id}
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

export default AddToPlaylist;