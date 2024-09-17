import Product from '../../../models/product';

export const getAllProducts = async (): Promise<any> => {
  try {
    const result = await Product.find(); 
    if (!result || result.length === 0) throw new Error('No products found');
    return result;
  } catch (error) {
    console.error('Error fetching products in database:', error);
    throw new Error('Internal Server Error');
  }
};
