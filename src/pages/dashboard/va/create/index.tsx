import { Inter } from 'next/font/google'
import { useRouter } from "next/router";
import Link from 'next/link';
import { useAuth } from '@/contexts/auth';
import { useForm } from 'react-hook-form';
import React from 'react';
import {
    Text,
    Input,
    Button,
    Box,
    useToast
  } from '@chakra-ui/react'
import axios from 'axios';


const inter = Inter({ subsets: ['latin'] })

//render VA creation form

export default function Home() {
    const { authState: { token }, logout } = useAuth()
    const router = useRouter()
    const toast = useToast()
    const { register, handleSubmit, formState: { errors } } = useForm()

    React.useEffect(() => {
        if (!token) {
            router.push("/auth")
        }
    }, [router, token])

    const onSubmit = (data: any) => {
        //submit form to backend in process.env.NEXT_PUBLIC_BASE_API_URL
        //use toast to display success message
        axios.post(process.env.NEXT_PUBLIC_BASE_API_URL+ "/transaction/virtual-account/", {
            name: data.name,
            amount: data.amount,
            price: data.price,
            notes: data.notes
        }).then((res) => {
            console.log(res);
            toast({
                title: "VA Created.",
                description: "Your VA has been created.",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
        }, (error) => {
            console.log(error);
            toast({
                title: "VA Creation Failed.",
                description: "Your VA has not been created.",
                status: "error",
            })
        })
    };
    
    return (
        <main className={`flex min-h-screen flex-col items-center justify-center p-24 space-y-6 ${inter.className}`}>
            <Box maxW="md" mx="auto" mt={8} borderWidth="1px" borderRadius="lg" p={8}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>Create New Virtual Account</Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col justify-center space-y-2">
                        <label htmlFor="name">Name</label>
                        <Box mb={4}>
                            <Input type="text" id="name" {...register("name", { required: true })} />
                        </Box>
                        {errors.name && <Text color="red.500">This field is required</Text>}
                    </div>
                    <div className="flex flex-col justify-center space-y-2">
                        <label htmlFor="amount">Amount</label>
                        <Box mb={4}>
                            <Input type="number" id="amount" {...register("amount", { required: true })} />
                        </Box>
                        {errors.amount && <Text color="red.500">This field is required</Text>}
                    </div>
                    <div className="flex flex-col justify-center space-y-2">
                        <label htmlFor="price">Price</label>
                        <Box mb={4}>
                            <Input type="number" id="price" {...register("price", { required: true })} />
                        </Box>
                        {errors.price && <Text color="red.500">This field is required</Text>}
                    </div>
                    <div className="flex flex-col justify-center space-y-2">
                        <label htmlFor="notes">Notes</label>
                        <Box mb={4}>
                            <Input type="text" id="notes" {...register("notes", { required: true })} />
                        </Box>
                        {errors.notes && <Text color="red.500">This field is required</Text>}
                    </div>
                    <Button type="submit" marginTop={4} colorScheme="blue">Create</Button>
                </form>
                </Box>
        </main>
    )
}


