import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getProducts,
  getCategories,
  addToCart,
} from "../redux/slices/productsSlice";

import Navbar from "../components/Navbar";
import { translations } from "../i18n/translations";

export default function Home() {
  const dispatch = useDispatch();

  const { products, categories, cart } = useSelector(
    (state) => state.products
  );

  const { lang } = useSelector((state) => state.language);

  const t = translations[lang];

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch, lang]);

  const filteredProducts =
    selectedCategory !== null
      ? products.filter(
          (p) => Number(p.categoryId) === Number(selectedCategory)
        )
      : products;

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} style={{ padding: 20 }}>
      <Navbar />

      <h1>{t.title}</h1>

      {/* Categories */}
      <button onClick={() => setSelectedCategory(null)}>
        {t.all}
      </button>

      {categories.map((cat) => (
        <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}>
          {cat.name}
        </button>
      ))}

      {/* Products */}
      {filteredProducts.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <button onClick={() => dispatch(addToCart(item))}>
            {t.addToCart}
          </button>
        </div>
      ))}
    </div>
  );
}