import { useHistory } from 'react-router';
import MusicBar from './MusicBar';
import './styles/Dashboard.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setFeaturedPlaylists } from '../store/featured';
import { setSelectedPlaylist } from '../store/selectedPlaylist';
import SideBar from './Sidebar';

const Dashboard = () => {
    const user = useSelector(state => state.session.user);
    const token = useSelector(state => state?.token?.token?.access_token)
    const featured = useSelector(state => state.featured?.featured)
    const history = useHistory();
    const dispatch = useDispatch();;


    // put on higher level than dashboar because its never being mounted
    useEffect(() => {
        if (user) {
            (async () => {
                const response = await fetch("https://api.spotify.com/v1/browse/featured-playlists", {
                    method: "GET",
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                const data = await response.json()
                dispatch(setFeaturedPlaylists(data.playlists?.items))
            })()
        }
    }, [dispatch, token, user]);

    const selectedPlaylist = (e) => {
        e.preventDefault();
        const id = e.target.id
        dispatch(setSelectedPlaylist(id, token))
        history.push(`/featured/${e.target.id}`)
    }

    return (
        <div className='dashboard-main-container'>
            <div className='dashboard-main-content'>
                <div className='featured-playlists-container'>
                    {
                        featured &&
                        featured.map((playlist) => {
                            return (
                                <div
                                    className='spotify-playlist'
                                    value={playlist.id}
                                    id={playlist.id}
                                    onClick={selectedPlaylist}
                                >
                                    <img className='featured-playlist-img' alt='playlist item' src={playlist.images[0]?.url} value={playlist.id} id={playlist.id}
                                    />
                                    <label
                                        className='featured-spotify-title'
                                        value={playlist.id}
                                        id={playlist.id}
                                    >
                                        {playlist.name}
                                    </label>
                                </div>
                            )
                        })

                    }
                </div>

            </div>
            <SideBar />
            <MusicBar />
        </div >
    );
};

export default Dashboard;