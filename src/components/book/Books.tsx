import {
  Center,
  Box,
  useColorModeValue,
  Button,
  Tooltip,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";

import { Book } from "./Book";
import { useBookStore } from "~/store/BookStore";

import { BiBookAdd } from "react-icons/bi";
import { NewBookModal } from "./NewBookModal";
import { api } from "~/utils/api";

interface BooksProps {
  rlId: string;
}

export const Books: React.FC<BooksProps> = ({ rlId }) => {
  const { books: booksState, setBooks } = useBookStore();

  const { data: booksData, isLoading, isFetching } = api.book.getBooks.useQuery({ rlId });

  // Add Book Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isFetching && isLoading) {
    return (
      <Center pt="10">
        <Spinner />
      </Center>
    );
  }

  if (booksState.length === 0 && booksData) {
    setBooks(booksData);
  }

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
          <Button colorScheme="green" size="sm" onClick={onOpen}>
            <Box>
              <BiBookAdd size="20" />
            </Box>
          </Button>
        </Tooltip>
        <NewBookModal isOpen={isOpen} onClose={onClose} rlId={rlId} />
      </Box>
    </>
  );
};
