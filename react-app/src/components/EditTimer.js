import React from 'react';
import { useHistory, useParams } from 'react-router';
import MusicBar from './MusicBar';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import sleepIcon from '../components/styles/images/sleep-icon.png'
import trashIcon from '../components/styles/images/trash.png'
import minusIcon from '../components/styles/images/minus-icon.png'
import SideBar from './Sidebar';

import './styles/EditPlaylist.css'

// Modal.setAppElement('App');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundImage: 'linear-gradient(280deg, #194E9B,#7E638A)',
    },
};


const EditTimer = () => {
    const [timerTitle, setTimerTitle] = useState('')
    const [newTime, setNewTime] = useState(0)
    const [timerTime, setTimerTime] = useState(0)
    const [assocPlaylist, setAssocPlaylist] = useState('')
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [newTimerName, setNewTimerName] = useState('')
    const allPlaylists = useSelector(state => state.playlists)
    const user = useSelector(state => state.session.user);
    let subtitle;
    const { id } = useParams()
    const history = useHistory();

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
            const user_id = user.id
            const timer_id = id
            const response = await fetch(`/api/timers/info`, {
                mode: 'no-cors',
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_id, timer_id })
            })
            const responseData = await response.json()
            const playlist_id = responseData.Success.playlist_id
            const duration = responseData.Success.time
            const minutes = Math.floor(duration / 60000);
            const seconds = ((minutes % 60000) / 1000).toFixed(0);
            let currentPlaylist;
            Object.values(allPlaylists).map((playlist) => {
                if (playlist.id === playlist_id) {
                    currentPlaylist = playlist
                    return playlist
                }
                return "1"
            })
            console.log(currentPlaylist)
            setAssocPlaylist(currentPlaylist?.name)
            setTimerTitle(responseData?.Success.name)
            setTimerTime(minutes + ":" + (seconds < 10 ? '0' : '') + seconds)
        })();
    }, [timerTitle, setTimerTitle, allPlaylists, id, user?.id])

    const sendChanges = async (e) => {
        e.preventDefault();
        const user_id = user.id
        const new_name = newTimerName
        const new_time = newTime
        const response = await fetch(`/api/timers/edit`, {
            mode: 'no-cors',
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id, id, new_name, new_time })
        })
        const responseData = await response.json()
        console.log(responseData)
        setTimerTitle(responseData.data)
    }

    const deleteTimer = async (e) => {
        e.preventDefault();
        const user_id = user.id
        const timer_id = id
        const response = await fetch(`/api/timers/delete`, {
            mode: 'no-cors',
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id, timer_id })
        })
        const responseData = await response.json()
        console.log(responseData)
        history.push('/dashboard')
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
                            contentLabel="Example Modal"
                        >
                            <div className='edit-playlist-form-container'>
                                <h2 className='timer-instruction-main' ref={(_subtitle) => (subtitle = _subtitle)}>Edit Sleep Timer</h2>
                                <div className='timer-instruction-1'>New Timer name</div>
                                <form>
                                    <input className='new-playlist-name' onChange={(e) => setNewTimerName(e.target.value)} />
                                    <input className='new-timer-time' onChange={(e) => setNewTime(e.target.value)}></input>
                                    <button onClick={sendChanges}>Save</button>
                                </form>
                            </div>
                        </Modal>
                    </div>
                    <img className='playlist-img' alt='sleep icon' src={sleepIcon} onClick={openModal} />
                    <div className='playlist-name-top'>
                        Timer
                        <div className='playlist-name-bottom'>
                            {timerTitle}
                        </div>
                    </div>
                    <div>
                        <div className='delete-playlist-Icon'>
                            <img src={trashIcon} alt='trash can icon' onClick={deleteTimer} />
                        </div>
                    </div>
                </div>
                <div className='songs-container'>
                    <div className='featured-column-1'>
                        <div className='song-list'>
                            <div className='all-labels'>
                                <label className='featured-label-number'>#</label>
                                <label className='featured-label-title'>Title</label>
                                <label className='featured-label-album'>Playlist</label>
                                <label className='featured-label-duration'>Duration</label>
                            </div>
                            <div className='all-labels'>
                                <div className='song-number'>
                                    <img className='minus-icon' alt='delete icon' src={minusIcon}></img>
                                </div>
                                <label className='featured-label-title'>{timerTitle}</label>
                                <label className='featured-label-album'>{assocPlaylist}</label>
                                <label className='featured-label-duration'>{timerTime}</label>
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

export default EditTimer;