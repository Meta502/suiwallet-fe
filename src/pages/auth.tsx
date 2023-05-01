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
import axios from "axios";
import { API_URL }  from "../../constants/api";

const inter = Inter({ subsets: ["latin"] });

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post(API_URL, {
        email,
        password,
      });
      // Authentication successful, redirect to main page
      window.location.href = "/main";
    } catch (error) {
      // Authentication failed, display error message
      setError("Authentication failed");
    }
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: any) => {
    setConfirmPassword(event.target.value);
  };

  const toggleIsLogin = () => {
    setIsLogin(!isLogin);
  };

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
            <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Box>
              <Box mb={4}>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
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
            <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Box>
              <Box mb={4}>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Box>
              <Box mb={4}>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
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
