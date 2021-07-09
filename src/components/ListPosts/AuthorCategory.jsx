import { Box, Text, Link } from '@chakra-ui/react';

const AuthorCategory = props => {
  return (
    <Box id="author-category" className="qfont" pl={5}>
      <Text
        as={Link}
        href={`/blog/${props.category}`}
        // as="small"
        fontWeight="semibold"
        fontSize="14px"
        color="primary.100"
        textTransform="capitalize"
        textDecoration="none"
        _hover={{ textDecoration: 'none' }}
      >
        {props.category}
      </Text>
      <Text as="p" color="textDark.100" fontSize="15px">
        By {props.author}
      </Text>
    </Box>
  );
};

export default AuthorCategory;
