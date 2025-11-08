


// const express = require('express');
// const router = express.Router();
// const OpenAI = require('openai');

// const openai = new OpenAI({
//   apiKey: process.env.TOGETHER_API_KEY,
//   baseURL: "https://api.together.xyz/v1"
// });

// router.post('/', async (req, res) => {
//   const { message } = req.body;

//   try {
//     const response = await openai.chat.completions.create({
//       model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
//       messages: [
//         { role: 'system', content: 'You are a helpful assistant.' },
//         { role: 'user', content: message }
//       ]
//     });

//     const reply = response.choices[0]?.message?.content;
//     res.json({ reply });
//   } catch (error) {
//      console.error('AI Error:', error.response?.data || error.message || error);
//     res.status(500).json({ reply: 'Something went wrong!' });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

// ✅ Proper Together AI config
const openai = new OpenAI({
  apiKey: process.env.TOGETHER_API_KEY,
  baseURL: 'https://api.together.xyz/v1',
});

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ reply: 'Message cannot be empty.' });
  }

  try {
    console.log('🟢 Sending message to Together API:', message);

    // ✅ Make sure model ID is correct and supported
    const completion = await openai.chat.completions.create({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const reply = completion?.choices?.[0]?.message?.content || 'No response received.';
    console.log('✅ Together AI Reply:', reply);

    res.json({ reply });
  } catch (error) {
    console.error('❌ Together API Error:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Message:', error.message);
    }

    res.status(500).json({ reply: 'Something went wrong with Together API.' });
  }
});

module.exports = router;
