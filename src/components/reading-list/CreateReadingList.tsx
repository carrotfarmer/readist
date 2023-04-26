import { Button, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import type React from "react";

import { CreateReadingListModal } from "../reading-list/CreateReadingListModal"

export const CreateReadingList: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
      <CreateReadingListModal isOpen={isOpen} onClose={onClose} />
      <Button
        boxSize={["32", "36", "56"]}
        variant="outline"
        flex={1}
        px={4}
        p="2"
        fontSize="md"
        rounded={"xl"}
        color={useColorModeValue("black", "white")}
        _hover={{
          bg: "teal.600",
          color: useColorModeValue("white", "white")
        }}
        _focus={{
          bg: "teal.600",
        }}
        onClick={onOpen}
      >
        new reading list
      </Button>
    </div>
  );
};
