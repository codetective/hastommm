import React from 'react';
import { Heading, Stack, Text } from '@chakra-ui/react';

export default function PageTitle({ category, title }) {
  return (
    <Stack
      w="100%"
      alignItems="flex-start"
      flexDir="column"
      justifyContent="center"
      pb="5"
    >
      <Text
        as="p"
        color="#3eb900"
        fontWeight="600"
        letterSpacing="0"
        whiteSpace="nowrap"
        fontSize="14px"
        p={0}
      >
        {category}
      </Text>

      <Heading
        className="qfont"
        as="h2"
        fontSize={['24px', '28px']}
        fontWeight=" 500"
        letterSpacing="0"
        lineHeight="1.4"
        color="textDark.100"
        mb="5"
        p={0}
      >
        <span className="span">{title}</span>
      </Heading>
    </Stack>
  );
}
