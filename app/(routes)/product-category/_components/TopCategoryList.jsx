import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function TopCategoryList({categoryList, selectedCategory}) {
  return (
    <div className='flex gap-5 mt-2 overflow-auto md:mx-20 justify-center'>
                {categoryList.map((category, index) => (
                    <Link href={'/product-category/'+category.attributes.name} key={index} 
                    className={`flex flex-col items-center bg-green-50 hover:bg-green-600 gap-2 p-3 rounded-lg group cursor-pointer
                    w-[150px] min-w-[100px] ${selectedCategory==category.attributes.name && 'bg-green-600 text-white'}`}>
                        <Image src={process.env.NEXT_PUBLIC_BACKEND_URL+category?.attributes?.icon?.data[0]?.attributes?.url} width={50} height={50} alt='icon'
                        className='group-hover:scale-125 transition-all ease-in-out'/>
                        <h2 className={`text-green-800 group-hover:text-white ${selectedCategory==category.attributes.name && 'text-white'}`}>{category.attributes.name}</h2>
                    </Link>
                ))}
            </div>
  )
}

export default TopCategoryList