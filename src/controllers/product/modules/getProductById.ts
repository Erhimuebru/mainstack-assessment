import { Request, Response } from 'express';
import { getProductId } from '../../../handlers';


export const getProductById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const result = await getProductId(id);
      
      return res.status(200).json({
        success: true,
        product: result,
      });
    } catch (err) {
      console.error('Error in fetching product:', err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  };