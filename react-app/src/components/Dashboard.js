import { useHistory } from 'react-router';
import MusicBar from './MusicBar';
import './styles/Dashboard.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import playlistIcon from '../components/styles/images/playlist-icon.jpg'
import playlists, { getPlaylists } from '../store/playlists';

const Dashboard = () => {
    const user = useSelector(state => state.session.user);
    const allPlaylists = useSelector(state => state.playlists)
    const history = useHistory();
    const dispatch = useDispatch();
    let listItems;

    //saved website 

    //Check to see if being called in other locations
    //Check dependency array
    // cb (return value can be another cd on unmount)
    //dp array 
    // depen array 

    useEffect(() => {

        (async () => {

            dispatch(getPlaylists(user.id))
        })()
    }, [getPlaylists, dispatch])

    const makeNewPlaylist = (e) => {
        e.preventDefault();
        history.push('/new/playlist')
    }
    const editPlaylist = (e) => {
        e.preventDefault();
        history.push(`/edit/playlist/${e.target.value}`)
    }

    return (
        <div className='dashboard-main-container'>
            <div className='dashboard-main-content'>
                <form className='album-form' method="POST" action="/playlists/">
                    <label> My playlist #1 </label>
                    <input >
                    </input>
                    <div >
                        <button >Create</button>
                    </div>
                    <div>
                        <button >Edit</button>
                    </div>
                    <div>
                        <button >Delete</button>
                    </div>
                </form>
            </div>
            <div className='content-container'>
                <div className='create-playlist-btn' onClick={makeNewPlaylist}>
                    <img className='new-playlist-icon' src={playlistIcon} />
                    <label className='create-playlist-label'> Create Playlist </label>
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