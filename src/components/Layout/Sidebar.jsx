import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerBody,
  DrawerContent,
  VStack,
  Flex,
  HStack,
  Text,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import Logo from '../Global/Logo';
import { FaHome, FaListAlt, FaEdit } from 'react-icons/fa';
const links = [
  {
    path: '/',
    link: 'Articles',
    icon: <FaListAlt />,
  },

  {
    path: '/add_blog_post',
    link: 'Create Blog Post',
    icon: <FaEdit />,
  },
];
// {
//   path: '/posts',
//   link: 'List Posts',
//   icon: <FaListAlt />,
// },

const SidebarContent = ({ onClick }) => (
  <Box>
    <Flex
      alignItems="center"
      borderBottom="1px solid"
      borderColor="gray.100"
      width="100%"
      height="70px"
      pl="30px"
    >
      <Logo />
    </Flex>
    <VStack width="100%" spacing="0">
      {links.map((link, i) => {
        return (
          <Button
            key={i}
            display="block"
            size="lg"
            variant="flushed"
            _hover={{
              bg: 'gray.100',
            }}
            onClick={onClick}
            w="100%"
            rounded="0"
            fontWeight="light"
            h="60px"
            fontSize="16px"
            px="0"
          >
            <NavLink
              exact
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                padding: '0 30px',
              }}
              activeStyle={{
                background: '#f5f5f7',
                color: 'green',
              }}
              to={link.path}
            >
              <HStack as="span" spacing="10px">
                {link.icon}
                <Text>{link.link}</Text>
              </HStack>
            </NavLink>
          </Button>
        );
      })}
    </VStack>
  </Box>
);

const Sidebar = ({ isOpen, variant, onClose }) => {
  return variant === 'sidebar' ? (
    <Box
      position="fixed"
      left={0}
      w="200px"
      top={0}
      h="100%"
      bg="white"
      shadow="lg"
    >
      <SidebarContent onClick={onClose} />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody px="0">
            <SidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default Sidebar;
