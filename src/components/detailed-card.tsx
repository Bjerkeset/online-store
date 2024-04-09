"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import ReviewCard from "./review-card";
import { Badge } from "./ui/badge";
import useStore from "@/lib/store/store";

type Props = {
  product: Product;
};

export default function DetailedDard({ product }: Props) {
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

  const isOnSale = price > discountedPrice;

  return (
    <Card className="max-w-4xl mx-auto overflow-hidden ">
      <CardHeader className="relative h-[600px]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className=" object-cover object-center"
        />
        {isOnSale && (
          <div className="absolute top-0 right-0 bg-red-600  p-2 rounded-bl-lg">
            Sale
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-3xl font-bold mb-2">{title}</CardTitle>
        <CardDescription className=" mb-4">{description}</CardDescription>
        <p className="text-gray-800 mb-2">
          Price:{" "}
          {isOnSale ? (
            <>
              <span className="line-through">${(price / 100).toFixed(2)}</span>{" "}
              <span className="text-red-500">
                ${(discountedPrice / 100).toFixed(2)}
              </span>
            </>
          ) : (
            <span>${(price / 100).toFixed(2)}</span>
          )}
        </p>
        <div>
          <strong>Rating:</strong> {rating} / 5
        </div>
        <div className="my-4 ">
          {tags.map((tag) => (
            <Badge key={tag} className=" rounded-full mr-1">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className=" items-start flex-col gap-10">
        <div>
          <Button onClick={(e) => handleAddToCart(e, product)} className="w-72">
            Buy
          </Button>
        </div>
        {reviews.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-xl">Reviews:</h3>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
