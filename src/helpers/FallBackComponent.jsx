import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
} from '@chakra-ui/react';
import React from 'react';

function FallBackComponent(props) {
  return (
    <Alert
      height="fit-content"
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg" className="qfont">
        Something went wrong!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        {props.error.message}
        <br />{' '}
        <Button
          onClick={props.resetErrorBoundary}
          colorScheme="green"
          variant="outline"
        >
          RETRY
        </Button>
      </AlertDescription>
    </Alert>
  );
}

export default FallBackComponent;
