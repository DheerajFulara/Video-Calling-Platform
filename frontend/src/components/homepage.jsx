import React, { useState } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  DotGroup,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import { AiOutlineVideoCamera, AiFillHome } from "react-icons/ai";
import { TiUserOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import Arrow from "./homepageutils/arrow.svg";

export const Homepage = () => {
  const navigate = useNavigate();
  const [meetingId, setMeetingId] = useState("");

  const slides = [
    {
      title: "One Platform to Connect",
      desc: "Experience seamless peer-to-peer communication anytime.",
    },
    {
      title: "Unified Communication",
      desc: "Chat, collaborate and video call in one place.",
    },
    {
      title: "Privacy First",
      desc: "Encrypted meetings with secure connections.",
    },
  ];

  // Generate meeting id
  const generateMeeting = () => {
    const id = Math.random().toString(36).substring(2, 9);
    navigate(`/room/${id}`);
  };

  // Join meeting
  const joinMeeting = () => {
    if (!meetingId) return alert("Enter Meeting ID");
    navigate(`/room/${meetingId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col relative overflow-hidden">

      {/* BACKGROUND BLOBS */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-40"></div>

      {/* HEADER */}
      <div className="text-center pt-10 z-10">
        <h1 className="text-5xl font-extrabold text-indigo-600">
          MeetHub
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Connect instantly. Collaborate effortlessly.
        </p>
      </div>

      {/* CAROUSEL */}
      <div className="mt-12 flex justify-center px-6 z-10">
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={70}
          totalSlides={slides.length}
          infinite
        >
          <Slider>
            {slides.map((slide, index) => (
              <Slide index={index} key={index}>
                <div className="h-[260px] flex items-center justify-center">
                  <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8 text-center max-w-xl w-full transition hover:-translate-y-2">
                    <h2 className="text-2xl font-bold mb-3">
                      {slide.title}
                    </h2>
                    <p className="text-gray-600">{slide.desc}</p>
                  </div>
                </div>
              </Slide>
            ))}
          </Slider>

          <div className="flex justify-center items-center gap-6 mt-4">
            <ButtonBack className="p-3 bg-white rounded-full shadow hover:scale-110 transition">
              <img src={Arrow} alt="prev" className="rotate-180 w-4" />
            </ButtonBack>

            <DotGroup className="flex gap-2" />

            <ButtonNext className="p-3 bg-white rounded-full shadow hover:scale-110 transition">
              <img src={Arrow} alt="next" className="w-4" />
            </ButtonNext>
          </div>
        </CarouselProvider>
      </div>

      {/* MEETING ACTION CARD */}
      <div className="flex justify-center mt-12 px-6 z-10">
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 w-full max-w-xl text-center space-y-6">

          <h2 className="text-2xl font-bold text-gray-800">
            Start a Meeting
          </h2>

          <button
            onClick={generateMeeting}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition transform hover:-translate-y-1"
          >
            ➕ Create New Meeting
          </button>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter Meeting ID"
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value)}
              className="flex-1 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <button
              onClick={joinMeeting}
              className="bg-green-600 text-white px-6 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Join
            </button>
          </div>

        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="mt-auto flex justify-around items-center py-6 bg-white/80 backdrop-blur-lg shadow-inner z-10">

        <button className="text-indigo-600 text-3xl hover:scale-110 transition">
          <AiFillHome />
        </button>

        <button
          onClick={() => navigate("/lobby")}
          className="text-indigo-600 text-3xl hover:scale-110 transition"
        >
          <AiOutlineVideoCamera />
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="text-indigo-600 text-3xl hover:scale-110 transition"
        >
          <TiUserOutline />
        </button>

      </div>
    </div>
  );
};



// import React from "react";
// import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
// import "pure-react-carousel/dist/react-carousel.es.css";
// import styled from "styled-components";
// import { ButtonBack, ButtonNext } from "pure-react-carousel";
// import Arrow from "./homepageutils/arrow.svg";
// import { AiOutlineVideoCamera } from "react-icons/ai";
// import { TiUserOutline } from "react-icons/ti";
// import { AiFillHome } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";

// const slidestyle = {
//   margin: "auto",
//   height: "90%",
//   color: "white",
//   width: "90%",
//   backgroundColor: "#87CEEB",
//   fontFamily: "Arial",
//   borderRadius: "30px",
// };

// export const Homepage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="App">
//       <h1 style={{ textAlign: "center", fontFamily: "Caveat" }}>P2P APP </h1>
//       <CarouselProvider
//         naturalSlideWidth={80}
//         naturalSlideHeight={80}
//         totalSlides={3}
//       >
//         <Slider>
//           <Slide index={0}>
//             <div style={slidestyle}>
//               <br />
//               <div
//                 style={{
//                   color: "black",
//                   marginLeft: "10%",
//                   alignContent: "center",
//                   marginRight: "10%",
//                 }}
//               >
//                 <h1>One platform to connect</h1>
//                 <h3>Peer to Peer Communication</h3>
//               </div>
//             </div>
//           </Slide>

//           <Slide index={1}>
//             <div style={slidestyle}>
//               <br />
//               <div
//                 style={{
//                   color: "black",
//                   marginLeft: "10%",
//                   alignContent: "center",
//                   marginRight: "10%",
//                 }}
//               >
//                 <h1>Unified Communication & Collaboration problem</h1>
//                 <h3>Make meaningful connections through video calls</h3>
//               </div>
//             </div>
//           </Slide>

//           <Slide index={2}>
//             <div style={slidestyle}>
//               <br />
//               <div
//                 style={{
//                   color: "black",
//                   marginLeft: "10%",
//                   alignContent: "center",
//                   marginRight: "10%",
//                 }}
//               >
//                 <h1>Privacy First</h1>
//                 <h3>The data is secure and private at all times</h3>
//               </div>
//             </div>
//           </Slide>
//         </Slider>

//         <Wrapper style={{ marginBottom: "150px" }}>
//           <div className="controls">
//             <ButtonBack className="btn-arrow reverse-arrow">
//               <img src={Arrow} alt="arrow" />
//             </ButtonBack>
//             <DotGroup className="dot-group" />
//             <ButtonNext className="btn-arrow">
//               <img src={Arrow} alt="arrow" />
//             </ButtonNext>
//           </div>
//           <div style={{ marginTop: "17%" }}>
//             <button
//               style={{
//                 color: "white",
//                 borderStyle: "unset",
//                 backgroundColor: "transparent",
//                 fontSize: "40px",
//                 marginLeft: "4.95%",
//               }}
//             >
//               <AiFillHome />
//             </button>

//             <button
//               style={{
//                 color: "white",
//                 borderStyle: "unset",
//                 backgroundColor: "transparent",
//                 fontSize: "40px",
//                 marginLeft: "4.95%",
//               }}
//               onClick={() => {
//                 navigate("/lobby");
//               }}
//             >
//               <AiOutlineVideoCamera />
//             </button>

//             <button
//               style={{
//                 color: "white",
//                 borderStyle: "unset",
//                 backgroundColor: "transparent",
//                 fontSize: "40px",
//                 marginLeft: "4.95%",
//               }}
//               onClick={() => {
//                 navigate("/profile");
//               }}
//             >
//               <TiUserOutline />
//             </button>
//           </div>
//         </Wrapper>
//       </CarouselProvider>
//     </div>
//   );
// };

// const Wrapper = styled.div`
//   .controls {
//     display: flex;
//     align-items: center;
//     justify-content: center;

//     .btn-arrow {
//       border: none;
//       background: none;
//       padding: 11px 20px;
//     }

//     .reverse-arrow {
//       transform: rotateY(180deg);
//     }

//     .dot-group {
//       display: flex;
//       align-items: center;
//       justify-content: center;

//       .carousel__dot {
//         width: 8px;
//         height: 8px;
//         border: none;
//         border-radius: 50%;
//         margin: 0 4px;
//         padding: 0;
//         background-color: #ffffff;
//       }

//       /* This class is found in DotGroup from pure-react-carousel */
//       /* We need to override it to add our styles */
//       .carousel__dot--selected {
//         width: 16px;
//         height: 8px;
//         border-radius: 10px;
//         background-color: #87ceeb;
//         transition: background 0.4s ease;
//       }
//     }
//   }
// `;
