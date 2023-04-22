import type React from "react";
import { IReadingList } from "~/types";

import {
  Center,
  Box,
  Stack,
  Text,
  Heading,
  useColorModeValue,
  Spacer,
  Tag,
  HStack,
} from "@chakra-ui/react";

import { ReadingListBook } from "./ReadingListBook";

interface ReadingListProps {
  readingList: IReadingList;
}

export const ReadingList: React.FC<ReadingListProps> = ({ readingList }) => {
  return (
    <Box
      role={"group"}
      bg={useColorModeValue("white", "gray.800")}
      boxSize={["32", "36", "48"]}
      boxShadow={"2xl"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
      border="1px"
      borderColor="gray"
    >
      <HStack>
        <Center>
          <Stack align={"center"}>
            <Heading fontSize={"xl"} fontWeight="extrabold" p={4}>
              {readingList.name}
            </Heading>
          </Stack>
        </Center>
        <Spacer />
        <Box pr="2">
          <Tag size="sm" variant="solid" colorScheme="teal" fontWeight="bold">
            {readingList.books.length}
          </Tag>
        </Box>
      </HStack>

      <Stack direction={"row"} px="2">
        <ul>
          {readingList.books.map((book) => (
            <ReadingListBook book={book} />
          ))}
        </ul>
      </Stack>
    </Box>
  );
};
