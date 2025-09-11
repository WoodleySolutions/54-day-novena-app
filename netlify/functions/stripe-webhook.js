const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    // Verify the webhook signature
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Webhook signature verification failed' })
    };
  }

  try {
    // Handle the event
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        const session = stripeEvent.data.object;
        console.log('🎉 Payment successful!', {
          customerId: session.customer,
          customerEmail: session.customer_email,
          subscriptionId: session.subscription,
          userId: session.metadata?.userId
        });

        // TODO: Update user's premium status in your database
        // Example:
        // await updateUserPremiumStatus(session.metadata?.userId, {
        //   isPremium: true,
        //   customerId: session.customer,
        //   subscriptionId: session.subscription,
        //   activatedAt: new Date()
        // });

        break;

      case 'invoice.payment_succeeded':
        const invoice = stripeEvent.data.object;
        console.log('💰 Recurring payment succeeded:', {
          customerId: invoice.customer,
          subscriptionId: invoice.subscription,
          amount: invoice.amount_paid
        });

        // Handle successful recurring payment
        // Ensure user maintains premium access
        break;

      case 'invoice.payment_failed':
        const failedInvoice = stripeEvent.data.object;
        console.log('❌ Payment failed:', {
          customerId: failedInvoice.customer,
          subscriptionId: failedInvoice.subscription,
          attemptCount: failedInvoice.attempt_count
        });

        // Handle failed payment
        // Maybe send email notification or update user status
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = stripeEvent.data.object;
        console.log('🛑 Subscription cancelled:', {
          customerId: deletedSubscription.customer,
          subscriptionId: deletedSubscription.id
        });

        // TODO: Remove user's premium access
        // Example:
        // await updateUserPremiumStatus(userId, {
        //   isPremium: false,
        //   cancelledAt: new Date()
        // });

        break;

      case 'customer.subscription.trial_will_end':
        const endingTrialSubscription = stripeEvent.data.object;
        console.log('⚠️ Trial ending soon:', {
          customerId: endingTrialSubscription.customer,
          trialEnd: new Date(endingTrialSubscription.trial_end * 1000)
        });

        // Send trial ending notification
        break;

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    };

  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook handler failed' })
    };
  }
};