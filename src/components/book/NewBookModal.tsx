import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  ButtonGroup,
  useMergeRefs,
} from "@chakra-ui/react";
import React, { useRef } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { api } from "~/utils/api";

import { useBookStore } from "~/store/BookStore";
import { consts } from "~/constants";

interface NewBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  rlId: string;
}

const formSchema = z
  .object({
    bookTitle: z
      .string()
      .min(consts.BOOK_TITLE_MIN_CHARS, {
        message: `min length for the book title is ${consts.BOOK_TITLE_MIN_CHARS} chars`,
      })
      .max(consts.BOOK_TITLE_MAX_CHARS, {
        message: `max length for book title is ${consts.BOOK_TITLE_MAX_CHARS} chars`,
      }),

    author: z
      .string()
      .min(consts.BOOK_AUTHOR_MIN_CHARS, { message: "min length for the author is 2 chars" })
      .max(consts.BOOK_AUTHOR_MAX_CHARS, { message: "max length for book title is 200 chars" }),
  })
  .required();

type FormData = z.infer<typeof formSchema>;

export const NewBookModal: React.FC<NewBookModalProps> = ({ isOpen, onClose, rlId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
  });

  const newBookRef = useRef(null);

  const { addBook } = useBookStore();

  const { mutate: newBook } = api.book.createBook.useMutation({
    onSuccess: (data) => {
      addBook(data);
    },
  });

  const onSubmit = (data: FormData) => {
    newBook({ bookName: data.bookTitle, bookAuthor: data.author, rlId });
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Book</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="title">Book Title</FormLabel>
              <Input
                id="title"
                placeholder="Thinking, Fast and Slow"
                tabIndex={1}
                {...register("bookTitle")}
                ref={useMergeRefs(newBookRef, register("bookTitle").ref)}
              />
              <FormErrorMessage>
                {errors.bookTitle && errors.bookTitle?.message?.toString()}
              </FormErrorMessage>
            </FormControl>

            <FormControl pt="4%">
              <FormLabel htmlFor="title">Author</FormLabel>
              <Input id="title" placeholder="Daniel Kahneman" {...register("author")} />
              <FormErrorMessage>
                {errors.author && errors.author?.message?.toString()}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button variant="ghost" colorScheme="twitter" onClick={onClose}>
                Close
              </Button>
              <Button variant="outline" type="submit" isLoading={isSubmitting}>
                Add
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
