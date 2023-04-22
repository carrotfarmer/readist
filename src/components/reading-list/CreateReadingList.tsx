import { Button, useColorModeValue } from "@chakra-ui/react";
import type React from "react";
import { api } from "~/utils/api";
import { useReadingListStore } from "~/zustand/ReadingListStore";

export const CreateReadingList: React.FC = () => {
  const { addReadingList } = useReadingListStore();

  const { mutate: createReadingList } = api.readingList.createReadingList.useMutation({
    onSuccess: (data) => {
      addReadingList(data);
    },
  });
  return (
    <div>
      <Button
        boxSize="48"
        variant="outline"
        flex={1}
        px={4}
        fontSize={"sm"}
        rounded={"xl"}
        color={useColorModeValue("black", "white")}
        _hover={{
          bg: "teal.600",
          color: useColorModeValue("white", "white")
        }}
        _focus={{
          bg: "teal.600",
        }}
        onClick={() => createReadingList({ name: "Helo" })}
      >
        new reading list
      </Button>
    </div>
  );
};
