import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LoginImage from "../../assets/images/login.svg";
import { useAuth } from "../../Contexts/Auth";
import classes from "../../styles/Login.module.css";
import Button from "../Button";
import Form from "../Form";
import Illustration from "../Illustration";
import TextInput from "../TextInput";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      history.push("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Invalid username or password!");
    }
  };

  return (
    <>
      <h1>Login to your account</h1>

      <div className="column">
        <Illustration image={LoginImage} />
        <Form className={classes.login} onSubmit={handleSubmit}>
          <TextInput
            type="text"
            required
            placeholder="Enter email"
            icon="alternate_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            type="password"
            required
            placeholder="Enter password"
            icon="lock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <Button type="submit" disabled={loading}>
            {" "}
            <span>Submit Now</span>{" "}
          </Button>
          <div className="info">
            Don't have an account? <Link to="/signup">Signup</Link> instead.
          </div>
        </Form>
      </div>
    </>
  );
}
