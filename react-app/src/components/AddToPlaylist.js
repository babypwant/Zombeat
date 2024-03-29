import React from 'react';
import { useHistory, useParams } from 'react-router';
import MusicBar from './MusicBar';
import './styles/Featured.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import playIcon from '../components/styles/images/playIcon.png'
import pauseIcon from '../components/styles/images/pause_icon.png'
import { getPlaylists } from '../store/playlists';
import { getAllTimers } from '../store/timer';
import { getSearchedSong } from '../store/searched';
import { storeSavedSong } from '../store/saved';
import SideBar from './Sidebar';

const AddToPlaylist = () => {
    const [pausePlay, setPausePlay] = useState(playIcon)
    const [pausePlaySwitch, setPausePlaySwitch] = useState('play')
    const [songLength, setSongLength] = useState(0)
    const songName = useSelector(state => state.searched?.currsong?.name)
    const artists = useSelector(state => state.searched?.currsong?.artists)
    const user = useSelector(state => state.session.user);
    const allPlaylists = useSelector(state => state.playlists)
    const image = useSelector(state => state.searched?.currsong?.album?.images[0]?.url)
    const token = useSelector(state => state?.token?.token?.access_token)
    const albumName = useSelector(state => state.searched?.currsong?.album?.name)
    let addedPlaylists = { };

    const songLengthMs = useSelector(state => state.searched.currsong?.duration_ms)
    const { id } = useParams()


    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            dispatch(getPlaylists(user.id))
            dispatch(getAllTimers(user.id))
            dispatch(getSearchedSong(id, token))
            if (songLength !== 0) {
                const minutes = Math.floor(songLengthMs / 60000);
                const seconds = ((songLengthMs % 60000) / 1000).toFixed(0);
                setSongLength(minutes + ":" + (seconds < 10 ? '0' : '') + seconds)
            }
        })()

    }, [dispatch, user.id, id, songLength, songLengthMs, token]);

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
        } else if (checked === false) {
            delete addedPlaylists[playlistId];
            console.log(addedPlaylists)
        }
    };

    const handleSaveRequests = async (e) => {
        e.preventDefault();
        if (addedPlaylists) {
            for (const playlist in addedPlaylists) {
                const playlist_id = playlist
                const song_link = id;
                const song_name = songName;
                const artist_name = artists[0].name;
                const album_name = albumName;
                const song_length = songLength;
                const song_img = image;
                await dispatch(storeSavedSong(song_link, song_name, artist_name, album_name, song_length, song_img, playlist_id))
            }
            history.push('/dashboard')
        }
    };

    return (
        <div className='dashboard-main-container'>
            <div className='featured-main-content'>
                <div className='featured-header'>
                    <img className='playlist-img' alt='playlist' src={image} />
                    <div className='playlist-name-top'>
                        Song
                        <div className='song-name-bottom'>
                            {songName}
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
                <div className='add-to-playlist-songs-container'>
                    <div className='featured-column-1'>
                        <div className='song-list'>
                            <div className='all-labels'>
                                <label className='featured-label-number'>#</label>
                                <label className='featured-label-title'>Title</label>
                                <label className='featured-label-duration'>Duration</label>
                            </div>
                            <div className='song-metadata-container' >
                                <div className='song-number'>
                                    <img className='play-and-pause' alt='pause play' onClick={pauseAndPlay} src={pausePlay} />
                                </div>
                                <div>
                                </ div>
                                <div className='song-name-single'>
                                    {songName}
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
                                                        className={`add-to-playlist-btn`}
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
                                    <div className='save-to-playlist-btn'>
                                        <button onClick={handleSaveRequests}>Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SideBar />
            <MusicBar />
        </div >
    );
};

export default AddToPlaylist;