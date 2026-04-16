import api from '@/api/axios';
import  { useEffect, useState } from 'react'

function AttributePage() {

const [attributes,setAttributes]=useState([]);

async function getAttribute() {
    const res=await api.get('/attributes/get')
    const data=res.data.attributes;
    setAttributes(data);

}
useEffect(()=>
{
    getAttribute();
},[])
  return (
    <>
    <div>Attributes</div>
    {
        attributes.length>0?attributes.map(
            (data)=>
            {

                return (
                    <div>
                        <p>{data.name}</p>
                    </div>
                )
            }
        ):<p>No Data</p>
    }
    </>
  )
}

export default AttributePage