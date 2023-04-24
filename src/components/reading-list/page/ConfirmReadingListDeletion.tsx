import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import type React from "react";

interface DeleteReadingListInput {
  readingListId: string;
}

interface ConfirmReadingListDeletionProps {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: React.RefObject<HTMLInputElement>;
  rlId: string;
  deleteRl: (args: DeleteReadingListInput) => void;
}

export const ConfirmReadingListDeletion: React.FC<ConfirmReadingListDeletionProps> = ({
  isOpen,
  onClose,
  cancelRef,
  deleteRl,
  rlId,
}) => {
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Reading List
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

          <AlertDialogFooter>
            {/* FIX: LegacyRefObject<HTMLButtonElement> | undefined */}
            {/* @ts-ignore */}
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={() => deleteRl({ readingListId: rlId })} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
