import { Inter } from 'next/font/google'
import { useAuth } from '@/contexts/auth'
import { useRouter } from "next/router";
import React from 'react';
import Link from 'next/link'

import { 
  Button,
  useToast,
} from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { authState: { token }, logout } = useAuth()
  const router = useRouter()
  const toast = useToast()

  React.useEffect(() => {
    if (!token) {
      router.push("/auth")
    }
  }, [router, token])

  const copyID = () => {
    toast({
        title: 'VA Number Copied',
        status: 'success',
        duration: 9000,
        position: 'top',
        isClosable: true,
      })
    }


  return (
    <main className={`flex min-h-screen flex-col p-8 md:p-24 space-y-6 ${inter.className}`}>
      <div className='flex flex-col gap-y-8 md:flex-row md:justify-between'>
        <div className='flex flex-col md:flex-row gap-x-4 gap-y-4'>
          <Button colorScheme='blue' variant='ghost' className='gap-x-2 items-center' onClick={() => {router.back()}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-1 stroke-sky-800">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>
            <p>Go Back</p>
          </Button>
            <h1 className='text-3xl font-bold text-sky-600'>Manage your Virtual Account</h1>
        </div>
        <Button colorScheme='blue' variant='solid' className='gap-x-2 items-center'>
          <p>Create New VA</p>
        </Button>
      </div>


      <div className='flex flex-col md:flex-row p-6 border rounded-md gap-y-4 hover:bg-sky-50 hover:border-sky-600 hover:border-2 cursor-pointer'>

        <div className='flex flex-col gap-y-2 md:basis-8/12'>
          <div className='flex flex-row gap-x-2 items-center stroke-gray-500 hover:stroke-sky-500 cursor-pointer' onClick={copyID}>
              <p className='text-sm'>9q4395-dfgbhg54-9784289f</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
              </svg>
          </div>
          <h1 className='text-xl font-bold'>VA for Suisei Supacha</h1>
          <p className='text-sm'>Created at 18 May 2023 08:45 WIB</p>
        </div>

        <div className='flex flex-col gap-y-2 md:basis-3/12'>
          <p className='text-sm'>Balance:</p>
          <h1 className='text-5xl font-bold'>$69</h1>
        </div>

        <div className='flex flex invisible h-0 md:visible md:basis-1/12 md:h-full md:min-h-full place-content-end'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke stroke-1 stroke-sky-800 w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </div>

      </div>
      

    </main>
  )
}
