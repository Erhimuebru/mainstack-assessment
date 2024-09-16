import { Request, Response } from 'express';
import Product from '../../../models/product';
import { deleteProductById } from '../../../handlers';
// import { deleteProductById } from '../../../handlers/modules/deleteProduct';



export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const result = await deleteProductById(id);
      
      return res.status(200).json({
        success: true,
        message: 'Product has been deleted successfully.',
        product: result,
      });
    } catch (err) {
      console.error('Error in product deletion:', err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  };