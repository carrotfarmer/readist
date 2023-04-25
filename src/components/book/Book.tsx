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
  const { deleteBook } = useBookStore();
  const { mutate: removeBook } = api.book.deleteBook.useMutation({
    onSuccess: () => {
      deleteBook(book.id);
    },
  });

  // edit popover
  const { isOpen: isPopoverOpen, onOpen: onPopoverOpen, onClose: onPopoverClose } = useDisclosure();
  const editRef = useRef(null);

  return (
    <HStack pb="5">
      <Checkbox mr="10" borderColor={useColorModeValue("gray.400", "gray.500")} />
      <Text fontWeight="bold">{book.name}</Text>
      <Text fontWeight="light">{book.author}</Text>
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
  );
};
