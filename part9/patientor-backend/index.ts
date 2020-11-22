import express from 'express';
import cors from 'cors';
import diagnosesRouter from './controllers/diagnoses';
import patientRouter from './controllers/patients';

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

app.use('/api/diagnoses/', diagnosesRouter);
app.use('/api/patients/', patientRouter);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));