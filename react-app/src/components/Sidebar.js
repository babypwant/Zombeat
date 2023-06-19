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
                <img className='new-playlist-icon' alt="playlist-icon" src={timerIcon} />
                <label className='create-playlist-label'> New Playlist </label>
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