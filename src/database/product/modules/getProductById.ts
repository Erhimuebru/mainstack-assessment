import Product from '../../../models/product'; 

export const getProductById = async (id: string): Promise<any> => {
    try {
      const result = await Product.findById(id);
      if (!result) throw new Error('Product not found');
      return result;
    } catch (error) {
      console.error('Error fetching product in database function:', error);
      throw new Error('Internal Server Error');
    }
  };