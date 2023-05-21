import React from "react"
import { copyID } from "@/utils" 
import { useToast } from '@chakra-ui/react'

export interface VAListCard {
    key:string
    VAId:string
    name:string
    balance:number
    dateCreated:string
}

export const VAListCard: React.FC<VAListCard> = ({ VAId, name, balance, dateCreated }) => {

    const toast = useToast()

    return (
    <div className='flex flex-col md:flex-row p-6 border rounded-md gap-y-4 hover:bg-sky-50 hover:border-sky-600 hover:border-2 cursor-pointer'>

        <div className='flex flex-col gap-y-2 md:basis-8/12'>
          <div className='flex flex-row gap-x-2 items-center stroke-gray-500 hover:stroke-sky-500 cursor-pointer' onClick={() => copyID(VAId, toast)}>
              <p className='text-sm'>{ VAId }</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
              </svg>
          </div>
          <h1 className='text-xl font-bold'>VA for { name }</h1>
          <p className='text-sm'>Created at { dateCreated }</p>
        </div>

        <div className='flex flex-col gap-y-2 md:basis-3/12'>
          <p className='text-sm'>Balance:</p>
          <h1 className='text-3xl font-bold'>${ balance }</h1>
        </div>

        <div className='flex flex invisible h-0 md:visible md:basis-1/12 md:h-full md:min-h-full place-content-end'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke stroke-1 stroke-sky-800 w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </div>

      </div>

)}

