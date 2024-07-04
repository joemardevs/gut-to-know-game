import { Box, Spinner } from "@chakra-ui/react";
import MasterLayout from "../Layouts/MasterLayout";

const Loading = () => {
  return (
    <MasterLayout
      wrapperStyle={{
        backgroundColor: "#1A2421",
      }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        h={{
          base: "100vh",
          md: "70vh",
        }}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="orange.500"
          size="xl"
        />
      </Box>
    </MasterLayout>
  );
};

export default Loading;
