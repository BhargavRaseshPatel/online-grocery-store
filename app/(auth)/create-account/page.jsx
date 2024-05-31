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

function CreateAccount() {
    const [username, setUsername] = useState()
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

    const onCreateAccount = () => {
        setLoader(true)
        GlobalApi.registerUser(username, email, password).then((response) => {
            console.log(response.data.user)
            console.log(response.data.jwt)
            sessionStorage.setItem('user', JSON.stringify(response.data.user))
            sessionStorage.setItem('jwt', response.data.jwt)
            toast("Account created successfully")
            router.push('/')
            setLoader(false)
        }).catch((error) => {
            setLoader(false)
            toast(error?.response?.data?.error?.message)
        })
    }

  return (
    <div className='flex items-baseline justify-center my-10'>
        <div className='flex flex-col items-center justify-center border p-10'>
            <Image src='/logo.jpg' width={200} height={150} alt='logo' />
            <h2 className='font-bold text-3xl'>Create an Account</h2>
            <h2 className='text-gray-500'>Enter your Email and Password to create an account</h2>
            <div className='w-full flex flex-col gap-5 mt-7'>
                <Input placeholder='Username' onChange={(value => setUsername(value.target.value))}/>
                <Input placeholder='Email' onChange={(value => setEmail(value.target.value))}/>
                <Input placeholder='Password' type="password" onChange={(value => setPassword(value.target.value))}/>
                <Button disabled={!(username && password && email)} onClick={() => onCreateAccount()}>{loader?<LoaderIcon className='animate-spin'/>: 'Create an Account'}</Button>
                <p>Already have an account. <Link className='text-blue-500' href={'/sign-in'}>Click here to Sign-in</Link></p>
            </div>
        </div>
    </div>
  )
}

export default CreateAccount