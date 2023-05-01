import axios from "axios"
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import toast from "react-hot-toast"

export const authAtom = atomWithStorage("auth", {
  token: null,
})

export const useAuth = () => {
  const [authState, setAuthState] = useAtom(authAtom)

  return {
    authState,
    login: async (username: string, password: string) => {
      return axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/cores/auth/login/`, {
        username,
        password,
      })
        .then((res) => {
          setAuthState({
            ...authState,
            token: res?.data?.token,
          })
        })
        .then(() => {
          toast.success("Welcome to SuiWallet", {
            position: "bottom-right",
          })
        })
        .catch((e) => {
          if (e.code === "ERR_BAD_REQUEST") {
            toast.error("Wrong username/password entered", {
              position: "bottom-right"
            })
          }
        });
    },
    logout: () => {
      setAuthState({
        ...authState,
        token: null,
      })
    },
    register: async (username: string, email: string, password: string, confirmPassword: string) => {
      if (password !== confirmPassword) {
        return toast.error("Passwords do not match. Please re-chack your password!", {
          position: "bottom-right",
        })
      }

      return axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/cores/auth/register/`, {
        username,
        email,
        password,
      })
        .catch((e) => {
          toast.error(e.code, {
            position: "bottom-right",
          })
        })
    }
  }
}
