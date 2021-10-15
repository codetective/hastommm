import {
  Box,
  Center,
  IconButton,
  Text,
  Flex,
  Button,
  Avatar,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import {FaBars, FaChevronRight} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Header = ({ showSidebarButton = true, onShowSidebar }) => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(true);
  return (
      <Flex
          bg="#fefefe"
          p={4}
          height="68px"
          justifyContent="start"
          alignItems="center"
          position="sticky"
          top="0"
          zIndex="10"
      >
        <Box flex="" border="none !important"  px='0'>
          {showSidebarButton && (
              <IconButton

                  icon={<FaBars w={8} h={8} />}
                  colorScheme="blackAlpha"
                  variant="outline"
                  borderRadius="0"
                  px='0'
                  mr="3"
                  onClick={onShowSidebar}
              />
          )}
        </Box>
        <div flex="1" h="40px">
          <Text fontWeight="600" fontSize="xl">
            {pathname === '/' && 'Admin Panel'}
            {pathname === '/reports' && 'Manage Reports'}
            {pathname === '/users' && 'Users'}
            {pathname === '/subscriptions' && 'Subscriptions'}
            {pathname === '/cycle' && 'Farm Setup'}
            {pathname === '/items' && 'Farm Setup'}
            {pathname === '/item-type' && 'Farm Setup'}
            {pathname === '/add_blog_post' && 'Article'}
            {pathname === '/posts' && 'Article'}
            {pathname === '/categories' && 'Article'}
            {pathname === '/createadmin' && 'Manage Admins'}
          </Text>
        </div>
        <Flex
            alignItems={'flex-end'}
            w="fit-content"
            flexDir="column"
            flex="1"
            position="relative"
        >
          <Button
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              _focus={{
                outline: 'none',
                boxShadow: 'none',
              }}
              onClick={() => {
                setShow(!show);
              }}
          >
            <Avatar
                size="sm"
                src={
                  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                }
            />
          </Button>

          <Stack
              pos="absolute"
              top="100%"
              right="0"
              bg="white"
              py="4"
              width="100px"
              boxShadow="md"
              transition="all .4s ease"
              transform={show ? 'translateX(150%)' : 'translateX(0)'}
              display={show ? 'none' : 'flex'}
          >
            <Box
                w="full"
                py="2"
                _hover={{ background: 'gray.100' }}
                cursor="pointer"
                textAlign="center"
            >
              Logout
            </Box>
          </Stack>
        </Flex>
      </Flex>
  );
};

export default Header;
