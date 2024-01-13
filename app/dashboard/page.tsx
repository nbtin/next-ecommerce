import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { error } from "console";
import formatPrice from "@/util/PriceFormat";
import Image from "next/image";

export const revalidate = 0;

const fetchOrders = async () => {
  const prisma = new PrismaClient();
  const user = await getServerSession(authOptions);
  if (!user) {
    return null;
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user?.user?.id,
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
    <h1 className="text-bold ">You have no orders...🥹</h1>;
  }
  return (
    <div>
      <div className="font-medium">
        {orders.reverse().map((order) => (
          <div key={order.id} className="rounded-lg p-8 my-12">
            <h2>Order reference: {order.id}</h2>
            <p>Time: {new Date(order.createdDate)}</p>
            <p className="text-md py-2">
              Status:{" "}
              <span
                className={`${
                  order.status === "complete" ? "bg-teal-500" : "bg-orange-400"
                } text-white px-2 py-1 rounded-md text-sm`}
              >
                {order.status}
              </span>
            </p>
            <p className="font-medium">Total: {formatPrice(order.amount)}</p>
            <div className="flex gap-8">
              {order.products.map((product) => (
                <div className="py-2" key={product.id}>
                  <h2 className="py-2">{product.name}</h2>
                  <div className="flex items-center gap-4">
                    <Image
                      src={product.image!}
                      width={36}
                      height={36}
                      alt={product.name}
                    />
                    <p>{formatPrice(product.unit_amount)}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
