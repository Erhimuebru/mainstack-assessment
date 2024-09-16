import { deleteProduct } from "../../database/product";

export const deleteProductById = async (id: string): Promise<any> => {
    try {
      const result = await deleteProduct(id);
      return result;
    } catch (error) {
      console.error('Error deleting product in handler:', error);
      throw new Error('Internal Server Error');
    }
  };