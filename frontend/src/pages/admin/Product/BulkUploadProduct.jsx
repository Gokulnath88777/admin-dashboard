import api from '@/api/axios';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { File } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
function BulkUploadProduct() {
    const [file, setFile] = useState(null)
    const[loading,setLoading]=useState(false);
    const navigate = useNavigate(-1);
    function handleFile(e) {
        const slctFile = e.target.files[0];
        if (!slctFile) return;
        const fileName = slctFile.name.toLowerCase();
        if (!fileName.endsWith(".csv")) {
            toast.error("Only CSV files are allowed");
            e.target.value = null;
            return;
        }
        setFile(slctFile)

    }

    async function handleUpload() {
        console.log("Clicked");
        if (!file) {
            toast.error("Select the file")
            return
        }
        const formData = new FormData();
        formData.append('file', file);
        try {

            setLoading(true);
            const res = await api.post('products/bulk-upload',
                formData
                ,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            console.log(res);

            toast.success(`Data added successfully ${res.data.totalInserted}`)
            setFile(null);
        }
        catch (err) {
            toast.error("Failed to add Datas")
        }
        finally
        {
            setLoading(false)
        }
    }
    return (
        <>
            <div className='w-full flex justify-end'>
                <Button onClick={() => { navigate(-1) }} variant='outline' className=''>Back</Button>
            </div>
            <div className='w-full h-full flex justify-center items-center'>

                <div className="w-full max-w-md  rounded-xl bg-white px-5 py-10">

                    <label className='h-64 sm:h-72 md:h-80  rounded-xl border-2 border-black border-dashed bg-grey hover:cursor-pointer  hover:border-blue-500 hover:bg-blue-50 flex flex-col justify-center items-center'>
                        <p className='text-4xl'>+</p>
                        Click to upload CSV file
                        <input type="file" onChange={handleFile} className='hidden' />
                    </label>

                    <br />
                    <span className='font-medium text-gray-500'>
                        <div className='flex w-full items-center justify-center'>
                            <File className='w-5 h-5' />{file ? file.name : <p>No file Selected</p>}</div>

                    </span>
                    <Button type='button' className='bg-primary w-full mt-4 ' onClick={handleUpload}>{loading?"uploading":"Upload"}</Button>
                </div>
            </div>
        </>
    )
}

export default BulkUploadProduct