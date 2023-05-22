import React from "react"
import { copyID } from "@/utils" 
import {
    Tr,
    Td,
    useToast,
    Badge
  } from '@chakra-ui/react'

export interface VAListTable {
    key:string
    VAId:string
    name:string
    amount:number
    paid:boolean
}

export const VAListTable: React.FC<VAListTable> = ({ VAId, name, amount, paid }) => {

    const toast = useToast()

    return (
    <Tr key={ VAId }>
        <Td>
            <div className='flex flex-col gap-y-2'>
                <h2 className='font-bold text-base'>VA for { name }</h2>
                <div className='flex flex-row gap-x-2 items-center stroke-gray-500 hover:stroke-sky-500 cursor-pointer' onClick={() => copyID(VAId, toast)}>
                    <p className='text-sm'>{ VAId }</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                    </svg>
                </div>
            </div>
        </Td>
        <Td className='font-bold text-lg'>
            <div className='flex flex-col gap-y-2'>
                <p>${ amount }</p>
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
        </Td>
    </Tr>

)}

