import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';

const app = express();
app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});