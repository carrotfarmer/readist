import {
  Center,
  Box,
  Button,
  Tooltip,
  Text,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";

import { Book } from "./Book";

import { BiBookAdd } from "react-icons/bi";
import { NewBookModal } from "./NewBookModal";
import { api } from "~/utils/api";
import { CompletedBooks } from "./CompletedBooks";
import { useReadingListStore } from "~/store/ReadingListStore";

interface BooksProps {
  rlId: string;
}

export const Books: React.FC<BooksProps> = ({ rlId }) => {
  const { readingLists, setReadingLists } = useReadingListStore();

  // Add Book Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    data: readingListsData,
    isLoading,
    isFetching,
  } = api.readingList.getReadingLists.useQuery();

  const {
    data: isDbRlEmpty,
    isLoading: isDbRlLoading,
    isFetching: isDbRlFetching,
  } = api.readingList.isDbRlEmpty.useQuery();

  if (isLoading || isDbRlLoading || isFetching || isDbRlFetching) {
    return (
      <Center pt="10">
        <Spinner />
      </Center>
    );
  }

  if (readingLists.length === 0 && readingListsData && !isDbRlEmpty) {
    setReadingLists(readingListsData);
  }

  const readingList = readingLists.find((rl) => rl.id === rlId);

  if (!readingList) {
    return (
      <Center pt="10">
        <Spinner />
      </Center>
    );
  }

  return (
    <>
      <Center pt="2%">
        <Box px="10" width="3xl">
          {readingList.books.filter(book => !book.isFinished).length > 0 ? (
            readingList.books
              .filter((book) => !book.isFinished)
              .map((book) => <Book rlId={rlId} book={book} key={book.id} />)
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
              color="white"
              _dark={{ color: "white" }}
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
      {readingList.books.filter((book) => book.isFinished).length > 0 && (
        <Box pt="10">
          <CompletedBooks
            completedBooks={readingList.books.filter((book) => book.isFinished)}
            rlId={rlId}
          />
        </Box>
      )}
    </>
  );
};
