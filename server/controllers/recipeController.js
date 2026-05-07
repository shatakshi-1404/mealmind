const Ingredient = require('../models/Ingredient');

exports.getSuggestions = async (req, res) => {
  try {
    const ingredients = await Ingredient.find({ userId: req.user.id });
    const ingredientList = ingredients.map(i => i.name).join(', ');

    if (!ingredientList) {
      return res.status(400).json({ message: 'Add some ingredients first!' });
    }

    const prompt = `
      I have these ingredients at home: ${ingredientList}.
      Suggest 3 recipes I can make using ONLY these ingredients (or most of them).
      Return a JSON array with this exact format, no extra text, no markdown, no backticks:
      [
        {
          "name": "Recipe Name",
          "ingredients_used": ["ing1", "ing2"],
          "ingredients_missing": ["ing3"],
          "calories": 450,
          "instructions": "Brief 3-step instructions",
          "prepTime": "20 mins"
        }
      ]
    `;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'http://localhost:3001',
        'X-Title': 'MealMind'
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-3-super-120b-a12b:free',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    console.log('OpenRouter response:', JSON.stringify(data, null, 2));

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ message: data.error?.message || 'AI returned no response' });
    }

    const raw = data.choices[0].message.content;
    const cleaned = raw.replace(/```json|```/g, '').trim();

    let recipes;
    try {
      recipes = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error('Parse error:', cleaned);
      return res.status(500).json({ message: 'AI returned invalid format. Try again.' });
    }

    res.json(recipes);
  } catch (err) {
    console.error('Recipe error:', err);
    res.status(500).json({ message: err.message });
  }
};