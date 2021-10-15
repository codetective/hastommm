import { Box, Divider, HStack, Stack, Text } from '@chakra-ui/react';
import React from 'react';

export default function OverviewBox({ index, title, value, icon, iconColor }) {
  return (
    <HStack justifyContent="space-between">
      <Stack py="4">
        <Text as="small" textTransform="uppercase" color="textDark.100">
          {title}
        </Text>
        <HStack spacing="10px">
          <Text
            className="qfont"
            as="h3"
            fontSize={['23px', '25px']}
            color="textDarker.100"
          >
            {value}
          </Text>
          <Box as="span" color={iconColor} fontSize="20px">
            {icon}
          </Box>
        </HStack>
      </Stack>
      <Divider
        height="70% !important"
        width="1px"
        bg="gray.500"
        display={
          index === 0
            ? ['none', 'initial']
            : index === 1
            ? ['none', 'none', 'none', 'initial']
            : ['none', 'initial']
        }
      />
    </HStack>
  );
}
