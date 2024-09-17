import { Router } from 'express';
import { createProduct, getAllProducts, deleteProduct, updateProduct, getProductById } from '../../controllers/product'; 
import { authenticate } from '../../middleware';

const router = Router();

router.post('/products', authenticate, createProduct);
router.get('/products', authenticate, getAllProducts);
router.get('/products/:id', authenticate, getProductById);
router.put('/products/:id', authenticate, updateProduct);
router.delete('/products/:id', authenticate, deleteProduct);

export default router;
