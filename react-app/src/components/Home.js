import { Redirect } from 'react-router-dom';
import './styles/Home.css'

const Home = () => {

    return (
        <div className='main-container'>
            <div className='title-container'>
                <div className='title'>
                    Welcome to Sleepify()
                    <div>
                        Sleep is everything.
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Home;