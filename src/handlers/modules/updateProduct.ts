import { updateProduct } from "../../database/product";

export const updateProductById = async (id: string, productData: any): Promise<any> => {
    try {
      const result = await updateProduct(id, productData);
      return result;
    } catch (error) {
      console.error('Error updating product in handler:', error);
      throw new Error('Internal Server Error');
    }
  };
  