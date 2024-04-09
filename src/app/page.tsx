import Feed from "@/components/feed";
import { fetchAllProducts } from "@/lib/api/server.action";

export default async function Home() {
  const products = await fetchAllProducts();
  return <Feed products={products} />;
}
