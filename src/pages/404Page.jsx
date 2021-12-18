import { Center, Stack, Text } from '@chakra-ui/react';
import React from 'react';

export default function NotFoundPage() {
  return (
    <Center minHeight="70vh" pos="relative" py="80px">
      <Stack p="8" shadow="sm" rounded="0px" bg="gray.50">
        <Center flexDir="column">
          <Text
            className="afont"
            color="red.500"
            fontWeight="500"
            fontSize="100px !important"
          >
            404!
          </Text>
          <Text fontSize="20px">
            Sorry, the page you're looking for does not exist or has been
            removed
          </Text>
        </Center>
      </Stack>
    </Center>
  );
}
