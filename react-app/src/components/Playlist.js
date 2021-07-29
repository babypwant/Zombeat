import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import './styles/Playlist.css'

const Playlist = () => {
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        (async () => {
            const response = await fetch('/api/playlists/', {
                mode: 'no-cors',
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify("Sup")
            });
            const responseData = await response.json();
            console.log(responseData)
            console.log("2");
            console.log(user)
        })()
        console.log("1")
    }, []);

    const makeNewPlaylist = (e) => {
        e.preventDefault();
        history.push('/new/playlist')
    }

    const updatePlaylist = (e) => {
        e.preventDefault();
        console.log("Hello")
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