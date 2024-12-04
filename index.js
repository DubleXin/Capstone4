import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/get-point', (_req, res) => {
  const seed = Math.random();
  return res.json({
    success: true,
    data: Math.floor(seed * 100) + 1,
  });
});
app.use(express.static('public'));

app.listen(port, () => console.log('server on port: ' + port));

app.get('/', (_req, res) => {
  res.render('index');
});
