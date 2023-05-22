import axios from "axios"
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { useState } from "react"
import toast from "react-hot-toast"

export const authAtom = atomWithStorage("auth", {
  token: null,
})

export const useAuth = () => {
  const [authState, setAuthState] = useAtom(authAtom)
  const NusantaraValid = require('nusantara-valid')

  return {
    authState,
    login: async (username: string, password: string) => {
      const request = axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/cores/auth/login/`, {
        username,
        password,
      })
        .then((res) => {
          setAuthState({
            ...authState,
            token: res?.data?.token,
          })
        })

      toast.promise(
        request,
        {
          loading: "Logging In...",
          success: "Welcome to Suiwallet",
          error: (err) => {
            if (err.code === "ERR_BAD_REQUEST") {
              return "Wrong username/password entered"
            }
            return "An error occurred while logging in"
          },
        },
        {
          position: "bottom-center",
        }
      )
    },
    logout: () => {
      setAuthState({
        ...authState,
        token: null,
      })
    },
    register: async (username: string, email: string, password: string, confirmPassword: string, nik:string, birth_date:Date, phone_number:string, address:string, postal_code:string) => {
      if (password !== confirmPassword) {
        return toast.error("Passwords do not match. Please re-chack your password!", {
          position: "bottom-right",
        })
      } else if (!NusantaraValid.isValidNIK(nik)) {
        return toast.error("Invalid NIK number", {
          position: "bottom-right",
        })
      } else if (!NusantaraValid.isValidCellularNumber(String(phone_number))) {
        return toast.error("Invalid phone number", {
          position: "bottom-right",
        })
      } else if (!NusantaraValid.isValidZIP(String(postal_code))) {
        return toast.error("Invalid postal code", {
          position: "bottom-right",
        })
      }
    

      const request = axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/cores/auth/register/`, {
        username,
        email,
        password,
        nik,
        birth_date,
        phone_number,
        address,
        postal_code,
      })

      toast.promise(
        request,
        {
          success: "Successfully registered. You can now login",
          loading: "Registering your account...",
          error: "An error occurred while registering your account"
        }
      )

      return request
    }
  }
}
