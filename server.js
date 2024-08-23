const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.listen(PORT, ()=>{
  console.log(`server listening on port ${PORT}`);
})

app.get('/api/quotes/random', (req, res, next)=>{
  const randomQuote = getRandomElement(quotes);
  res.status(200).send({ quote : randomQuote});
})
app.get('/api/quotes', (req, res, next)=>{
  if(req.query.person){
    const personQuotes = quotes.filter(quote=>quote.person === req.query.person);
    res.send({quotes: personQuotes});
  }else{
    res.status(200).send({quotes: quotes});
  }
  });

  app.post('/api/quotes', (req, res, next)=>{
    if(req.query.quote && req.query.person){
    const newQuote = req.query;
    quotes.push(newQuote);
    res.send({quote: newQuote});
    }else{
      res.status(400).send('invalid');
    }
  })