import './styles/MusicBar.css'

//See iframe data

const MusicBar = () => {

    return (
        <div className='music-bar-container'>
            <div className='iframe-container'>
                <iframe src="https://open.spotify.com/embed/track/6SIUhbJgtqYnSGEn91sZh4" width="100%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
        </div >
    );
};

export default MusicBar;