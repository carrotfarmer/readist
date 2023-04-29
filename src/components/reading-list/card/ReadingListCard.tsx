import React from "react";
import { useRef } from "react";

import Link from "next/link";

import { type IReadingList } from "~/types";

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
import { BsTrash, BsCheckCircleFill } from "react-icons/bs";

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
  const cancelRef = useRef(null);

  return (
    <Box
      role={"group"}
      bg={useColorModeValue("white", "gray.800")}
      boxSize={["32", "36", "56"]}
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
              <Heading
                fontSize={"xl"}
                fontWeight="extrabold"
                p={4}
                _hover={{
                  color: "teal.500",
                  _dark: {
                    color: "teal.300",
                  },
                }}
              >
                {readingList.name.length > 20
                  ? `${readingList.name.slice(0, 20)}...`
                  : readingList.name}
              </Heading>
            </Stack>
          </Link>
        </Center>
        <Spacer />
        <Box pr="2">
          <HStack spacing="1">
            <Tag size="sm" variant="solid" colorScheme="teal" fontWeight="bold">
              {readingList.books.filter((book) => !book.isFinished).length === 0 &&
              readingList.books.length > 0 ? (
                <Box>
                  <BsCheckCircleFill />
                </Box>
              ) : (
                readingList.books.filter((book) => !book.isFinished).length
              )}
            </Tag>
            <Tag
              size="sm"
              variant="subtle"
              colorScheme="red"
              fontWeight="bold"
              _hover={{
                bgColor: "red.200",
                cursor: "pointer"
              }}
              _dark={{
                _hover: {
                  bgColor: "red.300",
                  cursor: "pointer",
                },
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
                  Are you sure? You can&apos;t undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      removeReadingList({ readingListId: readingList.id });
                      onClose();
                    }}
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
          {readingList.books.filter((book) => !book.isFinished).length > 0
            ? readingList.books
                .filter((book) => !book.isFinished)
                .slice(0, 2)
                .map((book) => <ReadingListBook book={book} key={book.id} />)
            : readingList.books
                .filter((book) => book.isFinished)
                .slice(0, 2)
                .map((book) => <ReadingListBook book={book} key={book.id} />)}
        </ul>
      </Stack>
    </Box>
  );
};
