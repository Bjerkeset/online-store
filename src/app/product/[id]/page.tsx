import DetailedDard from "@/components/detailed-card";
import { fetchProductById } from "@/lib/api/server.action";

// This component represents a review card, assuming it exists or you can create a similar one
// import { ReviewCard } from "@/components/review-card";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await fetchProductById(params.id);
  console.log("Product by ID", product);

  return (
    <div className="">
      <DetailedDard product={product} />;
    </div>
  );
}
