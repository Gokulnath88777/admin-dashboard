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

function CreateAttributes({refreshAttributes}) {
  const [atrname,setAtrname]=useState("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  async function attributeCreate(e) {
    e.preventDefault()
    if (!atrname.trim()) {
      toast.error('Field is empty')
      return;
    }
    try {
      setLoading(true)
      const res = await api.post(`attributes/create`,
        { name:atrname })
      if (res.status == 201) {

        toast.success("Attribute Created")
        setAtrname("");
        setOpen(false);
        refreshAttributes()
      }
    }
    catch (err) {
      toast.error("Failed to create attribute")
      console.log(err.message)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className=' rounded-sm p-3'><span className="text-xl">+</span> Add Attributes</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={attributeCreate}>
            <DialogHeader>
              <DialogTitle >Add Attributes</DialogTitle>
              <DialogDescription>
                Create a new Attributes for your prodcut
              </DialogDescription>
            </DialogHeader>
            <FieldGroup className='mt-2'>
              <Field>
                <Label >Attribute Name</Label>
                <Input placeholder='e.g Color' value={atrname} onChange={(e)=>{setAtrname(e.target.value)}} />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button type='button'   disabled={loading} >Cancel</Button>
              </DialogClose>
              <Button type="submit">{loading?"Creating":"Create"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>

  )
}

export default CreateAttributes



