import React from "react";

import { Box, Center, Spinner } from "@chakra-ui/react";
import { api } from "~/utils/api";

import { useReadingListStore } from "../zustand/ReadingListStore";
import { CreateReadingList } from "./reading-list/CreateReadingList";

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
      <CreateReadingList />
      {readingLists.length > 0 && readingLists.map((readingList) => (
        <div>{readingList.name}</div>
      ))}
    </Box>
  );
};
