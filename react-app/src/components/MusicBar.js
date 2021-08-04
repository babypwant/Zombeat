import './styles/MusicBar.css'

//See iframe data

const MusicBar = () => {


    const currsong = 'https://open.spotify.com/embed/track/19gEmPjfqSZT0ulDRfjl0m';
    return (
        <div className='music-bar-container'>
            <div className='iframe-container'>
                <iframe src={`${currsong}`} width="100%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>            </div>
        </div >
    );
};

export default MusicBar;