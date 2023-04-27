import React from "react";
import { useRef } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useMergeRefs,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useReadingListStore } from "~/store/ReadingListStore";
import { consts } from "~/constants";

import { api } from "~/utils/api";

interface CreateReadingListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z
  .object({
    readingListName: z
      .string()
      .max(consts.READING_LIST_MAX_CHARS, {
        message: `max length is ${consts.READING_LIST_MAX_CHARS} chars`,
      })
      .min(consts.READING_LIST_MIN_CHARS, {
        message: `min length is ${consts.READING_LIST_MIN_CHARS} chars`,
      }),
  })
  .required();

type FormData = z.infer<typeof formSchema>;

export const CreateReadingListModal: React.FC<CreateReadingListModalProps> = ({
  isOpen,
  onClose,
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

  const { addReadingList } = useReadingListStore();

  const { mutate: createReadingList } = api.readingList.createReadingList.useMutation({
    onSuccess: (data) => {
      addReadingList(data);
    },
  });

  const onSubmit = (data: FormData): void => {
    createReadingList({ name: data.readingListName });
    reset();
    onClose();
  };

  const createRlRef = useRef(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>new reading list</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl isInvalid={Boolean(errors.readingListName)}>
              <FormLabel>list name</FormLabel>
              <Input
                type="text"
                placeholder="eg: self-help"
                variant="filled"
                focusBorderColor="teal.300"
                tabIndex={1}
                {...register("readingListName")}
                ref={useMergeRefs(createRlRef, register("readingListName").ref)}
              />
              <FormErrorMessage>
                {errors.readingListName && errors.readingListName?.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter gap="2">
            <Button
              variant="outline"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Close
            </Button>

            <Button variant="outline" type="submit" isLoading={isSubmitting}>
              create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
