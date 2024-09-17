import { getAllProducts } from '../../database/product';
import { getAllProduct } from '../../handlers';

// Mocking the getAllProducts database function
jest.mock('../../database/product', () => ({
  getAllProducts: jest.fn()
}));

describe('getAllProduct', () => {
  it('should successfully fetch all products', async () => {
    const productsData = [
      { id: '123', name: 'Test Product 1' },
      { id: '456', name: 'Test Product 2' }
    ];

    // Mock resolved value for the getAllProducts database function
    (getAllProducts as jest.Mock).mockResolvedValue(productsData);

    // Call the handler function to get all products
    const result = await getAllProduct();

    // Ensure that the database function getAllProducts was called
    expect(getAllProducts).toHaveBeenCalled();
    // Ensure that the result matches the mocked data
    expect(result).toEqual(productsData);
  });

  it('should handle errors', async () => {
    // Mock rejection for the getAllProducts database function
    (getAllProducts as jest.Mock).mockRejectedValue(new Error('Database error'));

    // Ensure that the handler throws the correct error
    await expect(getAllProduct()).rejects.toThrow('Internal Server Error');
  });
});
