const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const path = require('path');

// SQL Server bağlantı ayarları
const dbConfig = {
    user: 'sa',
    password: 'Mstf2424*',
    server: '194.87.91.55',
    database: 'car_control',
    options: {
        encrypt: false, // Eğer şifreli bağlantı kullanıyorsanız
        enableArithAbort: true
    }
};

// Express uygulamasını başlatma
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// HTML formunu döndüren rota
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'inde.html'));
});

// Veri eklemek için POST isteği
app.post('/addData', async (req, res) => {
    try {
        const { temperature, humidity } = req.body;

        // SQL Server bağlantısı oluşturma
        await sql.connect(dbConfig);

        // SQL sorgusunu çalıştırma
        const result = await sql.query`INSERT INTO tbl_carmov (carmove_lang, carmove_lat) VALUES (${temperature}, ${humidity})`;

        res.status(200).send('Veri başarıyla eklendi.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Veri eklenirken hata oluştu.');
    }
});

// Sunucuyu dinleme
app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor.`);
});
