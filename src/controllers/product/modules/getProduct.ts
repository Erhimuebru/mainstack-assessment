import { Request, Response } from 'express';
import Product from '../../../models/product';
import { getProductById } from '../../../handlers';
// import { getProductById } from '../../../handlers/modules/getProduct';




export const getProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const result = await getProductById(id);
      
      return res.status(200).json({
        success: true,
        product: result,
      });
    } catch (err) {
      console.error('Error in fetching product:', err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  };