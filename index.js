import axios from 'axios';
import bodyParser from 'body-parser';
import express from 'express';
import { default as apiUrlGen } from './controllers/apiUrlGenerator.js';

const app = express();
const port = 3000;
const apiUrl = `https://api.blockchain.com/v3/exchange/l3/`;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/get-point', async (req, res) => {
  let rawData = null;
  let symbol;
  if (!req.body.symbol) symbol = apiUrlGen.getUrl('BTC');
  else symbol = apiUrlGen.getUrl(symbol);
  if (symbol.length <= 0) symbol = apiUrlGen.getUrl('BTC');

  try {
    const apiResponse = await axios.get(apiUrl + symbol);
    if (apiResponse) rawData = apiResponse;
  } catch (e) {
    console.error('Api request error: ', e);
  }
  if (!rawData || !rawData.data)
    res.json({
      success: false,
      data: -1,
    });
  let orderBook = rawData.data;
  const bidsVWAP = calculateVWAP(orderBook.bids);
  const asksVWAP = calculateVWAP(orderBook.asks);
  const averagePrice = (bidsVWAP + asksVWAP) / 2;

  res.json({
    success: true,
    data: averagePrice,
  });
});
app.use(express.static('public'));

app.listen(port, () => console.log('server on port: ' + port));

app.get('/', (_req, res) => {
  res.render('index');
});

function calculateVWAP(orders) {
  let totalVolume = 0;
  let totalValue = 0;

  for (const order of orders) {
    totalVolume += order.qty;
    totalValue += order.px * order.qty;
  }

  return totalVolume > 0 ? totalValue / totalVolume : 0;
}
