import { getProduct } from "../../database/product";

export const getProductById = async (id: string): Promise<any> => {
    try {
      const result = await getProduct(id);
      return result;
    } catch (error) {
      // console.error('Error fetching product in handler:', error);
      throw new Error('Internal Server Error');
    }
  };