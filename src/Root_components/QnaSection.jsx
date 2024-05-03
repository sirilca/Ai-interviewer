import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CountdownTimer from '../component/Timer';

function QnaSection() {
    const navigate = useNavigate()
    const { state } = useLocation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answer_check, setAnswer_check] = useState(null)
    const [formdata, setFormdata] = useState({})
    const [test, setTest] = useState(false)


    //------------------------------------------------------------------------------------------------------
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(59);

    const resetTimer = () => {
        setHours(0);
        setMinutes(0);
        setSeconds(59);
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
    //------------------------------------------------------------------------------------------------------

    let id = null;

    useEffect(() => {
        // console.log(state?.questions);
        if (!answer_check && (currentQuestionIndex < (state?.questions.length))) {
            console.log(currentQuestionIndex);
            setFormdata({
                ...formdata,
                [state?.questions[currentQuestionIndex]?.answer]: "",
            });
        }

        if (currentQuestionIndex === state?.questions.length - 1) {
            setTimeout(() => {
                setTest(true)
            }, 60000);
        }


        if (state && state?.questions) {

            nextQuestion();
        }
        return () => clearTimeout(id);
    }, [currentQuestionIndex]);



    const nextQuestion = () => {
        if (currentQuestionIndex < state?.questions.length - 1) {
            id = setTimeout(() => {
                questionChange();
            }, 60000);
        }

    };

    const questionChange = () => {
        resetTimer()
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnswer_check(null)
        if (currentQuestionIndex === state?.questions.length) {
            console.log('test changes');
            setTest(true)
        }

    };

    const handleNextClick = () => {
        clearTimeout(id);
        if (currentQuestionIndex < (state?.questions?.length ?? 0) - 1) {
            questionChange();
        }
    };

    const handleInputChange = (e) => {
        console.log('changes');
        setAnswer_check(e.target.value)
        setFormdata({
            ...formdata,
            [state?.questions[currentQuestionIndex].answer]: e.target.value,
        });
    }

    const handleFinalSubmit = async () => {

        console.log(formdata);
        const finaldata = new FormData()
        finaldata.append('allqna', JSON.stringify(formdata))
        finaldata.append('file', state.file)
        axios.post('http://localhost:8080/answers', finaldata)
        navigate('/nextpage')
        navigate('/final')
    }

    const handleCopyPaste = (e) => {
        e.preventDefault();
        toast.error("Kindly avoid pasting the answer. Please type your response instead. Thank you!")
        // alert('Dont paste')

    };




    return (

        <div className='flex w-lvw h-lvh justify-center items-center'>
            {state ?

                <div className={`w-[92%] h-[90%] rounded-xl flex ${!test ? 'justify-between' : 'justify-center'} items-center flex-col relative`}
                    // style={{ backgroundImage: 'linear-gradient(62deg, #85b2e7 0%, #54546b 100%)', backgroundColor: '#85b2e7' }}
                    style={{
                        backgroundImage: 'linear-gradient(160deg, #8a3c88 0%, #a07dad 50%, #7c3f8c 100%)',
                        backgroundColor: '#8a3c88'
                    }}
                >
                    {!test &&
                        <div className="w-[80%] h-[10%] mt-7 bg-white flex items-center rounded-xl "
                        >

                            <div className='w-10 h-10 rounded-full flex justify-center items-center mx-4 text-white text-lg 
                            bg-gradient-to-r from-[#c62b97] to-[#9c1691b0]'
                            >
                                {currentQuestionIndex + 1}
                            </div>


                            <div className=" flex  items-center w-[95%] text-2xl text-[#8a3c88]">
                                <p>
                                    {state.questions[currentQuestionIndex]?.question}
                                </p>
                            </div>

                        </div>
                    }
                    {!test &&
                        <div className="w-[80%] h-[80%] bg-white m-5 rounded-lg overflow-hidden ">
                            <textarea
                                rows={10} cols={500}

                                onPaste={handleCopyPaste}
                                type={"description"}
                                placeholder={"Type your answer here...."}
                                name={state.questions.question}
                                value={answer_check || ""}
                                onChange={handleInputChange}
                                className="text-[#8a3c73] myfont text-xl  w-full h-full p-10 placeholder:text-[#c66fa9d6]"
                                style={{ outline: 'none', border: 'none' }} >
                            </textarea>

                        </div>
                    }
                    {test &&
                        <div className='text-3xl text-white'>
                            Please ensure that your examination papers are submitted promptly within the designated timeframe
                        </div>
                    }
                    {!test &&
                        <div className="absolute right-2 top-2">
                            <div className="w-16 h-8 bg-[#4df14170] rounded-lg flex text-white  border-green-200 border-2 justify-evenly items-center">
                                <p className=''>
                                    {minutes}
                                </p>
                                :
                                <p className=''>
                                    {seconds < 10 ? '0' + seconds : seconds}
                                </p>
                            </div>
                        </div>
                    }

                    <div className="absolute right-0 bottom-0 bg-red-900 m-5 w-24 h-10 overflow-hidden rounded-xl text-white">

                        {!(currentQuestionIndex === (state.questions.length) - 1) ?
                            <button
                                className="bg-[#3c8a49] w-full h-full  text-white text-lg flex justify-center items-center"
                                onClick={handleNextClick}
                                disabled={currentQuestionIndex === (state.questions.length) || id !== null} // Disable button if on last question or timeout set
                            >
                                Next
                            </button>
                            : <button
                                className="bg-[#8e9439] w-full h-full text-[#ffffff] text-lg flex justify-center items-center "
                                onClick={handleFinalSubmit}
                            >
                                Submit
                            </button>
                        }
                    </div>

                </div>
                :
                <div className='text-3xl'>
                    Access denied
                </div>
            }


            {/* <button className='bg-red-900 text-5xl text-white w-full' onClick={() => console.log(formdata)}>alldata</button> */}

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div >
    );
}

export default QnaSection;
