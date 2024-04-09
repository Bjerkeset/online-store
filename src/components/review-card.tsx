import { Review } from "@/lib/types";
import { Badge } from "./ui/badge";

type Props = {
  review: Review;
};

export default function ReviewCard({ review }: Props) {
  const { username, rating, description } = review;

  return (
    <div className="border p-4 rounded-lg shadow space-y-2">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">{username}</h5>
        <Badge className="text-sm bg-blue-100 text-primary px-2 py-1 rounded-full">{`Rating: ${rating}`}</Badge>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
