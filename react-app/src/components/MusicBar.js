import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import './styles/MusicBar.css'

const MusicBar = () => {
    const user = useSelector(state => state.session.user);

    return (
        <div className='music-bar-container'>
        </div >
    );
};

export default MusicBar;