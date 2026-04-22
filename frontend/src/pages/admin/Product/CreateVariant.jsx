import api from "@/api/axios";
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react";
import CreateAttributes from "../Attributes/AttributeComponents/CreateAttributes";
import CreateValue from "../Attributes/AttributeValue/CreateValue";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function CreateVariant() {
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributes, setSelectedAttribute] = useState([])
  const [attrValues, setAttrValues] = useState([])
  const [loading, setLoading] = useState(false);
  const { id } = useParams()
  let [variant, setVariant] = useState({
    sku_code: "",
    price: "",
    discount: "",
    stock: "",
    slcAttrValue: {}
  })

  const { sku_code, price, discount, stock } = variant


  async function getAttributes() {
    const res = await api.get('attributes/get')
    console.log(res);
    console.log(res.data);
    setAttributes(res.data)
  }

  const getValueByAttributes = async () => {
    try {
      if (selectedAttributes.length > 0) {

        const res = await api.get('/attributes/getByAttribute',
          {
            params:
            {
              ids: selectedAttributes.join(',')
            }

          })
        setAttrValues(res.data.attributeValue);
      }
      else {
        setAttrValues([])
      }
    }
    catch (err) {
      console.log("in attribute value");
      console.log(err);

    }
  }

  function handleChange(e) {
    setVariant({ ...variant, [e.target.name]: e.target.value })
  }
  function handleAttributes(e) {
    const id = e.target.value;
    setSelectedAttribute(prev =>
      prev.includes(id) ? prev.filter((prevId) => prevId != id) :
        [...prev, id]
    )
  }



  function handleAttributeValue(e, attributeId) {
    const valueId = Number(e.target.value);
    setVariant(prev => ({
      ...prev,
      slcAttrValue: {
        ...prev.slcAttrValue,
        [attributeId]: valueId
      }
    }));
  }
  function reset() {
    setVariant({
      sku_code: "",
      price: "",
      discount: "",
      stock: "",
      slcAttrValue: {}
    })
    setSelectedAttribute([])
    setAttrValues([])
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Clicked");
    try {
      setLoading(true);
      const attribute_value_ids = Object.values(variant.slcAttrValue)
      if (sku_code.trim() != "" && price.trim() != "" && discount.trim() != "" && stock != "" && attribute_value_ids.length > 0) {
        await api.post('products/createVariant',
          {
            product_id: id,
            sku_code,
            price,
            discount,
            stock,
            attribute_value_ids
          }
        )
        reset();
        toast.success('Variant Created Successfully');
      }
      else {
        toast.error("All fields are required")
      }
    }
    catch (err) {
      console.log(err);
      toast.error("Creation Failed")
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(
    () => {

      getValueByAttributes()
      setVariant(prev => {
        const uploadValues = { ...prev.slcAttrValue };
        Object.keys(uploadValues).forEach
          (attrId => {
            if (!selectedAttributes.includes(attrId)) {
              delete uploadValues[attrId]
            }
          }
          )
        return {
          ...prev,
          slcAttrValue: uploadValues
        }
      })

    }, [selectedAttributes])


  useEffect(() => {

    getAttributes();

  }, [])



  return (
    <Card className="min-h-full bg-white px-4 sm:px-6 lg:px-8 py-6">
      <form className="w-full max-w-5xl space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-2">SKU Code</label>
            <input name="sku_code" placeholder="Enter Product Code" value={variant.sku_code} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Price</label>
            <input name="price" type="number" placeholder="Enter Price" value={variant?.price} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Discount</label>
            <input name="discount" type="number" placeholder="Enter Discount" value={variant?.discount} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <input name="stock" type="number" placeholder="Enter Quantity" value={variant?.stock} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>
        <div className="border rounded-xl bg-white shadow-sm p-5">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Attribute Selection</h2>
            <CreateAttributes refreshAttributes={getAttributes}></CreateAttributes>
          </div>
          <div className="flex flex-wrap gap-3">
            {attributes.length > 0 ? attributes.map(data =>
              <label key={data.id} className="cursor-pointer">
                <input type="checkbox" value={data.id} onChange={handleAttributes}  className=" hidden" />
                <span
                  className="px-5 py-2 rounded-full border text-sm font-medium bg-gray-50  transition peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary">
                  {data.name}
                </span>
              </label>
            ) : <p className="text-sm text-gray-400">No Attributes Available</p>}
          </div>
        </div>
        <div className="border rounded-xl bg-white shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Attribute Values</h2>
          <div className="space-y-5">
            {attrValues.length > 0 ? attrValues.map(data =>
              <div key={data.id}>
                <div className="flex justify-between">
                  <p className="font-semibold uppercase  text-sm mb-3">{data.name}</p>
                  <CreateValue refreshValue={getValueByAttributes} id={data.id} name={data.name}></CreateValue>
                </div>

                <div className="flex flex-wrap gap-3">
                  {
                    <select
                      value={variant.slcAttrValue[data.id] || ""}
                      onChange={(e) => handleAttributeValue(e, data.id)}
                      className="w-full border mt-3 border-gray-300 rounded-md px-4 py-2 text-sm sm:text-base bg-white focus:outline-none focus:ring-0 focus:border-gray-400"
                    >
                      <option value="">Select category</option>
                      {
                        data.AttributeValues.length > 0 ?
                          data.AttributeValues.map(d => (<option key={d.id} value={d.id}>{d.value}</option>))
                          :
                          <option value="">No data</option>
                      }
                    </select>
                  }
                </div>

              </div>
            ) : <p className="text-sm text-gray-400">No Values</p>}
          </div>

        </div>
        <div className="pt-4">
          <button type="submit" className="bg-primary text-white px-8 py-2 rounded-md hover:opacity-90 transition">
            {
              loading ? "Creating" : "Create Product"
            }
          </button>
        </div>
      </form>
    </Card>
  )
}

export default CreateVariant

