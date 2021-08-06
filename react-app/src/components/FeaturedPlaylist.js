import { useHistory, useParams } from 'react-router';
import MusicBar from './MusicBar';
import './styles/Featured.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import playlistIcon from '../components/styles/images/playlist-icon.jpg'
import timerIcon from '../components/styles/images/add-timer.png'
import { getPlaylists } from '../store/playlists';
import { getAllTimers } from '../store/timer';


const FeaturedPlaylist = () => {
    const [songs, setSongs] = useState(null)
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [playlistName, setPlaylistName] = useState('demo')
    const user = useSelector(state => state.session.user);
    const allPlaylists = useSelector(state => state.playlists)
    const allTimers = useSelector(state => state.timers?.undefined?.all_timers)
    const token = useSelector(state => state?.token?.token?.access_token)
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    let amountOfTracks = 0;

    useEffect(() => {
        (async () => {
            dispatch(getPlaylists(user.id))
            dispatch(getAllTimers(user.id))
        })()

    }, [dispatch, user.id]);

    useEffect(() => {
        if (user) {
            (async () => {
                const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
                    method: "GET",
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                const data = await response.json()
                console.log(data)
                if (songs === null) {
                    console.log(data.tracks.items)
                    setPlaylistName(data.name)
                    setSongs(data.tracks?.items)
                    setImage(data.images[0]?.url)
                    setDescription(data.description)
                }
            })()
        }
    }, []);


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
                                <label className='featured-label'>#</label>
                                <label className='featured-label'>Title</label>
                                <label className='featured-label'>Album</label>
                                <label className='featured-label'>Duration</label>
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
                    {/* <div className='featured-column-2'>
                        <label className='featured-label'>Title</label>
                        <ul>
                            {songs &&
                                songs.map((song) => {
                                    return (

                                        <li className='featured-li'>
                                            {song.track.name}
                                        </li>
                                    )
                                })

                            }
                        </ul>
                    </div>
                    <div className='featured-column-3'>
                        <label className='featured-label'>Album</label>
                        <ul className='featured-ul'>
                            {songs &&
                                songs.map((song) => {
                                    if (song.track.album.album_type === 'album') {
                                        return (
                                            <li className='featured-li'>
                                                {song.track.album.name}
                                            </li>
                                        )
                                    } else {
                                        return (
                                            <li className='featured-li'>
                                                Single
                                            </li>
                                        )
                                    }
                                })

                            }
                        </ul>
                    </div>
                    <div className='featured-column-4'>
                        <label className='featured-label'>Duration</label>
                        <ul>
                            {songs &&
                                songs.map((song) => {
                                    const minutes = Math.floor(song.track.duration_ms / 60000);
                                    const seconds = ((song.track.duration_ms % 60000) / 1000).toFixed(0);
                                    return (
                                        <li className='featured-li'>
                                            {minutes + ":" + (seconds < 10 ? '0' : '') + seconds}
                                        </li>
                                    )

                                })
                            }
                        </ul>
                    </div> */}
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