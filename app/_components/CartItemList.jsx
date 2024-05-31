import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function CartItemList({ cardItemList, onDeleteItem }) {
    const [subtotal, setSubTotal] = useState(0)

    useEffect(() => {
        let total = 0;
        cardItemList.forEach(element => {
            total = element.amount + total
        })
        setSubTotal(total)
    }, [cardItemList])

    return (
        <div>
            <div className='h-[550px] overflow-auto '>
                {cardItemList.map((cart, index) => (
                    <div key={index} className='flex justify-between items-center p-2 mb-4'>
                        <div className='flex gap-6 items-center'>
                        <Image src={process.env.NEXT_PUBLIC_BACKEND_URL + cart.image} width={70} height={70} alt={cart.name}
                            className='border p-2' />
                        <div>
                            <h2 className='font-bold'>{cart.name}</h2>
                            <h2>Quantity {cart.quantity}</h2>
                            <h2 className='text-lg font-bold'>$ {cart.amount}</h2>
                        </div>
                        </div>
                        <TrashIcon className='cursor-pointer' onClick={() => onDeleteItem(cart.id)}/>
                    </div>
                ))}
            </div>
            <div className='absolute bottom-6 w-[90%] flex flex-col'>
                <h2 className='text-lg font-bold flex justify-between'>Subtotal <span>$ {subtotal.toFixed(2)}</span></h2>
                <Button>View Cart</Button>
            </div>
        </div>
    )
}

export default CartItemList