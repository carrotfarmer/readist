import { Box } from "@chakra-ui/react";
import { type Book } from "@prisma/client";
import React from "react";

import { Text } from "@chakra-ui/react";

interface ReadingListBook {
  book: Book;
}

export const ReadingListBook: React.FC<ReadingListBook> = ({ book }) => {
  return (
    <Box px="4">
      <li>
        <Box fontSize="xs">
          <Text fontWeight="bold" as={book.isFinished ? "s" : "p"}>
            {book.name}
          </Text>
          <Text color="gray.500">{book.author}</Text>
        </Box>
      </li>
    </Box>
  );
};
