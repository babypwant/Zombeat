import { useHistory, useParams } from 'react-router';
import MusicBar from './MusicBar';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import playlistIcon from '../components/styles/images/playlist-icon.jpg'
import './styles/EditPlaylist.css'
const EditPlaylist = () => {
    const [allPlaylists, setAllPlaylists] = useState([])
    const user = useSelector(state => state.session.user);
    const { id } = useParams()
    const history = useHistory();

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
    useEffect(async () => {
        const user_id = user.id
        const response = await fetch(`/api/playlists/info`, {
            mode: 'no-cors',
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id, id })
        })
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
            <div className='edit-playlist-main-content'>
                <div className='playlist-header'>
                    <img className='playlist-img' src={playlistIcon} />
                    <div className='playlist-name-top'>
                        Playlist
                        <div className='playlist-name-bottom'>
                            My Playlist #104
                        </div>
                    </div>
                </div>
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