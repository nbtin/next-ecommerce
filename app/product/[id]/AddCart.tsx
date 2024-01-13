"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/types/AddCartType";
import { spawn } from "child_process";
import { useState } from "react";

export default function AddCart({
  name,
  id,
  image,
  quantity,
  unit_amount,
}: AddCartType) {
  const cartStore = useCartStore();

  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    cartStore.addProduct({ name, id, image, quantity, unit_amount });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 500);
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        disabled={added}
        className="my-4 btn btn-success w-full text-gray-300"
      >
        {added ? <span>Adding to cart 😋</span> : <span>Add to cart</span>}
      </button>
    </div>
  );
}
