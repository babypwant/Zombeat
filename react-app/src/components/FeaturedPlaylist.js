import React from 'react';
import { useHistory } from 'react-router';
import MusicBar from './MusicBar';
import './styles/Featured.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import addIcon from '../components/styles/images/add-icon.png'
import { getPlaylists } from '../store/playlists';
import { getAllTimers } from '../store/timer';
import { playCurrentSong } from '../store/current';
import { getSearchedSong } from '../store/searched';
import SideBar from './Sidebar';



const FeaturedPlaylist = () => {
    const playlistName = useSelector(state => state.selectedPlaylist?.current?.name)
    const description = useSelector(state => state.selectedPlaylist?.current?.description)
    const user = useSelector(state => state.session.user);
    const token = useSelector(state => state?.token?.token?.access_token)
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

    const playSong = (e) => {
        const id = e.target.id
        dispatch(playCurrentSong(id, token))
    };

    const searchSong = async (e) => {
        e.preventDefault();
        const id = e.target.id
        await dispatch(getSearchedSong(id, token))
        history.push(`/add/${id}`)
    }

    return (
        <div className='dashboard-main-container'>
            <div className='featured-main-content'>
                <div className='featured-header'>
                    <img className='playlist-img' alt='playlist art' src={image} />
                    <div className='playlist-name-top'>
                        Playlist
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
                            <img className='' alt='' />
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
                                        <div className='song-metadata-container' >
                                            <div className='song-number'>
                                                {amountOfTracks += 1}
                                            </div>
                                            <div>
                                                <img className='add-song' alt='search' onClick={searchSong} src={addIcon} id={song.track.id} value={song.track.id} />
                                            </div>
                                            <div>
                                                <img className='song-art' alt='album art' src={song.track.album.images[2].url} />
                                            </div>
                                            <div>
                                            </ div>
                                            <div className='song-name' onClick={playSong} id={song.track.id}>
                                                {song.track.name}
                                            </div>
                                            <div className='album-name' >
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
            <SideBar />
            <MusicBar />
        </div >
    );
};

export default FeaturedPlaylist;