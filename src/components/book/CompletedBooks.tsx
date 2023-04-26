import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Center,
  Heading,
  HStack,
  Badge,
} from "@chakra-ui/react";
import type { Book as IBook } from "@prisma/client";
import React from "react";
import { Book } from "./Book";

interface CompletedBooksProps {
  completedBooks: IBook[];
}

export const CompletedBooks: React.FC<CompletedBooksProps> = ({ completedBooks }) => {
  return (
    <Center>
      <Accordion allowToggle width="2xl" borderColor="gray.600" pb="10">
        <Box>
          <AccordionItem p="5">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <HStack spacing="3">
                  <Heading fontSize="lg">completed books</Heading>
                  <Badge
                    colorScheme="green"
                    fontSize="md"
                    px="2"
                    borderRadius="md"
                    variant="subtle"
                  >
                    {completedBooks.length}
                  </Badge>
                </HStack>
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <Box pt="4">
                {completedBooks.map((completedBook) => (
                  <Center>
                    <Box width="3xl" px="10">
                      <Book book={completedBook} />
                    </Box>
                  </Center>
                ))}
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Box>
      </Accordion>
    </Center>
  );
};
