import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { setLanguage } from "../redux/slices/languageSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center" }}>
      
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/cart")}>Cart 🛒</button>

      <button onClick={() => dispatch(setLanguage("en"))}>EN</button>
      <button onClick={() => dispatch(setLanguage("ar"))}>AR</button>

      {user && (
        <span style={{ fontWeight: "bold", marginLeft: "auto" }}>
          👤 {user.name || user.email || "User"}
        </span>
      )}

      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
}
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../redux/slices/authSlice";
// import { setLanguage } from "../redux/slices/languageSlice";

// export default function Navbar() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   return (
//     <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
      
//       <button onClick={() => navigate("/")}>Home</button>
//       <button onClick={() => navigate("/cart")}>Cart 🛒</button>

//       <button onClick={() => dispatch(setLanguage("en"))}>EN</button>
//       <button onClick={() => dispatch(setLanguage("ar"))}>AR</button>

//       <button onClick={() => dispatch(logout())}>Logout</button>
//     </div>
//   );
// }


// export default function Navbar() {
//   const dispatch = useDispatch();
//   const { lang } = useSelector((state) => state.language);

//   return (
//     <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
//       <button onClick={() => dispatch(setLanguage("en"))}>EN</button>
//       <button onClick={() => dispatch(setLanguage("ar"))}>AR</button>

//       <button onClick={() => dispatch(logout())}>Logout</button>
//     </div>
//   );
// }