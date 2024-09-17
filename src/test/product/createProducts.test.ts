// import { createProducts } from '../path/to/your/handler';
import { createProduct } from '../../database/product';
import { createProducts } from '../../handlers';

// Mock the database function
jest.mock('../../database/product', () => ({
  createProduct: jest.fn()
}));

describe('createProducts', () => {
  it('should successfully create a product', async () => {
    const productData = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      stock: 10
    };
    (createProduct as jest.Mock).mockResolvedValue({ success: true });

    const result = await createProducts(productData);

    expect(createProduct).toHaveBeenCalledWith(productData);
    expect(result).toEqual({ success: true });
  });

  it('should handle errors', async () => {
    const productData = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      stock: 10
    };
    (createProduct as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(createProducts(productData)).rejects.toThrow('Internal Server Error');
  });
});
