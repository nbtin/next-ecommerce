import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { AddCartType } from "@/types/AddCartType";
import { prisma } from "@/util/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

// const prisma = new PrismaClient();

const calculateOrderAmount = (items: AddCartType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);
  return totalPrice;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get user
  const userSession = await getServerSession(req, res, authOptions);

  if (!userSession?.user) {
    res.status(403).json({ message: "Not logged in" });
    return;
  }

  // extract the data from the body
  const { items, payment_intent_id } = req.body;
  const total_amount = calculateOrderAmount(items);
  console.log(payment_intent_id);

  // create the order data
  const orderData = {
    user: { connect: { id: userSession.user?.id } },
    amount: total_amount,
    currency: "usd",
    status: "pending",
    paymentIntentID: payment_intent_id,
    products: {
      create: items.map((item) => ({
        name: item.name,
        description: item.description || null,
        unit_amount: parseFloat(item.unit_amount),
        image: item.image,
        quantity: item.quantity,
      })),
    },
  };

  console.log(payment_intent_id);

  // check if the payment intent exists
  if (payment_intent_id) {
    console.log("payment intent exists");
    // update the order
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );
    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        {
          amount: total_amount,
        }
      );
      // fetch order with product ids
      const existing_order = await prisma.order.findFirst({
        where: {
          paymentIntentID: updated_intent.id,
        },
        include: {
          products: true,
        },
      });

      if (!existing_order) {
        res.status(400).json({ message: "Invalid Payment Intent" });
      }

      // update existing order
      const updated_order = await prisma.order.update({
        where: {
          id: existing_order?.id,
        },
        data: {
          amount: total_amount,
          products: {
            deleteMany: {},
            create: items.map((item) => ({
              name: item.name,
              description: item.description || null,
              unit_amount: parseFloat(item.unit_amount),
              image: item.image,
              quantity: item.quantity,
            })),
          },
        },
      });
      res.status(200).json({ paymentIntent: updated_intent });
      return;
    }
  } else {
    console.log("payment intent doesn't exist");
    // create a new order with prisma
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total_amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    orderData.paymentIntentID = paymentIntent.id;
    const newOrder = await prisma.order.create({
      data: orderData,
    });
    res.status(200).json({ paymentIntent });
  }

  // data necessary for the order
}
