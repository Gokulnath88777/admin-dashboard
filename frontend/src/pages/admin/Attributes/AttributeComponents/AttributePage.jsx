import api from '@/api/axios';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { FaTrash } from "react-icons/fa"
import CreateAttributes from './CreateAttributes';
import EditAttributes from './EditAttributes';

function AttributePage() {

    const [attributes, setAttributes] = useState([]);
    async function getAttribute() {

        try {
            const res = await api.get('attributes/get')
            setAttributes(res.data);
        }
        catch (err) {
            console.log(err.message);
            toast("Something went wrong")
        }
    }
    async function handleDelete(id, name, count) {
        console.log(id);
        try {
            let result = confirm(`Are you sure you want to delete ${name}
              Attribute which has ${count} values  `)
            if (result) {

                const res = await api.delete(`attributes/delete/${id}`)
                if (res.status === 200) {
                    toast.success('Attribute deleted');
                    getAttribute()
                }
            }
        }
        catch (err) {
            console.log(err.message);
            toast.error('Deletion failed')
        }
    }
    useEffect(() => {
        getAttribute();
    }, [])


    return (
        <>
            <div className='flex w-full justify-between p-2'>
                <h3 className='text-2xl font-bold'>Attributes</h3>
                <CreateAttributes refreshAttributes={getAttribute}></CreateAttributes>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">

                        <thead>
                            <tr className="border-b bg-muted/40 text-sm text-muted-foreground">
                                <th className="p-4 font-semibold tracking-wide">Attribute</th>
                                <th className="p-4 font-semibold tracking-wide">Values</th>
                                <th className="p-4 font-semibold tracking-wide text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {attributes.map((data) => (
                                <tr
                                    key={data.id}
                                    className="border-b transition hover:bg-muted/50">

                                    <td className="p-4 font-medium capitalize text-gray-800">
                                        {data.name}
                                    </td>

                                    <td className="p-4">
                                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 border text-gray-700 shadow-sm">
                                            {data.value_count} values
                                        </span>
                                    </td>

                                    <td className="p-4 flex justify-center">
                                        <div className="flex justify-end items-center gap-2">

                                            <EditAttributes refreshAttributes={getAttribute} name={data.name} id={data.id}/>

                                            <Button size="sm" variant="destructive"className="hover:scale-[1.02] transition"
                                                onClick={() => handleDelete(data.id, data.name,data.value_count)}>
                                                <FaTrash />
                                            </Button>
                                            <Button asChild size="sm"variant="outline" className="hover:bg-primary hover:text-white transition" >
                                                <NavLink to={`/admin/attributes/attributeValue/${data.id}`}>
                                                    View Values
                                                </NavLink>
                                            </Button>

                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    )
}

export default AttributePage


