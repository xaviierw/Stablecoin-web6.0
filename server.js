const express = require('express');
const request = require('request');
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Proxy route for USDC
app.get('/getUSDC', (req, res) => {
    const url = 'http://103.224.116.69:8880/getUSDC';
    req.pipe(request(url)).pipe(res);
});

// Proxy route for USDT
app.get('/getUSDT', (req, res) => {
    const url = 'http://103.224.116.69:8880/getUSDT';
    req.pipe(request(url)).pipe(res);
});

// Proxy route for DAI
app.get('/getKDAI', (req, res) => {
    const url = 'http://103.224.116.69:8880/getKDAI';
    req.pipe(request(url)).pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`CORS proxy server running on port ${PORT}`);
});
