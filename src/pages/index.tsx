import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 space-y-6 ${inter.className}`}
    >
      <img className="w-40" src="/sui.png" />

      <div className="flex flex-col justify-center items-center space-y-2">
        <h1 className="text-3xl">
          Welcome to <span className="font-bold text-blue-500">SuiWallet</span>
        </h1>

        <h2 className="text-lg">
          Payments made <span className="font-semibold text-blue-500">Easy</span>
        </h2>
      </div>


      <div className="flex flex-col items-center justify-center space-y-2">
        <p>
          Already have an account? <a className="text-blue-500 hover:text-blue-700 transition-all" href="/auth">Sign In</a>
        </p>
        <Button variant="solid" colorScheme="blue" href="/auth">
          Join Now
        </Button>
      </div>
    </main>
  )
}
