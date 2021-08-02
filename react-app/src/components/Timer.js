import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import MusicBar from './MusicBar';
import './styles/Playlist.css'

const Timer = () => {
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const user_id = user.id
    useEffect(() => {
    }, []);



    return (
        <div className='dashboard-main-container'>
            <div className='playlist-main-content'>
                <form className='album-form' method="POST" action="/playlists/">
                    <label>New timer name</label>
                </form>
            </div>
            <div className='content-container'>
                <div className='here'>
                    Create Playlist
                </div>
            </div>
            <MusicBar />
        </div >
    );
};

export default Timer;