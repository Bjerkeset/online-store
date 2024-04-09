// Path: src/lib/types/index.ts

export type Image = {
  url: string;
  alt: string;
};

export type Review = {
  id: string;
  username: string;
  rating: number;
  description: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  imageUrl: string;
  rating: number;
  tags: Array<string>;
  reviews: Array<Review>;
  quantity: number;
};
