import { Inter } from 'next/font/google'
import { useAuth } from '@/contexts/auth'
import { useRouter } from "next/router"
import { TransactionTableComponent } from "../../../components/TransactionTableComponent"
import React from 'react';
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

  const { data: transactionData }: any = useSWR(`${process.env.NEXT_PUBLIC_BASE_API_URL}/transaction/inquiry/`, (url: string) => token && fetch(url, {
    headers: {
      "Authorization": `Token ${token}`
    }
  }).then(res => res.json()))

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
          <h1 className='text-3xl font-bold text-sky-600'>Payment History</h1>
        </div>
        <Button colorScheme='blue' variant='solid' className='gap-x-2 items-center'>
          <p>Transfer Money</p>
        </Button>
      </div>

      <div className='flex basis-1/2 border rounded-md'>
        <TableContainer className='w-full'>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Transfer Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactionData?.map((item: any) => (
                <TransactionTableComponent receiving={item.metadata?.receiving} key={item.id} tfId={item.id} type={item.type} receiver={item.metadata?.targetId} amount={item?.metadata?.amount} date={new Date(item.createdAt).toLocaleString()} status={item.status} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>

    </main>
  )
}
