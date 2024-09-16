// import { Request, Response } from 'express';
// import Product from '../../models/product';

// export const createProducts = async (req: Request, res: Response): Promise<Response> => {
//   const { name, description, price, stock } = req.body;

//   try {
//     // Create new product
//     const product = new Product({ name, description, price, stock });
//     const result = await product.save();

//     // Return success response
//     return res.status(201).json({
//       success: true,
//       message: 'Product has been created successfully.',
//       product: result,
//     });
//   } catch (error) {
//     console.error('Error creating product:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal Server Error',
//     });
//   }
// };

import { createProduct } from '../../database/product';  // Import the function that interacts with the database

// Handler function to create a product
export const createProducts = async (productData: {
  name: string;
  description: string;
  price: number;
  stock: number;
}): Promise<any> => {
  try {
    // Call the database function to create a product
    const result = await createProduct({
      name: productData.name,
      description: productData.description,
      price: productData.price,
      stock: productData.stock
    });

    // Return the result from the database
    return result;
  } catch (error) {
    console.error('Error creating product in handler:', error);
    throw new Error('Internal Server Error');
  }
};

