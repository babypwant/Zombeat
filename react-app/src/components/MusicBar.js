import './styles/MusicBar.css'
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";


const MusicBar = () => {

    const AUTH_TOKEN = `${process.env.ACCESS_TOKEN}`;


    // const MySpotifyPlayer: React.VFC = () => {
    //     const getOAuthToken = useCallback(callback => callback(AUTH_TOKEN), []);

    return (
        <div className='music-bar-container'>
            <div className='iframe-container'>
                {/* <WebPlaybackSDK
                        deviceName="My awesome Spotify app"
                        getOAuthToken={getOAuthToken}
                        volume={0.5}>
                        {/* `TogglePlay` and `SongTitle` will be defined later. */}

                {/* </WebPlaybackSDK> */} */}
            </div>
        </div >
    );
};

export default MusicBar;