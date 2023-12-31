import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getBagById } from "../../services/bags-database-service";
import styles from "./ProductPage.module.scss";
import { CartContext } from "../../context/CartContextProvider";
import Favourited from "../../components/Favourited/Favourited";
import Header from "../../components/Header/Header";

const ProductPage = () => {
  const { id } = useParams();
  const [bags, setBags] = useState(null);
  const [error, setError] = useState(null);
  const { cartItems, addToCart } = useContext(CartContext);

  useEffect(() => {
    getBagById(id)
      .then((bags) => {
        setBags(bags);
        console.log(bags);
      })
      .catch((error) => setError(error));
  }, [id]);

  console.log(bags, "bags from item page");

  return (
    <main>
      <Header />
      <div className={styles.whole}>
        {bags && (
          <div className={styles.individual}>
            <h1>{bags.name}</h1>
            <h2>{bags.style}</h2>
            <p>{bags.favourited}</p>
            <h2>${bags.cost}</h2>
            <img src={bags.image} alt={bags.name} />
            <button
              onClick={() => {
                addToCart(bags);
                alert("Added to cart");
              }}
            >
              Add to cart
            </button>
            <p>{bags.desc}</p>
            <div>
              <ul>
                <li>
                  <button></button>
                </li>
                <li>
                  <button></button>
                </li>
              </ul>
            </div>
          </div>
        )}
        {error && <p>Cannot find product with ID: {id}</p>}
        <div className={styles.shrink}>
          <img src={bags.image} alt={bags.name} />
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
