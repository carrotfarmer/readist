import { Box, Center, Heading, Spinner, Text } from "@chakra-ui/react";
import type { NextPage } from "next";

import { useSession } from "next-auth/react";

import Head from "next/head";
import { useRouter } from "next/router";

import { Navbar } from "~/components/nav/Navbar";
import { ReadingList } from "~/components/reading-list/page/ReadingList";

import type { IReadingList } from "~/types";
import { api } from "~/utils/api";

const ReadingListPage: NextPage = () => {
  const router = useRouter();
  const { rlId } = router.query;

  const { data: session } = useSession();

  const { data: readingList, isLoading } = api.readingList.getReadingList.useQuery({
    rlId: rlId as string,
  });

  const { data: isRlPartOfUser, isLoading: isUserCheckLoading } = api.user.isRlPartOfUser.useQuery({
    rlId: rlId as string,
  });

  if (isLoading || isUserCheckLoading) {
    return (
      <Box>
        <Navbar />

        <Center pt="10">
          <Spinner />
        </Center>
      </Box>
    );
  }

  return (
    <Box>
      <Head>
        <title>my reading list</title>
        <meta name="description" content="my reading list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />

        {session && isRlPartOfUser ? (
          <ReadingList readingList={readingList as IReadingList} />
        ) : (
          <Box pt="5">
            {session ? (
              <>
                <Center>
                  <Heading>Access Denied</Heading>
                </Center>

                <Center pt="2%">
                  <Text>
                    You do not have a reading list with this ID associated to your account!
                  </Text>
                </Center>
              </>
            ) : (
              <Center>
                <Text>not authenticated. please sign in to continue.</Text>
              </Center>
            )}
          </Box>
        )}
      </main>
    </Box>
  );
};

export default ReadingListPage;
