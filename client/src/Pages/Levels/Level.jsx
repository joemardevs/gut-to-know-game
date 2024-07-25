import { useEffect, useState } from "react";
import MasterLayout from "../../Layouts/MasterLayout";
import {
  Badge,
  Box,
  Button,
  Img,
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
import { BACKEND_URL } from "../../config";

const Level = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { level } = useParams();
  const toast = useToast();
  const { user } = useAuth();
  const [isPageLoading, , disabledLoading] = useToggle(true);
  const [levelData, setLevelData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [trophy, setTrophy] = useState(null);

  const fetchLevel = async () => {
    try {
      if (!user?.token) return;

      const [levelRes, questionsRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/level/${level}`, {
          headers: {
            x_auth_token: user?.token,
          },
        }),
        fetch(`${BACKEND_URL}/api/question/level/${level}`, {
          headers: {
            x_auth_token: user?.token,
          },
        }),
      ]);

      const [levelData, questionsData] = await Promise.all([
        levelRes.json(),
        questionsRes.json(),
      ]);

      if (!levelData?.success || !questionsData?.success) {
        throw levelData || questionsData;
      }

      setLevelData(levelData);
      // Separate the questions based on whether they are answered or not
      const answeredQuestions = questionsData.questions.filter(
        q => q.isAnswered === true
      );
      const unansweredQuestions = questionsData.questions.filter(
        q => q.isAnswered === false
      );

      // Shuffle the unanswered questions
      const shuffledUnansweredQuestions = shuffleArray(unansweredQuestions);

      // Combine the shuffled unanswered questions with the answered questions and sort them based on whether they are answered or not and then reverse the order
      const combinedQuestions = [
        ...shuffledUnansweredQuestions,
        ...answeredQuestions,
      ]
        .sort((a, b) => a.isAnswered - b.isAnswered)
        .reverse();

      setQuestions(combinedQuestions);
    } catch (error) {
      console.log("Error fetching questions: ", error.message);
      setError(error);
    }
  };

  const fetchUserTrophy = async () => {
    try {
      if (!user?.token) return;

      const response = await fetch(`${BACKEND_URL}/api/trophy/my-trophy`, {
        headers: {
          x_auth_token: user?.token,
        },
      });

      const data = await response.json();

      if (!data.success) {
        throw data;
      }

      setTrophy(data.trophy);
    } catch (error) {
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
    document.title = `Level ${level}`;
    fetchLevel();
    fetchUserTrophy();
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
        backgroundImage: `url(/assets/level_${level}_bg.png)`,
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
          bg="rgba(0,0,0,0.5)"
          gap="1rem"
          p="5">
          <Img src="/assets/logo_main.png" w="50px" />
          <Badge colorScheme="yellow" fontSize=".5em">
            Level {levelData?.level?.level || "N/A"}
          </Badge>
          <Text color="white" fontSize=".65em">
            {levelData?.level?.header || "N/A"}
          </Text>
          <Box display="flex" alignItems="center">
            <Text color="white" fontSize="1rem">
              {trophy || "N/A"}
            </Text>
            <Img src="/assets/trophy.png" w="75px" />
          </Box>
        </Stack>

        <Wrap justify="center" mt="5" spacing="2rem">
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <WrapItem key={question._id}>
                {(!question.isAnswered && questions[index - 1]?.isAnswered) ||
                question.isAnswered ||
                (index === 0 && questions.every(q => !q.isAnswered)) ? (
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
                  // <Button
                  //   as={Link}
                  //   to={`/play/level/${question.level}/question/${index + 1}/${
                  //     question._id
                  //   }`}
                  //   w="6rem"
                  //   h="6rem"
                  //   colorScheme={
                  //     question.isAnswered
                  //       ? question?.isQuestionAnsweredCorrect
                  //         ? "green"
                  //         : "red"
                  //       : null
                  //   }
                  //   rounded="5"
                  //   display="flex"
                  //   justifyContent="center"
                  //   alignItems="center">
                  //   <Text color="black" fontSize="1.5em" fontWeight="bold">
                  //     {index + 1}
                  //   </Text>
                  // </Button>
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
        justifyContent="center"
        bg="rgba(0,0,0,0.5)"
        gap="1rem"
        p="5">
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
          <ModalHeader>
            About Level {levelData?.level?.level || "N/A"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text textAlign="justify">{levelData?.level?.about || "N/A"}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </MasterLayout>
  );
};

export default Level;
