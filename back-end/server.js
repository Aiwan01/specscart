import express from 'express';
import  router  from './routes/route.js';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimiter } from './middleware/ratelimiter.js';
import db from './models/index.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

const domainList = ['http://localhost:3000'];

app.use((req, res, next) => {

    const origin = req.headers.origin;

    if (domainList.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        // return res.status(403).json({ message: 'Access denied: Origin not allowed' });
    }
    next();
});


app.use('/api', rateLimiter, router);

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected');
    await db.sequelize.sync(); // or { alter: true } in dev
  } catch (error) {
    console.error(' Database connection failed:', error);
  }
})();


app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});