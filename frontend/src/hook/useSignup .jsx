import React from "react";
import localSession from "../utils/localSession";

const useSignup = (setIsAuthenticated, navigate) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cofirmPassword, setConfirmPassword] = React.useState("");

  const handleSignup = async () => {
    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        localSession.setItem("user", JSON.stringify(user));
        console.log("User signed up successfully!");
        setIsAuthenticated(true);
        navigate("/");
      } else {
        console.error("Signup failed", response);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    cofirmPassword,
    setConfirmPassword,
    handleSignup,
  };
};

export default useSignup;
