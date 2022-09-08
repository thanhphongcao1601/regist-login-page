import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsSunFill } from "react-icons/bs";
import { BsMoonFill } from "react-icons/bs";
import NextLink from "next/link";
import { loginUser } from "./zustand/apiRequest";
import { useRouter } from "next/router";

const Index = () => {
  const { toggleColorMode } = useColorMode();
  const formBackgroud = useColorModeValue("gray.100", "gray.900");
  const [toggle, setToggle] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleLogin() {
    const login = await loginUser({ username: username, password: password });
    if (login) {
      router.push("home");
    }
  }

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <Flex
        position={"relative"}
        direction={"column"}
        bg={formBackgroud}
        p="12"
        rounded="10"
        minW={"400"}
      >
        <Heading>LOGIN</Heading>
        <FormControl mb="3" mt="6">
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl mb={"3"}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button
          colorScheme="teal"
          variant="solid"
          mb="3"
          mt={"3"}
          onClick={handleLogin}
        >
          Login
        </Button>
        <NextLink href="/register" passHref>
          <Link color="teal.500" textAlign="end">
            Regist now!
          </Link>
        </NextLink>
        <Box
          position="absolute"
          top={4}
          right={4}
          cursor="pointer"
          onClick={() => {
            toggleColorMode();
            setToggle(!toggle);
          }}
        >
          {toggle ? <BsMoonFill /> : <BsSunFill />}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Index;
