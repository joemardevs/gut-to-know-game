import { useEffect, useState } from "react";
import MasterLayout from "../../Layouts/MasterLayout";
import {
  Badge,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaExclamation, FaMap } from "react-icons/fa";
import { IoIosExit } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import Loading from "../../Components/Loading";
import { useAuth } from "../../Context/AuthContext";

const Level = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { level } = useParams();
  const toast = useToast();
  const { user } = useAuth();
  const [isPageLoading, , disabledLoading] = useToggle(true);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  const getQuestions = async () => {
    try {
      console.log("Fetching questions", level);
      if (!user?.token) return;
      const response = await fetch(`/api/question/level/${level}`, {
        headers: {
          x_auth_token: user?.token,
        },
      });
      const data = await response.json();

      if (!data?.success) {
        throw data;
      }

      const shuffledQuestions = shuffleArray(data.questions)
        .sort((a, b) => a.isAnswered - b.isAnswered)
        .reverse();

      setQuestions(shuffledQuestions);
    } catch (error) {
      console.log("Error fetching questions: ", error.message);
      setError(error);
    }
  };

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleQuestionClick = (question, questionIndex) => {
    console.log("Question clicked", questionIndex);
    console.log("Question isAnswered", question.isAnswered);
    console.log(
      "Previous question isAnswered",
      questions[questionIndex - 1]?.isAnswered
    );
    if (!question.isAnswered && !questions[questionIndex - 1]?.isAnswered) {
      return toast({
        title: "Question cannot be opened",
        description: "Please answer the previous question first",
        status: "warning",
        duration: 5000,
        position: "top",
      });
    }
  };
  setTimeout(() => {
    disabledLoading();
  }, 1000);

  useEffect(() => {
    document.title = "Level 1";
    getQuestions();
  }, [user]);

  if (error) {
    return (
      <MasterLayout>
        <Text color="white">Error: {error.message}</Text>
      </MasterLayout>
    );
  }

  return isPageLoading ? (
    <Loading />
  ) : (
    <MasterLayout
      wrapperStyle={{
        backgroundImage: "url('/assets/level_one_bg.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1.5rem",
      }}>
      <Box flex="1">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          bg="grey"
          gap="1rem"
          px="5"
          py="1"
          rounded="5">
          <Badge colorScheme="yellow">Level 1</Badge>
          <Text color="white" fontSize=".80em">
            Organs of the Digestive System and their Interaction with Organs of
            the Respiratory, Circulatory, and Excretory Systems
          </Text>
        </Stack>

        <Wrap justify="center" mt="5" spacing="2rem">
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <WrapItem key={question._id}>
                {(!question.isAnswered && questions[index - 1]?.isAnswered) ||
                question.isAnswered ? (
                  <Button
                    as={Link}
                    to={`/play/level/${question.level}/question/${index + 1}/${
                      question._id
                    }`}
                    w="6rem"
                    h="6rem"
                    colorScheme={
                      question.isAnswered
                        ? question?.isQuestionAnsweredCorrect
                          ? "green"
                          : "red"
                        : null
                    }
                    rounded="5"
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Text color="black" fontSize="1.5em" fontWeight="bold">
                      {index + 1}
                    </Text>
                  </Button>
                ) : (
                  <Button
                    w="6rem"
                    h="6rem"
                    colorScheme={
                      question.isAnswered
                        ? question?.isQuestionAnsweredCorrect
                          ? "green"
                          : "red"
                        : null
                    }
                    bg={!question.isAnswered ? "grey" : null}
                    _active={{ bg: "grey" }}
                    _hover={{ bg: "grey" }}
                    onClick={() => handleQuestionClick(question, index)}
                    rounded="5"
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Text color="black" fontSize="1.5em" fontWeight="bold">
                      {index + 1}
                    </Text>
                  </Button>
                )}
                {/* <Button
                  as={
                    (!question.isAnswered &&
                      questions[index - 1]?.isAnswered) ||
                    question.isAnswered
                      ? Link
                      : null
                  }
                  to={`/play/level/${question.level}/question/${index + 1}/${
                    question._id
                  }`}
                  w="6rem"
                  h="6rem"
                  colorScheme={
                    question.isAnswered
                      ? question?.isQuestionAnsweredCorrect
                        ? "green"
                        : "red"
                      : null
                  }
                  onClick={() => handleQuestionClick(question, index + 1)}
                  rounded="5"
                  display="flex"
                  justifyContent="center"
                  alignItems="center">
                  <Text color="black" fontSize="1.5em" fontWeight="bold">
                    {index + 1}
                  </Text>
                </Button> */}
              </WrapItem>
            ))
          ) : (
            <Text color="white">No questions found</Text>
          )}
        </Wrap>
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        justify="center"
        gap="1rem"
        px="5"
        py="1">
        <Button
          onClick={onOpen}
          size="sm"
          colorScheme="green"
          leftIcon={<FaExclamation />}>
          About level
        </Button>
        <Button
          onClick={() => navigate(-1)}
          size="sm"
          colorScheme="orange"
          leftIcon={<FaMap />}>
          Open Map
        </Button>
        <Button
          as={Link}
          to="/"
          size="sm"
          colorScheme="red"
          leftIcon={<IoIosExit />}>
          Exit Game
        </Button>
      </Stack>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="scale"
        size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>About Level 1</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text textAlign="justify">
              In this level, get ready to demonstrate your knowledge of the
              organs of the digestive system and their functions, along with the
              processes involved. But wait, there's more! You will also explore
              the interactions between the digestive system and other organ
              systems in the body such as respiratory, circulatory, and
              excretory systems. Are you ready to level up your understanding of
              how these systems work together? Let’s ace this challenge!
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </MasterLayout>
  );
};

export default Level;
