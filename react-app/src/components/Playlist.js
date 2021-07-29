import './styles/Dashboard.css'
import { useHistory } from 'react-router';

const Playlist = () => {
    const history = useHistory();

    const makeNewPlaylist = (e) => {
        e.preventDefault();
        history.push('/new/playlist')
    }

    return (
        <div className='dashboard-main-container'>
            <div className='content-container'>
                <div className='new-playlist-btn' onClick={makeNewPlaylist}>
                    Create Playlist
                </div>
            </div>
        </div >
    );
};

export default Playlist;