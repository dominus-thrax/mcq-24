import { Box, Button, Heading } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

export default function Success() {
  const router = useRouter()
  return (
    <> 
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
         Your test has been submitted
      </Heading>
      <Button colorScheme="orange" onClick={() => router.push('/')}>Go Home</Button>
    </Box>
    </> 
  );
}