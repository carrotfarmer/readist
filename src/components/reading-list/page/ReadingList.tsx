import { Box, Center, Heading, HStack, Button } from "@chakra-ui/react";
import type React from "react";
import { IReadingList } from "~/types";

import { BsTrash as DeleteIcon } from "react-icons/bs";
import { BiEdit as EditIcon } from "react-icons/bi";

interface ReadingListProps {
  readingList: IReadingList;
}

export const ReadingList: React.FC<ReadingListProps> = ({ readingList }) => {
  return (
    <Box pt="10">
      <Center>
        <Heading>{readingList.name}</Heading>
      </Center>
      <Center pt="1%">
        <HStack gap="1%">
          <Button colorScheme="orange" size="xs">
            <Box pr="1">
              <EditIcon />
            </Box>
            Edit
          </Button>
          <Button colorScheme="red" size="xs">
            <Box pr="1">
              <DeleteIcon />
            </Box>
            Delete
          </Button>
        </HStack>
      </Center>
      <Center></Center>
    </Box>
  );
};
