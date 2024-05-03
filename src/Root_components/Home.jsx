import React, { useState } from 'react'
import FileUpload from '../component/FileUpload'
import loadinggif from '../images/loading.gif'
const Home = () => {


    const [loading, setLoading] = useState(false)

    const loadingsvg = (obj) => {
        setLoading(obj)
    }
    return (
        <div className='w-full h-lvh flex justify-center items-center bg-[#331c8a33] text-white '>

            <div className='w-[92%] h-[90%] rounded-xl flex items-center flex-col justify-evenly shadow-2xl bg-red-900 relative'
                style={{ backgroundImage: 'radial-gradient(43deg, #1f2d76 0%, #4d59ad 46%, #192155 100%)', backgroundColor: '#1f2d76' }}>
                <div className="">
                    <p className='text-6xl text-center w-full m-4'>Artificial  Interviewer</p>
                    <p className='text-center text-2xl mt-6 tracking-wide'>Maximize your career opportunities with a winning CV</p>
                </div>
                <div className='border-2 w-96 h-20 border-green-200 rounded-lg flex justify-evenly items-center cursor-pointer hover:border-green-400 hover:text-green-400 hover:shadow-lg hover:bg-[#51885429]'>
                    <FileUpload loadingcallback={loadingsvg} />
                </div>

                {loading &&
                    <div className='absolute bottom-10 text-[#33d654f2] flex justify-between' >
                        <p className='text-2xl '>

                            Your CV is currently being processed....
                        </p>
                        <img src={loadinggif} className='h-9'></img>
                    </div>}
            </div>
        </div>
    )
}

export default Home
