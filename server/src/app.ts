import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { errorMiddleware } from './middleware/error.middleware.js';
import { requestLogger } from './middleware/request-logger.middleware.js';
import { analyzeRouter } from './routes/analyze.routes.js';

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(requestLogger);

app.get('/api/health', (_req, res) => {
  res.json({ success: true, data: { status: 'ok' } });
});

app.use('/api', analyzeRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Local AI SEO Agent API listening on port ${port}`);
});
