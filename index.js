import axios from 'axios';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const port = 3000;
const apiUrl = `https://api.blockchain.com/v3/exchange/l3/BTC-USD`;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/get-point', async (_req, res) => {
  let rawData = null;
  try {
    const apiResponse = await axios.get(apiUrl);
    if (apiResponse) rawData = apiResponse;
  } catch (e) {
    console.error('Api request error: ', e);
  }
  if (!rawData.data)
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
