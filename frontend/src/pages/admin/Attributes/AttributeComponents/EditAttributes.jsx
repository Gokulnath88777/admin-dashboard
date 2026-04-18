import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { useState } from "react"
import api from "@/api/axios"
import { toast } from "react-toastify"
import { FaEdit } from "react-icons/fa"


function EditAttributes({ refreshAttributes, name, id }) {


    const [uptname, setUptname] = useState(name)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    async function handleUpdate(e) {
        console.log("Clicked")
        console.log("id",id)
        e.preventDefault();
        console.log("uptname",uptname)

        if (!uptname.trim()) {
            toast.error("Field is Empty")
            return;
        }

        try {
            if (uptname != name) {
                setLoading(true);
                const res = await api.patch(`attributes/update/${id}`, { updatedName: uptname })
                console.log("uptname")
                if (res.status === 200) {
                   
                    toast.success("Updated Successfully")
                    setOpen(false);
                    refreshAttributes();
                }
            }
            else {
                console.log("else")
                toast.error("Update value is requried")
            }


        }

        catch (err) {
            console.log(err);
            console.log(err.response.data.message);
            toast.error("Failed to update ")

        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen} >
                <DialogTrigger asChild>
                    <Button className=' rounded-sm p-3' size="sm" variant="outline"><FaEdit/></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <form onSubmit={handleUpdate}>
                        <DialogHeader>
                            <DialogTitle className='font-bold'>Update Attribute</DialogTitle>
                        </DialogHeader>
                        <FieldGroup className='mt-2'>
                            <Field>
                                <Label>Attribute Name</Label>
                                <Input value={uptname} onChange={(e) => setUptname(e.target.value)} />
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type='button' >Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={loading}>{loading ? "Updating" : "Update"}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default EditAttributes