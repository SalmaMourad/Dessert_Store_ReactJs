// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import { useDispatch } from "react-redux";
// import { setUser } from "../redux/slices/authSlice";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   return (
//     <div style={{ textAlign: "center", marginTop: 100 }}>
//       <h2>Login with Google</h2>

// <GoogleLogin
//   onSuccess={(credentialResponse) => {
//     const user = jwtDecode(credentialResponse.credential);
//     dispatch(setUser({
//       name: user.name,
//       email: user.email,
//       image: user.picture,
//     }));
//     navigate("/");
//   }}
//   onError={() => console.log("Login Failed")}
//   useOneTap={false}
//   auto_select={false}
// />
//       {/* <GoogleLogin
//         onSuccess={(credentialResponse) => {
//           const user = jwtDecode(credentialResponse.credential);

//           dispatch(
//             setUser({
//               name: user.name,
//               email: user.email,
//               image: user.picture,
//             })
//           );

//           navigate("/");
//         }}
//         onError={() => {
//           console.log("Login Failed");
//         }}
//       /> */}
//     </div>
//   );
// }
// // import { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { loginUser } from "./redux/slices/authSlice";

// // export default function Login() {
// //   const dispatch = useDispatch();
// //   const { error, isLoading } = useSelector((state) => state.auth);

// //   const [form, setForm] = useState({
// //     email: "",
// //     password: "",
// //   });

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     dispatch(loginUser(form));
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <h2>Login</h2>

// //       <input
// //         placeholder="Email"
// //         onChange={(e) =>
// //           setForm({ ...form, email: e.target.value })
// //         }
// //       />

// //       <input
// //         type="password"
// //         placeholder="Password"
// //         onChange={(e) =>
// //           setForm({ ...form, password: e.target.value })
// //         }
// //       />

// //       <button type="submit">
// //         {isLoading ? "Loading..." : "Login"}
// //       </button>

// //       {error && <p style={{ color: "red" }}>{error}</p>}
// //     </form>
// //   );
// // }
// // // import { useState } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { loginUser } from "./redux/slices/authSlice";

// // // export default function Login() {
// // //   const dispatch = useDispatch();
// // //   const { error } = useSelector((state) => state.auth);

// // //   const [form, setForm] = useState({
// // //     email: "",
// // //     password: "",
// // //   });

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();
// // //     dispatch(loginUser(form));
// // //   };

// // //   return (
// // //     <form onSubmit={handleSubmit}>
// // //       <h2>Login</h2>

// // //       <input
// // //         placeholder="Email"
// // //         onChange={(e) =>
// // //           setForm({ ...form, email: e.target.value })
// // //         }
// // //       />

// // //       <input
// // //         type="password"
// // //         placeholder="Password"
// // //         onChange={(e) =>
// // //           setForm({ ...form, password: e.target.value })
// // //         }
// // //       />

// // //       <button type="submit">Login</button>

// // //       {error && <p>{error}</p>}
// // //     </form>
// // //   );
// // // }