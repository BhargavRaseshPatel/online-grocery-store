"use client"
import { Button } from '@/components/ui/button'
import { LoaderCircle, LoaderIcon, ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import { toast } from 'sonner'
import { UpdateCartContext } from '../_context/UpdateCart'

function ProductItemDetails({ product }) {

    const jwt = sessionStorage.getItem('jwt')
    const user = JSON.parse(sessionStorage.getItem('user'))
    const {updateCart, setUpdateCart} = useContext(UpdateCartContext)
    const [productTotalPrice, setProductTotalPrice] = useState(
        product.attributes.sellingPrice ? product.attributes.sellingPrice : product.attributes.mrp)
    const [quantity, setQuantity] = useState(1)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const addToCart = () => {
        setLoading(true)
        if (!jwt) {
            router.push('/sign-in')
            setLoading(false)
            return
        }

        const data = {
            data: {
                quantity: quantity,
                amount: (quantity * productTotalPrice).toFixed(2),
                products: product.id,
                users_permissions_user: user.id,
                userId: user.id
            }
        }
        console.log(data)
        GlobalApi.addToCart(data, jwt).then((res) => {
            console.log(res)
            toast('Product added to cart successfully')
            setUpdateCart(!updateCart)
            
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            toast("Error while adding product to cart")
            setLoading(false)
        })
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black'>
            <Image src={process.env.NEXT_PUBLIC_BACKEND_URL + product?.attributes?.images?.data[0]?.attributes?.url}
                alt='image' width={300} height={300} className='bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg' />
            <div className='flex flex-col gap-3'>
                <h2 className='text-2xl font-bold'>{product.attributes.name}</h2>
                <h2 className='text-sm text-gray-500'>{product.attributes.description}</h2>
                <div className='flex gap-3'>
                    {product.attributes.sellingPrice && <h2 className='font-bold text-3xl'>${product?.attributes?.sellingPrice}</h2>}
                    <h2 className={`font-bold text-3xl ${product.attributes.sellingPrice && 'line-through text-gray-500'}`}>${product?.attributes?.mrp}</h2>
                </div>
                <h2 className='font-medium text-lg'>Quantity ({product.attributes.itemQuantityType})</h2>
                <div className='flex flex-col items-baseline gap-3'>
                    <div className='flex gap-3 items-center'>
                        <div className='flex p-2 gap-10 border items-center px-5'>
                            <button disabled={quantity == 1} onClick={() => setQuantity(quantity - 1)}>-</button>
                            <h2>{quantity}</h2>
                            <button onClick={() => setQuantity(1 + quantity)}>+</button>
                        </div>
                        <h2 className='text-2xl font-bold'> = ${(quantity * productTotalPrice).toFixed(2)}</h2>
                    </div>
                    <Button disabled={loading} className="flex gap-3" onClick={() => addToCart()}>
                        <ShoppingBasket />{loading ? <LoaderCircle className='animate-spin'/>: 'Add to cart'}
                    </Button>
                </div>
                <p><span>Category: </span>{product.attributes.categories.data[0].attributes.name}</p>
            </div>
        </div>
    )
}

export default ProductItemDetails