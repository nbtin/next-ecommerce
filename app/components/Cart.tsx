"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import formatPrice from "@/util/PriceFormat";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import empty_cart from "@/public/empty_cart.png";
import { motion, AnimatePresence } from "framer-motion";
import Checkout from "./Checkout";
import OrderConfirmed from "./OrderConfirmed";

export default function Cart() {
  const cartStore = useCartStore();

  // total price
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + (item.unit_amount as number) * (item.quantity as number);
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      {/* cart */}
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-base-200 absolute right-0 top-0 h-screen p-12 overflow-y-scroll w-full lg:w-1/3"
      >
        {cartStore.onCheckout === "cart" && (
          <button
            onClick={() => cartStore.toggleCart()}
            className="text-sm font-bold mb-8 hover:bg-base-100 rounded-lg p-2"
          >
            Back to store 🏃🏼‍♂️
          </button>
        )}
        {cartStore.cart.length > 0 && cartStore.onCheckout === "cart" && (
          <h1>Here's your shopping list 📃</h1>
        )}

        {cartStore.onCheckout === "checkout" && (
          <button
            onClick={() => cartStore.setCheckout("cart")}
            className="text-sm font-bold mb-8 hover:bg-base-100 rounded-lg p-2"
          >
            Check your cart 🛒
          </button>
        )}

        {/* cart items */}
        {cartStore.onCheckout === "cart" && (
          <>
            {cartStore.cart.map((item) => (
              <motion.div
                layout
                key={item.id}
                className="flex p-4 gap-4 bg-base-100 my-4 rounded-lg"
              >
                <Image
                  className="rounded-md h-24"
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                />
                <motion.div layout>
                  <h2>{item.name}</h2>
                  {/* update quantity of product in cart */}
                  <div className="flex gap-2 text-md">
                    <h2>Quantity: {item.quantity}</h2>
                    <button
                      onClick={() =>
                        cartStore.removeProduct({
                          id: item.id,
                          image: item.image,
                          name: item.name,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity,
                        })
                      }
                    >
                      <IoRemoveCircle />
                    </button>
                    <button
                      onClick={() =>
                        cartStore.addProduct({
                          id: item.id,
                          image: item.image,
                          name: item.name,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity,
                        })
                      }
                    >
                      <IoAddCircle />
                    </button>
                  </div>
                  <p className="text-sm">
                    {item.unit_amount && formatPrice(item.unit_amount)}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </>
        )}
        {/* checkout and total */}
        {cartStore.cart.length > 0 && cartStore.onCheckout === "cart" ? (
          <motion.div layout>
            <p className="font-bold">Total: {formatPrice(totalPrice)}</p>
            <button
              onClick={() => cartStore.setCheckout("checkout")}
              className="py-2 mt-4 bg-success w-full rounded-md text-white"
            >
              Checkout
            </button>
          </motion.div>
        ) : null}
        {/* checkout form */}
        {cartStore.onCheckout === "checkout" && <Checkout />}
        {cartStore.onCheckout === "success" && <OrderConfirmed />}
        <AnimatePresence>
          {!cartStore.cart.length && cartStore.onCheckout === "cart" && (
            <motion.div
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              exit={{ scale: 0, rotateZ: -10, opacity: 0 }}
              className="flex flex-col items-center gap-12 text-2xl font-medium pt-32 opacity-75"
            >
              <h1>Oh no, your cart is empty! 😢</h1>
              <Image
                src={empty_cart}
                alt="empty cart"
                width={200}
                height={200}
              ></Image>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
