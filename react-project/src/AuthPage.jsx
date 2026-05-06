import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: 50,
        maxWidth: 400,
        marginInline: "auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 10,
      }}
    >
      <h1>{isLogin ? "Welcome Back 👋" : "Create Account 🚀"}</h1>

      {isLogin ? <Login /> : <Register />}

      <p style={{ marginTop: 20 }}>
        {isLogin
          ? "Don't have an account?"
          : "Already have an account?"}
      </p>

      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Register" : "Login"}
      </button>
    </div>
  );
}