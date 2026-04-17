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
function CreateValue({refreshValue,id,name}) {
  const [valuename, setValuename] = useState("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  async function handleCreate(e) {
    e.preventDefault()
    if (!valuename.trim()) {
      toast.error('Field is empty')
      return;
    }
    try {
      setLoading(true)
      const res = await api.post(`attributes/createValue`,
        { attribute_id:id ,value:valuename })
      if (res.status == 201) {
        toast.success("Category Created")
        setValuename("");
        setOpen(false);
        refreshValue()
      }
    }
    catch (err) {
      toast.error("Failed to create category")
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
          <Button className=' rounded-sm p-3'><span className="text-xl">+</span> Add Value</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleCreate}>
            <DialogHeader>
              <DialogTitle>Add  Value</DialogTitle>
              <DialogDescription>
                Create a Values for {name}
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label >Value Name </Label>
                <Input value={valuename} placeholder='e.g Rare Vintage' onChange={((e) => setValuename(e.target.value))} />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button type='button' onClick={() => setValuename("")} disabled={loading} >Cancel</Button>
              </DialogClose>
              <Button type="submit">{loading?"Creating":"Create"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>

  )
}

export default CreateValue



