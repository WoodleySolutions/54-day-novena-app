const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('./db');

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

        try {
          // Get or create user by email
          const email = session.customer_email;
          if (email) {
            const user = await db.createUser(
              email.toLowerCase().trim(),
              session.metadata?.deviceId || `stripe-${session.customer}`,
              false, // marketing consent - they can opt in later
              true,  // prayer reminders default to true
              false  // newsletter consent - they can opt in later
            );

            // Get subscription details from Stripe
            const subscription = await stripe.subscriptions.retrieve(session.subscription);

            // Calculate expiration date
            const expiresAt = subscription.current_period_end
              ? new Date(subscription.current_period_end * 1000)
              : null;

            // Create subscription record
            await db.createSubscription(user.id, user.email, 'stripe', {
              isActive: subscription.status === 'active',
              expiresAt: expiresAt,
              stripeCustomerId: session.customer,
              stripeSubscriptionId: session.subscription
            });

            console.log('✅ User and subscription created/updated in database');
          }
        } catch (dbError) {
          console.error('❌ Database error during checkout completion:', dbError);
          // Don't fail the webhook - Stripe payment was successful
        }

        break;

      case 'invoice.payment_succeeded':
        const invoice = stripeEvent.data.object;
        console.log('💰 Recurring payment succeeded:', {
          customerId: invoice.customer,
          subscriptionId: invoice.subscription,
          amount: invoice.amount_paid
        });

        try {
          // Find subscription by Stripe customer ID
          const existingSubscription = await db.getSubscriptionByStripeCustomer(invoice.customer);

          if (existingSubscription) {
            // Get updated subscription details from Stripe
            const stripeSubscription = await stripe.subscriptions.retrieve(invoice.subscription);

            // Update subscription with new expiration date
            await db.updateSubscription(existingSubscription.id, {
              isActive: stripeSubscription.status === 'active',
              expiresAt: new Date(stripeSubscription.current_period_end * 1000)
            });

            console.log('✅ Subscription renewed in database');
          }
        } catch (dbError) {
          console.error('❌ Database error during payment renewal:', dbError);
        }

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

        try {
          // Find and deactivate subscription
          const existingSubscription = await db.getSubscriptionByStripeCustomer(deletedSubscription.customer);

          if (existingSubscription) {
            await db.updateSubscription(existingSubscription.id, {
              isActive: false
            });

            console.log('✅ Subscription cancelled in database');
          }
        } catch (dbError) {
          console.error('❌ Database error during subscription cancellation:', dbError);
        }

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