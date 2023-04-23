import { Box, Center, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Navbar } from "~/components/nav/Navbar";

const ReadingListPage: NextPage = () => {
  const router = useRouter();
  const { rlId } = router.query;

  const { data: session } = useSession();

  return (
    <Box>
      <Head>
        <title>my reading list</title>
        <meta name="description" content="my reading list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />

        {session ? (
          <div>hello</div>
        ) : (
          <Center>
            <Box pt="5">
              <Text>not authenticated. please sign in to continue.</Text>
            </Box>
          </Center>
        )}
      </main>
    </Box>
  );
};

export default ReadingListPage;
