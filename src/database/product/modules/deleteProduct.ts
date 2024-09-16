import Product from '../../../models/product'; 

export const deleteProduct = async (id: string): Promise<any> => {
    try {
      const result = await Product.findByIdAndDelete(id);
      if (!result) throw new Error('Product not found');
      return result;
    } catch (error) {
      console.error('Error deleting product in database function:', error);
      throw new Error('Internal Server Error');
    }
  };