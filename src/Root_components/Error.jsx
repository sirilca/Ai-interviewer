import React from 'react';
import congratssvg from '../images/error.svg';
import { useNavigate } from 'react-router-dom';

function Error() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    };

    return (
        <div className='w-full h-screen flex justify-center items-center bg-[#331c8a33] text-white'>
            <div className='h-[100%] w-[100%]  flex items-center flex-col justify-evenly shadow-2xl bg-error relative' style={{ backgroundImage: 'linear-gradient(61deg, #c53030 0%, #9b2c2c 47%, #742a2a 100%) ', backgroundColor: '#c53030' }}>
                <div>
                    <p className='text-6xl text-center w-full m-4'>Sorry - Failed to process</p>
                    <p className='text-center text-2xl mt-6 tracking-wide'>Please create your CV with respect to our Instructions</p>
                </div>
                <img src={congratssvg} className='h-52' alt="Error" />
                <button onClick={goBack} className='text-lg border-2 p-2 py-1 rounded-lg  bg-[#3c33550c] hover:text-[#e1a4d1dd] hover:border-[#d49dc7dd]'  >Go Back to Home </button>
            </div>
        </div>
    );
}

export default Error;
