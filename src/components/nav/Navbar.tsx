import React from "react";

import { Box, Flex, Stack, Button, Heading, useColorModeValue } from "@chakra-ui/react";

import { signOut, signIn, useSession } from "next-auth/react";
import { ColorModeSwitch } from "./ColorModeSwitch";
import Link from "next/link";

export const Navbar: React.FC = ({}) => {
  const { data: session } = useSession();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link href="/">
            <Heading color={useColorModeValue("gray.800", "white")} size="md">
              reading list
            </Heading>
          </Link>
        </Flex>
        <Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6}>
          <ColorModeSwitch />
          {session ? (
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color="white"
              bg="teal.500"
              href={"#"}
              _hover={{
                bg: "teal.400",
              }}
              onClick={() => signOut()}
            >
              sign out
            </Button>
          ) : (
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"teal.500"}
              href={"#"}
              _hover={{
                bg: "teal.400",
              }}
              onClick={() => signIn()}
            >
              sign in
            </Button>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
