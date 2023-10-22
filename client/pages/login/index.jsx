import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Center,
  useToast,
} from "@chakra-ui/react";

import { useState } from "react";
import { SwitchThemeButton } from "../../components/Util/SwitchTheme";
import Router from "next/router";
import { userLogin } from "../../api/UserAPI";

function Loginpage() {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [email, setEmail] = useState("");
  const toast = useToast();
  const [password, setPassword] = useState("");

  function validate(email) {
    return re.test(email.toLowerCase());
  }

  function onSubmit() {
    // if (!validate(email)) {
    //   toast({
    //     title: "Error",
    //     description: "Invalid Email",
    //     status: "error",
    //     duration: 2000,
    //   });
    //   return;
    // }
    userLogin(email, password)
      .then((res) => {
        Router.push("/tests");
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Invalid Email or Password",
          status: "error",
          duration: 2000,
        });
      });
  }

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "blue.800")}
      >
        <Stack spacing={"8"} maxW={"max"} mx={"auto"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"md"}
            p={"8"}
          >
            <Stack spacing={"8"}>
              <FormControl id="email" isRequired>
                <FormLabel fontWeight={"semibold"}>Email Address</FormLabel>
                <Input
                  type={"email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel fontWeight={"semibold"}>Password</FormLabel>
                <Input
                  type={"password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>

              <Button
              colorScheme="orange"
                // bg={"orange.400"}
                // color={"white"}
                // _hover={{
                //   bg: "orange.500",
                // }}
                onClick={onSubmit}
              >
                Sign in
              </Button>
            </Stack>
          </Box>

          <Center>
            <SwitchThemeButton />
          </Center>
        </Stack>
      </Flex>
    </>
  );
}

export default Loginpage;
