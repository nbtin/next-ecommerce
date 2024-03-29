import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import formatPrice from "@/util/PriceFormat";
import Image from "next/image";
import { prisma } from "@/util/prisma";

export const revalidate = 0;

const fetchOrders = async () => {
  // const prisma = new PrismaClient();
  const user = await getServerSession(authOptions);
  if (!user) {
    return null;
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user?.user?.id,
      status: "complete",
    },
    include: {
      products: true,
    },
  });

  return orders;
};

export default async function Dashboard() {
  const orders = await fetchOrders();
  console.log(orders);
  if (!orders) {
    return <div>You need to be logged in to see your orders.</div>;
  }

  if (orders.length === 0) {
    return <h1 className="text-bold ">You have no orders...🥹</h1>;
  }
  return (
    <div>
      <div className="font-medium">
        {orders
          .sort(
            (a, b) =>
              new Date(b.createdDate).getTime() -
              new Date(a.createdDate).getTime()
          )
          .map((order) => (
            <div
              key={order.id}
              className="rounded-lg p-8 my-4 space-y-2 bg-base-200"
            >
              <h2 className="text-xs font-medium">
                Order reference: {order.id}
              </h2>
              <p className="text-xs">
                Status:{" "}
                <span
                  className={`${
                    order.status === "complete" ? "bg-accent" : "bg-orange-400"
                  } text-white px-2 py-1 mx-2 rounded-md text-xs`}
                >
                  {order.status}
                </span>
              </p>
              <p className="text-xs">
                Time: {new Date(order.createdDate).toString()}
              </p>
              <div className="text-sm xl:flex items-center gap-4">
                {order.products.map((product) => (
                  <div
                    className="rounded-lg p-4 my-2 space-y-2 bg-base-300"
                    key={product.id}
                  >
                    <h2 className="py-2">{product.name}</h2>
                    <div className="flex items-center gap-4">
                      <Image
                        src={product.image!}
                        width={36}
                        height={36}
                        alt={product.name}
                        priority={true}
                        className="w-auto"
                      />
                      <p>{formatPrice(product.unit_amount)}</p>
                      <p>Quantity: {product.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-medium">Total: {formatPrice(order.amount)}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
