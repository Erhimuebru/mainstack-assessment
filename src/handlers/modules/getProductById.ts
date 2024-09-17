
import { getProductById } from "../../database/product";

export const getProductId = async (id: string): Promise<any> => {
    try {
      const result = await getProductById(id);
      return result;
    } catch (error) {
  
        throw new Error('Internal Server Error');
    }
  };