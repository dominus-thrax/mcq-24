import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  useColorModeValue,
  Center,
  Text,
  HStack,
  Spacer,
  Stack,
  Image
} from "@chakra-ui/react";
import { SwitchThemeButton } from "./Util/SwitchTheme";
import { userLogout } from "../api/UserAPI";
import { useRouter } from "next/router";
import useSWR from "swr";
import { apiData } from "../util/apiData";
import { fetchData } from "../api/API";
function Nav() {
  const { data } = useSWR(`${apiData.url}auth/users/me`, fetchData, {
    refreshInterval: 0,
  });
  const router = useRouter();
  return (
    <>
      <Box bg={useColorModeValue("light.100", "blue.900")} p={4} h="15h">
        <Flex h="auto" alignItems={"center"} w="100%">
          <HStack spacing={7} w="100%">
            <Box>
              <Text fontWeight={800} color="orange.500" fontSize="3xl">
                Pulzion Tech-or-Treat
              </Text>
            {/* <Image src="homepage_logo.png" height="50px" alt="Pulzion logo"></Image> */}
            </Box>
            <Spacer />
            <SwitchThemeButton colorScheme="orange"/>
            {data && (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"} p="3">
                  <Center>
                    <Stack>
                      <div>{data.username}</div>
                      <Button
                        onClick={() => {
                          userLogout();
                          router.push("/");
                        }}
                        variant="ghost"
                        colorScheme="orange"
                      >
                        Logout
                      </Button>
                    </Stack>
                  </Center>
                </MenuList>
              </Menu>
            )}
          </HStack>
        </Flex>
      </Box>
    </>
  );
}

export default Nav;
