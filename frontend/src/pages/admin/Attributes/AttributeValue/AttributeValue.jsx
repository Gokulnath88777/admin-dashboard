import api from '@/api/axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CreateValue from './CreateValue';
import EditAttributeValue from './EditAttributeValue';
import {FaTrash}from 'react-icons/fa'
import { toast } from 'react-toastify';
function AttributeValue() {


    const [name, setName] = useState(null)
    const [value, setValue] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    const { id } = useParams()

    async function getValue() {
        try {
            const res = await api.get(`attributes/getValue/${id}`)
            setName(res.data.name)
            setValue(res.data.values);
            setLoading(false)
        }
        catch (error) {
            console.log(error.response.message);
        }
    }
     async function handleDelete(id, name ) {
        console.log(id);
        try {
            let result = confirm(`Are you sure you want to delete ${name} value  `)
            if (result) {

                const res = await api.delete(`attributes/deleteValue/${id}`)
                if (res.status === 200) {
                    toast.success('Value deleted');
                    getValue()
                }
            }
        }
        catch (err) {
            console.log(err.message);
            toast.error('Deletion failed')
        }
    }
    useEffect(() => {
        getValue()
    }, [])
    console.log(id);
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    {name} Attribute Values
                </h1>
                <div className='flex gap-3'>
                <CreateValue refreshValue={getValue} id={id} name={name}></CreateValue>
                <Button variant="outline" onClick={() => navigate(-1)}>
                    Back
                </Button>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Values List</CardTitle>
                </CardHeader>

                <CardContent>

                    {loading ? (
                        <p className="text-muted-foreground">Loading values...</p>
                    ) : value.length > 0 ? (

                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            {value.map((data) => (
                                <div
                                    key={data.id}
                                    className="flex items-center justify-between border rounded-xl p-4 hover:shadow-md transition">
                                    <p className="font-medium">{data.value}</p>

                                    <div className="flex gap-2">
                                        <EditAttributeValue refreshAttributeValue={getValue} name={data.value} id={data.id} ></EditAttributeValue>
                                        <Button size="sm" variant="destructive" onClick={()=>{handleDelete(data.id,data.value) }}>
                                            <FaTrash/>
                                        </Button>
                                    </div>
                                </div>
                            ))}

                        </div>
                    ) : (
                        <div className="text-center py-10 text-muted-foreground">
                            No attribute values found
                        </div>
                    )}

                </CardContent>
            </Card>

        </div>
    );
}

export default AttributeValue