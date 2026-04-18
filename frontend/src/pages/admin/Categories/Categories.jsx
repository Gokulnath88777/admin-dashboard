import api from '@/api/axios'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import CreateCategories from './CreateCategories'
import EditCategories from './EditCategories'
import { toast } from 'react-toastify'
import { FaTrash } from "react-icons/fa"
function Categories() {
    const [catdata, setCatdata] = useState([])
  async function getData()
    {
           try {
                const res = await api.get(`/categories/get`)
                const data = res.data.categories
                setCatdata(data)
            }
        catch (err) {
            console.log("error", err.message)
        }
    }

  
    async function handleDelete(id,name)
    {
        try
        {
            let result=confirm(`Are you sure you want to delete ${name}`)
            if(result)
            {

                const res=await api.delete(`/categories/delete/${id}`)
                if(res.status===200)
                {
                    toast.success('Category deleted');
                    getData();
                }
            }
        }
        catch(err)
        {
            console.log(err.message);
            toast.error('Deletion failed')
        }
    }
    useEffect(() => {
     getData();
    }, [])
    return(
        <>
           <div className='flex w-full justify-between p-2'>
            <h3 className='text-2xl font-semibold'>Categories</h3>
            <CreateCategories refreshCategories={getData}></CreateCategories>
            </div>
            {
                <div className="grid gap-4">
                    {catdata.length > 0 ? (
                        catdata.map((data) => (
                            <div
                                key={data.id}
                                className="flex items-center justify-between p-4 border rounded-xl shadow-sm hover:shadow-md transition bg-white"
                            >
                                <div>
                                    <p className="text-lg font-semibold">{data.name}</p>
                                    <p className="text-sm text-gray-500">
                                        Created: {new Date(data.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <EditCategories refreshCategories={getData} name={data.name} id={data.id}/>
                                    <Button size="sm" variant="destructive" onClick={()=>{handleDelete(data.id,data.name)}} type='button'>
                                       <FaTrash/>
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No Categories Found</p>
                    )}
                </div>
            }
        </>

    )
}

export default Categories