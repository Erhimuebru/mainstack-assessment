import { deleteProduct } from "../../database/product";

export const deleteProductById = async (id: string): Promise<any> => {
    try {
      const result = await deleteProduct(id);
      return result;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  };