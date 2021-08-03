import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import Timer from './Timer';
import './styles/Playlist.css'
import MusicBar from './MusicBar';

const Playlist = () => {
    const history = useHistory();
    const [playlist_Id, setPlaylistId] = useState(0)
    const [new_name, setNewName] = useState('')
    const [playlistName, setPlaylistName] = useState('')
    const user = useSelector(state => state.session.user);
    const user_id = user.id


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
            body: JSON.stringify({ user_id })
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

    return (
        <div className='dashboard-main-container'>
            <div className='playlist-main-content'>
                <form className='album-form' method="POST" action="/playlists/">
                    <label> My playlist #1 </label>
                    <input onChange={(e) => setNewName(e.target.value)}>
                    </input>
                    <div >
                        <button onClick={makeNewPlaylist}>Create</button>
                    </div>
                    <div>
                        <button onClick={updatePlaylist}>Edit</button>
                    </div>
                    <div>
                        <button onClick={deletePlaylist}>Delete</button>
                    </div>
                </form>
            </div>
            <div className='content-container'>
                <div className='here' onClick={makeNewPlaylist}>
                    Create Playlist
                </div>
            </div>
            <MusicBar />
        </div >
    );
};

export default Playlist;