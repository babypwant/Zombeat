import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import './styles/Playlist.css'

const Playlist = () => {
    const history = useHistory();
    const [playlist_Id, setPlaylistId] = useState(0)
    const user = useSelector(state => state.session.user);
    const user_id = user.id
    useEffect(() => {
        (async () => {
            const response = await fetch('/api/playlists/', {
                mode: 'no-cors',
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_id })
            });
            const responseData = await response.json();
            setPlaylistId(responseData.playlist_Id)
        })()
    }, [user]);

    const makeNewPlaylist = (e) => {
        e.preventDefault();
        history.push('/new/playlist')
    }

    const updatePlaylist = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/playlists/edit', {
            mode: 'no-cors',
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ playlist_Id, user_id })
        })
        const responseData = await response.json();
        console.log(responseData)
    }

    return (
        <div className='dashboard-main-container'>
            <div className='playlist-main-content'>
                <form className='album-form' method="POST" action="/playlists/">
                    <label> Playlist #1 </label>
                    <input>
                    </input>
                    <div>
                        <button onClick={updatePlaylist}>Submit</button>
                    </div>
                </form>
            </div>
            <div className='content-container'>
                <div className='here' onClick={makeNewPlaylist}>
                    Create Playlist
                </div>
            </div>
        </div >
    );
};

export default Playlist;