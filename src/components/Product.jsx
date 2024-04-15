import { Link } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import {VITE_BACKEND_URI} from '../App'

const Product = (props) => {
    const {product, getProducts} = props
    const deleteProduct = async (id) => {
        const result = await Swal.fire({
            title: 'Do you really want to delete the product?',
            showCancelButton: true,
            icon: 'warning',
            confirmButtonText: 'Yes, delete it',
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6'
          })
        if(result.isConfirmed) {
            try{
                const response = await axios.delete(`${VITE_BACKEND_URI}/api/product/${id}`)
                toast.success(`Deleted a product ${product.name} successfully`)
                getProducts()
            } catch(error) {
                toast.error(error)
            }
        }
    }

    return(
        <div className="bg-white rounded shadow-lg overflow-hidden">
            <img src={product.image} className="w-full h-28 object-cover"></img>
            <div className="px-4 pt-2 pb-4">
                <h2 className="text font-semibold">{product.name}</h2>
                <div className="text-sm">Quantity: {product.quantity}</div>
                <div className="text-sm">Price: {product.price}</div>
                <div className="mt-2 flex gap-4">
                    <Link to={`/edit/${product._id}`} className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer">Edit</Link>
                    <button onClick={() => {deleteProduct(product._id)} }
                        className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Product