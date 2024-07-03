import { useEffect } from "react";
import MasterLayout from "../Layouts/MasterLayout";
import { Box, Button, Flex, IconButton, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaQuestion } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import Loading from "../Components/Loading";
import useToggle from "../hooks/useToggle";

const Play = () => {
  const [isPageLoading, , disabledLoading] = useToggle(true);

  setTimeout(() => {
    disabledLoading();
  }, 1000);

  useEffect(() => {
    document.title = "Play";
  }, []);

  return isPageLoading ? (
    <Loading />
  ) : (
    <MasterLayout
      containerStyle={{
        backgroundImage: "url('/assets/levels_bg.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      wrapperStyle={{
        backgroundImage: "url('/assets/map_levels.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        bgSize: "140% 70%",
        position: "relative",
      }}>
      <Box>
        <Flex>
          <IconButton
            as={Link}
            to="/"
            isRound
            colorScheme="orange"
            aria-label="Authors"
            icon={<IoIosArrowBack size="2rem" color="white" />}
            size="lg"
          />
          <Spacer />
          <IconButton
            as={Link}
            to="/about-the-game"
            isRound
            colorScheme="orange"
            aria-label="FAQs"
            icon={<FaQuestion size="25px" color="white" />}
            size="lg"
          />
        </Flex>
      </Box>

      {/* Level Button */}
      <Button
        as={Link}
        to="/play/level/1"
        borderRadius="full"
        border="5px"
        colorScheme="green"
        color="white"
        fontWeight="bold"
        size="lg"
        position="absolute"
        left="150"
        top="100">
        1
      </Button>
      <Button
        as={Link}
        to="/play/level/2"
        borderRadius="full"
        border="5px"
        colorScheme="yellow"
        color="black"
        fontWeight="bold"
        size="lg"
        position="absolute"
        left="180"
        top="200">
        2
      </Button>
      <Button
        as={Link}
        to="/play/level/3"
        borderRadius="full"
        border="5px"
        colorScheme="red"
        color="white"
        fontWeight="bold"
        size="lg"
        position="absolute"
        left="100"
        top="380">
        3
      </Button>
      <Button
        as={Link}
        to="/play/level/4"
        borderRadius="full"
        border="5px"
        colorScheme="blue"
        color="white"
        fontWeight="bold"
        size="lg"
        position="absolute"
        left="270"
        top="410">
        4
      </Button>

      <Button
        as={Link}
        to="/play/level/5"
        borderRadius="full"
        border="5px"
        colorScheme="purple"
        color="white"
        fontWeight="bold"
        size="lg"
        position="absolute"
        left="180"
        top="550">
        5
      </Button>
      {/* Level Button */}
    </MasterLayout>
  );
};

export default Play;
