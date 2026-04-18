import { useEffect, useState } from "react"
import api from "@/api/axios"
import { toast } from "react-toastify"
import { NavLink } from "react-router-dom";


function CreateProduct() {
    const [catdata, setCatdata] = useState([]);
    const [loading, setLoading] = useState(false);

    const [prodname, setProdname] = useState({
        name: "",
        brand: "",
        description: "",
        categoryId: ""
    })
    const { name, brand, description, categoryId } = prodname;
    function handleChange(e) {
        setProdname({ ...prodname, [e.target.name]: e.target.value })
    }
    async function getData() {
        try {
            const res = await api.get(`/categories/get`)
            const data = res.data.categories
            setCatdata(data)
        }
        catch (err) {
            console.log("error", err.message)
        }
    }
    function resetValues() {
        prodname.name = "",
            prodname.brand = "",
            prodname.description = "",
            prodname.categoryId = ""
    }
    async function handleSubmit(e) {
        e.preventDefault()
        try {

            console.log("cliked");
            if (name.trim() != "" && brand.trim() != "" && description != "" && categoryId.trim() != "") {
                setLoading(true);
                const res = api.post('products/create', {
                    productName: name, brand, description, category_id: categoryId
                })
                resetValues()
                toast.success("Product Created Successfully")
            }
            else {
                toast.error("All fields are required", {
                    style: { marginTop: "100px" }
                })
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Product creation failed")
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between">
                <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Create Product</h1>
                <NavLink to="/admin/products/viewProduct" className="px-4 py-2 h-fit rounded-lg bg-primary text-white font-medium 
                hover:bg-primary/90 transition duration-200 shadow-sm"
                >
                    View Products
                </NavLink>            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-5xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium mb-2">Product Name</label>
                        <input name="name" placeholder="Enter product name" value={prodname.name} onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Brand</label>
                        <input name="brand" placeholder="Enter brand name" value={prodname.brand} onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-500" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea name="description" placeholder="Enter product description" value={prodname.description} onChange={handleChange} rows="4"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-500" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select name="categoryId" value={prodname.categoryId} onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-base bg-white focus:outline-none focus:ring-0 focus:border-gray-400">
                            <option value="">Select category</option>
                            {
                                catdata.length > 0 ?
                                    catdata.map(data => (<option key={data.id} value={data.id}>{data.name}</option>))
                                    :
                                    <option value="">No data</option>
                            }
                        </select>
                    </div>
                </div>
                <div className="pt-2">
                    <button type="submit" className="w-full sm:w-auto bg-primary text-white px-8 py-2 rounded-md transition hover:opacity-90">
                        {loading ? "Creating" : "Create Product"}
                    </button>
                </div>
            </form>
        </div>

    )
}

export default CreateProduct



