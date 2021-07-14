import { Center, Box, SlideFade, Text, Stack, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useEffect } from 'react';

function SubscriptionOverview(props) {
  //eslint-disable-next-line
  const [subs, setSubs] = useState({ cancelled: 45, expired: 80, active: 125 });
  const [loading, setLoading] = useState([]);
  const [chartData, setChartData] = useState(null);
  const serializeChartData = () => {
    setLoading(true);
    let labels = Object.keys(subs);
    let data = Object.values(subs);
    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Subscriptions',
          backgroundColor: [
            '#B21F00',
            '#C9DE00',
            '#2FDE00',
            '#00A6B4',
            '#6800B4',
          ],
          hoverBackgroundColor: [
            '#501800',
            '#4B5000',
            '#175000',
            '#003350',
            '#35014F',
          ],
          borderWidth: 5,
          data: data,
        },
      ],
    });
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  };

  useEffect(() => {
    serializeChartData();
    //eslint-disable-next-line
  }, []);
  return (
    <SlideFade
      in
      style={{
        display: 'flex',
      }}
    >
      <Stack
        bg="white"
        rounded="lg"
        shadow="sm"
        w="100%"
        _hover={{
          shadow: 'xl',
        }}
      >
        <Box
          px="4"
          py="2"
          borderBottom="1px solid"
          borderBottomColor="gray.100"
        >
          <Text>Subscription Overview</Text>
        </Box>

        <Center py="5" px={[10, '40px', 10, '40px']} flexDir="column" m="auto">
          {!loading && chartData !== null && (
            <>
              <Pie
                data={chartData}
                options={{
                  title: {
                    display: true,
                    text: 'Subcriptions',
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: 'bottom',
                  },
                }}
              />

              <Text>
                Total :{' '}
                {Object.keys(subs).reduce((acc, value) => acc + subs[value], 0)}{' '}
                Subs.
              </Text>
            </>
          )}
          {loading && <Spinner size="lg" />}
        </Center>
      </Stack>
    </SlideFade>
  );
}

export default SubscriptionOverview;
