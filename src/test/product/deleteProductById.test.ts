// import { deleteProductById } from '../path/to/your/handler';
import { deleteProduct } from '../../database/product';
import { deleteProductById } from '../../handlers';

// Mock the database function
jest.mock('../../database/product', () => ({
  deleteProduct: jest.fn()
}));

describe('deleteProductById', () => {
  it('should successfully delete a product', async () => {
    const productId = '123';
    (deleteProduct as jest.Mock).mockResolvedValue({ success: true });

    const result = await deleteProductById(productId);

    expect(deleteProduct).toHaveBeenCalledWith(productId);
    expect(result).toEqual({ success: true });
  });

  it('should handle errors', async () => {
    const productId = '123';
    (deleteProduct as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(deleteProductById(productId)).rejects.toThrow('Internal Server Error');
  });
});
