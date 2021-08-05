import { useHistory } from 'react-router';
import MusicBar from './MusicBar';
import './styles/Dashboard.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import playlistIcon from '../components/styles/images/playlist-icon.jpg'
import timerIcon from '../components/styles/images/add-timer.png'
import { getPlaylists } from '../store/playlists';
import { getAllTimers } from '../store/timer';
import { getAccessToken } from '../store/spotify';
import { setFeaturedPlaylists } from '../store/featured';

const Dashboard = () => {
    // const [featured, setFeatured] = useState(null)
    const user = useSelector(state => state.session.user);
    const allPlaylists = useSelector(state => state.playlists)
    const allTimers = useSelector(state => state.timers?.undefined?.all_timers)
    const token = useSelector(state => state?.token?.token?.access_token)
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {

        (async () => {
            dispatch(getPlaylists(user.id))
            dispatch(getAllTimers(user.id))
        })()


    }, [dispatch, user.id]);

    useEffect(() => {
        (async () => {
            const response = await fetch("https://api.spotify.com/v1/browse/featured-playlists", {
                method: "GET",
                headers: { 'Authorization': 'Bearer ' + token }
            })
            const data = await response.json()
            dispatch(setFeaturedPlaylists(data.playlists?.items))
        })()
    }, []);

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
        console.log(1)
    };

    const getToken = (e) => {
        e.preventDefault();
        dispatch(getAccessToken())
    };

    // const testFeatured = () => {
    //     featured?.forEach((playlist) => {
    //         console.log(playlist)
    //         console.log(playlist.name)
    //         console.log(playlist.id)
    //         console.log(playlist.images[0]?.url)
    //     })
    // };
    return (
        <div className='dashboard-main-container'>
            <div className='dashboard-main-content'>
                <div className='featured-playlists-container'>
                    {
                        // featured &&
                        // featured.map((playlist) => {
                        //     return (
                        //         <div
                        //             className='spotify-playlist'
                        //             value={playlist.id}
                        //         >
                        //             <img className='featured-playlist-img' src={playlist.images[0]?.url} />
                        //             <label
                        //                 className='featured-spotify-title'
                        //             >
                        //                 {playlist.name}
                        //             </label>
                        //         </div>
                        //     )
                        // })

                    }
                </div>

            </div>
            <div className='content-container'>
                <div className='create-playlist-btn' onClick={makeNewPlaylist}>
                    <img className='new-playlist-icon' src={playlistIcon} />
                    <label className='create-playlist-label'> Create Playlist </label>
                </div>
                <div className='timers-container' onClick={createTimer}>
                    <img className='new-timer-icon' src={timerIcon} />
                    <label className=''>Create a Timer</label>
                </div>
                <div className='timers'>
                    <ul>

                        {allTimers &&
                            allTimers.map((timer) => {
                                return (
                                    <li value={timer.id}
                                        onClick={editTimer}
                                        className='timer-li'
                                    >{timer.name}</li>
                                )
                            })

                        }
                    </ul>
                    <button onClick={getToken}>Test key</button>
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

export default Dashboard;