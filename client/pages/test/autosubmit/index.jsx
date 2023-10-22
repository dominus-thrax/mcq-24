import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
export default function AutoSubmission() {
  const router = useRouter();
  return (
    <Box textAlign="center" py={10} px={6}>
      <WarningTwoIcon boxSize={"50px"} color={"orange.300"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Your test has been auto submitted
      </Heading>
      <Button colorScheme="orange" onClick={() => router.push("/")}>Go Home</Button>
    </Box>
  );
}
