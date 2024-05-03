import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import svg from '../images//pdf_10435045.png'

const FileUpload = ({ loadingcallback }) => {

    const navigate = useNavigate()


    const onDrop = async (file) => {
        loadingcallback(true)
        console.log(file[0]);
        const formdata = new FormData()
        formdata.append("file", file[0])
        await axios.post('http://localhost:8080/upload', formdata).then(res => {

            console.log(res.data.status);

            if (res.data.status === "fail") {
                navigate('/error')
            }

            if (res.data.status === "success") {
                console.log(res.data.questions);
                const alldata = { questions: res.data.questions, "file": file[0] }
                navigate("/nextpage", { state: alldata })
            }

        }).catch(err => { console.log("error is ", err); })

        loadingcallback(false)
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'application/pdf': ['.pdf'] }, multiple: false, });


    return (
        <div {...getRootProps()} className='w-full h-full flex  justify-evenly items-center'>
            <input {...getInputProps()} />
            <img src={svg} className='h-10'></img>
            <p className='text-[34px]'>
                Select your CV file
            </p>
        </div >
    );
};



const dropzoneStyles = {
    border: '2px dashed #ccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
};



export default FileUpload;
