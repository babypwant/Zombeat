import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getPlaylists } from '../store/playlists';
import { getAllTimers } from '../store/timer';
import playlistIcon from '../components/styles/images/playlist-icon.jpg'
import timerIcon from '../components/styles/images/add-timer.png'
import playlistExample1 from '../components/styles/images/Example1.PNG'
import playlistExample2 from '../components/styles/images/Example2.PNG'

import './styles/Playlist.css'
import MusicBar from './MusicBar';


const Playlist = () => {
    const history = useHistory();
    const [playlist_Id, setPlaylistId] = useState(0)
    const [new_name, setNewName] = useState('')
    const user = useSelector(state => state.session.user);
    const allPlaylists = useSelector(state => state.playlists)
    const allTimers = useSelector(state => state.timers?.undefined?.all_timers)
    const user_id = user.id
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const response = await fetch('/api/playlists/id', {
                mode: 'no-cors',
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_id })
            });
            const responseData = await response.json();
            setPlaylistId(responseData?.id)
            dispatch(getPlaylists(user.id))
            dispatch(getAllTimers(user.id))
        })()
    }, []);




    const makeNewPlaylist = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/playlists/', {
            mode: 'no-cors',
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id, new_name })
        });
        const responseData = await response.json()
        setPlaylistId(responseData.playlist_Id)

        console.log("Successful", `=== New playlist Created ===`)
        history.push('/dashboard')
    }

    const updatePlaylist = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/playlists/edit', {
            mode: 'no-cors',
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ playlist_Id, user_id, new_name })
        })
        const responseData = await response.json();
        console.log(playlist_Id)
    }
    const deletePlaylist = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/playlists/delete', {
            mode: 'no-cors',
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ playlist_Id, user_id })
        })
        const responseData = await response.json();
        console.log(responseData)
        history.push('/dashboard')
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

    const editPlaylist = (e) => {
        e.preventDefault();
        history.push(`/edit/playlist/${e.target.value}`)
    };


    return (
        <div className='dashboard-main-container'>
            <div className='playlist-main-content'>
                <div className='new-list-header'>
                    <div className='all-playlist-form-items'>
                        <div className='make-playlist-form'>
                            <form className='album-form' method="POST" action="/playlists/">
                                <label className='your-playlist-label'> Your Playlist, needs a  name to fit your mood</label>
                                <input placeholder='Your Playlist Name HERE' className='playlist-form-name-input' onChange={(e) => setNewName(e.target.value)}>
                                </input>
                                <div >
                                    <button onClick={makeNewPlaylist}>Create</button>
                                </div>
                            </form>
                        </div>
                        <p className='p-label'>How to add songs:</p>
                        <p className='p-label'>On the Dashboard, pick a playlist that fits your style!</p>
                        <div>
                            <img className='example-1' src={playlistExample1} />
                        </div>
                        <p className='p-label'>Press play to hear the song or the plus icon to add it to a playlist!</p>
                        <img className='example-2' src={playlistExample2} />
                        <p className='p-label'>That's it! You're a pro!</p>

                    </div>
                </div>

            </div>
            {/* sidebar content */}
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

export default Playlist;