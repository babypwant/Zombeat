import { useHistory } from 'react-router';
import './styles/Dashboard.css'

const Dashboard = () => {
    const history = useHistory();

    const makeNewPlaylist = (e) => {
        e.preventDefault();
        history.push('/new/playlist')
    }

    return (
        <div className='dashboard-main-container'>
            <div className='content-container'>
                <div className='here' onClick={makeNewPlaylist}>
                    Create Playlist
                </div>
            </div>
        </div >
    );
};

export default Dashboard;