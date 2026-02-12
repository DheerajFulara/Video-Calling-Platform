
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import LoopCircleLoading from "./loader.jsx";
import { useAuth } from "../contexts/AuthContext";

const TextField = styled.input.attrs((props) => ({
  type: "text",
  size: 30,
}))`
  border-radius: 3px;
  border: 1px solid palevioletred;
  display: block;
  margin: 0 0 3px;
  padding: ${(props) => props.padding};
`;

const PasswordField = styled.input.attrs((props) => ({
  type: "password",
  size: 30,
}))`
  border-radius: 3px;
  border: 1px solid palevioletred;
  display: block;
  margin: 0 0 3px;
  align: center;
  padding: ${(props) => props.padding};
`;

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");

  const [helperemail, setHelperemail] = useState("");
  const [helperpass, setHelperpass] = useState("");
  const [invaliduser, setInvaliduser] = useState("");
  const [loadercheck, setLoadercheck] = useState("");

  const Logincheck = async () => {
    setLoadercheck("1");

    if (email === "") {
      setHelperemail("Email is necessary!!");
      setLoadercheck("");
      return;
    } else {
      setHelperemail("");
    }

    if (pass === "") {
      setHelperpass("Password is necessary!!");
      setLoadercheck("");
      return;
    } else {
      setHelperpass("");
    }

    const detailsobj = {
      email: email,
      password: pass,
    };

    if (detailsobj["email"] !== "" && detailsobj["password"] !== "") {
      const result = `${import.meta.env.VITE_API_URL}/data/logincheck`;
      axios
        .post(result, detailsobj)
        .then((res) => {
          if (res.data.data === "Invalid Credentials") {
            setLoadercheck("");
            setInvaliduser("Please Enter Valid Credentials");
          } else {
            // Use AuthContext to handle login
            login(res.data);
            setLoadercheck("");
            navigate("/home");
          }
        })
        .catch((err) => {
          console.error("Login error:", err);
          setLoadercheck("");
          setInvaliduser("An error occurred. Please try again.");
        });
    }
  };

  if (loadercheck) {
    return (
      <div className="App">
        <LoopCircleLoading />
      </div>
    );
  }

  return (
    <div className="App">
      <div className="Login" align="center">
        <p
          style={{
            textAlign: "center",
            fontFamily: "Caveat",
            fontSize: "2.5rem",
          }}
        >
          Login
        </p>
        <br />
        <h3>
          {" "}
          Email: <br />
        </h3>
        <FormControl error variant="standard">
          <TextField
            placeholder="Username/Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            padding="0.6em"
          />
          <FormHelperText
            style={{ color: "#FA9884", fontSize: "15px" }}
            id="component-error-text"
          >
            {helperemail}
          </FormHelperText>
        </FormControl>
        <br />
        <h3>
          {" "}
          Password: <br />
        </h3>
        <FormControl error variant="standard">
          <PasswordField
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            padding="0.6em"
          />
          <FormHelperText
            style={{ color: "#FA9884", fontSize: "15px" }}
            id="component-error-text"
          >
            {helperpass}
          </FormHelperText>
        </FormControl>
        <br />
        <br />
        <br />
        <Button
          variant="contained"
          style={{ width: "29%", backgroundColor: "white", color: "black" }}
          onClick={() => {
            Logincheck();
          }}
        >
          Login
        </Button>
        <FormHelperText
          style={{ textAlign: "center", color: "#FA9884", fontSize: "15px" }}
          id="component-error-text"
        >
          {invaliduser}
        </FormHelperText>
        <br />
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;Don't have an Account yet?? &nbsp;
        <br />
        <br />
        <Button
          variant="contained"
          style={{ backgroundColor: "white", color: "black" }}
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </Button>
        <br />
        <br />
      </div>
    </div>
  );
};
