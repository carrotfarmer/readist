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

import React from "react";
import type { MutableRefObject } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { api } from "~/utils/api";

interface EditReadingListFormProps {
  editRef: MutableRefObject<null>;
  onCancel: () => void;
  rlId: string;
}

const formSchema = z
  .object({
    newRlName: z
      .string()
      .max(50, { message: "max length is 50 chars" })
      .min(2, { message: "min length is 2 chars" }),
  })
  .required();

type FormData = z.infer<typeof formSchema>;

export const EditReadingListForm: React.FC<EditReadingListFormProps> = ({
  editRef,
  onCancel,
  rlId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
  });

  const { mutate: editReadingListName } = api.readingList.editReadingListName.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });

  const onSubmit = (data: FormData): void => {
    editReadingListName({ readingListId: rlId, newName: data.newRlName });
    reset();
    onCancel();
  };

  return (
    <Stack spacing={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.newRlName)}>
          <FormLabel>new reading list name</FormLabel>
          <Input
            type="text"
            placeholder="eg: non fiction"
            variant="filled"
            focusBorderColor="teal.300"
            tabIndex={1}
            {...register("newRlName")}
            ref={useMergeRefs(editRef, register("newRlName").ref)}
          />
          <FormErrorMessage>{errors.newRlName && errors.newRlName?.message}</FormErrorMessage>
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
          <Button colorScheme="yellow" isLoading={isSubmitting} type="submit">
            Edit
          </Button>
        </ButtonGroup>
      </form>
    </Stack>
  );
};
