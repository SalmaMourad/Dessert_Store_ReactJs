import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, setUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
 
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(loginUser(form));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      
      {/* 🔐 EMAIL LOGIN */}
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Login</button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      {/* 🔥 GOOGLE LOGIN */}
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const user = jwtDecode(credentialResponse.credential);

          dispatch(
            setUser({
              name: user.name,
              email: user.email,
              image: user.picture,
            })
          );

          navigate("/");
        }}
        onError={() => {
          console.log("Google Login Failed");
        }}
      />
    </div>
  );
}