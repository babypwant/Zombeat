import React from 'react';
import { useHistory, useParams } from 'react-router';
import MusicBar from './MusicBar';
import './styles/Featured.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import playlistIcon from '../components/styles/images/playlist-icon.jpg'
import timerIcon from '../components/styles/images/add-timer.png'
import playIcon from '../components/styles/images/playIcon.png'
import pauseIcon from '../components/styles/images/pause_icon.png'
import { getPlaylists } from '../store/playlists';
import { getAllTimers } from '../store/timer';
import { getSearchedSong } from '../store/searched';


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
    const [pausePlay, setPausePlay] = useState(playIcon)
    const [pausePlaySwitch, setPausePlaySwitch] = useState('play')
    const [songLength, setSongLength] = useState(0)
    const playlistName = useSelector(state => state.searched?.currsong?.name)
    const artists = useSelector(state => state.searched?.currsong?.artists)
    const user = useSelector(state => state.session.user);
    const allPlaylists = useSelector(state => state.playlists)
    const allTimers = useSelector(state => state.timers?.undefined?.all_timers)
    const image = useSelector(state => state.searched?.currsong?.album?.images[0]?.url)
    const token = useSelector(state => state?.token?.token?.access_token)
    let addedPlaylists = {};

    const songLengthMs = useSelector(state => state.searched.currsong?.duration_ms)
    const { id } = useParams()


    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(getPlaylists(user.id))
            await dispatch(getAllTimers(user.id))
            await dispatch(getSearchedSong(id, token))
            if (songLength) {
                const minutes = Math.floor(songLengthMs / 60000);
                const seconds = ((songLengthMs % 60000) / 1000).toFixed(0);
                setSongLength(minutes + ":" + (seconds < 10 ? '0' : '') + seconds)
            }
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

    const pauseAndPlay = (e) => {
        e.preventDefault();
        if (pausePlaySwitch === 'play') {
            setPausePlay(pauseIcon)
            setPausePlaySwitch('pause')
        } else {
            setPausePlay(playIcon)
            setPausePlaySwitch('play')
        }

    };

    const addingToAllPlaylists = (e) => {
        e.preventDefault();
        console.log(e.target)
    };


    const checkPlaylist = (e) => {
        const checked = e.target.checked
        const playlistId = e.target.value
        if (checked === true) {
            addedPlaylists[playlistId] = playlistId
            console.log(addedPlaylists)
        } else if (checked === false) {
            delete addedPlaylists.[playlistId];
            console.log(addedPlaylists)
        }
    }

    const handleSaveRequests = (e) => {
        e.preventDefault();
        console.log(1)
    }
    return (
        <div className='dashboard-main-container'>
            <div className='featured-main-content'>
                <div className='featured-header'>
                    <img className='playlist-img' src={image} />
                    <div className='playlist-name-top'>
                        Song
                        <div className='song-name-bottom'>
                            {playlistName}
                            <i className="fa-solid fa-circle-minus"></i>
                        </div>
                        <div className='song-desc-bottom'>
                            {artists &&
                                artists.map((artist) => {
                                    return (
                                        <p className='artist-name'>• {artist.name} •</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
                <div className='songs-container'>
                    <div className='featured-column-1'>
                        <div className='song-list'>
                            <div className='all-labels'>
                                <label className='featured-label-number'>#</label>
                                <label className='featured-label-title'>Title</label>
                                <label className='featured-label-duration'>Duration</label>
                            </div>
                            <div className='song-metadata-container' >
                                <div className='song-number'>
                                    <img className='play-and-pause' onClick={pauseAndPlay} src={pausePlay} />
                                </div>
                                <div>
                                </ div>
                                <div className='song-name-single'>
                                    {playlistName}
                                </div>
                                <div className='song-duration-single'>
                                    {songLength}
                                </div>
                            </div>
                            <div className='add-to-playlists'>
                                <form className='add-to-all-playlist-form' onSubmit={addingToAllPlaylists}>
                                    {allPlaylists &&
                                        Object.values(allPlaylists).map((playlist) => {
                                            return (
                                                <div className='playlist-form-item'>

                                                    <input
                                                        type='checkbox'
                                                        className={`playlist-btn`}
                                                        value={playlist.id}
                                                        key={playlist.id}
                                                        onChange={checkPlaylist}
                                                    >
                                                    </input>
                                                    <label>{playlist.name}</label>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className=''>
                                        <button onClick={handleSaveRequests}>Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
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
                                    <li
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