import { type NextPage } from "next";
import Head from "next/head";

import { Navbar } from "../components/nav/Navbar";
import { Main } from "../components/Main";

import { useSession } from "next-auth/react";

import { Box, Center, Text } from "@chakra-ui/react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>my reading list</title>
        <meta name="description" content="my reading list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />

        {session ? (
          <Main />
        ) : (
          <Center>
            <Box pt="5">
              <Text>not authenticated. please sign in to continue.</Text>
            </Box>
          </Center>
        )}
      </main>
    </>
  );
};

export default Home;
