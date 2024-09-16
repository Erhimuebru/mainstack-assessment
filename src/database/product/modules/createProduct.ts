
// const productSchema = require("../../../models/schema/product.schema");

import Product from '../../../models/product'; 
 
export const createProduct = async (productData: {
  name: string;
  description: string;
  price: number;
  stock: number;
}): Promise<any> => {
  try {
    const product = new Product(productData);
    const result = await product.save();  

    return result; 
  } catch (error) {
    console.error('Error creating product in database function:', error);
    throw new Error('Internal Server Error');
  }
};
