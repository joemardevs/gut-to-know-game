import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import useToggle from "../hooks/useToggle";
import useSignUp from "../hooks/useSignUp";
import MasterLayout from "../Layouts/MasterLayout";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [isPasswordVisible, , , togglePassword] = useToggle();
  const {
    formData,
    error,
    isLoading,
    handleChange,
    handleSubmit,
    isInputHaveError,
  } = useSignUp();

  return (
    <MasterLayout
      wrapperStyle={{
        backgroundColor: "#1A2421",
        padding: "20px",
      }}>
      <Box
        mt={{
          base: "20px",
          md: "30px",
        }}>
        <Stack spacing={3}>
          <Box>
            <Heading color="white">Sign Up</Heading>
            <Text color="white" fontSize="md">
              Enter your details to create an account
            </Text>
          </Box>

          <FormControl
            color="white"
            isInvalid={isInputHaveError("name")}
            isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              focusBorderColor="orange.500"
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
            />
            {/* <FormErrorMessage>Email is required.</FormErrorMessage> */}
            {isInputHaveError("name") && (
              <FormErrorMessage>
                {error?.errors?.find(err => err.path === "name").msg}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl
            color="white"
            isInvalid={isInputHaveError("email")}
            isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              focusBorderColor="orange.500"
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />

            {isInputHaveError("email") && (
              <FormErrorMessage>
                {error?.errors?.find(err => err.path === "email").msg}
              </FormErrorMessage>
            )}
          </FormControl>

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
                <Button h="1.75rem" size="sm" onClick={togglePassword}>
                  {isPasswordVisible ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>

            {isInputHaveError("password") && (
              <FormErrorMessage>
                {error?.errors?.find(err => err.path === "password").msg}
              </FormErrorMessage>
            )}
          </FormControl>

          <Button
            isLoading={isLoading}
            colorScheme="orange"
            size="md"
            type="submit"
            onClick={handleSubmit}>
            Sign Up
          </Button>

          <Text fontSize="xs" color="white" textAlign="center">
            Already have an account?{" "}
            <Text as={Link} color="orange" to="/signin">
              Sign In
            </Text>
          </Text>
        </Stack>
      </Box>
    </MasterLayout>
  );
};

export default SignUp;
