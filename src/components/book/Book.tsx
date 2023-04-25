import {
  Text,
  Box,
  HStack,
  Checkbox,
  useColorModeValue,
  Spacer,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import type React from "react";

import { BsTrash as DeleteIcon } from "react-icons/bs";
import { BiEdit as EditIcon } from "react-icons/bi";

import type { Book as IBook } from "@prisma/client";
import { useBookStore } from "~/store/BookStore";
import { api } from "~/utils/api";

interface BookProps {
  book: IBook;
}

export const Book: React.FC<BookProps> = ({ book }) => {
  const { deleteBook } = useBookStore();
  const { mutate: removeBook } = api.book.deleteBook.useMutation({
    onSuccess: () => {
      deleteBook(book.id);
    },
  });

  return (
    <HStack pb="5">
      <Checkbox mr="10" borderColor={useColorModeValue("gray.400", "gray.500")} />
      <Text fontWeight="bold">{book.name}</Text>
      <Text fontWeight="light">{book.author}</Text>
      <Spacer />
      <ButtonGroup>
        <Button colorScheme="orange" size="xs">
          <Box>
            <EditIcon />
          </Box>
        </Button>
        <Button colorScheme="red" size="xs" onClick={() => removeBook({ bookId: book.id })}>
          <Box>
            <DeleteIcon />
          </Box>
        </Button>
      </ButtonGroup>
    </HStack>
  );
};
