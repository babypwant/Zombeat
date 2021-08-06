import { useHistory, useParams } from 'react-router';
import MusicBar from './MusicBar';
import './styles/Featured.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import playlistIcon from '../components/styles/images/playlist-icon.jpg'
import timerIcon from '../components/styles/images/add-timer.png'
import addIcon from '../components/styles/images/add-icon.png'
import { getPlaylists } from '../store/playlists';
import { getAllTimers } from '../store/timer';


//match params with featuredplaylist and from useEffect make call in dashboard

const FeaturedPlaylist = () => {
    const playlistName = useSelector(state => state.selectedPlaylist?.current?.name)
    const description = useSelector(state => state.selectedPlaylist?.current?.description)
    const user = useSelector(state => state.session.user);
    const allPlaylists = useSelector(state => state.playlists)
    const allTimers = useSelector(state => state.timers?.undefined?.all_timers)
    const songs = useSelector(state => state.selectedPlaylist?.current?.tracks?.items)
    const image = useSelector(state => state.selectedPlaylist?.current?.images[0]?.url)
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
        console.log(1)
    };



    return (
        <div className='dashboard-main-container'>
            <div className='featured-main-content'>
                <div className='featured-header'>
                    <img className='playlist-img' src={image} />
                    <div className='playlist-name-top'>
                        Playlist
                        <div className='playlist-name-bottom'>
                            {playlistName}
                            <i className="fa-solid fa-circle-minus"></i>
                        </div>
                        <div>
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
                    <div className='featured-column-1'>
                        <div className='song-list'>
                            <div className='all-labels'>
                                <label className='featured-label-number'>#</label>
                                <label className='featured-label-title'>Title</label>
                                <label className='featured-label-album'>Album</label>
                                <label className='featured-label-duration'>Duration</label>
                            </div>
                            {songs &&
                                songs.map((song) => {
                                    const minutes = Math.floor(song.track.duration_ms / 60000);
                                    const seconds = ((song.track.duration_ms % 60000) / 1000).toFixed(0);
                                    return (
                                        <div className='song-metadata-container'>
                                            <div className='song-number'>
                                                {amountOfTracks += 1}
                                            </div>
                                            <div>
                                            </ div>
                                            <div className='song-name'>
                                                {song.track.name}
                                            </div>
                                            <div className='album-name'>
                                                {song.track.album.name}
                                            </div>
                                            <div className='song-duration'>
                                                {minutes + ":" + (seconds < 10 ? '0' : '') + seconds}
                                            </div>
                                        </div>
                                    )
                                })

                            }
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

export default FeaturedPlaylist;