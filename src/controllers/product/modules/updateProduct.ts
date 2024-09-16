import { Request, Response } from 'express';
import Product from '../../../models/product';



export const updateProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error updating product' });
    }
  };