import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db';
import productRoutes from './routes/productRoutes/productRoutes';
import authRoutes from './routes/authRoutes/authRoutes';


dotenv.config();
connectDB();

const app = express();
app.use(express.json());


app.use('/api', productRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


export default app;