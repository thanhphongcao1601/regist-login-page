import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Home = () => {
  return (
    <Flex>
      <Flex
        width={"100%"}
        height="60px"
        bg={"gray.100"}
        justifyContent="space-between"
        alignItems={"center"}
        paddingX="20px"
      >
        <Text fontSize="5xl">Web JWT</Text>
        <Text fontSize="26px" color="tomato">
          Hello
        </Text>
        <Button colorScheme="teal">Log out</Button>
      </Flex>
    </Flex>
  );
};

export default Home;
