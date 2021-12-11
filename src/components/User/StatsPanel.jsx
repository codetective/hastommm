import React from 'react';
import {
  Box,
  Container,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import {FaAddressCard, FaChartBar, FaChartLine, FaChartPie, FaEnvelope, FaMapPin} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import OverviewBox from './OverviewBox';
import {GiGroundSprout} from "react-icons/gi";

export default function StatsPanel({totalprofit, totalcapital, totalpacks, email, location, phone}) {
  return (
    <Box bg="gray.100" border="1px solid #efefef">
      <Container maxW="container.xl" px={8} py={1} >
        <SimpleGrid columns={[1, 2, 2, 4]} spacing="20px">
          <OverviewBox
            iconColor="green.600"
            icon={<FaChartPie />}
            title="capital invested"
            value={totalcapital}
            index={0}
          />

          <OverviewBox
            iconColor="green.400"
            icon={<FaChartLine />}
            title="overall profits"
            value={totalprofit}
            index={1}
          />

          <OverviewBox
            iconColor="secondary.100"
            icon={<GiGroundSprout />}
            title="Total Farm Packs"
            value={totalpacks}
            index={2}
          />

          <Stack py="4">
            <HStack spacing="10px">
              <FaEnvelope className='text-success'/>
              <Text as="small" className="afont" mx="0">
                {email}
              </Text>
            </HStack>
            <b>{phone}</b>
            <HStack spacing="10px">
              <FaMapPin/>
              <Text as="small">{location}</Text>
            </HStack>

          </Stack>
        </SimpleGrid>

      </Container>
    </Box>
  );
}
