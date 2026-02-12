// import React from "react";
// import { Routes, Route, BrowserRouter } from "react-router-dom";
// import { Homepage } from "./components/homepage.jsx";
// import { LoginPage } from "./components/loginpage.jsx";
// import { NotFound } from "./components/notfoundpage.jsx";
// import { RegistrationPage } from "./components/registrationpage.jsx";
// import FrontPage from "./components/frontpage.jsx";
// import Notifications from "./components/notifications.jsx";
// import Videoplayer from "./components/videoplayer.jsx";
// import LobbyScreen from "./components/lobby.jsx";
// import RoomPage from "./components/room";
// import ProfilePage from "./components/profile";
// import { Closecall } from "./components/Closecall.jsx";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" exact element={<FrontPage />} />
//         <Route path="/home" exact element={<Homepage />} />
//         <Route path="/login" exact element={<LoginPage />} />
//         <Route path="/register" exact element={<RegistrationPage />} />
//         <Route path="/vid" exact element={<Videoplayer />} />
//         <Route path="/notif" exact element={<Notifications />} />
//         <Route path="/profile" exact element={<ProfilePage />} />
//         <Route path="/lobby" exact element={<LobbyScreen />} />

//         <Route path="/callclosed" exact element={<Closecall />} />
//         <Route path="/room/:roomid" exact element={<RoomPage />} />

//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

// Import components
import { Homepage } from "./components/homepage.jsx";
import { LoginPage } from "./components/loginpage.jsx";
import { NotFound } from "./components/notfoundpage.jsx";
import { RegistrationPage } from "./components/registrationpage.jsx";
import FrontPage from "./components/frontpage.jsx";
import LobbyScreen from "./components/lobby.jsx";
import RoomPage from "./components/room";
import ProfilePage from "./components/profile";
import { Closecall } from "./components/Closecall.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes - accessible to everyone */}
          <Route path="/" exact element={<FrontPage />} />

          {/* Public routes - redirect to home if already authenticated */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegistrationPage />
              </PublicRoute>
            }
          />

          {/* Protected routes - require authentication */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lobby"
            element={
              <ProtectedRoute>
                <LobbyScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/room/:roomid"
            element={
              <ProtectedRoute>
                <RoomPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/callclosed"
            element={
              <ProtectedRoute>
                <Closecall />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
