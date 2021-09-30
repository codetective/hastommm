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
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import Logo from '../Global/Logo';
import {
  FaListAlt,
  FaEdit,
  FaFolderPlus,
  FaClock,
  FaCalendar,
  FaLeaf,
  FaCalendarAlt,
  FaTractor,
  FaFileAlt, FaStamp, FaToolbox, FaTools
} from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import { SiGooglemessages } from 'react-icons/si';
import {GiFiles, GiGroundSprout} from 'react-icons/gi';
const dashLink = [
  {
    path: '/',
    link: 'Dashboard',
    icon: <MdDashboard />,
  },
  {
    path: '/users',
    link: 'Users',
    icon: <FaUserFriends />,
  },
  {
    path: '/subscriptions',
    link: 'Subscriptions ',
    icon: <GiGroundSprout />,
  },
  {
    path: '/reports',
    link: 'Reports ',
    icon: <FaFileAlt />,
  },
];
const links = [

  {
    path: '/posts',
    link: 'List Posts',
    icon: <FaListAlt />,
  },
  {
    path: '/add_blog_post',
    link: 'Create Blog Post',
    icon: <FaEdit />,
  },
  {
    path: '/categories',
    link: 'Blog Categories',
    icon: <FaFolderPlus />,
  },
];
const links2 = [
  {
    path: '/cycle',
    link: 'Manage cycles',
    icon: <FaCalendarAlt />,
  },
  {
    path: '/item-type',
    link: 'Farms Type',
    icon: <FaTractor />,
  },
  {
    path: '/items',
    link: 'Farms',
    icon: <FaLeaf />,
  },

];
const links3 = [
  {
    path: '/createadmin',
    link: 'Create Admin',
    icon: <FaToolbox />,
  },
  {
    path: '/settings',
    link: 'settings',
    icon: <FaTools />,
  },

];

const SidebarContent = ({ onClick }) => (
    <Box>
      <Flex
          alignItems="center"
          width="100%"
          height="70px"
          pl="30px"
          mb="30px"
      >
        <Logo />
      </Flex>
      <VStack width="100%" spacing="0" overflow="auto !important">
        {dashLink.map((link, i) => {
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
                  fontWeight="bold"
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

        <Accordion
            width="100%">
          <Divider my="5px" h="0.5px !important" opacity="0.1" />

          <AccordionItem border="none !important">
            <h2>
              <AccordionButton padding='10px 30px' >
                <Box  flex="1" textAlign="left"   >
                  Farms Setup
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel px="0" pb={4}>
              {links2.map((link, i) => {
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
                            padding: '0 45px',
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
            </AccordionPanel>
          </AccordionItem>

          <Divider my="5px" h="0.5px !important" opacity="0.1" />

          <AccordionItem border="none !important">
            <h2>
              <AccordionButton padding='10px 30px'>
                <Box flex="1" textAlign="left">
                  Articles
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel px="0" pb={4}>
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
                            padding: '0 45px',
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
            </AccordionPanel>
          </AccordionItem>

          <Divider my="5px" h="0.5px !important" opacity="0.1" />

          <AccordionItem border="none !important">
            <h2>
              <AccordionButton padding='10px 30px'>
                <Box flex="1" textAlign="left">
                  Management
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel px="0" pb={4}>
              {links3.map((link, i) => {
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
                            padding: '0 45px',
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
            </AccordionPanel>
          </AccordionItem>

        </Accordion>

      </VStack>
    </Box>
);

const Sidebar = ({ isOpen, variant, onClose }) => {
  return variant === 'sidebar' ? (
      <Box
          position="fixed"
          overflow="auto !important"
          left={0}
          w="250px"
          zIndex="20"
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
