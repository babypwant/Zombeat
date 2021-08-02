import { useSelector } from 'react-redux';
import './styles/MusicBar.css'
import SpotifyPlayer from 'react-spotify-web-playback';


const MusicBar = () => {
    const user = useSelector(state => state.session.user);
    return (
        <div className='music-bar-container'>
            <div className='iframe-container'>
                {/* <SpotifyPlayer
                    token="BQAtyB5d3q9Cy6Z1vhTFA-WL8b3K4jfwcRVYddxcep9HawHSyiQaC4Ft6e0-Xgm67mMIv10b3QMig2Qv9t4xS3e5oyFmIJhBvxLNgwn-YQqyKerKrSf1jCEj0NlRrbe-I492UIiC1UMZ4oa01OCnSb3pQEDRfxvDydQNZcXkkKti74t7pkQ"
                    uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
                />; */}
            </div>
        </div >
    );
};

export default MusicBar;