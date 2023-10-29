import Image from "next/image";
import { SearchParamTypes } from "@/types/SearchParamTypes";
import formatPrice from "@/util/PriceFormat";
import AddCart from "./AddCart";

export default async function Product({ searchParams }: SearchParamTypes) {
  var description_lines: any;

  searchParams.description
    ? (description_lines = searchParams.description.split(" - "))
    : (description_lines = []);

  return (
    <div className="flex justify-between gap-24 p-12 text-gray-700">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={600}
        height={600}
        // className="w-96 h-96 object-cover rounded-lg"
      />
      <div className="font-medium text-gray-700">
        <h1 className="text-2xl py-2">{searchParams.name}</h1>
        {description_lines.length > 0 ? (
          description_lines.map((line: any) => <p key={line}>{line}</p>)
        ) : (
          <p>Product's description not found!</p>
        )}
        <div className="flex gap-2 py-2">
          <p className="font-bold text-teal-700">
            {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
          </p>
        </div>
        <AddCart {...searchParams} />
      </div>
    </div>
  );
}
