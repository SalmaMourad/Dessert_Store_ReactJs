import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "./redux/slices/authSlice";

export default function Register() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

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

      <button type="submit">Register</button>
    </form>
  );
}
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { registerUser } from "./redux/slices/authSlice";

// export default function Register() {
//   const dispatch = useDispatch();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(registerUser(form));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Register</h2>

//       <input
//         placeholder="Name"
//         onChange={(e) =>
//           setForm({ ...form, name: e.target.value })
//         }
//       />

//       <input
//         placeholder="Email"
//         onChange={(e) =>
//           setForm({ ...form, email: e.target.value })
//         }
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) =>
//           setForm({ ...form, password: e.target.value })
//         }
//       />

//       <button type="submit">Register</button>
//     </form>
//   );
// }