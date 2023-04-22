import React from "react";

import { Box, Center, SimpleGrid, Spinner } from "@chakra-ui/react";
import { api } from "~/utils/api";

import { useReadingListStore } from "../store/ReadingListStore";
import { CreateReadingList } from "./reading-list/CreateReadingList";
import { ReadingList } from "./reading-list/ReadingList";

interface MainProps {}

export const Main: React.FC<MainProps> = ({}) => {
  const { readingLists, setReadingLists } = useReadingListStore();
  const {
    data: readingListsData,
    isLoading,
    isFetching,
  } = api.readingList.getReadingLists.useQuery();

  if (isFetching && isLoading) {
    return (
      <Center pt="10">
        <Spinner />
      </Center>
    );
  }

  if (readingLists.length === 0 && readingListsData) {
    setReadingLists(readingListsData);
  }

  return (
    <Box pt="5">
      <Center>
        <SimpleGrid columns={[2, 3, 4]} spacing={20}>
          <CreateReadingList />
          {readingLists.length > 0 &&
            readingLists.map((readingList) => <ReadingList readingList={readingList} />)}
        </SimpleGrid>
      </Center>
    </Box>
  );
};
