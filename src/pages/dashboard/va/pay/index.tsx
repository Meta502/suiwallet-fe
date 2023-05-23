import { Inter } from 'next/font/google'
import { useRouter } from "next/router";
import Link from 'next/link';
import { useAuth } from '@/contexts/auth';
import { set, useForm } from 'react-hook-form';
import { useState } from 'react';
import React from 'react';
import {
  Text,
  Input,
  Button,
  Box,
  useToast
} from '@chakra-ui/react'
import axios from 'axios';
import useSWR from "swr";

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const { authState: { token }, logout } = useAuth()
  const router = useRouter()
  const toast = useToast()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const [confirmationData, setConfirmationData] = useState<any>(null);
  const [error, setError] = useState('');

  const { data: accountData }: any = useSWR(token ? `${process.env.NEXT_PUBLIC_BASE_API_URL}/cores/account/` : null, (url: string) => fetch(url, {
    headers: {
      "Authorization": `Token ${token}`
    }
  }).then(res => res.json()))


  React.useEffect(() => {
    if (!token) {
      router.push("/auth")
    }
  }, [router, token])

  const handlePayment = async (data: any) => {
    //submit a PUT request to backend in process.env.NEXT_PUBLIC_BASE_API_URL/transaction/virtual-account/{vaId}
    //render the payment confirmation page with the response
    //confirm payment
    //use toast to display success message
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + "/transaction/virtual-account/" + data.vaId + "/", {
        headers: {
          Authorization: `Token ${token}`
        }
      })

      if (!res.data) {
        return toast({
          title: "VA Not Found",
          description: "Please check your VA payment code",
          status: "error"
        })
      }

      if (res.data.status === "PAID" || res.data.status === "WITHDRAWED") {
        return toast({
          title: "VA has already been paid/withdrawed",
          description: "Please enter another VA payment code",
          status: "error",
        })
      }

      setConfirmationData(res.data);
    } catch (e: any) {
      setError(e.response.data.message);
      toast({
        title: "VA Payment Failed.",
        description: "Your VA has not been paid.",
        status: "error",
        isClosable: true,
      })
    }
  }

  const handleConfirmPayment = async () => {
    axios.put(process.env.NEXT_PUBLIC_BASE_API_URL + "/transaction/virtual-account/" + confirmationData.paymentCode + "/", {}, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
      .then((res) => {
        toast({
          title: "Successfully Paid VA",
          description: "You have successfully paid to this VA",
          status: "success",
          isClosable: true,
        })
      })
  }


  return (
    <>
      <main className={`flex min-h-screen flex-col p-8 md:p-24 space-y-6 ${inter.className}`}>
        <div className='flex flex-col gap-y-8 md:flex-row md:justify-between'>
          <div className='flex flex-col md:flex-row gap-x-4 gap-y-4'>
            <Button colorScheme='blue' variant='ghost' className='gap-x-2 items-center' onClick={() => { router.back() }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-1 stroke-sky-800">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
              </svg>
              <p>Go Back</p>
            </Button>
            <h1 className='text-3xl font-bold text-sky-600'>Pay With Virtual Account</h1>
          </div>
        </div>
        <Box mx="auto" mt={8} borderWidth="1px" borderRadius="lg" p={8}>
          <form onSubmit={handleSubmit(handlePayment)}>
            <div className="flex flex-col justify-center space-y-2 py-2">
              <label htmlFor="va-number">VA Number</label>
              <Box mb={4}>
                <Input type="text" id="va-number" {...register("vaId", { required: true })} />
              </Box>
              {errors.name && <Text color="red.500">This field is required</Text>}
            </div>
            <Button type="submit" marginTop={4} colorScheme="blue">Pay</Button>
          </form>
        </Box>

        {confirmationData && (
          <Box mx="auto" mt={8} borderWidth="1px" borderRadius="lg" p={8}>
            <div className="flex flex-col justify-center space-y-2 py-2">
              <label htmlFor="id">ID</label>
              <Box mb={4}>
                <Input type="text" id="id" value={confirmationData.id} disabled />
              </Box>
            </div>
            <div className="flex flex-col justify-center space-y-2 py-2">
              <label htmlFor="payment_code">Payment ID</label>
              <Box mb={4}>
                <Input type="text" id="payment_code" value={confirmationData.paymentCode} disabled />
              </Box>
            </div>
            <div className="flex flex-col justify-center space-y-2 py-2">
              <label htmlFor="amount">Amount</label>
              <Box mb={4}>
                <Input type="text" id="amount" value={new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(confirmationData.amount)} disabled />
              </Box>
            </div>
            <div className="flex flex-col justify-center space-y-2 py-2">
              <label htmlFor="remaining_balance">Remaining Balance</label>
              <Box mb={4}>
                <Input type="text" id="remaining_balance" value={new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(accountData?.balance)} disabled />
              </Box>
            </div>
            <Button type="submit" marginTop={4} colorScheme="blue" onClick={handleConfirmPayment}>Pay</Button>
          </Box>
        )}
      </main>
    </>
  )
}




