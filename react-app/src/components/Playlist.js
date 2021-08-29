import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getPlaylists } from '../store/playlists';
import { getAllTimers } from '../store/timer';
import playlistExample1 from '../components/styles/images/Example1.PNG'
import playlistExample2 from '../components/styles/images/Example2.PNG'

import './styles/Playlist.css'
import MusicBar from './MusicBar';
import SideBar from './Sidebar';


const Playlist = () => {
    const history = useHistory();
    const [playlist_Id, setPlaylistId] = useState(0)
    const [new_name, setNewName] = useState('')
    const user = useSelector(state => state.session.user);
    const user_id = user.id
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            dispatch(getPlaylists(user.id))
            dispatch(getAllTimers(user.id))
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
            body: JSON.stringify({ user_id, new_name })
        });
        const responseData = await response.json()
        setPlaylistId(responseData.playlist_Id)

        console.log("Successful", `=== New playlist Created ===`)
        history.push('/dashboard')
    };

    return (
        <div className='dashboard-main-container'>
            <div className='playlist-main-content'>
                <div className='new-list-header'>
                    <div className='all-playlist-form-items'>
                        <div className='make-playlist-form'>
                            <form className='album-form' method="POST" action="/playlists/">
                                <label className='your-playlist-label'> Your Playlist, needs a  name to fit your mood</label>
                                <input placeholder='Your Playlist Name HERE' className='playlist-form-name-input' onChange={(e) => setNewName(e.target.value)}>
                                </input>
                                <div >
                                    <button onClick={makeNewPlaylist}>Create</button>
                                </div>
                            </form>
                        </div>
                        <p className='p-label'>How to add songs:</p>
                        <p className='p-label'>On the Dashboard, pick a playlist that fits your style!</p>
                        <div>
                            <img className='example-1' src={playlistExample1} />
                        </div>
                        <p className='p-label'>Press the plus icon to add it to a playlist!</p>
                        <img className='example-2' src={playlistExample2} />
                        <p className='p-label'>That's it! You're a pro!</p>
                    </div>
                </div>
            </div>
            <SideBar />
            <MusicBar />
        </div >
    );
};

export default Playlist;