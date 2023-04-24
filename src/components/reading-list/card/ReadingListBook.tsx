import { Box } from "@chakra-ui/react";
import { Book } from "@prisma/client";
import type React from "react";

import { Text } from "@chakra-ui/react";

interface ReadingListBook {
  book: Book;
}

export const ReadingListBook: React.FC<ReadingListBook> = ({ book }) => {
  return (
    <Box px="4">
      <li>
        <Box fontSize="xs">
          <Text textDecor="underline" fontWeight="bold">
            {book.name}
          </Text>
          <Text color="gray.500">{book.author}</Text>
        </Box>
      </li>
    </Box>
  );
};
