import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const ReadingListPage: NextPage = () => {
  const router = useRouter();
  const { rlId } = router.query;

  return (
    <Box>
      hello {rlId}
    </Box>
  )
}

export default ReadingListPage;
