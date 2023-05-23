import React from "react"
import {
  Tr,
  Td,
  Badge,
  useToast,
} from '@chakra-ui/react'
import { copyID } from "@/utils"

export interface TransactionTableComponent {
  key: string
  tfId: string
  type: string
  receiver: string
  receiving: boolean
  amount: number
  date: string
  status: string
}

export const TransactionTableComponent: React.FC<TransactionTableComponent> = ({ tfId, type, receiver, receiving, amount, date, status }) => {
  const colorScheme = receiving ? "green" : status === "PENDING" ? 'yellow' : status === "EXPIRED" ? 'red' : 'green'
  const toast = useToast()
  console.log(receiving)

  return <Tr key={tfId}>
    <Td>
      <div className='flex flex-col gap-y-2'>
        <div className='flex flex-row gap-x-2'>
          {
            receiving || type == "TOPUP" || type == "VIRTUAL_ACCOUNT_WITHDRAWAL" ? (
              <div className='flex flex-row gap-x-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className={`w-4 h-4 stroke-2 ${receiving ? "stroke-green-700" : status === "PENDING" ? "stroke-yellow-700" : status === "EXPIRED" ? "stroke-red-700" : "stroke-green-700"}`}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
                </svg>
                <Badge variant='outline' colorScheme={colorScheme}>
                  {type === "TOPUP" ? "Top Up" : type === "TRANSFER" ? "Transfer" : "Virtual Account Withdrawal"}
                </Badge>
              </div>

            ) : (
              <div className='flex flex-row gap-x-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-2 stroke-red-700">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                </svg>
                <Badge variant='outline' colorScheme='red'>
                  {type}
                </Badge>
              </div>
            )
          }
          <p className='text-sm'>to {type === "TOPUP" || type === "VIRTUAL_ACCOUNT_WITHDRAWAL" || receiving ? "your account" : receiver}</p>
        </div>
        <h3 className='text-2xl font-bold'>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount)}</h3>
        {type === "TOPUP" && status !== "FINISHED" && (
          <div className='flex flex-row gap-x-2 items-center stroke-gray-500 hover:stroke-sky-500 cursor-pointer' onClick={() => copyID(tfId, toast)}>
            <p className='text-sm'>Payment Code: {tfId}</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
            </svg>
          </div>
        )}
        <p className='text-sm'>{date}</p>
      </div>
    </Td>
  </Tr>

}

