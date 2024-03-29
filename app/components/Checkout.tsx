"use client";

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CheckoutForm from "./CheckoutForm";
import OrderAnimation from "./OrderAnimation";
import { motion } from "framer-motion";
import { useThemeStore } from "@/store";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY! // add prefix "NEXT_PUBLIC_" for using the stripe publishable key from .env on the client side
);

export default function Checkout() {
  const cartStore = useCartStore();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");
  const themeStore = useThemeStore();
  const [stripeTheme, setStripeTheme] = useState<
    "flat" | "stripe" | "night" | "none"
  >("stripe");

  useEffect(() => {
    // set the theme of stripe
    if (themeStore.mode === "dark") {
      setStripeTheme("night");
    } else {
      setStripeTheme("stripe");
    }

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
        setClientSecret(data.paymentIntent.client_secret);
        cartStore.setPaymentIntent(data.paymentIntent.id);
      });
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: stripeTheme,
      labels: "floating",
    },
  };

  return (
    <div>
      {!clientSecret && <OrderAnimation />}
      {clientSecret && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret}></CheckoutForm>
          </Elements>
        </motion.div>
      )}
    </div>
  );
}
