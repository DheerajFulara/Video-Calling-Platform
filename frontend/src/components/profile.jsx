
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import LoopCircleLoading from "./loader";

function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Get user from AuthContext

  if (!user) {
    return (
      <div className="App">
        <LoopCircleLoading />
      </div>
    );
  }

  const profileUser = {
    name: user.Name,
    username: user.Name,
    email: user.Email,
    mobile: user.Phoneno,
    profilePicUrl: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  };

  const handleBack = () => navigate("/home");
  const handleLogout = () => {
    logout(); // Use AuthContext logout
    navigate("/login");
  };

  const styles = {
    profilePage: { maxWidth: "90%", margin: "0 auto", padding: "1rem" },
    profileHeader: { marginBottom: "1rem" },
    profilePic: {
      width: "80px",
      height: "80px",
      objectFit: "cover",
      borderRadius: "50%",
      border: "3px solid black",
      display: "block",
      margin: "10px auto",
    },
    profileBody: { marginTop: "1rem" },
    actionButton: {
      padding: "0.5rem 1rem",
      fontSize: "1.2rem",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginRight: "1rem",
    },
    logoutButton: {
      backgroundColor: "#f44336",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "0.5rem 1rem",
      cursor: "pointer",
      marginTop: "1rem",
      fontSize: "16px",
      display: "inline-block",
      textAlign: "center",
      textDecoration: "none",
    },
    infoBox: {
      width: "100%",
      marginLeft: "5%",
      alignItems: "center",
      height: "25px",
      borderRadius: "5px",
      display: "flex",
      bgcolor: "grey.100",
      color: "black",
      paddingLeft: "0.5rem",
    },
  };

  return (
    <div className="App">
      <div style={styles.profilePage}>
        <div style={styles.profileHeader}>
          <img src={profileUser.profilePicUrl} alt="Profile" style={styles.profilePic} />
          <h1 style={{ textAlign: "center" }}>{profileUser.name}</h1>

          <p style={{ display: "flex", alignItems: "center" }}>
            Username:
            <Box sx={styles.infoBox}>{profileUser.username}</Box>
          </p>

          <p style={{ display: "flex", alignItems: "center" }}>
            Email:
            <Box sx={styles.infoBox}>{profileUser.email}</Box>
          </p>

          <p style={{ display: "flex", alignItems: "center" }}>
            Phoneno:
            <Box sx={styles.infoBox}>{profileUser.mobile}</Box>
          </p>
        </div>

        <div style={styles.profileBody}>
          <button style={styles.actionButton} onClick={handleBack}>
            Back
          </button>
          <button style={{ ...styles.actionButton, ...styles.logoutButton }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
