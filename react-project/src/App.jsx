import { useState } from "react";
import data from "./data/desserts.json";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = data.categories;
  const products = data.products;

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categoryId === selectedCategory)
    : products;

  return (
    <div className="container">
      <h1>🍰 Dessert Shop</h1>

      {/* Categories */}
      <div className="categories">
        <button onClick={() => setSelectedCategory(null)}>
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="grid">
        {filteredProducts.map((item) => (
          <div className="card" key={item.id}>
            <img
            width={200}
            height={200}
              src={`${item.image}`}
              alt={item.name}
            />

            <h3>{item.name}</h3>
            <p className="desc">{item.description}</p>

            <div className="info">
              <span className="price">{item.price} EGP</span>
              <span className="rating">⭐ {item.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}