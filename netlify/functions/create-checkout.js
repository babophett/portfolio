const Stripe = require('stripe')

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return { statusCode: 500, body: 'Stripe not configured' }
  }

  let items
  try {
    items = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, body: 'Invalid request body' }
  }

  if (!Array.isArray(items) || items.length === 0) {
    return { statusCode: 400, body: 'Cart is empty' }
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const origin = process.env.URL || 'http://localhost:8888'

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${item.photoTitle} — ${item.size}`,
            description: item.paper,
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      })),
      success_url: `${origin}/?order=success`,
      cancel_url:  `${origin}/?order=cancelled`,
    })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    }
  } catch (err) {
    console.error('Stripe error:', err)
    return { statusCode: 500, body: 'Failed to create checkout session' }
  }
}
