import type React from "react";
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
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useReadingListStore } from "~/store/ReadingListStore";
import { api } from "~/utils/api";

interface CreateReadingListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z
  .object({
    readingListName: z
      .string()
      .max(50, { message: "max length is 50 chars" })
      .min(2, { message: "min length is 2 chars" }),
  })
  .required();

type FormData = z.infer<typeof formSchema>;

export const CreateReadingListModal: React.FC<CreateReadingListModalProps> = ({
  isOpen,
  onClose,
}) => {
  const initialFocusRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialFocusRef}>
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
                {...register("readingListName")}
              />
              <FormErrorMessage>
                {errors.readingListName && errors.readingListName?.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter gap="2">
            <Button variant="outline" onClick={onClose}>
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
