import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoopCircleLoading from "./loader";

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  while (length--) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confpass, setConfpass] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const RegisterPage = async () => {
    let newErrors = {};

    if (!name) newErrors.name = "Name is required";
    if (!phone) newErrors.phone = "Phone is required";
    if (!email) newErrors.email = "Email is required";
    if (!pass) newErrors.pass = "Password is required";
    if (!confpass) newErrors.confpass = "Confirm password required";
    if (pass && confpass && pass !== confpass)
      newErrors.confpass = "Passwords do not match";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    const detailsobj = {
      name,
      phoneno: phone,
      email,
      category: makeid(15),
      password: pass,
    };

    try {
      const result = `${import.meta.env.VITE_API_URL}/data/registeradd`;
      const res = await axios.post(result, detailsobj);

      if (res.status === 201) {
        alert("User registered successfully!");
        navigate("/login");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed!");
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoopCircleLoading />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">

      {/* animated background blobs */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-indigo-300 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-blue-300 rounded-full blur-3xl opacity-40 animate-pulse"></div>

      {/* CARD */}
      <div
        className="
        bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl
        transform transition-all duration-500
        hover:shadow-indigo-300 hover:-translate-y-2
        animate-[fadeIn_0.8s_ease]
        "
      >
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Create Account
        </h2>

        {/* NAME */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* PHONE */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          {errors.pass && (
            <p className="text-red-500 text-sm mt-1">{errors.pass}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-6">
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={confpass}
            onChange={(e) => setConfpass(e.target.value)}
          />
          {errors.confpass && (
            <p className="text-red-500 text-sm mt-1">{errors.confpass}</p>
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={RegisterPage}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-indigo-700 transition"
        >
          Register
        </button>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer font-semibold"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>

      {/* custom animation */}
      <style>
        {`
        @keyframes fadeIn {
          from { opacity:0; transform: translateY(40px); }
          to { opacity:1; transform: translateY(0); }
        }
        `}
      </style>
    </div>
  );
};

// import React, { useState } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import FormHelperText from "@mui/material/FormHelperText";
// import FormControl from "@mui/material/FormControl";
// import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import LoopCircleLoading from "./loader";

// const TextField = styled.input.attrs((props) => ({
//   type: "text",
//   size: 30,
// }))`
//   border-radius: 3px;
//   border: 1px solid palevioletred;
//   display: block;
//   margin: 0 0 3px;
//   padding: ${(props) => props.padding};
// `;

// const PasswordField = styled.input.attrs((props) => ({
//   type: "password",
//   size: 30,
// }))`
//   border-radius: 3px;
//   border: 1px solid palevioletred;
//   display: block;
//   margin: 0 0 3px;
//   align: center;
//   padding: ${(props) => props.padding};
// `;

// function makeid(length) {
//   let result = "";
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   const charactersLength = characters.length;
//   let counter = 0;
//   while (counter < length) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     counter += 1;
//   }
//   return result;
// }

// export const RegistrationPage = () => {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [pass, setPass] = useState("");
//   const [confpass, setConfpass] = useState("");

//   const [helpername, setHelpername] = useState("");
//   const [helperphone, setHelperphone] = useState("");
//   const [helperemail, setHelperemail] = useState("");
//   const [helperpass, setHelperpass] = useState("");
//   const [helperconfpass, setHelperconfpass] = useState("");
//   const [loadercheck, setLoadercheck] = useState("");

//   const navigate = useNavigate();

//   const RegisterPage = async () => {
//     if (name === "") {
//       setHelpername("Name is necessary!!");
//       return;
//     } else {
//       setHelpername("");
//     }

//     if (phone === "") {
//       setHelperphone("Phone Number is necessary!!");
//       return;
//     } else {
//       setHelperphone("");
//     }

//     if (email === "") {
//       setHelperemail("Email is necessary!!");
//       return;
//     } else {
//       setHelperemail("");
//     }

//     if (pass === "") {
//       setHelperpass("Password is necessary!!");
//       return;
//     } else {
//       setHelperpass("");
//     }

//     if (confpass === "") {
//       setHelperconfpass("Confirm Password is necessary!!");
//       return;
//     } else {
//       setHelperconfpass("");
//     }

//     if (pass != confpass) {
//       setHelperconfpass("Password does not match!!");
//       return;
//     } else {
//       setHelperconfpass("");
//     }

//     setLoadercheck("1");

//     const detailsobj = {
//       name: name,
//       phoneno: phone,
//       email: email,
//       category: makeid(15),
//       password: pass,
//     };

//     const result = `${import.meta.env.VITE_API_URL}/data/registeradd`;
//     axios
//       .post(result, detailsobj)
//       .then((res) => {
//         if (res.status === 201) {
//           window.alert("User registered successfully!");
//           setLoadercheck("");
//           navigate("/login");
//         } else if (res.status === 409) {
//           window.alert(res.data.message || "User already exists!");
//           setLoadercheck("");
//           navigate("/register");
//         }
//       })
//       .catch((err) => {
//         console.error("Registration error:", err);
//         if (err.response) {
//           if (err.response.status === 409) {
//             window.alert(err.response.data.message || "User already exists!");
//           } else {
//             window.alert(err.response.data.message || "Registration failed!");
//           }
//         } else if (err.request) {
//           window.alert("Cannot connect to server. Please check your connection.");
//         } else {
//           window.alert("An error occurred. Please try again.");
//         }
//         setLoadercheck("");
//       });
//   };

//   if (loadercheck) {
//     return (
//       <div className="App">
//         <LoopCircleLoading />
//       </div>
//     );
//   }

//   return (
//     <div className="App">
//       <div className="Login" align="center">
//         <h2
//           style={{
//             textAlign: "center",
//             fontFamily: "Caveat",
//             fontSize: "2.5rem",
//           }}
//         >
//           Register
//         </h2>

//         <h3 style={{ margin: "13px" }}> Name: </h3>
//         <FormControl error variant="standard">
//           <TextField
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             padding="0.5em"
//           />
//           <FormHelperText
//             style={{ color: "#FA9884", fontSize: "15px", margin: "0px" }}
//             id="component-error-text"
//           >
//             {helpername}
//           </FormHelperText>
//         </FormControl>

//         <h3 style={{ margin: "13px" }}> Phone Number: </h3>
//         <FormControl error variant="standard">
//           <TextField
//             placeholder="Phone Number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             padding="0.5em"
//           />
//           <FormHelperText
//             style={{ color: "#FA9884", fontSize: "15px", margin: "0px" }}
//             id="component-error-text"
//           >
//             {helperphone}
//           </FormHelperText>
//         </FormControl>

//         <h3 style={{ margin: "13px" }}> Email: </h3>
//         <FormControl error variant="standard">
//           <TextField
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             padding="0.5em"
//           />
//           <FormHelperText
//             style={{ color: "#FA9884", fontSize: "15px", margin: "0px" }}
//             id="component-error-text"
//           >
//             {helperemail}
//           </FormHelperText>
//         </FormControl>

//         <h3 style={{ margin: "13px" }}> Password: </h3>
//         <FormControl error variant="standard">
//           <PasswordField
//             placeholder="Password"
//             value={pass}
//             onChange={(e) => setPass(e.target.value)}
//             padding="0.5em"
//           />
//           <FormHelperText
//             style={{ color: "#FA9884", fontSize: "15px", margin: "0px" }}
//             id="component-error-text"
//           >
//             {helperpass}
//           </FormHelperText>
//         </FormControl>

//         <h3 style={{ margin: "13px" }}>Confirm Password: </h3>
//         <FormControl error variant="standard">
//           <PasswordField
//             placeholder="Password"
//             value={confpass}
//             onChange={(e) => setConfpass(e.target.value)}
//             padding="0.5em"
//           />
//           <FormHelperText
//             style={{ color: "#FA9884", fontSize: "15px", margin: "0px" }}
//             id="component-error-text"
//           >
//             {helperconfpass}
//           </FormHelperText>
//         </FormControl>

//         <br />
//         <br />
//         <Button
//           variant="contained"
//           style={{
//             marginTop: "18px",
//             backgroundColor: "white",
//             color: "black",
//           }}
//           onClick={() => {
//             RegisterPage();
//           }}
//         >
//           Register
//         </Button>
//       </div>
//     </div>
//   );
// };
