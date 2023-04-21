import React from "react";

import { Box, Button } from "@chakra-ui/react";
import { api } from "~/utils/api";

interface MainProps {}

export const Main: React.FC<MainProps> = ({}) => {
  const { mutate: createReadingList } = api.readingList.createReadingList.useMutation({}) 

  return (
    <Box pt="5">
      <Button onClick={() => createReadingList({ name: "fiction" })}>click me</Button>
    </Box>
  );
};

