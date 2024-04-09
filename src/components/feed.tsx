import { Product } from "@/lib/types";
import ProductCard from "./product-card";

type Props = {
  products: Product[];
};

export default function feed({ products }: Props) {
  return (
    <div className="container mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
