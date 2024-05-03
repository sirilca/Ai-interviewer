import React, { useState, useEffect } from 'react';

function CountdownTimer() {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(0);

    const resetTimer = () => {
        setHours(0);
        setMinutes(1);
        setSeconds(0);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (hours === 0 && minutes === 0 && seconds === 1) {
                // Reset the timer
                resetTimer();
            } else if (seconds === 0) {
                if (minutes === 0) {
                    setHours(prevHours => prevHours - 1);
                    setMinutes(59);
                    setSeconds(59);
                } else {
                    setMinutes(prevMinutes => prevMinutes - 1);
                    setSeconds(59);
                }
            } else {
                setSeconds(prevSeconds => prevSeconds - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [hours, minutes, seconds]);

    return (
        <div>
            <div className="w-16 h-8 bg-[#4df14170] rounded-lg flex text-white  border-green-200 border-2 justify-evenly items-center">
                <p className=''>
                    {minutes}
                </p>
                :
                <p className=''>
                    {seconds < 10 ? '0' + seconds : seconds}
                </p>
            </div>
            <button onClick={resetTimer}>Reset Timer</button>
        </div>
    );
}

export default CountdownTimer;
