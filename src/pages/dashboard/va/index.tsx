import { Inter } from 'next/font/google'
import { useAuth } from '@/contexts/auth'
import { useRouter } from "next/router";
import { VAListCard } from "../../../components/VAListCard";
import React from 'react';
import useSWR from 'swr'

import {
  Button,
  useToast,
} from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { authState: { token }, logout } = useAuth()
  const router = useRouter()
  const toast = useToast()

  const { data: virtualAccountData, mutate }: any = useSWR(token ? `${process.env.NEXT_PUBLIC_BASE_API_URL}/transaction/virtual-account/` : null, (url: string) => fetch(url, {
    headers: {
      "Authorization": `Token ${token}`
    }
  }).then(res => res.json()))

  console.log(virtualAccountData)

  React.useEffect(() => {
    if (!token) {
      router.push("/auth")
    }
  }, [router, token])

  return (
    <main className={`flex min-h-screen flex-col p-8 md:p-24 space-y-6 ${inter.className}`}>
      <div className='flex flex-col gap-y-8 md:flex-row md:justify-between'>
        <div className='flex flex-col md:flex-row gap-x-4 gap-y-4'>
          <Button colorScheme='blue' variant='ghost' className='gap-x-2 items-center' onClick={() => { router.back() }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-1 stroke-sky-800">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>
            <p>Go Back</p>
          </Button>
          <h1 className='text-3xl font-bold text-sky-600'>Manage your Virtual Account</h1>
        </div>
        <Button colorScheme='blue' variant='solid' className='gap-x-2 items-center' onClick={() => { router.push("/dashboard/va/create") }}>
          <p>Create New VA</p>
        </Button>
      </div>

      <div className='flex flex-col gap-y-6'>
        {virtualAccountData?.map?.((item: any) => (
          <VAListCard
            key={item.id}
            VAId={item.id}
            name={item.title}
            balance={item.amount}
            dateCreated={"18 May 2023 08:45 WIB"}
            paid={item.status === "PAID"}
            refetch={() => mutate(`${process.env.NEXT_PUBLIC_BASE_API_URL}/transaction/virtual-account/`)}
          />
        ))}
      </div>

    </main>
  )
}
