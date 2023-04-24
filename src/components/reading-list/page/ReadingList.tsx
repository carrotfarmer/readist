import { Box, Center, Heading, HStack, Button, useToast, useDisclosure } from "@chakra-ui/react";
import type React from "react";
import { IReadingList } from "~/types";

import { BsTrash as DeleteIcon } from "react-icons/bs";
import { BiEdit as EditIcon } from "react-icons/bi";

import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useReadingListStore } from "~/store/ReadingListStore";
import { useRef } from "react";
import { ConfirmReadingListDeletion } from "./ConfirmReadingListDeletion";

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
          <Button colorScheme="orange" size="xs">
            <Box pr="1">
              <EditIcon />
            </Box>
            Edit
          </Button>
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
    </Box>
  );
};
