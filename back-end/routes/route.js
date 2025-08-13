import  {Router} from 'express';
import { fetchAllProducts } from '../controllers/product.controller.js';
 


const router = Router();

router.get('/get-product-list', fetchAllProducts);
 
export default router;