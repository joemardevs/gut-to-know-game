import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import useToggle from "../hooks/useToggle";
import MasterLayout from "../Layouts/MasterLayout";
import { Link } from "react-router-dom";
import useSignIn from "../hooks/useSignIn";
import { HiEye, HiEyeOff } from "react-icons/hi";

const SignIn = () => {
  const {
    formData,
    error,
    isLoading,
    handleChange,
    handleSubmit,
    isInputHaveError,
  } = useSignIn();
  const [isPasswordVisible, , , togglePassword] = useToggle();

  return (
    <MasterLayout
      wrapperStyle={{
        backgroundColor: "#1A2421",
      }}>
      <Box
        mt={{
          base: "200px",
          md: "130px",
        }}>
        <Stack spacing={3}>
          <Box>
            <Heading color="white">Sign In</Heading>
            <Text color="white" fontSize="md">
              Enter your username and password
            </Text>
          </Box>

          <FormControl
            color="white"
            isInvalid={isInputHaveError("username")}
            isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              focusBorderColor="orange.500"
              type="text"
              name="username"
              onChange={handleChange}
              value={formData.username}
            />

            {isInputHaveError("username") && (
              <FormErrorMessage>
                {error?.errors?.find(err => err.path === "username").msg}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl
            color="white"
            isInvalid={isInputHaveError("password")}
            isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={isPasswordVisible ? "text" : "password"}
                focusBorderColor="orange.500"
                color="white"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />

              <InputRightElement width="4.5rem">
                <IconButton
                  h="1.75rem"
                  size="sm"
                  onClick={togglePassword}
                  bg="transparent"
                  _focus={{
                    bg: "transparent",
                  }}
                  icon={
                    isPasswordVisible ? (
                      <HiEye color="white" size="20px" />
                    ) : (
                      <HiEyeOff color="white" size="20px" />
                    )
                  }
                />
              </InputRightElement>
            </InputGroup>

            {isInputHaveError("password") && (
              <FormErrorMessage>
                {error?.errors?.find(err => err.path === "password").msg}
              </FormErrorMessage>
            )}
          </FormControl>

          <Button
            colorScheme="orange"
            size="md"
            onClick={handleSubmit}
            isLoading={isLoading}>
            Sign In
          </Button>

          <Text fontSize="xs" color="white" textAlign="center">
            Don&apos;t have an account?{" "}
            <Text as={Link} to="/signup" color="orange">
              Sign Up
            </Text>
          </Text>
        </Stack>
      </Box>
    </MasterLayout>
  );
};

export default SignIn;
