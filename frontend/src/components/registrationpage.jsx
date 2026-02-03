import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoopCircleLoading from "./loader";

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

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confpass, setConfpass] = useState("");

  const [helpername, setHelpername] = useState("");
  const [helperphone, setHelperphone] = useState("");
  const [helperemail, setHelperemail] = useState("");
  const [helperpass, setHelperpass] = useState("");
  const [helperconfpass, setHelperconfpass] = useState("");
  const [linkforcall, setLinkforcall] = useState("");
  const [loadercheck, setLoadercheck] = useState("");

  const navigate = useNavigate();

  // If user is already logged in, redirect to home
  const jwt = localStorage.getItem("access-token");
  if (jwt) {

    const result = `${import.meta.env.VITE_API_URL}/auth`;
    console.log("jwt is: ", jwt);
    axios
      .get(result, {
        headers: { authorization: `Bearer: ${jwt}` },
      })
      .then((res) => {
        console.log("VERIFIED USER - redirecting to home");
        navigate("/home");
      })
      .catch((err) => {
        console.log("error here is --> ", JSON.stringify(err));
        localStorage.removeItem("access-token");
      });
  }

  const RegisterPage = async () => {
    if (name === "") {
      setHelpername("Name is necessary!!");
      return;
    } else {
      setHelpername("");
    }

    if (phone === "") {
      setHelperphone("Phone Number is necessary!!");
      return;
    } else {
      setHelperphone("");
    }

    if (email === "") {
      setHelperemail("Email is necessary!!");
      return;
    } else {
      setHelperemail("");
    }

    if (pass === "") {
      setHelperpass("Password is necessary!!");
      return;
    } else {
      setHelperpass("");
    }

    if (confpass === "") {
      setHelperconfpass("Confirm Password is necessary!!");
      return;
    } else {
      setHelperconfpass("");
    }

    if (pass != confpass) {
      setHelperconfpass("Password does not match!!");
      return;
    } else {
      setHelperconfpass("");
    }

    setLoadercheck("1");

    const detailsobj = {
      name: name,
      phoneno: phone,
      email: email,
      category: makeid(15),
      password: pass,
    };

    console.log(detailsobj);
    const result = `${import.meta.env.VITE_API_URL}/data/registeradd`;
    console.log(result);
    axios
      .post(result, detailsobj)
      .then((res) => {
        // Check status codes instead of data structure
        if (res.status === 201) {
          window.alert("User registered successfully!");
          setLoadercheck("");
          navigate("/login");
        } else if (res.status === 409) {
          // Backend returns 409 for conflicts
          window.alert(res.data.message || "User already exists!");
          setLoadercheck("");
          navigate("/register");
        }
      })
      .catch((err) => {
        // Handle errors properly
        console.error("Registration error:", err);
        if (err.response) {
          // Server responded with error
          if (err.response.status === 409) {
            window.alert(err.response.data.message || "User already exists!");
          } else {
            window.alert(err.response.data.message || "Registration failed!");
          }
        } else if (err.request) {
          // Request made but no response
          window.alert("Cannot connect to server. Please check your connection.");
        } else {
          window.alert("An error occurred. Please try again.");
        }
        setLoadercheck("");
      });
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
        <h2
          style={{
            textAlign: "center",
            fontFamily: "Caveat",
            fontSize: "2.5rem",
          }}
        >
          Register
        </h2>

        <h3 style={{ margin: "13px" }}> Name: </h3>
        <FormControl error variant="standard">
          <TextField
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            padding="0.5em"
          />
          <FormHelperText
            style={{ color: "#FA9884", fontSize: "15px", margin: "0px" }}
            id="component-error-text"
          >
            {helpername}
          </FormHelperText>
        </FormControl>

        <h3 style={{ margin: "13px" }}> Phone Number: </h3>
        <FormControl error variant="standard">
          <TextField
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            padding="0.5em"
          />
          <FormHelperText
            style={{ color: "#FA9884", fontSize: "15px", margin: "0px" }}
            id="component-error-text"
          >
            {helperphone}
          </FormHelperText>
        </FormControl>

        <h3 style={{ margin: "13px" }}> Email: </h3>
        <FormControl error variant="standard">
          <TextField
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            padding="0.5em"
          />
          <FormHelperText
            style={{ color: "#FA9884", fontSize: "15px", margin: "0px" }}
            id="component-error-text"
          >
            {helperemail}
          </FormHelperText>
        </FormControl>

        <h3 style={{ margin: "13px" }}> Password: </h3>
        <FormControl error variant="standard">
          <PasswordField
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            padding="0.5em"
          />
          <FormHelperText
            style={{ color: "#FA9884", fontSize: "15px", margin: "0px" }}
            id="component-error-text"
          >
            {helperpass}
          </FormHelperText>
        </FormControl>

        <h3 style={{ margin: "13px" }}>Confirm Password: </h3>
        <FormControl error variant="standard">
          <PasswordField
            placeholder="Password"
            value={confpass}
            onChange={(e) => setConfpass(e.target.value)}
            padding="0.5em"
          />
          <FormHelperText
            style={{ color: "#FA9884", fontSize: "15px", margin: "0px" }}
            id="component-error-text"
          >
            {helperconfpass}
          </FormHelperText>
        </FormControl>

        <br />
        <br />
        <Button
          variant="contained"
          style={{
            marginTop: "18px",
            backgroundColor: "white",
            color: "black",
          }}
          onClick={() => {
            RegisterPage();
          }}
        >
          Register
        </Button>
      </div>
    </div>
  );
};
