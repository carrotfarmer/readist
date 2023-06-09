import React from "react";

import { Box, Center, SimpleGrid, Spinner } from "@chakra-ui/react";
import { api } from "~/utils/api";

import { useReadingListStore } from "../store/ReadingListStore";
import { CreateReadingList } from "./reading-list/CreateReadingList";
import { ReadingListCard } from "./reading-list/card/ReadingListCard";

export const Main: React.FC = ({}) => {
  const { readingLists, setReadingLists } = useReadingListStore();

  const {
    data: readingListsData,
    isLoading,
    isFetching,
  } = api.readingList.getReadingLists.useQuery();

  if (isLoading || isFetching) {
    return (
      <Center pt="10">
        <Spinner />
      </Center>
    );
  }

  if (readingLists.length === 0 && readingListsData && readingListsData.length > 0) {
    setReadingLists(readingListsData);
  }

  return (
    <Box pt="5">
      <Center>
        <SimpleGrid columns={[2, 3, 4]} spacing={20}>
          <CreateReadingList />
          {readingLists.length > 0 ? (
            readingLists.map((readingList) => (
              <ReadingListCard readingList={readingList} key={readingList.id} />
            ))
          ) : (
            <Box>nothing here yet!</Box>
          )}
        </SimpleGrid>
      </Center>
    </Box>
  );
};
