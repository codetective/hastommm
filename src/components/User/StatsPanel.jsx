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

export default function StatsPanel() {
  return (
    <Box bg="gray.100" border="1px solid #efefef">
      <Container maxW="container.xl" px={8} py={1} >
        <SimpleGrid columns={[1, 2, 2, 4]} spacing="20px">
          <OverviewBox
            iconColor="green.600"
            icon={<FaChartPie />}
            title="capital invested"
            value="$5900.00"
            index={0}
          />

          <OverviewBox
            iconColor="green.400"
            icon={<FaChartLine />}
            title="overall profits"
            value="$950.00"
            index={1}
          />

          <OverviewBox
            iconColor="secondary.100"
            icon={<GiGroundSprout />}
            title="Total Farm Packs"
            value="4"
            index={2}
          />

          <Stack py="4">
            <HStack spacing="10px">
              <FaEnvelope className='text-success'/>
              <Text as="small" className="afont" mx="0">
                omololadaniel@gmail.com
              </Text>
            </HStack>
            <b>08149423902</b>
            <HStack spacing="10px">
              <FaMapPin/>
              <Text as="small">Lagos</Text>
            </HStack>

          </Stack>
        </SimpleGrid>

      </Container>
    </Box>
  );
}
