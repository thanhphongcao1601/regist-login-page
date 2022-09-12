import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Badge, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { UserInfo } from "./models/LoginResponse";
import { Users } from "./zustand/apiRequest";
import useStore from "./zustand/store";

const Home = () => {
  const store = useStore();
  const router = useRouter();
  const [listUser, setListUser] = useState([] as UserInfo[]);

  function handleGetAllUser() {
    setListUser((listUser) => []);
    Users.getAllUsers({ token: store.accessToken })
      .then((data) => {
        console.log(data as Object);
        data.map((user) => setListUser((listUser) => [...listUser, user]));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogOut() {
    Users.logOut({ token: store.accessToken })
      .then((data) => {
        router.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function refreshToken() {
    Users.refreshToken()
      .then((token) => {
        const accessTokenValue = JSON.parse(JSON.stringify(token)).accessToken;
        store.setAccessToken(accessTokenValue);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Flex direction={"column"}>
      <Flex
        width={"100%"}
        bg={"gray.100"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Badge p={"0 10px"} colorScheme="purple">
          <Text fontSize="5xl">Web JWT</Text>
        </Badge>
        <Text fontSize="26px" color="tomato">
          Hello {store.currentUser?.username}
        </Text>
        <Button mr="10px" colorScheme="teal" onClick={handleLogOut}>
          Log out
        </Button>
      </Flex>
      <Box
        mt="20px"
        textAlign="center"
        justifyContent={"center"}
        alignItems="center"
      >
        <Text fontSize="4xl">Access Token expires in 30s</Text>
        <Flex mb={"50px"} justifyContent={"center"}>
          <Button colorScheme={"teal"} onClick={handleGetAllUser}>Load all user</Button>
          <Box w={"10px"}></Box>
          <Button onClick={refreshToken}>Refresh Token</Button>
          <Box w={"10px"}></Box>
          <Button
            colorScheme={"red"}
            onClick={() => {
              setListUser((listUser) => []);
            }}
          >
            Clear list
          </Button>
        </Flex>
        <TableContainer w={"50%"} margin="0 auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Username</Th>
                <Th>Email</Th>
                <Th>Create at</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listUser.length > 0
                ? listUser.map((user) => {
                    return (
                      <Tr key={user._id}>
                        <Td>{user.username}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user.createdAt}</Td>
                      </Tr>
                    );
                  })
                : null}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
};

export default Home;
