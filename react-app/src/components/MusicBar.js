import './styles/MusicBar.css'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
//See iframe data

const MusicBar = () => {
    const song = useSelector(state => state.current?.currsong?.id)
    return (
        <div className='music-bar-container'>
            <div className='iframe-container'>
                {
                    song &&
                    <iframe src={`https://open.spotify.com/embed/track/${song}`} width="100%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                }
            </div>
        </div >
    );
};
export default MusicBar;