const express = require('express');

var cors = require('cors');

const tables = require('./modules/tables')

const logger = require('./utils/logger');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send({ msg: 'Backend API by Bajai SZC Türr István Technikum - 13.A Szoftverfejlesztő ' })
})

app.use('/', tables);

app.listen(process.env.PORT, () => {
    logger.info(`Server started on port ${process.env.PORT}`);
})
