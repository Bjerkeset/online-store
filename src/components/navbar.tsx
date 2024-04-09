"use client";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import ShoppingCart from "./shopping-cart";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  console.log(pathname);

  const isCurrentPage = (href: string) => (pathname === href ? "border" : "");
  return (
    <nav className="fixed w-full z-20 top-0 backdrop-blur-md bg-accent/50 border-b h-14 flex items-center justify-center ">
      <ul className="flex items-center w-full justify-end gap-4 max-w-screen-2xl mx-6">
        <li>
          <Link
            href={"/"}
            className={cn(
              "",
              buttonVariants({ variant: "link" }),
              isCurrentPage("/")
            )}
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            href={"/contact"}
            className={cn(
              "",
              buttonVariants({ variant: "link" }),
              isCurrentPage("/contact")
            )}
          >
            Contact
          </Link>
        </li>

        <li>
          <ShoppingCart />
        </li>
      </ul>
    </nav>
  );
}
