import React from 'react';
import { useHistory, useParams } from 'react-router';
import MusicBar from './MusicBar';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getPlaylists } from '../store/playlists';
import { getAllTimers } from '../store/timer';
import playlistIcon from '../components/styles/images/playlist-icon.jpg'
import sleepIcon from '../components/styles/images/sleep-icon.png'
import trashIcon from '../components/styles/images/trash.png'
import timerIcon from '../components/styles/images/add-timer.png'

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
        backgroundImage: 'linear-gradient(280deg, #454545,#262222)',
    },
};


const EditTimer = () => {
    const [timerTitle, setTimerTitle] = useState('')
    const [newTime, setNewTime] = useState(0)
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [newTimerName, setNewTimerName] = useState('')
    const allPlaylists = useSelector(state => state.playlists)
    const allTimers = useSelector(state => state.timers?.undefined?.all_timers)
    const user = useSelector(state => state.session.user);
    let subtitle;
    const { id } = useParams()
    const history = useHistory();
    const dispatch = useDispatch();

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
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
    }, [timerTitle, setTimerTitle])
    useEffect(async () => {
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
        setTimerTitle(responseData.Success.name)
    }, [timerTitle, setTimerTitle])

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
    };

    const editTimer = (e) => {
        e.preventDefault();
        history.push(`/edit/timer/${e.target.value}`)
        console.log(1)
    };

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
                                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit Sleep Timer</h2>
                                <div>New Timer name</div>
                                <form>
                                    <input className='new-playlist-name' onChange={(e) => setNewTimerName(e.target.value)} />
                                    <input className='new-timer-time' onChange={(e) => setNewTime(e.target.value)}></input>
                                    <button onClick={sendChanges}>Save</button>
                                </form>
                            </div>
                        </Modal>
                    </div>
                    <img className='playlist-img' src={sleepIcon} onClick={openModal} />
                    <div className='playlist-name-top'>
                        Timer
                        <div className='playlist-name-bottom'>
                            {timerTitle}
                        </div>
                    </div>
                    <div>
                        <div className='delete-playlist-Icon'>
                            <img src={trashIcon} onClick={deleteTimer} />
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

export default EditTimer;