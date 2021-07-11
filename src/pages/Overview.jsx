import {
  Box,
  Center,
  SimpleGrid,
  Stack,
  Text,
  Icon,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import PageTitle from '../components/Global/PageTitle';
import { ImNewspaper } from 'react-icons/im';
import { FaUserFriends } from 'react-icons/fa';
import { SiGooglemessages } from 'react-icons/si';
import { GiGroundSprout } from 'react-icons/gi';
import OverviewCard from '../components/Overview/OverviewCard';

export default function Overview() {
  return (
    <Box pb="50px">
      <PageTitle category={'Overview'} title="Dashboard" />
      {/* <SimpleGrid columns={[1, 1, 2, 2]}> */}
      <SimpleGrid columns={[1, 2, 2, 4]} spacing="3">
        <OverviewCard
          pageLink="/posts"
          title="Blog posts"
          icon={ImNewspaper}
          stat={159}
        />
        <OverviewCard
          pageLink="/subscriptions"
          title="Active Subscriptions"
          icon={GiGroundSprout}
          stat={55}
        />
        <OverviewCard
          pageLink="/messages"
          title="Messages"
          icon={SiGooglemessages}
          stat={115}
        />
        <OverviewCard
          pageLink="/users"
          title="users"
          icon={FaUserFriends}
          stat={100}
        />
        {/* </SimpleGrid> */}
      </SimpleGrid>
    </Box>
  );
}
