import {
  Container,
  SimpleGrid,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Divider,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import React from "react";

export default function Question({ question, questionNumber, onSelectOption }) {
  return (
    <Container ml="0" mt={24}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={"uppercase"}
            color={"blue.400"}
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("blue.50", "blue.900")}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            Question No {questionNumber + 1}
          </Text>
          <Text
            fontSize="2xl"
            style={{ whiteSpace: "pre-line", textAlign: "left" }}
          >
            {question?.fk_question.statement}
          </Text>
          {/* {question?.fk_question.image_url ? (
            <img
              src={question?.fk_question.image_url}
              alt="question_image"
            ></img>
          ) : (
            <p>No Image</p>
          )} */}
        </Stack>

        <Flex>
          <Divider
            orientation="vertical"
            marginLeft="2"
            borderColor={useColorModeValue("gray.300", "gray.700")}
          ></Divider>
          <SimpleGrid ml="6" columns={1} spacingX="20px" spacingY="20px">
            <RadioGroup
              onChange={(e) => {
                onSelectOption(e);
              }}
              value={question.answer !== null ? question.answer.toString() : ""}
            >
              <Stack direction="column" spacing={16} mt="16">
                {question.fk_question.options.map((option, index) => (
                  <Radio key={index} value={index.toString()}>
                    <Text fontWeight={600} fontSize="x-large" ml="4">
                      {option}
                    </Text>
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </SimpleGrid>
        </Flex>
      </SimpleGrid>

      {/* <Button
          marginTop={24}
          ml={4}
          onClick={() => Router.push("/testsubmission")}
        >
          Submit Test
    </Button> */}
    </Container>
  );
}
