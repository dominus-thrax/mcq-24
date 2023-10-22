import {
  Box,
  Flex,
  Text,
  Container,
  HStack,
  SimpleGrid,
  useColorModeValue,
  Button,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Nav from "../Navbar";
import Question from "../Test/Question";
import { fetchData } from "../../api/API";
import useSWR from "swr";
import { apiData } from "../../util/apiData";
import Instruction from "../Test/Instruction";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { handleSubmission, sendAnswer } from "../../api/TestAPI";
import Countdown from "react-countdown";

function TestLayout() {
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;
  const [alert, setAlert] = useState(document.fullscreenElement);
  const [exitCount, setExitCount] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questions, setQuestions] = useState();
  const [isReviewed, setIsReviewed] = useState(false);

  // Renderer callback with condition
  const countDownRenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <></>;
    } else {
      // Render a countdown
      return (
        <span>
          {hours * 60 + minutes}:{seconds}
        </span>
      );
    }
  };

  //Alert Dialog
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  function getQuestion() {
    const { data, error } = useSWR(
      `${apiData.url}api/question/list/${id}`,
      fetchData
    );
    return {
      data: data,
      isLoading: !error && !data,
      isError: error,
    };
  }
  const { data, isLoading, isError } = getQuestion();
  useEffect(() => {
    setQuestions(data);
  }, [data]);
  useEffect(() => { }, [questions]);

  function toggleFullscreen() {
    document.documentElement.requestFullscreen();
    setAlert(false);
  }
  const onClick = (event) => {
    if (event === "next") {
      if (questionNumber < data.length - 1) {
        setQuestionNumber(questionNumber + 1);
      }
    } else if (event === "previous") {
      if (questionNumber > 0) {
        setQuestionNumber(questionNumber - 1);
      }
    } else if (event === "clear") {
      let temp = [...questions];
      temp[questionNumber].answer = null;
      sendAnswer(temp[questionNumber]).then(() => setQuestions(temp));
    } else if (event === "review") {
      let temp = [...questions];
      temp[questionNumber].review_status = !temp[questionNumber].review_status;
      sendAnswer(temp[questionNumber]).then(() => setQuestions(temp));
    } else if (event === "submit") {
      handleSubmission(id)
        .then(() => {
          Router.push("/test/submit");
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: "Test could'nt be submitted",
            status: "error",
            duration: 2000,
          });
        });
    }
  };
  const onSelectOption = (option) => {
    let temp = [...questions];
    temp[questionNumber].answer = option;
    sendAnswer(temp[questionNumber]).then(() => setQuestions(temp));
  };
  const colorFunction = (val) => {
    if (val.review_status) {
      return "yellow";
    } else if (val.answer !== null) {
      return "green";
    } else {
      return "blue";
    }
  };
  const onComplete = () => {
    handleSubmission(id)
      .then(() => {
        Router.push("/test/autosubmit");
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Test could'nt be submitted",
          status: "error",
          duration: 2000,
        });
      });
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", () => {
      setAlert(document.fullscreenElement);
      if (!document.fullscreenElement) {
        setExitCount(exitCount + 1);
      }
      if (exitCount === 3) {
        handleSubmission(id)
          .then((res) => {
            Router.push("/test/autosubmit");
          })
          .catch(() => {
            toast({
              title: "Error",
              description: "Test could'nt be submitted",
              status: "error",
              duration: 2000,
            });
          });
      }
    });
  }, [document.fullscreenElement]);

  if (isLoading) {
    return (
      <Center>
        <Spinner size="xl" />;
      </Center>
    );
  }

  if (isError) {
    return <Center>Questions not found</Center>;
  }

  return (
    <>
      {alert ? (
        <>
          <Nav />
          <Instruction />
          <Flex h="80.5vh">
            {/* Question section start */}

            <Box w="80%" px="2%">
              {questions && (
                <Question
                  question={questions[questionNumber]}
                  questionNumber={questionNumber}
                  onSelectOption={onSelectOption}
                />
              )}
            </Box>

            {/* Question section end */}

            {/* Side section for showing legends and question completion status */}

            <Container w={"20%"} px="2%" py={10} mt={6} height="auto">
              <Button
                colorScheme={"green"}
                onClick={onOpen}
                w="100%"

              >
                Submit Test
              </Button>

              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                      Submit Test
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure want to submit the test? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button colorScheme='green' onClick={() => onClick("submit")} ml={3}>
                        Submit
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>



              {/*  legends section start*/}
              <Countdown
                date={new Date(
                  data[0].fk_question.fk_event.end_time
                ).setMinutes(
                  new Date(data[0].fk_question.fk_event.end_time).getMinutes() -
                  .8
                )}
                renderer={countDownRenderer}
                onComplete={() => onComplete()}
              />
              <SimpleGrid columns={1} spacingX="40px" spacingY="20px">
                <Box
                  height="auto"
                  rounded={"lg"}
                  bg={useColorModeValue("white", "gray.700")}
                  boxShadow={"md"}
                  p={"6"}
                >
                  <Text fontSize="lg" fontWeight="bold"></Text>
                  <Text fontWeight={600} fontSize="2xl">
                    Questions
                  </Text>
                  <Center>
                    <SimpleGrid
                      columns={3}
                      mt={8}
                      spacingX="50px"
                      mb="8"
                      spacingY="10px"
                    >
                      {questions.map((val, index) => (
                        <Button
                          w="15%"
                          borderRadius={"3rem"}
                          borderWidth={2}
                          colorScheme={(questionNumber !== index) ? colorFunction(val) : "orange"}
                          key={index}
                          onClick={() => setQuestionNumber(index)}
                          variant={
                            (val.answer !== null || val.review_status) ? "solid" : "outline"
                          }
                        >
                          {index + 1}
                        </Button>
                      ))}
                    </SimpleGrid>
                  </Center>
                </Box>
              </SimpleGrid>

            </Container>
          </Flex>
          <HStack ml="3%">

            <Button
              colorScheme="red"
              variant="solid"
              onClick={() => onClick("clear")}
            >
              {" "}
              Clear{" "}
            </Button>
            <Button
              colorScheme={"yellow"}
              variant={!isReviewed ? "solid" : "outline"}
              onClick={() => {
                onClick("review");
                setIsReviewed(!isReviewed);
              }}
            >
              {(!isReviewed) ? <>Mark for Review</> : <>Marked for Review</>}
            </Button>
            <Button variant="outline" onClick={() => onClick("previous")}>
              <ArrowBackIcon /> Previous
            </Button>
            <Button variant="outline" onClick={() => onClick("next")}>
              Next <ArrowForwardIcon />
            </Button>

          </HStack>
        </>
      ) : (
        <Alert
          status="warning"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="100vh"
          backgroundColor={useColorModeValue("light.100", "dark.100")}
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Warning
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Test can only be given in Full Screen Mode
          </AlertDescription>
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={toggleFullscreen}
          >
            Full Screen
          </Button>
        </Alert>
      )
      }
    </>
  );
}

export default TestLayout;
