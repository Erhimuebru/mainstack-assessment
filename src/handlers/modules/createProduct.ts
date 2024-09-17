
import { createProduct } from '../../database/product'; 

// Handler function to create a product
export const createProducts = async (productData: {
  name: string;
  description: string;
  price: number;
  stock: number;
}): Promise<any> => {
  try {
    // Call the database function to create a product
    const result = await createProduct({
      name: productData.name,
      description: productData.description,
      price: productData.price,
      stock: productData.stock
    });

    // Return the result from the database
    return result;
  } catch (error) {
    // console.error('Error creating product in handler:', error);
    throw new Error('Internal Server Error');
  }
};

