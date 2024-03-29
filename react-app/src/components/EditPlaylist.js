import React from 'react';
import { useHistory, useParams } from 'react-router';
import MusicBar from './MusicBar';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getPlaylists } from '../store/playlists';
import { getAllTimers } from '../store/timer';
import { getPlaylistSongs } from '../store/saved';
import { removeFromPlaylist } from '../store/saved';
import Modal from 'react-modal';
import playlistIcon from '../components/styles/images/playlist-icon.jpg'
import trashIcon from '../components/styles/images/trash.png'
import minusIcon from '../components/styles/images/minus-icon.png'
import SideBar from './Sidebar';

import './styles/EditPlaylist.css'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        width: '40%',
        height: '50%',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#1A1A1A',
        boderRadius: '10px',
    },
};


const EditPlaylist = () => {
    const { id } = useParams()
    const [playlistTitle, setPlaylistTitle] = useState('');
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [currentPlaylist, setCurrentPlalist] = useState('');
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const user = useSelector(state => state.session.user);
    const songs = useSelector(state => state?.saved?.songs);
    let subtitle;
    const history = useHistory();
    const dispatch = useDispatch();

    function openModal() {
        setIsOpen(true);
    };

    function afterOpenModal() {
        subtitle.style.color = 'white';
    };

    function closeModal() {
        setIsOpen(false);
    };

    useEffect(() => {
        (async () => {
            dispatch(getPlaylists(user.id))
            dispatch(getAllTimers(user.id))
            dispatch(getPlaylistSongs(id))
        })()
        setCurrentPlalist(id)
    }, [playlistTitle, setPlaylistTitle, currentPlaylist, dispatch, id, user?.id]);

    useEffect(() => {
        (async () => {
            const user_id = user.id
            const response = await fetch(`/api/playlists/info`, {
                mode: 'no-cors',
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_id, id })
            })
            const responseData = await response.json()
            setPlaylistTitle(responseData.Success.name)
        })()
    }, [playlistTitle, setPlaylistTitle, id, user?.id])

    const sendChanges = async (e) => {
        e.preventDefault();
        const user_id = user.id
        const new_name = newPlaylistName
        const response = await fetch(`/api/playlists/edit`, {
            mode: 'no-cors',
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id, id, new_name })
        })
        const responseData = await response.json()
        console.log(responseData)
        setPlaylistTitle(responseData.data)
    }

    const deletePlaylist = async (e) => {
        e.preventDefault();
        const user_id = user.id
        const playlist_Id = id
        const response = await fetch(`/api/playlists/delete`, {
            mode: 'no-cors',
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id, playlist_Id })
        })
        const responseData = await response.json()
        console.log(responseData)
        history.push('/dashboard')
    }

    const removeSong = async (e) => {
        e.preventDefault();
        const song_id = e.target.id
        const playlist_id = id
        dispatch(removeFromPlaylist(song_id, playlist_id))
    }

    return (
        <div className='dashboard-main-container'>
            <div className='edit-playlist-main-content'>
                <div className='playlist-header'>
                    <div className='modal-container'>
                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Update playlist name"
                        >
                            <div className='edit-playlist-form-container'>
                                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit playlist</h2>
                                <div className='timer-instruction-1'>New playlist Name</div>
                                <form>
                                    <input className='new-playlist-name' onChange={(e) => setNewPlaylistName(e.target.value)} />
                                    <button onClick={sendChanges}>Save</button>
                                </form>
                            </div>
                        </Modal>
                    </div>
                    <img className='playlist-img' alt="Playlist" src={playlistIcon} onClick={openModal} />
                    <div className='playlist-name-top'>
                        Playlist
                        <div className='playlist-name-bottom'>
                            {playlistTitle}
                            <i className="fa-solid fa-circle-minus"></i>
                        </div>
                    </div>
                    <div>
                        <div className='delete-playlist-Icon'>
                            <img className='' alt="remove" src={trashIcon} onClick={deletePlaylist} />
                        </div>
                    </div>
                </div>
                <div className='edit-songs-container'>
                    <div className='featured-column-1'>
                        <div className='song-list'>
                            <div className='all-labels'>
                                <label className='featured-label-number'>#</label>
                                <label className='featured-label-title'>Title</label>
                                <label className='featured-label-album'>Album</label>
                                <label className='featured-label-duration'>Duration</label>
                            </div>
                            {songs &&
                                Object.values(songs).map((song) => {
                                    const minutes = Math.floor(song.song_length / 60000);
                                    const seconds = ((song.song_length % 60000) / 1000).toFixed(2);
                                    return (
                                        <div className='song-metadata-container' >
                                            <div className='song-number' id={song.id}>
                                                <img className='minus-icon' alt="remove-song-icon" onClick={removeSong} src={minusIcon} id={song.id} />
                                            </div>
                                            <div>
                                                <img className='song-art' alt="Playlist" src={song?.song_img} />
                                            </div>
                                            <div>
                                            </ div>
                                            <div className='song-name' id={song.id}>
                                                {song?.song_name}
                                            </div>
                                            <div className='album-name' >
                                                {song.album_name}
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

export default EditPlaylist;