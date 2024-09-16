import Product from '../../../models/product'; 

export const updateProduct = async (id: string, productData: any): Promise<any> => {
    try {
      const result = await Product.findByIdAndUpdate(id, productData, { new: true });
      if (!result) throw new Error('Product not found');
      return result;
    } catch (error) {
      console.error('Error updating product in database function:', error);
      throw new Error('Internal Server Error');
    }
  };