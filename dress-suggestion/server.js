const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/get-suggestions', (req, res) => {
  const { season, occasion, material, price, ecoFriendly } = req.body;

  // Dummy data for suggestions
  const suggestions = [
    {
      name: 'Stylish Dress',
      link: 'https://www.amazon.com/product1',
    },
    {
      name: 'Casual Shirt',
      link: 'https://www.amazon.com/product2',
    },
  ];

  res.json(suggestions);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
