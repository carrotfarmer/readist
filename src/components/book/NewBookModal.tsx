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
  Center,
  Spinner,
} from "@chakra-ui/react";
import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "~/utils/api";
import { useBookStore } from "~/store/BookStore";
import { useReadingListStore } from "~/store/ReadingListStore";
import { IReadingList } from "~/types";

interface NewBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  rlId: string;
}

const formSchema = z.object({
  bookTitle: z.string(),
  author: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export const NewBookModal: React.FC<NewBookModalProps> = ({ isOpen, onClose, onOpen, rlId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
  });

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
              <Input id="title" placeholder="Thinking, Fast and Slow" {...register("bookTitle")} />
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
