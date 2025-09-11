# Netlify + Stripe Integration Setup Guide

## ✅ Current Status

Your app now has complete Stripe integration with intelligent demo/production mode switching:

- 🎭 **Demo Mode**: Automatic in development (shows confirmation dialogs)
- 💳 **Production Mode**: Real Stripe checkout when configured properly
- 🔧 **Debug Controls**: Toggle between modes via debug panel
- ⚡ **Netlify Functions**: Serverless backend API ready for deployment

## 🚀 Quick Setup for Netlify

### 1. Deploy to Netlify

Your app is already configured for Netlify with:
- ✅ `netlify.toml` with proper functions setup
- ✅ API redirects (`/api/*` → `/.netlify/functions/*`)
- ✅ Security headers for Stripe
- ✅ Serverless functions in `netlify/functions/`

### 2. Set up Stripe Account

1. **Create Stripe Account**: [stripe.com](https://stripe.com)
2. **Create Products** in Stripe Dashboard:
   ```
   Monthly Plan: $7.99 USD, recurring monthly
   Yearly Plan: $35.99 USD, recurring yearly
   ```
3. **Copy the Price IDs** (start with `price_`)

### 3. Configure Netlify Environment Variables

In your Netlify dashboard, go to **Site Settings > Environment Variables** and add:

#### Frontend Variables (React App)
```bash
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
REACT_APP_STRIPE_MONTHLY_PRICE_ID=price_your_monthly_id
REACT_APP_STRIPE_YEARLY_PRICE_ID=price_your_yearly_id
```

#### Backend Variables (Netlify Functions)
```bash
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### 4. Set up Stripe Webhooks

1. Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. **Endpoint URL**: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
4. **Listen to**: Select these events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`  
   - `invoice.payment_failed`
   - `customer.subscription.deleted`
   - `customer.subscription.trial_will_end`
5. **Copy webhook secret** and add to Netlify environment variables

## 🎭 Demo Mode Controls

Your app has intelligent mode switching:

### Automatic Demo Mode (Development)
- ✅ `NODE_ENV === 'development'` (local development)
- ✅ Missing Stripe configuration  
- ✅ Manual toggle via debug panel

### Production Mode (Live Site)
- ✅ `NODE_ENV === 'production'` + Stripe configured
- ✅ Real Stripe Checkout integration
- ✅ Netlify Functions handle payments

### Debug Panel Controls
In development, use the debug panel to:
- 🎭 **Toggle Demo Mode**: Switch between demo/production
- 📊 **View Current State**: See trial status, Stripe mode, etc.
- 🧪 **Test Trial States**: Simulate expired, expiring, active trials

## 📋 Testing Checklist

### Demo Mode Testing
- [ ] Start trial from welcome modal
- [ ] Try to upgrade (should show demo dialog)
- [ ] Confirm demo payment (should activate premium)
- [ ] Test payment cancellation

### Production Mode Testing (After Stripe Setup)
- [ ] Configure Stripe keys in Netlify
- [ ] Set debug panel to production mode  
- [ ] Try upgrade flow (should redirect to real Stripe)
- [ ] Test with Stripe test cards
- [ ] Verify webhook receives events

## 🔧 File Structure

```
netlify/
├── functions/
│   ├── create-checkout-session.js  # Creates Stripe checkout
│   ├── stripe-webhook.js           # Handles Stripe events  
│   └── package.json                # Stripe dependency
netlify.toml                        # Netlify configuration
.env.example                        # Environment template
```

## 🎯 How It Works

### Demo Mode Flow
1. User clicks "Subscribe Now"
2. `isDemoMode()` returns true
3. Shows confirmation dialog
4. Simulates payment success/failure
5. Updates user's premium status locally

### Production Mode Flow  
1. User clicks "Subscribe Now" 
2. `isDemoMode()` returns false
3. Calls `/.netlify/functions/create-checkout-session`
4. Redirects to real Stripe Checkout
5. User completes payment
6. Stripe webhook activates premium status

## 🚨 Security Notes

- ✅ **Never commit secret keys** to git
- ✅ **Use environment variables** for all sensitive data
- ✅ **Webhook signature verification** implemented
- ✅ **CSP headers** configured for Stripe
- ✅ **CORS handling** in functions

## 💡 Pro Tips

1. **Test with Stripe Test Mode** first
2. **Use the debug panel** to switch modes during development
3. **Monitor webhook events** in Stripe dashboard  
4. **Set up error monitoring** for production

## 🐛 Troubleshooting

### "Demo Mode" showing in production
- ✅ Check Stripe keys are set in Netlify dashboard
- ✅ Verify `isStripeConfigured()` returns true
- ✅ Use debug panel to check current mode

### Functions not working
- ✅ Check `netlify.toml` is deployed
- ✅ Verify function logs in Netlify dashboard
- ✅ Test function endpoints directly

### Webhook failures
- ✅ Check webhook URL is correct
- ✅ Verify webhook secret matches
- ✅ Look at Stripe webhook logs

---

**Ready to go live!** 🚀 Your Stripe integration will automatically switch from demo mode to production when you configure the environment variables on Netlify.