//Implement login and register pages
import React, { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Box,
} from "@chakra-ui/react";

import { Inter } from "next/font/google";

import { useAuth } from "@/contexts/auth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm()

  const [error, setError] = useState("");

  const { authState, login, register: registerUser } = useAuth();

  React.useEffect(() => {
    if (authState.token) router.push("/")
  }, [authState.token])

  const toggleIsLogin = () => {
    setIsLogin(!isLogin);
  };

  const onLoginSubmit = (data: any) => {
    try {
      login(data.username, data.password)
    } catch (e) {
      console.log(e)
    }
  }

  const onRegisterSubmit = (data: any) => {
    registerUser(
      data.username,
      data.email,
      data.password,
      data.confirmPassword,
      data.nik,
      data.birth_date,
      data.phone_number,
      data.address,
      data.postal_code,
    )
      .then(() => {
        setIsLogin(true)
      })
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 space-y-6 ${inter.className}`}
    >
      <Box maxW="md" mx="auto" mt={8} borderWidth="1px" borderRadius="lg" p={8}>
        {isLogin ? (
          <>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Login
            </Text>
            <form onSubmit={handleSubmit(onLoginSubmit)}>
              <Box mb={4}>
                <Input
                  type="text"
                  placeholder="Username"
                  {...register("username")}
                />
              </Box>
              <Box mb={4}>
                <Input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
              </Box>
              {error && (
                <Box mb={4}>
                  <Text color="red.500">{error}</Text>
                </Box>
              )}
              <Button type="submit">Submit</Button>
            </form>
          </>
        ) : (
          <>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Register
            </Text>
            <form onSubmit={handleSubmit(onRegisterSubmit)}>
              <Box mb={4}>
                <Input
                  type="text"
                  placeholder="Username"
                  {...register("username")}
                />
              </Box>
              <Box mb={4}>
                <Input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
              </Box>
              <Box mb={4}>
                <Input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
              </Box>
              <Box mb={4}>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                />
              </Box>
              <Box mb={4}>
                <Input
                  type="number"
                  placeholder="NIK"
                  {...register("nik")}
                />
              </Box>
              <Box mb={4}>
                <Input
                  type="date"
                  placeholder="Birth Date"
                  {...register("birth_date")}
                />
              </Box>
              <Box mb={4}>
                <Input
                  type="number"
                  placeholder="Phone Number"
                  {...register("phone_number")}
                />
              </Box>
              <Box mb={4}>
                <Input
                  type="text"
                  placeholder="Address"
                  {...register("address")}
                />
              </Box>
              <Box mb={4}>
                <Input
                  type="number"
                  placeholder="Postal Code"
                  {...register("postal_code")}
                />
              </Box>
              {error && (
                <Box mb={4}>
                  <Text color="red.500">{error}</Text>
                </Box>
              )}
              <Button type="submit">Submit</Button>
            </form>
          </>
        )}

        <Button
          onClick={toggleIsLogin}
          colorScheme="blue"
          variant="link"
          marginTop={2}
        >
          {isLogin ? "Need to register?" : "Already registered?"}
        </Button>
      </Box>
    </main>
  );
}

export default LoginPage;
