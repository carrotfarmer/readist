import {
  Box,
  Center,
  Heading,
  HStack,
  Button,
  useToast,
  useDisclosure,
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
import { IReadingList } from "~/types";

import { BsTrash as DeleteIcon } from "react-icons/bs";
import { BiEdit as EditIcon } from "react-icons/bi";

import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useReadingListStore } from "~/store/ReadingListStore";
import { useRef } from "react";
import { ConfirmReadingListDeletion } from "./ConfirmReadingListDeletion";
import { EditReadingListForm } from "./EditReadingListForm";
import { Books } from "~/components/book/Books";

interface ReadingListProps {
  readingList: IReadingList;
}

export const ReadingList: React.FC<ReadingListProps> = ({ readingList }) => {
  const router = useRouter();
  const toast = useToast();

  const { deleteReadingList } = useReadingListStore();

  // alert dialog
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLInputElement>(null);

  // edit popover
  const { isOpen: isPopoverOpen, onOpen: onPopoverOpen, onClose: onPopoverClose } = useDisclosure();
  const editRef = useRef(null);

  const { mutate: deleteRl } = api.readingList.deleteReadingList.useMutation({
    onSuccess: () => {
      toast({
        title: "Deleted Reading List",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      deleteReadingList(readingList.id);
      router.push("/");
    },
  });

  return (
    <Box pt="10">
      <Center>
        <Heading>{readingList.name}</Heading>
      </Center>
      <Center pt="1%">
        <HStack gap="1%">
          <Popover
            isOpen={isPopoverOpen}
            onOpen={onPopoverOpen}
            onClose={onPopoverClose}
            closeOnBlur={false}
            initialFocusRef={editRef}
          >
            <PopoverTrigger>
              <Button colorScheme="orange" size="xs" onClick={onPopoverOpen}>
                <Box pr="1">
                  <EditIcon />
                </Box>
                Edit
              </Button>
            </PopoverTrigger>

            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>Edit Reading List Name</PopoverHeader>
                <PopoverCloseButton tabIndex={2} />
                <PopoverBody>
                  <EditReadingListForm
                    editRef={editRef}
                    onCancel={onPopoverClose}
                    rlId={readingList.id}
                  />
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
          <Button colorScheme="red" size="xs" onClick={onOpen}>
            <Box pr="1">
              <DeleteIcon />
            </Box>
            Delete
          </Button>
        </HStack>
      </Center>
      <ConfirmReadingListDeletion
        isOpen={isOpen}
        onClose={onClose}
        rlId={readingList.id}
        cancelRef={cancelRef}
        deleteRl={deleteRl}
      />

      <Books books={readingList.books} />
    </Box>
  );
};
