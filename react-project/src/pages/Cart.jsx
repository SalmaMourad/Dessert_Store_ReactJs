import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/slices/productsSlice";

import Navbar from "../components/Navbar";
import { translations } from "../i18n/translations";

import { loadStripe } from "@stripe/stripe-js";

// ✅ Stripe Publishable Key
const stripePromise = loadStripe(
  "pk_test_51TU6lcHBZfNM9VGjqWJ0HzMYpvtBdI52OqMXPBzcy2eRy10w6mDNY0h3iQI9cRMdyryytwlFPEq8kaGMpon6UNYc001FDlEKYF"
);

export default function Cart() {
  const dispatch = useDispatch();

  const { cart, products } = useSelector(
    (state) => state.products
  );

  const { lang } = useSelector((state) => state.language);

  const t = translations[lang];

  // ✅ loading state
  const [isCheckingOut, setIsCheckingOut] =
    useState(false);

  // ✅ merge cart + products
  const cartWithDetails = cart
    .map((item) => {
      const product = products.find(
        (p) => p.id === item.id
      );

      if (!product) return null;

      return {
        ...product,
        quantity: item.quantity,
      };
    })
    .filter(Boolean);

  // ✅ total
  const total =
    cartWithDetails.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    ) || 0;

  // ✅ STRIPE CHECKOUT
//   const handleCheckout = async () => {
//     try {
//       setIsCheckingOut(true);

//       const stripe = await stripePromise;

//       const response = await fetch(
//         "http://localhost:3001/checkout",
//         {
//           method: "POST",

//           headers: {
//             "Content-Type":
//               "application/json",
//           },

//           body: JSON.stringify({
//             products: cartWithDetails,
//           }),
//         }
//       );

//       const session = await response.json();

//     //   await stripe.redirectToCheckout({
//     //     sessionId: session.id,
//     //   });
// // const session = await response.json();

// window.location.href = session.url;
//       setIsCheckingOut(false);

//     } catch (err) {
//       console.log(err);

//       setIsCheckingOut(false);

//       alert(
//         lang === "ar"
//           ? "حدث خطأ أثناء الدفع"
//           : "Checkout Error"
//       );
//     }
//   };
const handleCheckout = async () => {
  try {
    setIsCheckingOut(true);

    const response = await fetch(
      "http://localhost:3001/checkout",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          products: cartWithDetails,
        }),
      }
    );

    const session = await response.json();

    window.location.href = session.url;

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      style={{
        padding: 20,
        maxWidth: 1000,
        margin: "auto",
      }}
    >
      {/* NAVBAR */}
      <Navbar />

      {/* TITLE */}
      <h1 style={{ marginBottom: 20 }}>
        {t.cart} 🛒
      </h1>

      {/* EMPTY CART */}
      {cart.length === 0 && (
        <div
          style={{
            padding: 20,
            border: "1px solid #ddd",
            borderRadius: 10,
            textAlign: "center",
          }}
        >
          <p>{t.emptyCart}</p>
        </div>
      )}

      {/* CART ITEMS */}
      {cartWithDetails.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            border: "1px solid #ddd",
            padding: 15,
            marginBottom: 15,
            borderRadius: 12,
          }}
        >
          {/* IMAGE */}
          <img
            src={`/images/${item.image}`}
            alt={item.name}
            width="120"
            style={{
              borderRadius: 10,
              objectFit: "cover",
            }}
          />

          {/* INFO */}
          <div style={{ flex: 1 }}>
            <h3>{item.name}</h3>

            <p>{item.price} EGP</p>

            <p>
              {t.qty}: {item.quantity}
            </p>

            {/* BUTTONS */}
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                marginTop: 10,
              }}
            >
              {/* + */}
              <button
                onClick={() =>
                  dispatch(
                    increaseQuantity(item.id)
                  )
                }
              >
                +
              </button>

              {/* - */}
              <button
                onClick={() =>
                  dispatch(
                    decreaseQuantity(item.id)
                  )
                }
              >
                -
              </button>

              {/* REMOVE */}
              <button
                onClick={() =>
                  dispatch(
                    removeFromCart(item.id)
                  )
                }
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                {t.remove}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* TOTAL + CHECKOUT */}
      {cart.length > 0 && (
        <div
          style={{
            marginTop: 30,
            padding: 20,
            border: "1px solid #ddd",
            borderRadius: 12,
          }}
        >
          {/* TOTAL */}
          <h2>
            {t.total}: {total} EGP
          </h2>

          {/* CHECKOUT BUTTON */}
          <button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            style={{
              marginTop: 15,
              padding: "12px 20px",
              background: "#635BFF",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            {isCheckingOut
              ? lang === "ar"
                ? "جاري التحويل..."
                : "Redirecting..."
              : lang === "ar"
              ? "الدفع 💳"
              : "Checkout 💳"}
          </button>
        </div>
      )}
    </div>
  );
}
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   increaseQuantity,
//   decreaseQuantity,
//   removeFromCart,
// } from "../redux/slices/productsSlice";

// import Navbar from "../components/Navbar";
// import { translations } from "../i18n/translations";

// export default function Cart() {
//   const dispatch = useDispatch();

//   const { cart, products } = useSelector(
//     (state) => state.products
//   );

//   const { lang } = useSelector((state) => state.language);

//   const t = translations[lang];

//   // 💳 fake checkout loading
//   const [isCheckingOut, setIsCheckingOut] = useState(false);

//   // 🧠 merge cart + products
//   const cartWithDetails = cart
//     .map((item) => {
//       const product = products.find((p) => p.id === item.id);

//       if (!product) return null;

//       return {
//         ...product,
//         quantity: item.quantity,
//       };
//     })
//     .filter(Boolean);

//   // 💰 total
//   const total =
//     cartWithDetails.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     ) || 0;

//   // 💳 fake stripe checkout
//   const handleCheckout = () => {
//     setIsCheckingOut(true);

//     setTimeout(() => {
//       setIsCheckingOut(false);

//       window.open("https://checkout.stripe.com/", "_blank");
//     }, 2000);
//   };

//   return (
//     <div
//       dir={lang === "ar" ? "rtl" : "ltr"}
//       style={{
//         padding: 20,
//         maxWidth: 1000,
//         margin: "auto",
//       }}
//     >
//       {/* NAVBAR */}
//       <Navbar />

//       {/* TITLE */}
//       <h1 style={{ marginBottom: 20 }}>
//         {t.cart} 🛒
//       </h1>

//       {/* EMPTY CART */}
//       {cart.length === 0 && (
//         <div
//           style={{
//             padding: 20,
//             border: "1px solid #ddd",
//             borderRadius: 10,
//             textAlign: "center",
//           }}
//         >
//           <p>{t.emptyCart}</p>
//         </div>
//       )}

//       {/* CART ITEMS */}
//       {cartWithDetails.map((item) => (
//         <div
//           key={item.id}
//           style={{
//             display: "flex",
//             gap: 20,
//             alignItems: "center",
//             border: "1px solid #ddd",
//             padding: 15,
//             marginBottom: 15,
//             borderRadius: 12,
//           }}
//         >
//           {/* IMAGE */}
//           <img
//             src={`/images/${item.image}`}
//             alt={item.name}
//             width="120"
//             style={{
//               borderRadius: 10,
//               objectFit: "cover",
//             }}
//           />

//           {/* INFO */}
//           <div style={{ flex: 1 }}>
//             <h3>{item.name}</h3>

//             <p>{item.price} EGP</p>

//             <p>
//               {t.qty}: {item.quantity}
//             </p>

//             {/* QUANTITY */}
//             <div
//               style={{
//                 display: "flex",
//                 gap: 10,
//                 alignItems: "center",
//                 marginTop: 10,
//               }}
//             >
//               <button
//                 onClick={() =>
//                   dispatch(increaseQuantity(item.id))
//                 }
//               >
//                 +
//               </button>

//               <button
//                 onClick={() =>
//                   dispatch(decreaseQuantity(item.id))
//                 }
//               >
//                 -
//               </button>

//               <button
//                 onClick={() =>
//                   dispatch(removeFromCart(item.id))
//                 }
//                 style={{
//                   background: "red",
//                   color: "white",
//                   border: "none",
//                   padding: "6px 10px",
//                   borderRadius: 6,
//                   cursor: "pointer",
//                 }}
//               >
//                 {t.remove}
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* TOTAL */}
//       {cart.length > 0 && (
//         <div
//           style={{
//             marginTop: 30,
//             padding: 20,
//             border: "1px solid #ddd",
//             borderRadius: 12,
//           }}
//         >
//           <h2>
//             {t.total}: {total} EGP
//           </h2>

//           {/* CHECKOUT */}
//           <button
//             onClick={handleCheckout}
//             disabled={isCheckingOut}
//             style={{
//               marginTop: 15,
//               padding: "12px 20px",
//               background: "#635BFF",
//               color: "white",
//               border: "none",
//               borderRadius: 8,
//               cursor: "pointer",
//               fontSize: 16,
//             }}
//           >
//             {isCheckingOut
//               ? lang === "ar"
//                 ? "جاري التحويل..."
//                 : "Redirecting..."
//               : lang === "ar"
//               ? "الدفع 💳"
//               : "Checkout 💳"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
// import { useDispatch, useSelector } from "react-redux";
// import {
//   increaseQuantity,
//   decreaseQuantity,
//   removeFromCart,
// } from "../redux/slices/productsSlice";

// import Navbar from "../components/Navbar";
// import { translations } from "../i18n/translations";

// export default function Cart() {
//   const dispatch = useDispatch();

//   const { cart, products } = useSelector(
//     (state) => state.products
//   );

//   const { lang } = useSelector((state) => state.language);
//   const t = translations[lang];

//   // 🧠 merge cart + products (important)
//   const cartWithDetails = cart
//     .map((item) => {
//       const product = products.find((p) => p.id === item.id);
//       if (!product) return null;

//       return {
//         ...product,
//         quantity: item.quantity,
//       };
//     })
//     .filter(Boolean);

//   const total =
//     cartWithDetails.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     ) || 0;

//   return (
//     <div dir={lang === "ar" ? "rtl" : "ltr"} style={{ padding: 20 }}>
      
//       <Navbar />

//       <h1>{t.cart} 🛒</h1>

//       {cart.length === 0 && <p>{t.emptyCart}</p>}

//       {cartWithDetails.map((item) => (
//         <div
//           key={item.id}
//           style={{
//             border: "1px solid #ccc",
//             padding: 10,
//             marginBottom: 10,
//             borderRadius: 10,
//           }}
//         >
//           <h3>{item.name}</h3>
//           <p>{item.price} EGP</p>

//           <p>
//             {t.qty}: {item.quantity}
//           </p>

//           <button onClick={() => dispatch(increaseQuantity(item.id))}>
//             +
//           </button>

//           <button onClick={() => dispatch(decreaseQuantity(item.id))}>
//             -
//           </button>

//           <button onClick={() => dispatch(removeFromCart(item.id))}>
//             {t.remove}
//           </button>
//         </div>
//       ))}

//       <h2>
//         {t.total}: {total} EGP
//       </h2>
//     </div>
//   );
// }