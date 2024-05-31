"use client"
import React, { useEffect } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'


function Sliders({ sliderList }) {

    useEffect(() => {
        console.log(sliderList)
    }, []);
    return (
        <Carousel>
            <CarouselContent>
                {sliderList.map((slider, index) => (
                    <CarouselItem key={index}>
                        <Image src={process.env.NEXT_PUBLIC_BACKEND_URL + slider?.attributes?.image?.data[0]?.attributes?.url} width={1100} height={400} className='w-full h-[200px] md:h-[400px] object-cover rounded-2xl' alt='slider' />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

    )
}

export default Sliders