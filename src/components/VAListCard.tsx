import React from "react"
import { copyID } from "@/utils"
import { useToast, Badge } from '@chakra-ui/react'
import { useAuth } from "@/contexts/auth"

export interface VAListCard {
  key: string
  VAId: string
  VANumber: string
  name: string
  balance: number
  dateCreated: string
  paid: boolean
  refetch: () => void
}

export const VAListCard: React.FC<VAListCard> = ({ VAId, name, balance, dateCreated, paid, refetch, VANumber }) => {
  const { authState: { token } } = useAuth()

  const toast = useToast()

  const handleWithdrawal = () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/transaction/virtual-account/${VAId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`
      }
    })
      .then(async (res) => {
        refetch()
      })
      .catch((e) => {
        toast({
          title: 'There was a problem withdrawing your Virtual Account',
          status: 'error',
          duration: 9000,
          position: 'top',
          isClosable: true,
        })
      })
  }

  return (
    <div className='flex flex-col md:flex-row p-6 border rounded-md gap-y-4'>
      <div className='flex flex-col gap-y-2 md:basis-8/12'>
        <div className='flex flex-row gap-x-2 items-center stroke-gray-500 hover:stroke-sky-500 cursor-pointer' onClick={() => copyID(VANumber, toast)}>
          <p className='text-sm'>Payment Code: {VANumber}</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
          </svg>
        </div>
        <h1 className='text-2xl font-bold'>VA for {name}</h1>
        <p className='text-sm'>Created at {dateCreated}</p>
      </div>

      <div className='flex flex-col gap-y-2 md:basis-3/12'>
        <p className='text-sm'>Balance:</p>
        <h1 className='text-2xl font-bold'>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(balance)}</h1>
        <div className="w-fit">
          {
            paid ? (
              <Badge variant='outline' colorScheme='green'>
                Paid
              </Badge>
            ) : (
              <Badge variant='outline' colorScheme='red'>
                Unpaid
              </Badge>
            )
          }
        </div>
      </div>

      {
        paid ? (
          <div className='flex flex-row md:flex-col md:basis-1/12 h-full place-content-end gap-x-4 md:gap-y-4 items-center self-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke stroke-1 stroke-sky-800 w-7 h-7 hover:stroke-2 cursor-pointer" onClick={handleWithdrawal}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke stroke-1 stroke-gray-300 w-7 h-7">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </div>
        ) : (
          <div className='flex flex-row md:flex-col md:basis-1/12 h-full place-content-end gap-x-4 md:gap-y-4 items-center self-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke stroke-1 stroke-gray-300 w-7 h-7">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke stroke-1 stroke-red-500 w-7 h-7 hover:stroke-2 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </div>
        )
      }
    </div>
  )
}

