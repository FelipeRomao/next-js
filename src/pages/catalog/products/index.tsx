import { useState } from "react";
import dynamic from "next/dynamic";

const AddToCartModal = dynamic(
  () => import("../../../components/AddToCartModal"),
  { loading: () => <p>Loading...</p> }
);

export default function Products() {
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

  function handleAddToCart() {
    setIsAddToCartModalVisible(true);
  }

  return (
    <>
      <button onClick={handleAddToCart}>Add to cart</button>

      {isAddToCartModalVisible && <AddToCartModal />}
    </>
  );
}
