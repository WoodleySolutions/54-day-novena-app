# Google Play Billing Integration for Ora v0.3.0

## 🔧 Required Changes for Google Play Billing

### 1. **Add Billing Dependency**
Add to `app/build.gradle`:
```gradle
dependencies {
    implementation 'com.android.billingclient:billing:6.1.0'
    // ... existing dependencies
}
```

### 2. **Add Billing Permission**
Add to `app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="com.android.vending.BILLING" />
```

### 3. **JavaScript Bridge Integration**
Since this is a TWA, you'll need to create a JavaScript bridge to communicate between your web app and the native billing:

**Android Side** (`app/src/main/java/.../BillingBridge.java`):
```java
@JavascriptInterface
public class BillingBridge {
    public void purchaseSubscription(String productId) {
        // Handle Google Play Billing purchase
    }
    
    public void checkSubscriptionStatus() {
        // Check current subscription status
        // Post back to web app via JavaScript
    }
}
```

**Web App Side** (update your web app):
```javascript
// Check if running in Android app
if (window.Android && window.Android.purchaseSubscription) {
    // Use native Google Play Billing
    window.Android.purchaseSubscription('premium_monthly');
} else {
    // Use Stripe for web
    // Your existing Stripe integration
}
```

### 4. **Subscription Products**
Set up in Google Play Console:
- `premium_monthly` - $9.99/month
- `premium_yearly` - $99.99/year  
- `premium_trial` - Free trial period

### 5. **Testing**
- Upload AAB to Internal Testing track
- Add test accounts for billing testing
- Test purchase flows thoroughly

## 🎯 **Implementation Priority**
1. **Phase 1**: Basic billing integration
2. **Phase 2**: Subscription management
3. **Phase 3**: Trial handling
4. **Phase 4**: Receipt validation

## 📱 **Alternative Approach**
**Simpler Option**: Keep using Stripe for now and add a note in the app:
"Subscription management available on web version at 54dayrosary.com"

This allows you to:
- Release v0.3.0 immediately with all new features
- Add Google Play Billing in v0.4.0 later
- Maintain single payment system (Stripe) initially