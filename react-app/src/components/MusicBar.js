import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import './styles/MusicBar.css'

const MusicBar = () => {
    const user = useSelector(state => state.session.user);
    return (
        <div className='music-bar-container'>
            <div className='iframe-container'>
                <iframe className='iframe' src="https://open.spotify.com/embed/track/5EV4bGHxVN0kHpcAFvgnTt" width="92%" height="80" frameBorder="1000" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
        </div >
    );
};

export default MusicBar;