import './styles/MusicBar.css'
import { useSelector } from 'react-redux';
import LinkedIn from '../components/styles/images/linkedin.png'
import Github from '../components/styles/images/github.png'
//See iframe data

const MusicBar = () => {
    const song = useSelector(state => state.current?.currsong?.id)
    return (
        <div className='music-bar-container'>
            <div className='contact-info'>
                <a href='https://github.com/babypwant'>
                    <img src={Github} className='github-icon-bar' alt='Link to github profile' />
                </a>
                <a href='https://www.linkedin.com/in/gary-rios-9464a2208'>
                    <img src={LinkedIn} className='github-icon-bar' alt='LinkedIn' />
                </a>
            </div>
            <div className='iframe-container'>
                {
                    song &&
                    <iframe title="Spotify Playbar" src={`https://open.spotify.com/embed/track/${song}`} width="100%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                }
            </div>
        </div >
    );
};
export default MusicBar;