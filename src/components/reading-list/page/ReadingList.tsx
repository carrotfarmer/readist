import { Box, Center, Heading } from '@chakra-ui/react';
import type React from 'react'
import { IReadingList } from '~/types';

interface ReadingListProps {
  readingList: IReadingList;
}

export const ReadingList: React.FC<ReadingListProps> = ({ readingList }) => {
  return (
    <Box pt="10">
      <Center>
        <Heading>
          {readingList.name}
        </Heading>
      </Center>
    </Box>
  )
}
