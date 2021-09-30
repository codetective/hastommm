import { Center, Flex, Icon, SlideFade, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function OverviewCard({ title, stat, icon, pageLink }) {
  return (
    <SlideFade
      in
      style={{
        display: 'flex',
      }}
    >
      <Flex
        as={Link}
        to={pageLink}
        bg="white"
        shadow="sm"
        borderRadius="2"
        px={[5, 4, 3, 4]}
        py="6"
        w="100%"
        _hover={{
          shadow: 'xl',
        }}
      >
        <Center flexDir="column" w="100%">
          <Text
            as="small"
            textTransform="uppercase"
            fontWight="600"
            color="textDark.100"
            className="qfont"
          >
            {title}
          </Text>
          <Text color="textDarker.100" className="afont" as="p" fontSize="2rem">
            {stat}
          </Text>
        </Center>
        <Center
          pl="3"
          borderLeft="1px solid"
          borderLeftColor="secondaryLight.100"
        >
          <Icon as={icon} fontSize="2rem" color="secondary.100" />
        </Center>
      </Flex>
    </SlideFade>
  );
}
