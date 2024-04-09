"use server";

import { Product } from "../types";

const baseURL = "https://api.noroff.dev/api/v1";

export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${baseURL}/online-shop`);
    console.log("Response Status:", response.status);

    const products = await response.json();

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

// Fetch a single product by its ID
export async function fetchProductById(productId: string): Promise<Product> {
  try {
    const response = await fetch(`${baseURL}/online-shop/${productId}`);
    if (!response.ok) {
      throw new Error(
        `Error fetching product with ID ${productId}: ${response.statusText}`
      );
    }
    const singleProductResponse: Product = await response.json();
    return singleProductResponse;
  } catch (error) {
    console.error(`Failed to fetch product with ID ${productId}:`, error);
    throw error;
  }
}
