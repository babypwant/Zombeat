import { Redirect } from 'react-router-dom';
import './styles/Home.css'

const Dashboard = () => {

    return (
        <div className='main-container'>
            <div className='background'>
                <div className='title-container'>
                    <div className='title'>
                        Welcome to Dashboard page
                        <div>
                            Sleep is everything.
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Dashboard;