"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProductItemDetails from './ProductItemDetails'


function ProductItem({ product }) {

  return (
    <div className='p-2 md:p-6 flex flex-col items-center justify-center gap-3 rounded-lg border hover:scale-105 cursor-pointer hover:shadow-md transition-all ease-in-out'>
      <Image src={process.env.NEXT_PUBLIC_BACKEND_URL + product?.attributes?.images?.data[0]?.attributes?.url}
        alt={product.attributes.name} width={500} height={200} className='w-[200px] h-[200px]' />
      <h2 className='font-bold text-lg'>{product?.attributes?.name}</h2>
      <div className='flex gap-3'>
        {product.attributes.sellingPrice && <h2 className='font-bold text-lg'>${product?.attributes?.sellingPrice}</h2>}
        <h2 className={`font-bold text-lg ${product.attributes.sellingPrice && 'line-through text-gray-500'}`}>${product?.attributes?.mrp}</h2>
      </div>
      <Dialog >
        <DialogTrigger asChild><Button variant="outline" className="text-primary hover:text-white hover:bg-primary">Add to cart</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <ProductItemDetails product={product}/>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default ProductItem