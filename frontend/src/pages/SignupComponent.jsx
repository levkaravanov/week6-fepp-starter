import { useNavigate } from "react-router-dom";
import useSignup from "../hook/useSignup ";

const SignupComponent = ({ setIsAuthenticated }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    cofirmPassword,
    setConfirmPassword,
    handleSignup,
  } = useSignup(setIsAuthenticated, useNavigate());

  const handleSignupWithCheck = () => {
    if (password !== cofirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    handleSignup();
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <label>
        email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          value={cofirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleSignupWithCheck}>Sign Up</button>
    </div>
  );
};

export default SignupComponent;
