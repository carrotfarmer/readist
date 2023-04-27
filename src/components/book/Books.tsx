import {
  Center,
  Box,
  useColorModeValue,
  Button,
  Tooltip,
  Text,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";

import { Book } from "./Book";
import { useBookStore } from "~/store/BookStore";

import { BiBookAdd } from "react-icons/bi";
import { NewBookModal } from "./NewBookModal";
import { api } from "~/utils/api";
import { useEffect } from "react";
import { CompletedBooks } from "./CompletedBooks";

interface BooksProps {
  rlId: string;
}

export const Books: React.FC<BooksProps> = ({ rlId }) => {
  const { books: booksState, setBooks } = useBookStore();

  // Add Book Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: booksData, isLoading, isFetching } = api.book.getBooks.useQuery({ rlId });

  const {
    data: isDbBooksEmpty,
    isLoading: isDbBooksLoading,
    isFetching: isDbBooksFetching,
  } = api.book.isDbBooksEmpty.useQuery({ rlId });

  // reset state on route change
  useEffect(() => setBooks([]), [setBooks]);

  if (isLoading || isDbBooksLoading || isFetching || isDbBooksFetching) {
    return (
      <Center pt="10">
        <Spinner />
      </Center>
    );
  }

  if (booksState.length === 0 && booksData && !isDbBooksEmpty) {
    setBooks(booksData);
  }

  return (
    <>
      <Center pt="2%">
        <Box px="10" width="3xl">
          {booksState.length > 0 ? (
            booksState
              .filter((book) => !book.isFinished)
              .map((book) => <Book book={book} key={book.id} />)
          ) : (
            <Box pt="4%">
              <Text>Nothing here yet!</Text>
            </Box>
          )}
        </Box>
      </Center>
      <Center>
        <Box mx="10" pt="5">
          <Tooltip label="Add book" hasArrow>
            <Button
              bgColor="teal.600"
              _hover={{ bgColor: "teal.500" }}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              color={useColorModeValue("white", "white")}
              size="sm"
              onClick={onOpen}
            >
              <Box>
                <BiBookAdd size="20" />
              </Box>
            </Button>
          </Tooltip>
          <NewBookModal isOpen={isOpen} onClose={onClose} rlId={rlId} />
        </Box>
      </Center>
      {booksState.filter((book) => book.isFinished).length > 0 && (
        <Box pt="10">
          <CompletedBooks completedBooks={booksState.filter((book) => book.isFinished)} />
        </Box>
      )}
    </>
  );
};
