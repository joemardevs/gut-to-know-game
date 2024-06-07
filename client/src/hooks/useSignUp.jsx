import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const useSignUp = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { error, isLoading, handleSignUp } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isInputHaveError = inputName => {
    return error?.errors?.some(err => err.path === inputName);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await handleSignUp(formData);

    // if there is an error
    if (!response.success) {
      if (response.statusCode === 400 || response.statusCode === 500) {
        toast({
          title: response.message,
          status: "error",
          isClosable: true,
        });

        return response;
      }

      return response;
    }

    toast({
      title: response.message,
      status: "success",
      isClosable: true,
    });

    // if success
    setFormData({
      name: "",
      email: "",
      username: "",
      password: "",
    });

    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };

  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  useEffect(() => {
    document.title = isLoading ? "Loading..." : "Sign Up";
  }, [isLoading]);

  return {
    formData,
    error,
    isLoading,
    handleChange,
    handleSubmit,
    isInputHaveError,
  };
};

export default useSignUp;
