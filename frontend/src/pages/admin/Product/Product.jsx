import api from '@/api/axios'
import { Card } from '@/components/ui/card';
import React, { useEffect, useState } from 'react'
import CreateProduct from './CreateProduct';
import { Button } from '@/components/ui/button';
import { NavLink, useNavigate } from 'react-router-dom';

function Product() {
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();
    async function getProduct() {
        const res = await api.get('/products/get')
        console.log(res.data.products);
        setProduct(res.data.products);
    }
    useEffect(() => {
        console.log("product");
        getProduct()
    }, [])
    return (
        <>
            <div className='flex justify-between p-3' >
                <h3 className='text-2xl font-bold'>Product List</h3>
                <Button variant="outline" className="w-full sm:w-auto hover:bg-primary hover:text-white transition" onClick={() => navigate(-1)}>Back</Button>  </div>
            <Card className="p-6 mt-2">
                {product.length > 0 ? (
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {product.map((data) => (
                            <Card key={data.id} className="p-5 shadow-md hover:shadow-xl transition duration-300 border rounded-xl">
                                <div className='flex justify-between'>
                                    <h2 className="text-lg font-semibold mb-3 text-primary">{data.productName}</h2>
                                    <NavLink to={`/admin/products/createVariant/${data.id}`} className="px-4 py-2 h-fit  rounded-lg bg-primary text-white font-medium 
                                    hover:bg-primary/90 transition duration-200 shadow-sm" >Create Variant</NavLink>                      
                                </div>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <p><span className="font-medium text-foreground">Brand:</span> {data.brand}</p>
                                    <p><span className="font-medium text-foreground">Category:</span> {data.category?.name}</p>
                                    <p><span className="font-medium text-foreground">Created By:</span> {data.admin?.name}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground py-10">No Products Found</p>
                )}
            </Card>
        </>
    )
}

export default Product