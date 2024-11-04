const express = require('express');
const { CohereClientV2 } = require('cohere-ai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const cohere = new CohereClientV2({
    token: process.env.COHERE_API_KEY,
  });


// Middleware to parse JSON requests
app.use(express.json());

// Chatbot endpoint
app.post('/chat', async (req, res) => {
    const { message } = req.body;
    // console.log(message);
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await cohere.chat({
        model: 'command-r-plus',
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
      });
      const reply = response.message.content[0];//.choices[0].message.content;
    //   console.log(reply);
    res.json({ reply });
  } catch (error) {
    console.error('Error from cohere:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });