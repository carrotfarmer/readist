import type React from "react";
import { type MutableRefObject } from "react";

import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useMergeRefs,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import type { Book } from "@prisma/client";
import { api } from "~/utils/api";

import { consts } from "~/constants";

interface EditBookFormProps {
  editRef: MutableRefObject<null>;
  onCancel: () => void;
  book: Book;
}

const formSchema = z
  .object({
    newTitle: z
      .string()
      .min(consts.BOOK_TITLE_MIN_CHARS, {
        message: `min length for the book title is ${consts.BOOK_TITLE_MIN_CHARS} chars`,
      })
      .max(consts.BOOK_TITLE_MAX_CHARS, {
        message: `max length for book title is ${consts.BOOK_TITLE_MAX_CHARS} chars`,
      }),

    newAuthor: z
      .string()
      .min(consts.BOOK_AUTHOR_MIN_CHARS, { message: "min length for the author is 2 chars" })
      .max(consts.BOOK_AUTHOR_MAX_CHARS, { message: "max length for the author is 200 chars" }),
  })
  .required();

type FormData = z.infer<typeof formSchema>;

export const EditBookForm: React.FC<EditBookFormProps> = ({ editRef, onCancel, book }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
  });

  const { mutate: editBook } = api.book.editBook.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });

  const onSubmit = (data: FormData) => {
    editBook({ bookId: book.id, newTitle: data.newTitle, newAuthor: data.newAuthor });
  };

  return (
    <Stack spacing={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.newTitle)}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            variant="filled"
            focusBorderColor="teal.300"
            tabIndex={1}
            placeholder="Thinking, Fast and Slow"
            defaultValue={book.name}
            {...register("newTitle")}
            ref={useMergeRefs(editRef, register("newTitle").ref)}
          />
          <FormErrorMessage>{errors.newTitle && errors.newTitle?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.newAuthor)} pt="4%">
          <FormLabel>Author</FormLabel>
          <Input
            type="text"
            placeholder="eg: Daniel Kahneman"
            variant="filled"
            focusBorderColor="teal.300"
            tabIndex={1}
            defaultValue={book.author}
            {...register("newAuthor")}
          />
          <FormErrorMessage>{errors.newAuthor && errors.newAuthor?.message}</FormErrorMessage>
        </FormControl>

        <ButtonGroup display="flex" justifyContent="flex-end" pt="4%">
          <Button
            variant="outline"
            onClick={() => {
              reset();
              onCancel();
            }}
            tabIndex={3}
          >
            Cancel
          </Button>
          <Button variant="outline" isLoading={isSubmitting} type="submit">
            Edit
          </Button>
        </ButtonGroup>
      </form>
    </Stack>
  );
};
