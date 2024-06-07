import { createStandaloneToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const { toast } = createStandaloneToast();

const useSignIn = () => {
  const navigate = useNavigate();
  const { error, isLoading, handleSignIn } = useAuth();

  const [formData, setFormData] = useState({
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

    const response = await handleSignIn(formData);
    console.log(response);

    // if there is an error
    if (!response?.success) {
      if (
        response?.statusCode === 404 ||
        response?.statusCode === 401 ||
        response?.statusCode === 500
      ) {
        return toast({
          title: response.message,
          status: "error",
          isClosable: true,
        });
      }

      return;
    }

    // if success
    toast({
      title: response?.message,
      status: "success",
      isClosable: true,
    });

    setFormData({
      username: "",
      password: "",
    });

    return navigate("/");
  };

  useEffect(() => {
    document.title = "Sign In";
  }, []);

  useEffect(() => {
    document.title = isLoading ? "Loading..." : "Sign In";
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

export default useSignIn;
