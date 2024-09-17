import { Request, Response } from 'express';
import Product from '../../../models/product';
import { updateProductById } from '../../../handlers';



export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const productData = req.body;
      const result = await updateProductById(id, productData);
      
      return res.status(200).json({
        success: true,
        message: 'Product has been updated successfully.',
        product: result,
      });
    } catch (err) {
      console.error('Error in product update:', err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  };