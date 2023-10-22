import Image from "next/image";

interface ProductProps {
  name: string;
  image: string; // Update the type to match the actual type of your image source
  price: number; // Change this type to match the actual type of your price
}

export default function Product({ name, image, price }: ProductProps) {
  return (
    <div>
      <Image src={image} alt={name} width={400} height={400}></Image>
      <h1>{name}</h1>
      <h2>{price}</h2>
    </div>
  );
}
