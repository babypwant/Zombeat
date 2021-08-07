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
import Modal from 'react-modal';
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


const FeaturedPlaylist = () => {
    const [playButton, setPlayButton] = useState(addIcon)
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const playlistName = useSelector(state => state.selectedPlaylist?.current?.name)
    const description = useSelector(state => state.selectedPlaylist?.current?.description)
    const user = useSelector(state => state.session.user);
    const allPlaylists = useSelector(state => state.playlists)
    const allTimers = useSelector(state => state.timers?.undefined?.all_timers)
    const songs = useSelector(state => state.selectedPlaylist?.current?.tracks?.items)
    const image = useSelector(state => state.selectedPlaylist?.current?.images[0]?.url)
    let subtitle;


    const history = useHistory();
    const dispatch = useDispatch();
    let amountOfTracks = 0;


    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = 'white';
    }

    function closeModal() {
        setIsOpen(false);
    }

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
                                                <div className='modal-container'>
                                                    <Modal
                                                        isOpen={modalIsOpen}
                                                        onAfterOpen={afterOpenModal}
                                                        onRequestClose={closeModal}
                                                        style={customStyles}
                                                        contentLabel="Example Modal"
                                                    >
                                                        <div className='edit-playlist-form-container'>
                                                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit playlist</h2>
                                                            <div>New playlist Name</div>
                                                            <form>
                                                                <inpu>Hello</inpu>
                                                                <button >Save</button>
                                                            </form>
                                                        </div>
                                                    </Modal>
                                                </div>
                                                <img className='add-song' onClick={openModal} src={playButton} />
                                            </div>
                                            <div>
                                                <img className='song-art' src={song.track.album.images[2].url} />
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