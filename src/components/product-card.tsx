"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/lib/types";
import Image from "next/image";
import { Button } from "./ui/button";
import useStore from "@/lib/store/store";
import { useRouter } from "next/navigation";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const router = useRouter();
  const {
    title,
    description,
    price,
    discountedPrice,
    imageUrl,
    rating,
    tags,
    reviews,
  } = product;

  const isOnSale = price > discountedPrice;

  const { addToCart } = useStore((state) => ({
    addToCart: state.addToCart,
  }));

  const handleAddToCart = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    event.stopPropagation();
    addToCart(product);
  };

  return (
    <Card
      onClick={() => router.push(`/product/${product.id}`)}
      className="flex cursor-pointer flex-col justify-between  rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:shadow-primary/50 transition duration-300 ease-in-out transform "
    >
      <CardHeader className="relative h-96">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="h-full w-full object-cover object-center transition duration-300 ease-in-out"
        />
        {isOnSale && (
          <div className="absolute top-0 right-0 bg-red-600 text-white p-2 rounded-bl-lg">
            Sale
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-semibold mb-2">{title}</CardTitle>
        <CardDescription className=" mb-4">{description}</CardDescription>
        <p className="text-gray-800 mb-2">
          {isOnSale ? (
            <>
              <span className="line-through">${price.toFixed(2)}</span>{" "}
              <span>${discountedPrice.toFixed(2)}</span>
            </>
          ) : (
            <span>${price.toFixed(2)}</span>
          )}
        </p>
      </CardContent>
      <CardFooter className="p-4 justify-end bg-secondary border-t">
        <Button
          className="rounded-full hover:bg-accent  "
          onClick={(e) => handleAddToCart(e, product)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
