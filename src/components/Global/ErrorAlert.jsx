import React from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Text,
} from '@chakra-ui/react';

export default function ErrorAlert({
  type,
  title,
  errorObject,
  message,
  retryFunc,
}) {
  return (
    <Alert
      status={type || 'error'}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg" className="qfont">
        {title}
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        {message}
        <br />{' '}
        <Button onClick={retryFunc} colorScheme="green" variant="outline">
          RETRY
        </Button>
        <br />
        <Text as="small" fontStyle="italic">
          {JSON.stringify(errorObject)}
        </Text>
      </AlertDescription>
    </Alert>
  );
}
