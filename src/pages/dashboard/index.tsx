import { Inter } from 'next/font/google'
import { useRouter } from "next/router"
import Link from 'next/link'
import { copyAccount, hideText } from '@/utils'
import { useAuth } from '@/contexts/auth'
import { TransactionTableComponent } from "../../components/TransactionTableComponent"
import { VAListTable } from "../../components/VAListTable";
import React from 'react';
import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Badge,
  Button,
  useToast
} from '@chakra-ui/react'

import useSWR from "swr"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { authState: { token }, logout } = useAuth()
  const router = useRouter()
  const toast = useToast()
  const [hidden, setHidden] = React.useState(false)

  const { data: transactionData }: any = useSWR(token ? `${process.env.NEXT_PUBLIC_BASE_API_URL}/transaction/inquiry/` : null, (url: string) => fetch(url, {
    headers: {
      "Authorization": `Token ${token}`
    }
  }).then(res => res.json()), { refreshInterval: 1000 })

  const { data: accountData }: any = useSWR(token ? `${process.env.NEXT_PUBLIC_BASE_API_URL}/cores/account/` : null, (url: string) => fetch(url, {
    headers: {
      "Authorization": `Token ${token}`
    }
  }).then(res => res.json()), { refreshInterval: 1000 })

  const { data: virtualAccountData }: any = useSWR(token ? `${process.env.NEXT_PUBLIC_BASE_API_URL}/transaction/virtual-account/` : null, (url: string) => fetch(url, {
    headers: {
      "Authorization": `Token ${token}`
    }
  }).then(res => res.json()), { refreshInterval: 1000 })

  React.useEffect(() => {
    if (!token) {
      router.push("/auth")
    }
  }, [router, token])

  return (
    <main className={`flex min-h-screen flex-col p-8 md:p-24 space-y-6 ${inter.className}`}>
      <div className='flex flex-row justify-between'>
        <h1 className='text-3xl font-bold text-sky-600'>Your dashboard</h1>
        <Button colorScheme='red' variant='ghost' onClick={logout}>
          Log Out
        </Button>
      </div>

      <div className='flex flex-col gap-y-4 md:flex-row gap-x-4'>
        <div className='flex flex-col p-8 gap-y-2 w-full border rounded-md md:basis-3/5 self-center md:h-full'>
          <h2 className='text-xl'>Balance</h2>
          <h1 className='text-3xl font-bold'>{new Intl.NumberFormat("id-ID", { currency: "IDR", style: "currency" }).format(accountData?.balance)}</h1>
          <div className='flex flex-row gap-x-2 items-center stroke-gray-500 hover:stroke-sky-500 cursor-pointer' onClick={() => copyAccount(accountData?.id, toast)}>
            <p>Your account ID: {accountData?.id}</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
            </svg>
          </div>
        </div>
        <div className='flex flex-col p-8 gap-y-1 w-full border rounded-md md:basis-2/5 self-center'>
        <div className='flex flex-row gap-x-1'>
            <h3 className='font-bold'>Username:</h3>
            <p>ardirzza</p>
          </div>
          <div className='flex flex-row gap-x-1'>
            <h3 className='font-bold'>Email:</h3>
            <p>mail@mail.com</p>
          </div>
          <div className='flex flex-row gap-x-1'>
            <h3 className='font-bold'>Birth Date:</h3>
            <p>17/08/2023</p>
          </div>
          <div className='flex flex-row gap-x-1'>
            <h3 className='font-bold'>NIK:</h3>
            <div className='flex flex-row gap-x-1 items-center' onClick={() => setHidden(!hidden)}>
              <p>{ hideText("28937439287498", !hidden) }</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className='w-4 h-4'>
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      

      <div className='flex flex-col md:flex-row gap-y-4 gap-x-4 w-full text-center text-sm md:text-base'>
        <Link href="/dashboard/top-up" className="flex flex-col md:basis-1/5 p-4 md:p-6 gap-y-4 border rounded-md items-center hover:bg-sky-50 hover:border-sky-600 hover:border-2 hover:text-sky-600 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
          </svg>
          <p>Top-up Wallet</p>
        </Link>

        <Link className="flex flex-col md:basis-1/5 p-4 md:p-6 gap-y-4 border rounded-md items-center hover:bg-sky-50 hover:border-sky-600 hover:border-2 hover:text-sky-600 cursor-pointer" href="/dashboard/va/pay">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
          </svg>
          <p>Pay with VA</p>
        </Link>

        <div className="flex flex-col md:basis-1/5 p-4 md:p-6 gap-y-4 border rounded-md items-center hover:bg-sky-50 hover:border-sky-600 hover:border-2 hover:text-sky-600 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
          <p>Transfer Money</p>
        </div>

        <div className="flex flex-col md:basis-1/5 p-4 md:p-6 gap-y-4 border rounded-md items-center hover:bg-sky-50 hover:border-sky-600 hover:border-2 hover:text-sky-600 cursor-pointer" onClick={() => { router.push("/dashboard/history") }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>Payment History</p>
        </div>

        <div className="flex flex-col md:basis-1/5 p-4 md:p-6 gap-y-4 border rounded-md items-center hover:bg-sky-50 hover:border-sky-600 hover:border-2 hover:text-sky-600 cursor-pointer" onClick={() => { router.push("/dashboard/va") }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
          </svg>
          <p>Manage VA</p>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-x-4 gap-y-4'>
        <div className='flex basis-1/2 border rounded-md'>
          <TableContainer className='w-full'>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Transfer Details</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactionData?.map?.((item: any) => (
                  <TransactionTableComponent receiving={item.metadata?.receiving} key={item.id} tfId={item.id} type={item.type} receiver={item.metadata?.targetId} amount={item?.metadata?.amount} date={new Date(item.createdAt).toLocaleString()} status={item.status} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>

        <div className='flex basis-1/2 border rounded-md'>
          <TableContainer className='w-full'>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Virtual Account</Th>
                  <Th>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {virtualAccountData?.map?.((item: any) => (
                  <VAListTable
                    key={item.id}
                    VAId={item.id}
                    VAPaymentCode={item.paymentCode}
                    name={item.title}
                    amount={item.amount}
                    paid={item.status === "PAID"}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </main>
  )
}
