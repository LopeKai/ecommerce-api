import express from 'express';
import { initializeApp } from 'firebase-admin/app';

import { routes } from './routes';

initializeApp();
const app = express();

app.use(express.json());

routes(app);

app.listen(3000, () => {
    console.log(`Servidor ativo na porta 3000`)
});