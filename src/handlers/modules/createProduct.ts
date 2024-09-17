
import { createProduct } from '../../database/product'; 

// Handler function to create a product
export const createProducts = async (productData: {
  name: string;
  description: string;
  price: number;
  stock: number;
}): Promise<any> => {
  try {
    const result = await createProduct({
      name: productData.name,
      description: productData.description,
      price: productData.price,
      stock: productData.stock
    });

    return result;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

