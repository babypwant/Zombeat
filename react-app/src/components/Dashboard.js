import { useHistory } from 'react-router';
import MusicBar from './MusicBar';
import './styles/Dashboard.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import playlistIcon from '../components/styles/images/playlist-icon.jpg'
import { getPlaylists } from '../store/playlists';

const Dashboard = () => {
    const [fetchedData, setFetchedData] = useState(false)
    const user = useSelector(state => state.session.user);
    const allPlaylists = useSelector(state => state.playlists)
    const history = useHistory();
    const dispatch = useDispatch();
    // const prop = (
    //     <iframe src="https://open.spotify.com/embed/track/5EV4bGHxVN0kHpcAFvgnTt" width="100%" height="80" frameBorder="1000" allowtransparency="true" allow="encrypted-media"></iframe>
    // )

    //saved website 

    useEffect(() => {
        const user_id = user.id
        // dispatch(getPlaylists(user_id)

    }, [allPlaylists, user.id, dispatch])

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
                    </ul>
                </div>
            </div>
            <MusicBar />
            
        </div >
    );
};

export default Dashboard;