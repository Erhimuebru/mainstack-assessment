import { Request, Response } from 'express';
import { createProducts } from '../../../handlers';

// Controller function to handle product creation
export const createProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, description, price, stock } = req.body;

    // Call the handler function to create the product
    const result = await createProducts({ name, description, price, stock });
    
    return res.status(201).json({
      success: true,
      message: 'Product has been created successfully.',
      product: result,
    });
  } catch (err) {
    console.error('Error in product creation:', err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
