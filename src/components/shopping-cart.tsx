"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useStore from "@/lib/store/store";
import { Button, buttonVariants } from "./ui/button";
import { useMediaQuery } from "@/hooks/use-media.query";
import Link from "next/link";
import { cn, getFormattedDate } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { set } from "react-hook-form";

export default function ShoppingCart() {
  const { cart, removeFromCart, clearCart } = useStore((state) => ({
    cart: state.cart,
    removeFromCart: state.removeFromCart,
    clearCart: state.clearCart,
  }));

  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Calculate the total price, taking discountedPrice into consideration
  const totalPrice = cart.reduce((total, product) => {
    const priceToUse =
      product.discountedPrice && product.discountedPrice < product.price
        ? product.discountedPrice
        : product.price;
    return total + priceToUse * product.quantity;
  }, 0);

  const handleClick = () => {
    // Completes the purchase process
    useStore.getState().completePurchase();
    setOpen(false);

    toast("Products successfully purchased", {
      description: getFormattedDate(),
      action: {
        label: "Undo",
        onClick: () => console.log("Undo action triggered"),
      },
    });
  };

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className="relative" variant="outline">
            <p>Shopping Chart</p>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 rounded-full text-sm text-white w-5 h-5 text-center">
                {cart.reduce((count, item) => count + item.quantity, 0)}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Shopping Chart</SheetTitle>
            <SheetDescription>
              <div className="border rounded-md md:h-[750px] p-4 flex flex-col">
                {cart.length === 0 ? (
                  <p>Your cart is empty</p>
                ) : (
                  <div className="flex flex-col justify-between h-full">
                    <ul className="space-y-2 overflow-auto flex-grow border-b">
                      {cart.map((product, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center"
                        >
                          {product.title} - ${product.price.toFixed(2)} x{" "}
                          {product.quantity}
                          <Button
                            size={"sm"}
                            variant={"outline"}
                            onClick={() => removeFromCart(product.id)}
                          >
                            X
                          </Button>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col gap-2 pt-6 ">
                      <div className="mt-2">
                        <strong>Total Price: </strong>${totalPrice.toFixed(2)}
                      </div>
                      <Button
                        variant={"outline"}
                        onClick={clearCart}
                        className="mt-2"
                      >
                        Clear Cart
                      </Button>
                      <Link
                        href={"/checkout"}
                        className={cn(buttonVariants({ variant: "default" }))}
                        onClick={handleClick}
                      >
                        Order Now
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="relative" variant="outline">
          <p>Shopping Chart</p>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 rounded-full text-sm text-white w-5 h-5 text-center">
              {cart.reduce((count, item) => count + item.quantity, 0)}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Shopping Cart</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="border rounded-md md:h-[750px] p-4 flex flex-col">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div className="flex flex-col justify-between h-full">
              <ul className="space-y-2 overflow-auto flex-grow border-b">
                {cart.map((product, index) => (
                  <li key={index} className="flex justify-between items-center">
                    {product.title} - ${product.price.toFixed(2)} x{" "}
                    {product.quantity}
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      onClick={() => removeFromCart(product.id)}
                    >
                      X
                    </Button>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2 pt-6 ">
                <div className="mt-2">
                  <strong>Total Price: </strong>${totalPrice.toFixed(2)}
                </div>
                <Button
                  variant={"outline"}
                  onClick={clearCart}
                  className="mt-2"
                >
                  Clear Cart
                </Button>
                <Link
                  href={"/checkout"}
                  className={cn(buttonVariants({ variant: "default" }))}
                  onClick={handleClick}
                >
                  Order Now
                </Link>
              </div>
            </div>
          )}
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
