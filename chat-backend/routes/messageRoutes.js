


const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.TOGETHER_API_KEY,
  baseURL: 'https://api.together.xyz/v1'
});

router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message }
      ]
    });

    const reply = response.choices[0]?.message?.content;
    res.json({ reply });
  } catch (error) {
    console.error('AI Error:', error.response?.data || error.message || error);
    res.status(500).json({ reply: 'Something went wrong!' });
  }
});

module.exports = router;
