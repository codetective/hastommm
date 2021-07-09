import React from 'react';
import { Box, Text, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../../assets/hastom-logo.png';

export default function Logo(props) {
  return (
    <Box {...props}>
      <Text className="qfont" fontSize="lg" fontWeight="bold">
        <Link to="/">
          <Image src={logo} />
        </Link>
      </Text>
    </Box>
  );
}
