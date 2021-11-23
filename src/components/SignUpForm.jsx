import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Contexts/Auth";
import classes from "../styles/Signup.module.css";
import Button from "./Button";
import CheckBox from "./CheckBox";
import Form from "./Form";
import TextInput from "./TextInput";

export default function SignUpForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termAgreement, setTermAgreement] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return setError("Password don't match!");
    try {
      setError("");
      setLoading(true);
      await signup(email, password, userName);
      history.push("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to create an account!");
    }
  };

  return (
    <Form className={classes.signup} onSubmit={handleSubmit}>
      <TextInput
        type="text"
        placeholder="Enter name"
        icon="person"
        required
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextInput
        type="text"
        placeholder="Enter email"
        icon="alternate_email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        type="password"
        placeholder="Enter password"
        icon="lock"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextInput
        type="password"
        placeholder="Confirm password"
        icon="lock_clock"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <CheckBox
        text="I agree to the Terms &amp; Conditions"
        value={termAgreement}
        required
        onChange={(e) => setTermAgreement(e.target.value)}
      />

      {error && <p className="error">{error}</p>}

      <Button disabled={loading} type="submit">
        <span>Submit Now</span>
      </Button>
      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
}
