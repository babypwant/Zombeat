import clouds from '../components/styles/images/clouds.png'
import './styles/Home.css'
import gitCloud from '../components/styles/images/cloud-git.png'
import linkedCloud from '../components/styles/images/linked.png'

import { useDispatch } from 'react-redux';
import { login } from '../store/session';
import { useHistory } from 'react-router';

const Home = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const demoLogin = async (e) => {
        e.preventDefault();
        await dispatch(login('demo@aa.io', 'password'));
        history.push('/dashboard')
    }

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <div className='main-container'>
            <div className='background'>
                <div className='title-container'>
                    <div className='title'>
                        Welcome to Heaven( )
                        <div>
                            Sleep is everything.

                        </div>
                    </div>
                </div>
                <div className='clouds-container'>
                    <div>
                        <div >
                            <img className='pixel-clouds' src={clouds} alt="pixel-clouds" onClick={demoLogin}></img>
                        </div>
                    </div>
                    <div className='git-cloud-container'>
                        <img className='git-cloud-img' onClick={() => openInNewTab('https://github.com/babypwant')} src={gitCloud} />
                    </div>
                </div>
                <div>
                    <img className='linked-cloud' onClick={() => openInNewTab('https://www.linkedin.com/in/gary-rios-9464a2208')} src={linkedCloud} />
                </div>
            </div>
        </div >
    );
};

export default Home;