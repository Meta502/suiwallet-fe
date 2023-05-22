import React from "react"
import {
  Tr,
  Td,
  Badge,
} from '@chakra-ui/react'

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
        <p className='text-sm'>{date}</p>
      </div>
    </Td>
  </Tr>

}

