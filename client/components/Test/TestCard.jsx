import {
  Button,
  chakra,
  Flex,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import Router from "next/router";

// import logo from "../public/events_bg.png"

function TestCard(props) {
  const { fk_event, id, started, finished } = props;
  const onClick = () => {
    Router.push(`/test/${id}`);
  };
  const checkDates = () => {
    if (
      (new Date() - new Date(fk_event.end_time)) / 60000 < 0 &&
      (new Date() - new Date(fk_event.start_time)) / 60000 > 0
    ) {
      console.log("To check time in if", fk_event);
      return true;
    } else {
      console.log(
        "To check time ine else",
        fk_event,
        new Date() - new Date(fk_event.end_time)
      );
      console.log("start Time", new Date() - new Date(fk_event.start_time));
      return false;
    }
  };

  return (
    <Flex
      boxShadow={"lg"}
      width={"640px"}
      direction={{ base: "column-reverse", md: "row" }}
      rounded={"xl"}
      p={10}
      justifyContent={"space-around"}
      position={"relative"}
      bg={useColorModeValue("white", "blue.800")}
    >
      <Flex
        direction={"column"}
        textAlign={"left"}
        // justifyContent={"space-between"}
      >
        {/* TODO: Check test redirect */}
        {/* TODO: Code and image in question */}
        {/* TODO: Event Images */}
        {/* TODO: Style Countdown and final touchups */}
        <Text fontWeight={"bold"} fontSize={"4xl"}>
          {fk_event.name}
        </Text>
        {/* <Image src="events_bg.png" boxSize="25 50"></Image> */}
        <Text fontSize={"2xl"}>Time:</Text>
        {finished ? (
          <Text mt={3}>Already Attempted</Text>
        ) : (
          <Button
            mt={4}
            width={40}
            colorScheme={"orange"}
            disabled={checkDates() ? false : true}
            onClick={onClick}
          >
            Give Contest
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

export default TestCard;
