import { useHistory } from 'react-router';
import MusicBar from './MusicBar';
import './styles/Dashboard.css'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import playlistIcon from '../components/styles/images/playlist-icon.jpg'

const EditPlaylist = () => {
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const [allPlaylists, setAllPlaylists] = useState([])

    useEffect(() => {
        (async () => {
            const user_id = user.id
            const response = await fetch(`/api/playlists/all`, {
                mode: 'no-cors',
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_id })
            })
            const responseData = await response.json();
            setAllPlaylists(responseData.Success)
        })()

    }, [])

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
                Hello
            </div>
            <div className='content-container'>
                <div className='create-playlist-btn' onClick={makeNewPlaylist}>
                    <img className='new-playlist-icon' src={playlistIcon} />
                    <label> Create Playlist </label>
                </div>
                <div className='all-playlists-container'>
                    <ul>
                        {allPlaylists.map((playlist) => {
                            return (
                                <li key={playlist.id}
                                    className={`playlist-btn`}
                                    value={playlist.id}
                                    onClick={editPlaylist}
                                >
                                    {playlist.name}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <MusicBar />
        </div >
    );
};

export default EditPlaylist;