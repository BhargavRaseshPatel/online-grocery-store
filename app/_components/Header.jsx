"use client"
import { Button } from '@/components/ui/button'
import { CircleUserIcon, LayoutGrid, Search, ShoppingBag, ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import GlobalApi from '../_utils/GlobalApi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UpdateCartContext } from '../_context/UpdateCart'
import CartItemList from './CartItemList'
import { toast } from 'sonner'


function Header() {

    const [categoryList, setCategoryList] = useState([])
    const isLogIn = sessionStorage.getItem('jwt') ? true : false
    const { updateCart, setUpdateCart } = useContext(UpdateCartContext)
    const [cardItemList, setCardItemList] = useState([])
    const router = useRouter()
    const jwt = sessionStorage.getItem('jwt')
    const [totalCartItems, setTotalCartItems] = useState(0)
    const user = JSON.parse(sessionStorage.getItem('user'))

    useEffect(() => {
        getCategoryList()
    }, [])

    useEffect(() => {
        getCartItems()
    }, [updateCart])

    const getCategoryList = () => {
        GlobalApi.getCategory().then((res) => {
            console.log(res.data.data)
            setCategoryList(res.data.data)
        })
    }

    const getCartItems = async () => {
        const cardItemList_ = await GlobalApi.getCartItems(user.id, jwt)
        console.log(cardItemList_)
        setTotalCartItems(cardItemList_?.length)
        setCardItemList(cardItemList_)
    }

    const onDeleteItem = (id) => {
        GlobalApi.deleteCartItem(id, jwt).then(resp => {
            toast("Item Removed!")
            getCartItems()
        })
    }

    const SignOut = () => {
        sessionStorage.clear()
        router.push('/sign-in')
    }
    return (
        <div className='p-5 flex shadow-md justify-between'>
            <div className='flex items-center gap-8'>
                <Link href={'/'}><Image src="/logo.svg" alt="Logo" width={150} height={100} /></Link>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <h2 className='hidden md:flex gap-2 border rounded-full p-2 px-10 bg-slate-200 cursor-pointer'>
                            <LayoutGrid className='h-5 w-5' /> Category</h2>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {categoryList.map((category, index) => (
                            <Link href={'/product-category/' + category.attributes.name} key={index}>
                                <DropdownMenuItem key={index} className="flex items-center gap-4 cursor-pointer">
                                    <Image src={process.env.NEXT_PUBLIC_BACKEND_URL + category?.attributes?.icon?.data[0]?.attributes?.url} unoptimized={true} alt='icon' width={30} height={30} />
                                    <h2 className='text-lg'>{category?.attributes?.name}</h2>
                                </DropdownMenuItem>
                            </Link>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className='md:flex gap-3 items-center border rounded-full p-2 px-5 hidden'>
                    <Search />
                    <input type="text" placeholder="Search" className='outline-none' />
                </div>
            </div>
            <div className='flex gap-5 items-center'>


                <Sheet>
                    <SheetTrigger>
                        <h2 className='flex gap-2 items-center text-lg'>
                            <ShoppingBasket className='h-7 w-7' />
                            <span className='bg-primary text-white px-2 rounded-full'>{totalCartItems}</span></h2>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle className='bg-primary text-white font-bold text-lg p-2'>My Cart</SheetTitle>
                            <SheetDescription>
                                <CartItemList cardItemList={cardItemList} onDeleteItem={onDeleteItem} />
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>



                {!isLogIn ? <Link href={'/sign-in'}><Button>LogIn</Button></Link> :
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <CircleUserIcon className='h-10 w-10 rounded-full bg-green-100 text-primary p-1' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>My Order</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => SignOut()}>Log Out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </div>
        </div>
    )
}

export default Header