import {
  Button,
  Flex,
  Grid,
  IconButton,
  Img,
  Text,
  useToast,
} from "@chakra-ui/react";
import MasterLayout from "../../Layouts/MasterLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";
import useToggle from "../../hooks/useToggle";
import { IoIosArrowBack } from "react-icons/io";

const Question = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();
  const [questionData, setQuestionData] = useState(null);
  const [isAnswered, enabledAnswer] = useToggle(null);

  const fetchQuestion = async () => {
    try {
      if (!user?.token) return;
      const response = await fetch(`/api/question/get-question/${id}`, {
        headers: {
          x_auth_token: user?.token,
        },
      });
      const data = await response.json();

      if (!data?.success) {
        throw data;
      }

      //if question is answered, dont shuffle the choices
      if (data.question.isAnswered) {
        return setQuestionData(data.question);
      }

      const shuffledChoices = data.question.choices.sort(
        () => Math.random() - 0.5
      );
      setQuestionData({ ...data.question, choices: shuffledChoices });
    } catch (error) {
      console.log("Error fetching question: ", error.message);
    }
  };

  const questionAnswered = async isQuestionAnsweredCorrect => {
    console.log("Question answered");

    try {
      const response = await fetch(`/api/question/answered/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          x_auth_token: user?.token,
        },
        body: JSON.stringify({ isQuestionAnsweredCorrect }),
      });
      const data = await response.json();

      if (!data?.success) {
        throw data;
      }

      enabledAnswer();
    } catch (error) {
      console.log("Error answering question: ", error.message);
    }
  };

  const handleChoiceClick = async choice => {
    enabledAnswer();
    if (choice.isCorrect) {
      toast({
        title: "Correct!",
        description: "You answered the question correctly!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return await questionAnswered(true);
    } else {
      toast({
        title: "Incorrect!",
        description: "You answered the question incorrectly!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      return await questionAnswered(false);
    }
  };

  useEffect(() => {
    questionData?.isAnswered && enabledAnswer();
  }, [questionData]);

  useEffect(() => {
    fetchQuestion();
  }, [user]);

  return (
    <MasterLayout
      wrapperStyle={{
        bg: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
        position: "relative",
      }}>
      <IconButton
        onClick={() => navigate(-1)}
        isRound
        colorScheme="orange"
        aria-label="Authors"
        icon={<IoIosArrowBack size="2rem" color="white" />}
        size="lg"
        position="absolute"
        left="1.5rem"
        top="1.5rem"
      />
      <Flex
        flexDirection="column"
        gap={5}
        alignItems="center"
        justifyContent="center"
        h={{
          base: "100vh",
          md: "80vh",
        }}>
        <Img src={`/assets/${questionData?.picFilename}`} w="60%" />

        <Text color="white" fontSize="1.1em" textAlign="center">
          {questionData?.question}
        </Text>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {questionData?.choices.map(choice => (
            <Button
              key={choice._id}
              onClick={() => handleChoiceClick(choice)}
              isDisabled={isAnswered}
              _disabled={{ cursor: "not-allowed" }}
              colorScheme={
                !isAnswered ? null : choice.isCorrect ? "green" : "red"
              }>
              {choice?.label}
            </Button>
          ))}
        </Grid>
      </Flex>
      {isAnswered && (
        <Text color="white" fontSize=".85em" textAlign="center">
          Your digestive system absorbs water and nutrients from the food you
          eat. During digestion, your food is broken down into absorbable units
          of nutrients that enter the tiny blood vessels where blood cells
          transport the nutrients in different parts of the body through the
          circulatory system. Your circulatory system now contains these
          nutrients together with oxygen and water to cells throughout your
          body. Wastes from the cells are eliminated by your respiratory system,
          your excretory system, and your skin.
        </Text>
      )}
    </MasterLayout>
  );
};

export default Question;
