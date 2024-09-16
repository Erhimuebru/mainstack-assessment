import { Router } from 'express';
// import { createProduct, getProducts, updateProduct, deleteProduct } from '../../controllers/productController';
import { createProduct, getProduct, deleteProduct, updateProduct } from '../../controllers/product'; 
import { authenticate } from '../../middleware';

const router = Router();

router.post('/products', authenticate, createProduct);
router.get('/products', authenticate, getProduct);
router.put('/products/:id', authenticate, updateProduct);
router.delete('/products/:id', authenticate, deleteProduct);

export default router;
