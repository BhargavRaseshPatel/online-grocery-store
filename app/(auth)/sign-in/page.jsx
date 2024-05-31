"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function SignIn() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const router = useRouter()
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        const jwt = sessionStorage.getItem('jwt')
        if (jwt) {
            router.push('/')
        }
    })

    const onSignIn = () => {
        setLoader(true)
        GlobalApi.SignIn(email, password).then((response) => {
            console.log(response.data.user)
            console.log(response.data.jwt)
            sessionStorage.setItem('user', JSON.stringify(response.data.user))
            sessionStorage.setItem('jwt', response.data.jwt)
            toast("LogIn successfully")
            router.push('/')
            setLoader(false)
        }).catch((error) => {
            console.log(error)
            toast(error?.response?.data?.error?.message)
            setLoader(false)
        })
    }
    return (
        <div className='flex items-baseline justify-center my-10'>
            <div className='flex flex-col items-center justify-center border p-10'>
                <Image src='/logo.jpg' width={200} height={150} alt='logo' />
                <h2 className='font-bold text-3xl'>Sign In to Account</h2>
                <h2 className='text-gray-500'>Enter your Email and Password to Sign In</h2>
                <div className='w-full flex flex-col gap-5 mt-7'>
                    <Input placeholder='Email' onChange={(value => setEmail(value.target.value))} />
                    <Input placeholder='Password' type="password" onChange={(value => setPassword(value.target.value))} />
                    <Button disabled={!(password && email)} onClick={() => onSignIn()}>{loader ? <LoaderIcon className='animate-spin'/>: 'Sign In'}</Button>
                    <p>Don't have an account. <Link className='text-blue-500' href={'/create-account'}>Click here to create an new account</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignIn