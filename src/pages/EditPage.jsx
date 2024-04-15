import React, {useState, useEffect} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import {VITE_BACKEND_URI} from '../App'

const EditPage = () => {
    let { id } = useParams()
    const [isLoading, setIsloading] = useState(false)
    const [product, setProduct] = useState({
        name: "",
        quantity: "",
        price: "",
        image: ""
    })

    useEffect(() => {
        getProduct();
    }, [])
    
    const navigator = useNavigate()
    const getProduct = async() => {
        setIsloading(true)
        try {
            const response = await axios.get(`${VITE_BACKEND_URI}/api/product/${id}`)
            console.log(response.data)
            setProduct(response.data)
            setIsloading(false)
        } catch(error) {
            setIsloading(false)
            toast.error(`cannot find product with given ID ${id}`)
        }
    }

    const updateProduct = async (e) => {
        e.preventDefault()
        try {
            setIsloading(true)
            const response = await axios.put(`${VITE_BACKEND_URI}/api/product/${id}`, product)
            let updatedProduct = response.data
            toast.success(`Updated product ${updatedProduct.name} successfully`)
            navigator('/')
            setIsloading(false)
        } catch(error) {
            setIsloading(false)
            toast.error(error);
        }
    }

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
        <h2 className="font-semibold text-2xl mb-4 block text-center">
            Update a Product
        </h2>
        { isLoading? ("Loading...") : (
            <form onSubmit={updateProduct}>
            <div className="space-y-2">
                <div>
                    <label>Name</label>
                    <input type="text" value={product.name} onChange={(e) => { setProduct({...product, name: e.target.value})}}
                        className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter a name"/>
                </div>
                <div>    
                    <label>Quantity</label>
                    <input type="number" value={product.quantity} onChange={(e) => {setProduct({...product, quantity:e.target.value})}}
                        className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter quantity"/>
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" value={product.price} onChange={(e) => {setProduct({...product, price:e.target.value})}}
                        className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter price"/>
                </div>
                <div>                   
                    <label>Image URL</label>
                    <input type="text" value={product.image} onChange={(e) => {setProduct({...product, image:e.target.value})}}
                        className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Image URL"/>
                </div>
                <div>
                    { !isLoading && (
                    <button 
                        className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Save</button>
                    )}
                </div>
            </div>
            </form>
        )}
    </div>
    )
}

export default EditPage