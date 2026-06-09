const express = require('express');
const { getCache, setCache } = require('../utils/cache');

const router = express.Router();

router.get('/quote', async (req, res, next) => {
  try {
    const cachedQuote = getCache('quote');
    if (cachedQuote) return res.json({ ...cachedQuote, cached: true });

    const response = await fetch('https://dummyjson.com/quotes/random');
    if (!response.ok) throw new Error('Quote API request failed');
    const data = await response.json();

    const quote = {
      quote: data.quote,
      author: data.author
    };

    setCache('quote', quote, 5 * 60 * 1000);
    res.json({ ...quote, cached: false });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
