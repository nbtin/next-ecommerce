"use client";

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY! // add prefix "NEXT_PUBLIC_" for using the stripe publishable key from .env on the client side
);

export default function Checkout() {
  const cartStore = useCartStore();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // create a paymentIntent as soon as the page loads up,
    // return the ID of the payment intent, so the client can "edit" the form of payment later
    // => not create a new more payment -> save the database :))
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartStore.cart,
        payment_intent_id: cartStore.paymentIntent,
      }),
    })
      .then((res) => {
        if (res.status === 403) {
          // redirect to login
          return router.push("/api/auth/signin");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <div>
      <h1>Checkout</h1>
    </div>
  );
}
