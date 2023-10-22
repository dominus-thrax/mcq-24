import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  useColorModeValue,
  Spinner,
  css,
} from "@chakra-ui/react";
import Nav from "../../components/Navbar";
import useSWR from "swr";
import { apiData } from "../../util/apiData";
import { getEvents } from "../../api/UserAPI";

import TestCard from "../../components/Test/TestCard";
import { useRouter } from "next/router";
import { fetchData } from "../../api/API";
export default function availableTests() {
  const router = useRouter();

  const { data: userData } = useSWR(`${apiData.url}auth/users/me`, fetchData, {
    refreshInterval: 0,
  });

  function getEvent() {
    const { data, error } = useSWR(`${apiData.url}api/event/list`, getEvents);
    return {
      data: data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  const { data, isLoading, isError } = getEvent();
  if (isLoading) {
    return <Spinner size="xl" />;
  }
  if (isError) {
    return <div>Error Loading</div>;
  }
  const redirect = () => {
    router.push("/");
  };


  return (
    <div >
      <Nav />
      {userData &&
        <Flex
          // color = "orange.300"
          color={useColorModeValue("orange.500", "orange.300")}
          textAlign={"center"}
          pt={3}
          justifyContent={"center"}
          direction={"column"}
          width={"full"}
        >
          <Box width={{ base: "full", sm: "lg", lg: "xl" }} margin={"auto"}>
            <chakra.h1
              py={5}
              fontSize={48}
              fontWeight={"bold"}
              color={useColorModeValue("orange.600", "orange.200")}
            >
              Registered Contests
            </chakra.h1>
          </Box>
          <SimpleGrid
            columns={{ base: 1, xl: 2 }}
            spacing={"20"}
            mt={16}
            mx={"auto"}
          >
            {data.map((cardInfo, index) => (
              <TestCard {...cardInfo} index={index} />
            ))}
          </SimpleGrid>
        </Flex>
      }
    </div>
  );
}
