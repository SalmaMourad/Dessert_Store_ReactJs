import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getProducts,
  getCategories,
  addProduct,
  deleteProduct,
  editProduct,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "./redux/slices/productsSlice";

export default function App() {
  const dispatch = useDispatch();

  const { products, categories, cart, isLoading } = useSelector(
    (state) => state.products
  );

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  const handleAdd = () => {
    dispatch(
      addProduct({
        name: "Test Cake",
        price: 100,
        image: "test.jpg",
        category: "cake",
        categoryId: 1,
        description: "Test",
        rating: 4.5,
      })
    );
  };

  // FILTER
  const filteredProducts =
    selectedCategory !== null
      ? products.filter(
        (p) => Number(p.categoryId) === Number(selectedCategory)
      )
      : products;

  const total =
    cart?.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ) || 0;

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div style={{ display: "flex", gap: "30px" }}>

      {/* PRODUCTS */}
      <div style={{ flex: 3 }}>
        <h1>Desserts 🍰</h1>

        {/* Categories */}
        <button onClick={() => setSelectedCategory(null)}>All</button>
        {categories?.map((cat) => (
          <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}>
            {cat.name}
          </button>
        ))}

        <br /><br />

        <button onClick={handleAdd}>Add Product</button>

        {filteredProducts.map((item) => (
          <div key={item.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
            <img src={`${item.image}`} width="120" />

            <h3>{item.name}</h3>
            <p>{item.price} EGP</p>

            <button onClick={() => dispatch(deleteProduct(item.id))}>
              Delete
            </button>

            <button
              onClick={() =>
                dispatch(
                  editProduct({
                    id: item.id,
                    product: { ...item, name: item.name + " 🔥" },
                  })
                )
              }
            >
              Edit
            </button>

            <button onClick={() => dispatch(addToCart(item))}>
              🛒 Add
            </button>
          </div>
        ))}
      </div>

      {/* CART */}
      <div style={{ flex: 1 }}>
        <h2>Cart 🛒</h2>

        {cart.length === 0 && <p>Cart is empty</p>}

        {cart.map((item) => (
          <div key={item.id}>
            <h4>{item.name}</h4>
            <p>Qty: {item.quantity}</p>

            <button onClick={() => dispatch(increaseQuantity(item.id))}>
              +
            </button>

            <button onClick={() => dispatch(decreaseQuantity(item.id))}>
              -
            </button>

            <button onClick={() => dispatch(removeFromCart(item.id))}>
              Remove
            </button>
          </div>
        ))}

        <h3>Total: {total} EGP</h3>
      </div>
    </div>
  );
}