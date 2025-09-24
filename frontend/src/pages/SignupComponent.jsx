import { useNavigate } from "react-router-dom";
import useSignup from "../components/useSignup ";

const SignupComponent = ({ setIsAuthenticated }) => {
  const { email, setEmail, password, setPassword, handleSignup } = useSignup(
    setIsAuthenticated,
    useNavigate()
  );

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
      <br />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default SignupComponent;
