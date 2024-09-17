import { getAllProducts } from "../../database/product";

export const getAllProduct = async (): Promise<any> => {
  try {
    const result = await getAllProducts(); 
    return result; 
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};
