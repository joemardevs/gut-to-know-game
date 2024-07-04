import { createContext, useContext, useEffect, useState } from "react";
import useToggle from "../hooks/useToggle";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

/* eslint-disable-next-line react/prop-types */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, enabledAuthenticated, disabledAuthenticated] =
    useToggle();
  const [isLoading, enabledLoading, disabledLoading] = useToggle(false);
  const [error, setError] = useState(null);

  const handleSignIn = async formData => {
    console.log("Begin Sign In");
    enabledLoading();

    try {
      const response = await fetch(
        "https://gut-to-know-game-backend.onrender.com/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!data.success) {
        disabledLoading();
        setError(data);
        return data;
      }

      setUser(data.user);
      enabledAuthenticated();
      disabledLoading();

      localStorage.getItem("user") && localStorage.removeItem("user");

      localStorage.setItem("user", JSON.stringify(data?.user));

      return data;
    } catch (error) {
      setError(error);
    } finally {
      disabledLoading();
      console.log("End Sign In");
    }
  };

  const handleSignUp = async formData => {
    enabledLoading();
    try {
      const response = await fetch(
        "https://gut-to-know-game-backend.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!data.success) {
        disabledLoading();
        setError(data);
        return data;
      }

      disabledLoading();
      return data;
    } catch (error) {
      setError(error);
    } finally {
      disabledLoading();
    }
  };

  const handleSignOut = async () => {
    enabledLoading();
    const response = await fetch(
      "https://gut-to-know-game-backend.onrender.com/api/auth/signout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          x_auth_token: user?.token,
        },
      }
    );

    const data = await response.json();

    if (!data.success) {
      disabledLoading();
      setError(data);
      return data;
    }

    setUser(null);
    disabledAuthenticated();
    disabledLoading();
    localStorage.getItem("user") && localStorage.removeItem("user");
    return data;
  };

  const isLoggedIn = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setError({ message: "User not authenticated" });

      return disabledAuthenticated();
    }

    const authUser = JSON.parse(user);

    setUser(authUser);

    const tokenDecoded = jwtDecode(authUser.token);

    if (tokenDecoded.exp * 1000 < Date.now()) {
      setError({ message: "Token expired" });

      localStorage.getItem("user") && localStorage.removeItem("user");

      await handleSignOut();

      return disabledAuthenticated();
    }

    return enabledAuthenticated();
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        handleSignIn,
        handleSignUp,
        handleSignOut,
        error,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
