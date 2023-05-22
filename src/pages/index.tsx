import { Inter } from 'next/font/google'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { useAuth } from '@/contexts/auth'
import { useRouter } from "next/router";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { authState: { token }, logout } = useAuth()
  const router = useRouter()

  const handleClick = (e:any) => {
    e.preventDefault();
    router.push("/dashboard");
  };

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
        {!token ? (
          <>
            <p>
              Already have an account? <Link className="text-blue-500 hover:text-blue-700 transition-all" href="/auth">Sign In</Link>
            </p>
            <Link href="/auth">
              <Button variant="solid" colorScheme="blue">
                Join Now
              </Button>
            </Link>
          </>
        ) : (
          <Button variant="solid" colorScheme="blue" onClick={handleClick}>
            View Dashboard
          </Button>
        )}
      </div>
    </main>
  )
}
