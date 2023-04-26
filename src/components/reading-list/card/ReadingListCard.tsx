import type React from "react";
import { useRef } from "react";

import Link from "next/link";

import { IReadingList } from "~/types";

import {
  Center,
  Box,
  Button,
  Stack,
  Heading,
  useColorModeValue,
  Spacer,
  Tag,
  HStack,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";

import { ReadingListBook } from "./ReadingListBook";
import { useReadingListStore } from "~/store/ReadingListStore";
import { api } from "~/utils/api";

interface ReadingListProps {
  readingList: IReadingList;
}

export const ReadingListCard: React.FC<ReadingListProps> = ({ readingList }) => {
  const toast = useToast();

  const { deleteReadingList } = useReadingListStore();
  const { mutate: removeReadingList } = api.readingList.deleteReadingList.useMutation({
    onSuccess: (data) => {
      deleteReadingList(data.id);
      toast({
        title: "Deleted Reading List",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLInputElement>(null);

  return (
    <Box
      role={"group"}
      bg={useColorModeValue("white", "gray.800")}
      boxSize={["32", "36", "48"]}
      boxShadow={"2xl"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
      border="1px"
      borderColor="gray"
    >
      <HStack>
        <Center>
          <Link href={`/readinglist/${readingList.id}`}>
            <Stack align={"center"}>
              <Heading fontSize={"xl"} fontWeight="extrabold" p={4}>
                {readingList.name}
              </Heading>
            </Stack>
          </Link>
        </Center>
        <Spacer />
        <Box pr="2">
          <HStack spacing="1">
            <Tag size="sm" variant="solid" colorScheme="teal" fontWeight="bold">
              {(readingList.books.filter(book => !book.isFinished)).length}
            </Tag>
            <Tag
              size="sm"
              variant="subtle"
              colorScheme="red"
              fontWeight="bold"
              _hover={{
                cursor: "pointer",
                bgColor: "red.800",
              }}
              onClick={onOpen}
            >
              <BsTrash />
            </Tag>
          </HStack>

          <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Reading List
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  {/* FIX: LegacyRefObject<HTMLButtonElement> | undefined */}
                  {/* @ts-ignore */}
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => removeReadingList({ readingListId: readingList.id })}
                    ml={3}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>
      </HStack>

      <Stack direction={"row"} px="2">
        <ul>
          {readingList.books.slice(0, 2).map((book) => (
            <ReadingListBook book={book} />
          ))}
        </ul>
      </Stack>
    </Box>
  );
};
