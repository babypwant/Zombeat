import './styles/MusicBar.css'

//See iframe data

const MusicBar = () => {


    const currsong = 'https://open.spotify.com/embed/track/45BBlVHECwB0uNt7BsJ97r';
    return (
        <div className='music-bar-container'>
            <div className='iframe-container'>
                <iframe src={`${currsong}`} width="100%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
        </div >
    );
};
//<iframe src="https://open.spotify.com/embed/track/45BBlVHECwB0uNt7BsJ97r" width="100%" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
export default MusicBar;