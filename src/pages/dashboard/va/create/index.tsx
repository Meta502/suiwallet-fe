import { Inter } from 'next/font/google'
import { useRouter } from "next/router";
import Link from 'next/link';
import { useAuth } from '@/contexts/auth';
import { useForm } from 'react-hook-form';
import { useBoolean } from '@chakra-ui/hooks';
import React from 'react';
import {
    Text,
    Input,
    Button,
    Box,
    useToast,
    Switch,
    FormControl,
  } from '@chakra-ui/react'
import axios from 'axios';


const inter = Inter({ subsets: ['latin'] })

//render VA creation form

export default function Home() {
    const { authState: { token }, logout } = useAuth()
    const router = useRouter()
    const toast = useToast()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [recurring, setRecurrinng] = useBoolean()

    React.useEffect(() => {
        if (!token) {
            router.push("/auth")
        }
    }, [router, token])


    const onSubmit = (data: any) => {
        //submit form to backend in process.env.NEXT_PUBLIC_BASE_API_URL
        //use toast to display success message
        axios.post(process.env.NEXT_PUBLIC_BASE_API_URL+ "/transaction/virtual-account/", {
            title: data.title,
            transaction_amount: data.transaction_amount,
            price: data.price,
            description: data.description,
            recurring: data.recurring
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
                    <div className="flex flex-col justify-center space-y-2 py-2">
                        <label htmlFor="title">Title</label>
                        <Box mb={4}>
                            <Input type="text" id="title" {...register("title", { required: true })} />
                        </Box>
                        {errors.title && <Text color="red.500">This field is required</Text>}
                    </div>
                    <div className="flex flex-col justify-center space-y-2 py-2">
                        <label htmlFor="transaction-amount">Transaction Amount</label>
                        <Box mb={4}>
                            <Input type="number" id="transaction-amount" {...register("transaction_amount", { required: true })} />
                        </Box>
                        {errors.transaction_amount && <Text color="red.500">This field is required</Text>}
                    </div>
                    <div className="flex flex-col justify-center space-y-2">
                        <label htmlFor="price">Price</label>
                        <Box mb={4}>
                            <Input type="number" id="price" {...register("price", { required: true })} />
                        </Box>
                        {errors.price && <Text color="red.500">This field is required</Text>}
                    </div>
                    <div className="flex flex-col justify-center space-y-2 py-2">
                        <label htmlFor="description">Description</label>
                        <Box mb={4}>
                            <Input type="text" id="description" {...register("description", { required: true })} />
                        </Box>
                        {errors.description && <Text color="red.500">This field is required</Text>}
                    </div>
                    <FormControl display='flex' alignItems='center' my={2} className='space-x-4'>
                            <label htmlFor="recurring" className='font-bold'>Recurring</label>
                            <Switch id="recurring" {...register("recurring")} />
                    </FormControl>
                    <Button type="submit" marginTop={4} colorScheme="blue">Create</Button>
                </form>
                </Box>
        </main>
    )
}


