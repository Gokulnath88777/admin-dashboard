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
function CreateCategories({refreshCategories}) {
  const [catname, setCatname] = useState("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  async function handleCreate(e) {
    e.preventDefault()
    if (!catname.trim()) {
      toast.error('Field is empty')
      return;
    }
    try {
      setLoading(true)
      const res = await api.post(`categories/create`,
        { name: catname })
      if (res.status == 201) {

        toast.success("Category Created")
        setCatname("");
        setOpen(false);
        refreshCategories()
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
          <Button className=' rounded-sm p-3'><span className="text-xl">+</span> Add Category</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleCreate}>
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <DialogDescription>
                Create a new organizational tier for you catelog
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label >Category Name</Label>
                <Input value={catname} placeholder='e.g Rare Vintage' onChange={((e) => setCatname(e.target.value))} />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button type='button' onClick={() => setCatname("")} disabled={loading} >Cancel</Button>
              </DialogClose>
              <Button type="submit">{loading?"Creating":"Create"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>

  )
}

export default CreateCategories



