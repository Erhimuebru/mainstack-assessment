// import { getProductById } from '../path/to/your/handler';
import { getProduct } from '../../database/product';
import { getProductById } from '../../handlers';

// Mock the database function
jest.mock('../../database/product', () => ({
  getProduct: jest.fn()
}));

describe('getProductById', () => {
  it('should successfully fetch a product', async () => {
    const productId = '123';
    const productData = { id: productId, name: 'Test Product' };
    (getProduct as jest.Mock).mockResolvedValue(productData);

    const result = await getProductById(productId);

    expect(getProduct).toHaveBeenCalledWith(productId);
    expect(result).toEqual(productData);
  });

  it('should handle errors', async () => {
    const productId = '123';
    (getProduct as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(getProductById(productId)).rejects.toThrow('Internal Server Error');
  });
});
