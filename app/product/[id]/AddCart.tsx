"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/types/AddCartType";

export default function AddCart({
  name,
  id,
  image,
  quantity,
  unit_amount,
}: AddCartType) {
  const cartStore = useCartStore();

  return (
    <div>
      <button
        onClick={() =>
          cartStore.addProduct({ name, id, image, quantity, unit_amount })
        }
        className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700"
      >
        Add to cart
      </button>
    </div>
  );
}
