import { Box, ChakraProvider } from "@chakra-ui/react";

/* eslint-disable-next-line react/prop-types */
const MasterLayout = ({ children, wrapperStyle, containerStyle }) => {
  return (
    <ChakraProvider>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        h="100vh"
        w="100vw"
        bg="#000">
        <Box
          {...containerStyle}
          borderRadius={{
            base: "0",
            md: "lg",
          }}>
          <Box
            w={{
              base: "100vw",
              md: "48vw",
              lg: "25vw",
            }}
            h={{
              base: "100vh",
              md: "75vh",
            }}
            borderRadius={{
              base: "0",
              md: "lg",
            }}
            padding="20px"
            border={{
              base: "none",
              md: "1px solid white",
            }}
            {...wrapperStyle}>
            {children}
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default MasterLayout;
