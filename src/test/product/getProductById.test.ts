import { getProductById } from '../../database/product';
import { getProductId } from '../../handlers';

jest.mock('../../database/product', () => ({
  getProductById: jest.fn()
}));

describe('getProductById', () => {
  it('should successfully fetch a product', async () => {
    const productId = '123';
    const productData = { id: productId, name: 'Test Product' };
    (getProductById as jest.Mock).mockResolvedValue(productData);

    const result = await getProductId(productId);

    expect(getProductById).toHaveBeenCalledWith(productId);
    expect(result).toEqual(productData);
  });

  it('should handle errors', async () => {
    const productId = '123';
    (getProductById as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(getProductId(productId)).rejects.toThrow('Internal Server Error');
  });
});
