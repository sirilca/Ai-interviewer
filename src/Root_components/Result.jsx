import React from 'react';
import congratssvg from '../images/congrats.svg';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from '../component/Timer';

function Result() {
    const navigate = useNavigate();

    const goback = () => {
        navigate('/')
    }

    return (
        <div className='w-full h-screen flex justify-center items-center bg-[#331c8a33] text-white'>
            <div className='h-[100%] w-[100%]  flex items-center flex-col justify-evenly shadow-2xl bg-red-900 relative' style={{ backgroundImage: 'linear-gradient(61deg, #288a55 0%, #95ba7b 47%, #307122 100%) ', backgroundColor: '#288a55' }}>
                <div>
                    <p className='text-6xl text-center w-full m-4'>Congratulations</p>
                    <p className='text-center text-2xl mt-6 tracking-wide'>You will be notified by the recruiter soon</p>
                </div>
                <img src={congratssvg} className='h-52' alt="Congratulations" />
                <button onClick={goback} className='text-blue-900 text-lg font-medium border-2 p-2 py-1 rounded-lg border-blue-900 bg-[#3c33550c] hover:text-[#da31b0dd] hover:border-[#da31b0dd]'  >Go Back to Home</button>
            </div>
        </div>
    );
}

export default Result;
