"use client";
import React from "react";
import useStore from "@/lib/store/store";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  // Using purchasedItems instead of cart
  const purchasedItems = useStore((state) => state.purchasedItems);

  // Calculate the total price for purchased items
  const totalPrice = purchasedItems.reduce((total, product) => {
    const priceToUse =
      product.discountedPrice && product.discountedPrice < product.price
        ? product.discountedPrice
        : product.price;
    return total + priceToUse * product.quantity;
  }, 0);
  const cart = purchasedItems;

  return (
    <div className="max-w-4xl mx-auto mt-40 p-4">
      <div>
        <Link href={"/"} className={buttonVariants({ variant: "outline" })}>
          ← Continue Shopping
        </Link>
      </div>
      ´<h1 className="text-2xl font-bold mb-4 text-center">Checkout Success</h1>
      <div className="border rounded-md p-4 flex flex-col">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((product, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 items-center">
                <div className="col-span-1">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    height={75}
                    width={75}
                  />
                </div>
                <div className="col-span-2">
                  <p className="font-semibold">{product.title}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Price: ${product.price.toFixed(2)}</p>
                  {product.discountedPrice && (
                    <p className="text-red-500">
                      Discounted Price: ${product.discountedPrice.toFixed(2)}
                    </p>
                  )}
                </div>
                <div className="col-span-1 text-right">
                  <p className="text-sm">
                    Subtotal: $
                    {(
                      product.quantity *
                      (product.discountedPrice || product.price)
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t mt-4">
              <p className="text-lg font-semibold">
                Total Price: ${totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
