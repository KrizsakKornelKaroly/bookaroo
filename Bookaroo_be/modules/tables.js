const express = require('express');
const router = express.Router();
const { query } = require('../utils/database');
const logger = require('../utils/logger');
var SHA1 = require("crypto-js/sha1");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
let ejs = require('ejs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
});
const upload = multer({ storage: storage });
var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });




//GET all records from a table
router.get('/:table', (req, res) => {
    const table = req.params.table;
    query(`SELECT * FROM ${table}`, [], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(results);
    }, req);
});

//SELECT one record by ID from a table
router.get('/:table/:id', (req, res) => {
    const table = req.params.table;
    const id = req.params.id;
    query(`SELECT * FROM ${table} WHERE id=?`, [id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(results);
    }, req);
});

//SELECT records from table by field
router.get('/:table/:field/:op/:value', (req, res) => {
    const table = req.params.table;
    const field = req.params.field;
    const op = getOp(req.params.op);
    const value = req.params.value;

    if (req.params.op == 'lk') {
        value = `%${value}%`;
    }

    query(`SELECT * FROM ${table} WHERE ${field} ${op} ?`, [value], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(results);
    }, req);
});

//SEND EMAIL
router.post('/sendmail', async (req, res)=> {
    const { to, subject, template, data} = req.body;

    if (!to || !subject || !template) {
        return res.status(400).send({ error: 'Hiányzó adatok!' });
    }

    try {
        await transporter.sendMail({
            from: process.env.ADMINMAIL,
            to: to,
            subject: subject,
            html: await renderTemplate(template, data || {})
        });
        return res.status(200).send({ message: 'Email sikeresen elküldve!' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Hiba az email küldése során!' });
    }
});

//FILE UPLOAD
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(500).json({ error: 'Nincs fájl feltöltve!' });
    }
    res.status(200).json({
        message: 'Fájl sikeresen feltöltve!',
        filename: req.file.filename,
        path: '/uploads'
    });
});

//LOGIN
router.post('/:table/login', (req, res) => {
    let { email, password } = req.body;
    let table = req.params.table;

    if (!email || !password) {
        res.status(400).send({ error: "Hiányzó adatok!" });
        return;
    }

    query(`SELECT * FROM ${table} WHERE email=? AND password = ?`, [email, password], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        if (results.length == 0) {
            res.status(401).send({ error: "Hibás belépési adatok!" });
            return;
        }
        if (results[0].status == 0) {
            res.status(401).send({ error: "Inaktív felhasználó, keress fel egy admint!" });
            return;
        }
        res.status(200).json(results);
    }, req);
});

// REGISTER
router.post('/:table/registration', (req, res) => {
    let table = req.params.table;
    let { name, email, password, confirm } = req.body;

    if (!name || !email || !password || !confirm) {
        res.status(400).send({ error: "Hiányzó adatok!" });
        return;
    }

    if (password != confirm) {
        res.status(400).send({ error: "A jelszavak nem egyeznek!" });
        return;
    }

    query(`SELECT id FROM ${table} WHERE email=?`, [email], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        if (results.length != 0) {
            res.status(400).send({ error: "Már létezik felhasználó ezzel az email címmel!" });
            return;
        }
    }, req);


    query(`INSERT INTO ${table} (name, email, password, role) VALUES (?, ?, ?, ?)`, [name, email, password, "0"], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(results);
    }, req);
});

//ADD new record to a table
router.post('/:table', (req, res) => {
    let table = req.params.table;
    let fields = Object.keys(req.body).join(', ');
    let values = "'" + Object.values(req.body).join("', '") + "'";

    query(`INSERT INTO ${table} (${fields}) VALUES (${values})`, [], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(results);
    }, req);
});

//UPDATE record from table by ID
router.patch('/:table/:id', (req, res) => {
    let table = req.params.table;
    let id = req.params.id;
    let fields = Object.keys(req.body);
    let values = Object.values(req.body);

    let updates = [];
    for (let i = 0; i < fields.length; i++) {
        updates.push(`${fields[i]}='${values[i]}'`);
    }
    let str = updates.join(',');

    query(`UPDATE ${table} SET ${str} WHERE id = ?`, [id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(results);
    }, req);
});

//delete uploaded file
router.delete('/image/:filename', (req, res) => {
    let filename = req.params.filename;
    let pathname = path.join(__dirname, '/uploads/');
    fs.unlink(pathname + filename, (err) => {
        if (err) {
            return res.status(500).json({ error: 'A fájl törlése sikertelen!' });
        }
        return res.status(200).json({message: 'Kép sikeresen törölve!'});
    });
});

//DELETE one record by ID from a table
router.delete('/:table/:id', (req, res) => {
    const table = req.params.table;
    const id = req.params.id;
    query(`DELETE FROM ${table} WHERE id=?`, [id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(results);
    }, req);
});

//DELETE records from table by field
router.delete('/:table/:field/:op/:value', (req, res) => {
    const table = req.params.table;
    const field = req.params.field;
    const op = getOp(req.params.op);
    const value = req.params.value;

    if (req.params.op == 'lk') {
        value = `%${value}%`;
    }

    query(`DELETE FROM ${table} WHERE ${field} ${op} ?`, [value], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(results);
    }, req);
});

//DELETE all records from a table
router.delete('/:table', (req, res) => {
    const table = req.params.table;
    const id = req.params.id;
    query(`DELETE FROM ${table}`, [], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(results);
    }, req);
});


function getOp(op) {
    switch (op) {
        case 'eq': { return '='; }
        case 'lt': { return '<'; }
        case 'gt': { return '>'; }
        case 'lte': { return '<='; }
        case 'gte': { return '>='; }
        case 'not': { return '<>'; }
        case 'lk': { return 'LIKE'; }
        default:
            break;
    }
}


async function renderTemplate(templateName, data) {
   const tmpFile = path.join(__dirname, `../templates/${templateName}.ejs`);
   return await ejs.renderFile(tmpFile, data);
}

module.exports = router;