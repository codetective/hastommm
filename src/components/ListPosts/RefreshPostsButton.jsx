import React from 'react';
import { Button } from '@chakra-ui/react';
import { MdRefresh } from 'react-icons/md';

export const RefreshPostsButton = props => {
  return (
    <Button
      size="sm"
      fontSize="md"
      aria-label={`refresh posts`}
      variant="solid"
      marginLeft="2"
      onClick={props.refreshPosts}
      rightIcon={<MdRefresh />}
      colorScheme="orange"
      bg="primary.100"
      position="fixed"
      bottom="30px"
      right="30px"
      color="white"
    >
      Refresh
    </Button>
  );
};
