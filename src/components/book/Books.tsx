import { Center, Box, useColorModeValue } from "@chakra-ui/react";
import type { Book as IBook } from "@prisma/client";

import { Book } from "./Book";

interface BooksProps {
  books: IBook[];
}

export const Books: React.FC<BooksProps> = ({ books }) => {
  return (
    <Center pt="10">
      <Box
        bgColor={useColorModeValue("gray.100", "gray.700")}
        p="10"
        borderRadius="2xl"
        width="full"
        mx="10"
      >
        {books.map((book) => (
          <Book book={book} />
        ))}
      </Box>
    </Center>
  );
};
