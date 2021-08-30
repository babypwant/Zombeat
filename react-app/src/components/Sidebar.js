import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getPlaylists } from '../store/playlists';
import { getAllTimers } from '../store/timer';
import playlistIcon from '../components/styles/images/playlist-icon.jpg'
import timerIcon from '../components/styles/images/add-timer.png'

const SideBar = () => {
    const user = useSelector(state => state.session.user);
    const allPlaylists = useSelector(state => state.playlists)
    const allTimers = useSelector(state => state.timers?.undefined?.all_timers)
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            dispatch(getPlaylists(user.id))
            dispatch(getAllTimers(user.id))
        })()
    }, [dispatch, user?.id]);

    const makeNewPlaylist = async (e) => {
        history.push('/new/playlist')
    };

    const createTimer = (e) => {
        e.preventDefault();
        history.push('/new/timer')
    };
    const editTimer = (e) => {
        e.preventDefault();
        history.push(`/edit/timer/${e.target.value}`)
    };

    const editPlaylist = (e) => {
        e.preventDefault();
        history.push(`/edit/playlist/${e.target.value}`)
    };

    return (
        <div className='content-container'>
            <div className='create-playlist-btn' onClick={makeNewPlaylist}>
                <img className='new-playlist-icon' alt="playlist-icon" src={playlistIcon} />
                <label className='create-playlist-label'> Create Playlist </label>
            </div>
            <div className='timers-container' onClick={createTimer}>
                <img className='new-timer-icon' alt="timer-icon" src={timerIcon} />
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
                <div class="scrollbar medium-scroll">
                    <div class="force-overflow">
                        <ul className='single-ul'>
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
            </div>
        </div>
    )
};

export default SideBar;