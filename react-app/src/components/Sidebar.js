
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getPlaylists } from '../store/playlists';
import { getAllTimers } from '../store/timer';
import playlistIcon from '../components/styles/images/playlist-icon.jpg'
import timerIcon from '../components/styles/images/add-timer.png'

const SideBar = () => {
    const [new_name, setNewName] = useState('')
    const [playlist_Id, setPlaylistId] = useState(0)
    const user = useSelector(state => state.session.user);
    const allPlaylists = useSelector(state => state.playlists)
    const allTimers = useSelector(state => state.timers?.undefined?.all_timers)
    const user_id = user.id
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
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

    const editPlaylist = (e) => {
        e.preventDefault();
        history.push(`/edit/playlist/${e.target.value}`)
    };

    return (
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
    )
};

export default SideBar;