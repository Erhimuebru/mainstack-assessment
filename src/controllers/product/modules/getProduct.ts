import { Request, Response } from 'express';
import { getAllProduct } from '../../../handlers';

export const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const products = await getAllProduct();
    
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    console.error('Error in product controller:', err); 
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
