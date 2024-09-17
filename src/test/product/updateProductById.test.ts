// import { updateProductById } from '../path/to/your/handler';
import { updateProduct } from '../../database/product';
import { updateProductById } from '../../handlers';

// Mock the database function
jest.mock('../../database/product', () => ({
  updateProduct: jest.fn()
}));

describe('updateProductById', () => {
  it('should successfully update a product', async () => {
    const productId = '123';
    const productData = { name: 'Updated Product' };
    (updateProduct as jest.Mock).mockResolvedValue({ success: true });

    const result = await updateProductById(productId, productData);

    expect(updateProduct).toHaveBeenCalledWith(productId, productData);
    expect(result).toEqual({ success: true });
  });

  it('should handle errors', async () => {
    const productId = '123';
    const productData = { name: 'Updated Product' };
    (updateProduct as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(updateProductById(productId, productData)).rejects.toThrow('Internal Server Error');
  });
});
