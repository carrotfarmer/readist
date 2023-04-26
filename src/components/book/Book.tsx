import {
  Text,
  Box,
  HStack,
  Checkbox,
  useColorModeValue,
  useDisclosure,
  Spacer,
  Button,
  ButtonGroup,
  PopoverTrigger,
  Popover,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
} from "@chakra-ui/react";
import type React from "react";
import { useRef } from "react";

import { BsTrash as DeleteIcon } from "react-icons/bs";
import { BiEdit as EditIcon } from "react-icons/bi";

import type { Book as IBook } from "@prisma/client";
import { useBookStore } from "~/store/BookStore";
import { api } from "~/utils/api";
import { EditBookForm } from "./EditBookForm";

interface BookProps {
  book: IBook;
}

export const Book: React.FC<BookProps> = ({ book }) => {
  const { deleteBook, toggleComplete: toggleCompleteState } = useBookStore();

  const { mutate: removeBook } = api.book.deleteBook.useMutation({
    onSuccess: () => {
      deleteBook(book.id);
    },
  });

  const { mutate: markAsFinished } = api.book.markComplete.useMutation({
    onSuccess: () => {
      toggleCompleteState(book.id);
    },
  });

  const { mutate: markAsNotFinished } = api.book.markInComplete.useMutation({
    onSuccess: () => {
      toggleCompleteState(book.id);
    },
  });

  // edit popover
  const { isOpen: isPopoverOpen, onOpen: onPopoverOpen, onClose: onPopoverClose } = useDisclosure();
  const editRef = useRef(null);

  return (
    <Box
      bgColor={useColorModeValue("gray.100", "blackAlpha.300")}
      borderRadius="md"
      p="2"
      border="1px"
      borderColor={useColorModeValue("gray.400", "gray.700")}
    >
      <HStack p="2">
        <Checkbox
          mr="10"
          borderColor={useColorModeValue("gray.400", "gray.500")}
          onChange={() => {
            if (book.isFinished) {
              markAsNotFinished({ bookId: book.id });
            } else {
              markAsFinished({ bookId: book.id });
            }
          }}
          isChecked={book.isFinished}
        />
        <Text fontWeight="bold" as={book.isFinished ? "s" : "p"}>
          {book.name}
        </Text>
        <Text fontWeight="light" color={useColorModeValue("gray.500", "gray.400")}>{book.author}</Text>
        <Spacer />
        <ButtonGroup>
          <Popover
            isOpen={isPopoverOpen}
            onOpen={onPopoverOpen}
            onClose={onPopoverClose}
            closeOnBlur={false}
            initialFocusRef={editRef}
          >
            <PopoverTrigger>
              <Button colorScheme="orange" size="xs">
                <Box>
                  <EditIcon />
                </Box>
              </Button>
            </PopoverTrigger>

            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>Edit Reading List Name</PopoverHeader>
                <PopoverCloseButton tabIndex={2} />
                <PopoverBody>
                  <EditBookForm editRef={editRef} onCancel={onPopoverClose} book={book} />
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>

          <Button colorScheme="red" size="xs" onClick={() => removeBook({ bookId: book.id })}>
            <Box>
              <DeleteIcon />
            </Box>
          </Button>
        </ButtonGroup>
      </HStack>
    </Box>
  );
};
