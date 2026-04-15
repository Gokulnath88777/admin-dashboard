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
function Categories() {
  const [catname, setCatname] = useState("")
  const [loading,setLoading]=useState(false)
  const [open,setOpen]=useState(false)
  async function handleCreate(e) {
    e.preventDefault()
    if( !catname.trim())
    {
      toast.error('Field is empty')
      return;
    }
    try {
      setLoading(true)
      const res = await api.post(`categories/create`,
        { name: catname })
      toast.success("Category Created")
      setCatname("");
      setOpen(false);
    }
    catch (err) {
      toast.error("Failed to create category")
      console.log(err.message)
    }
    finally
    {
      setLoading(false)
    }
  }

  return (
    <>
      <div>Create Categories</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button >Add Categories</Button>
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
                <Button type='button' onClick={()=>setCatname("")} >Cancel</Button>
              </DialogClose>
              <Button type="submit">Create Category</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>

  )
}

export default Categories



