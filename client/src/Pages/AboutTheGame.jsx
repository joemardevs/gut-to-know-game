import { Box, IconButton, Text } from "@chakra-ui/react";
import MasterLayout from "../Layouts/MasterLayout";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect } from "react";

const AboutTheGame = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "About the Game";
  }, []);
  return (
    <MasterLayout
      wrapperStyle={{
        backgroundImage: "url('/assets/levels_bg.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        position="relative"
        h="100vh">
        <IconButton
          as={Link}
          to={navigate(-1)}
          isRound
          colorScheme="orange"
          aria-label="Authors"
          icon={<IoIosArrowBack size="2rem" color="white" />}
          size="lg"
          position="absolute"
          left=".1rem"
          top="0"
        />

        <Text color="black" fontSize="2em" fontWeight="bold" mt="5rem">
          About the Game
        </Text>

        <Text
          color="black"
          fontSize=".9em"
          textAlign="justify"
          textIndent="2em">
          Welcome to Gut To Know, an engaging and educational gamified website
          designed to deepen learners&apos; understanding of the digestive
          system. The name &apos;GutToKnow&apos; cleverly incorporates the term
          &apos;GUT&apos;, representing the gastrointestinal tract, aligning
          with the aim to provide an immersive learning experience. Within the
          game, players will explore the organs of the digestive system, their
          interactions with organs from the respiratory, circulatory, and
          excretory systems, and the changes food undergoes during physical and
          chemical digestion. Additionally, the game covers diseases resulting
          from nutrient deficiencies and the ingestion of harmful substances,
          along with their prevention, detection, and treatment methods while
          encouraging the practical application of knowledge. To enhance
          engagement, Gut To Know features a leaderboard for players to compete
          with friends and fellow learners, earning points and climbing to the
          top. For those eager to delve deeper, answering the provided questions
          will unlock additional information, encouraging further engagement and
          knowledge expansion. Embark on this exciting educational journey with
          Gut To Know and unpack the mysteries of the digestive system in a fun
          and interactive way!
        </Text>
      </Box>
    </MasterLayout>
  );
};

export default AboutTheGame;
