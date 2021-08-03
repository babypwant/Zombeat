import clouds from '../components/styles/images/clouds.png'
import './styles/Home.css'
import { Dispatch } from 'react';
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
                        <div onClick={demoLogin}>
                            <img src={clouds} alt="pixel-clouds"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Home;