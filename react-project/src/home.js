// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   getProducts,
//   getCategories,
//   addProduct,
//   deleteProduct,
//   editProduct,
//   addToCart,
//   removeFromCart,
//   increaseQuantity,
//   decreaseQuantity,
// } from "./redux/slices/productsSlice";


// import { setLanguage } from "./redux/slices/languageSlice";
// import { translations } from "./i18n/translations";
// import Login from "./Login";
// import { logout } from "./redux/slices/authSlice";
// import AuthPage from "./AuthPage";

// export default function Home() {
//   const dispatch = useDispatch();

//   const { products, categories, cart, isLoading } = useSelector(
//     (state) => state.products
//   );
//   const { user } = useSelector(state => state.auth);

//   if (!user) return <AuthPage />;
//   const { lang } = useSelector((state) => state.language);

//   const t = translations[lang]; // 🔥 الترجمة

//   const [selectedCategory, setSelectedCategory] = useState(null);

//   // 🔄 fetch data
//   useEffect(() => {
//     dispatch(getProducts());
//     dispatch(getCategories());
//   }, [dispatch, lang]);

//   // 🔄 reset category on language change
//   useEffect(() => {
//     setSelectedCategory(null);
//   }, [lang]);

//   // 🎯 filter
//   const filteredProducts =
//     selectedCategory !== null
//       ? products.filter(
//         (p) => Number(p.categoryId) === Number(selectedCategory)
//       )
//       : products;

//   // 🛒 merge cart with products
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

//   if (isLoading) return <h2>Loading...</h2>;

//   return (
//     <div
//       dir={lang === "ar" ? "rtl" : "ltr"}
//       style={{ display: "flex", gap: 30, padding: 20 }}
//     >

//       {/* ================= PRODUCTS ================= */}
//       <div style={{ flex: 3 }}>
//         <h1>{t.title}</h1>
//         {/* <button onClick={() => dispatch(logout())}>
//           Logout
//         </button> */}
//         <button
//           onClick={() => dispatch(logout())}
//           style={{
//             background: "red",
//             color: "white",
//             marginBottom: 10,
//           }}
//         >
//           Logout
//         </button>
//         {/* 🌍 LANGUAGE */}
//         <div style={{ marginBottom: 15 }}>
//           <button onClick={() => dispatch(setLanguage("en"))}>EN</button>
//           <button onClick={() => dispatch(setLanguage("ar"))}>AR</button>
//         </div>

//         {/* 🎯 CATEGORIES */}
//         <div style={{ marginBottom: 15 }}>
//           <button
//             onClick={() => setSelectedCategory(null)}
//             style={{
//               background: selectedCategory === null ? "#ff6b6b" : "#eee",
//               color: selectedCategory === null ? "#fff" : "#000",
//               margin: 5,
//               padding: "8px 12px",
//               border: "none",
//               borderRadius: 8,
//               cursor: "pointer",
//             }}
//           >
//             {t.all}
//           </button>

//           {categories?.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setSelectedCategory(cat.id)}
//               style={{
//                 background:
//                   selectedCategory === cat.id ? "#ff6b6b" : "#eee",
//                 color:
//                   selectedCategory === cat.id ? "#fff" : "#000",
//                 margin: 5,
//                 padding: "8px 12px",
//                 border: "none",
//                 borderRadius: 8,
//                 cursor: "pointer",
//               }}
//             >
//               {cat.name}
//             </button>
//           ))}
//         </div>

//         {/* 🧾 TITLE */}
//         <h3>
//           {selectedCategory ? t.categoryProducts : t.allProducts}
//         </h3>

//         {/* ➕ ADD PRODUCT */}
//         <button
//           onClick={() =>
//             dispatch(
//               addProduct({
//                 name: "Test Cake",
//                 price: 100,
//                 image: "test.jpg",
//                 category: "cake",
//                 categoryId: 1,
//                 description: "Test",
//                 rating: 4.5,
//               })
//             )
//           }
//         >
//           {t.addProduct}
//         </button>

//         {/* 📦 PRODUCTS */}
//         {filteredProducts.map((item) => (
//           <div
//             key={item.id}
//             style={{
//               border: "1px solid #ccc",
//               marginTop: 10,
//               padding: 10,
//               borderRadius: 10,
//             }}
//           >
//             <img src={`/images/${item.image}`} width="120" />

//             <h3>{item.name}</h3>
//             <p>{item.price} EGP</p>

//             <button onClick={() => dispatch(deleteProduct(item.id))}>
//               {t.delete}
//             </button>

//             <button
//               onClick={() =>
//                 dispatch(
//                   editProduct({
//                     id: item.id,
//                     product: {
//                       ...item,
//                       name: item.name + " 🔥",
//                     },
//                   })
//                 )
//               }
//             >
//               {t.edit}
//             </button>

//             <button onClick={() => dispatch(addToCart(item))}>
//               {t.addToCart}
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* ================= CART ================= */}
//       <div style={{ flex: 1 }}>
//         <h2>{t.cart} 🛒</h2>

//         {cart.length === 0 && <p>{t.emptyCart}</p>}

//         {cartWithDetails.map((item) => (
//           <div key={item.id} style={{ marginBottom: 10 }}>
//             <h4>{item.name}</h4>

//             <p>
//               {t.qty}: {item.quantity}
//             </p>

//             <button onClick={() => dispatch(increaseQuantity(item.id))}>
//               +
//             </button>

//             <button onClick={() => dispatch(decreaseQuantity(item.id))}>
//               -
//             </button>

//             <button onClick={() => dispatch(removeFromCart(item.id))}>
//               {t.remove}
//             </button>
//           </div>
//         ))}

//         <h3>
//           {t.total}: {total} EGP
//         </h3>
//       </div>
//     </div>
//   );
// }