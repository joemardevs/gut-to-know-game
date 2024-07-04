import { Box, IconButton, Text } from "@chakra-ui/react";
import MasterLayout from "../Layouts/MasterLayout";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect } from "react";

const Authors = () => {
  useEffect(() => {
    document.title = "Authors";
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
        justifyContent="center"
        position="relative">
        <IconButton
          as={Link}
          to="/"
          isRound
          colorScheme="orange"
          aria-label="Authors"
          icon={<IoIosArrowBack size="2rem" color="white" />}
          size="lg"
          position="absolute"
          left=".1rem"
          top="0"
        />
        <Text color="black" fontSize="2em" fontWeight="bold">
          Authors
        </Text>

        <Text color="black" fontSize="1em">
          Adelei B. Cabredo
        </Text>
        <Text color="black" fontSize="1em">
          John Paul D. Galang
        </Text>
        <Text color="black" fontSize="1em">
          Claudine Marie P. Jose
        </Text>
        <Text color="black" fontSize="1em">
          Nyca Perpetua V. Labuguen
        </Text>
        <Text color="black" fontSize="1em">
          Ana Alphea T. Pua
        </Text>

        <Text color="black" fontSize="1.5em" fontWeight="bold" mt="1rem">
          About the authors
        </Text>

        <Text
          color="black"
          fontSize=".9em"
          textAlign="justify"
          textIndent="2em">
          A team of third-year students pursuing a Bachelor&apos;s degree in
          Science Education with a specialization in Biology from the Philippine
          Normal University-North Luzon is dedicated to enhancing students&apos;
          perceptions of formative assessment. They aim to achieve this by
          integrating technology into the assessment process and catering to the
          learning styles of digital natives. The team recognizes the importance
          of integrating technology to engage students effectively and
          facilitate their learning experiences.
        </Text>
        <Text
          color="black"
          fontSize=".9em"
          textAlign="justify"
          textIndent="2em"
          mt="1rem">
          By integrating technology, particularly gamification, they seek to
          create dynamic and interactive assessment methods that empower
          students to take ownership of their learning journey and bring another
          side of perspective ensuring that every learner has an opportunity to
          succeed. Through their collaborative efforts, the team aims to not
          only improve students&apos; perceptions of formative assessment but
          also to inspire fellow educators to embrace innovative teaching
          practices. By sharing their insights and experiences, they hope to
          contribute to the ongoing transformation of educational practices in
          this digital age.
        </Text>
      </Box>
    </MasterLayout>
  );
};

export default Authors;
