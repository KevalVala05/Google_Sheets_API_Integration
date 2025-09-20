import express from 'express';
import dotenv from 'dotenv';
import sheetsRoutes from './routes/sheetsRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use both route files
app.use('/', authRoutes);
app.use('/', sheetsRoutes);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
