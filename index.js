const express = require('express');
const app = express();
const cors = require('cors');
const axios = require("axios");

app.use(cors());

app.get('/', (request, response) => {
    response.send('<div>' +
        '<h1>Welcome !</h1>' +
        '<p>You can use our different links :</p>' +
        '<p><a href="http://localhost:3001/coinmarketcap">/coinmarketcap</a> : this is an API from CoinMarketCap.com that returns a list of the top 100 cryptocurrencies </p>' +
        '<p><a href="http://localhost:3001/cryptopanic">/cryptopanic</a> : this is an API from cryptopanic.com that returns a list of the latest crypto related news</p>' +
    '</div>')
})

app.get('/coinmarketcap', (req, res) => {
    let response = null;
    new Promise(async (resolve, reject) => {
        try {
            response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=100', {
                headers: {
                    'X-CMC_PRO_API_KEY': 'f3d6e865-c0e1-4af2-8428-68b0f95f8f21',
                },
            });
        } catch (ex) {
            response = null;
            // error
            console.log(ex);
            reject(ex);
        }
        if (response) {
            // success
            res.json(response.data.data);
        }
    })
});

app.get('/cryptopanic', (req, res) => {
    let response = null;
    new Promise(async (resolve, reject) => {
        try {
            response = await axios.get('https://cryptopanic.com/api/v1/posts/?auth_token=8117a009883921c161309b2903126a2ec5e1e9e1');
        } catch (ex) {
            // error
            response = null;
            console.log(ex);
            reject(ex);
        }
        if (response) {
            // success
            res.json(response.data.results);
        }
    })
});

/*const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})*/
