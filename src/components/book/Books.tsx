import { Center, Box, useColorModeValue, Button, Tooltip } from "@chakra-ui/react";
import type { Book as IBook } from "@prisma/client";

import { Book } from "./Book";
import { useBookStore } from "~/store/BookStore";
import { useEffect } from "react";

import { BiBookAdd } from "react-icons/bi";

interface BooksProps {
  books: IBook[];
}

export const Books: React.FC<BooksProps> = ({ books }) => {
  const { books: booksState, setBooks } = useBookStore();

  useEffect(() => {
    setBooks(books);
  }, [setBooks]);

  return (
    <>
      <Center pt="5%">
        <Box
          bgColor={useColorModeValue("gray.100", "gray.700")}
          p="10"
          borderRadius="2xl"
          width="full"
          mx="10"
        >
          {booksState.map((book) => (
            <Book book={book} />
          ))}
        </Box>
      </Center>
      <Box mx="10" pt="10">
        <Tooltip label="Add book" hasArrow>
          <Button colorScheme="green" size="sm">
            <Box>
              <BiBookAdd size="20" />
            </Box>
          </Button>
        </Tooltip>
      </Box>
    </>
  );
};
