# 7-Day Trial Testing Guide
*v0.3.0 Development - September 8, 2025*

## 🚀 **Trial System Implementation Complete**

The 7-day trial with paywall system has been successfully integrated into the app. Here's how to test it:

## 🧪 **Testing the Trial Flow**

### **Initial State (New User)**
1. **Open the app** - Fresh user with no trial started
2. **Click "Start Novena"** - Should trigger paywall modal
3. **Paywall modal displays** with options:
   - "Start 7-Day Free Trial" button
   - Monthly plan ($7.99/month) 
   - Annual plan ($35.99/year - Save 40%)

### **Trial Active State**
1. **Click "Start 7-Day Free Trial"** in paywall modal
2. **Trial begins** - User gets immediate access
3. **Trial banner appears** at top showing days remaining
4. **Premium features unlock**:
   - Can start novena
   - Analytics section visible in progress
   - Premium settings in Settings modal

### **Trial Expiring State**
1. **Modify trial date** in browser DevTools:
   ```javascript
   // In browser console
   localStorage.setItem('novena-trial-data', JSON.stringify({
     trialStartDate: new Date(Date.now() - 6*24*60*60*1000).toISOString(),
     trialEndDate: new Date(Date.now() + 1*24*60*60*1000).toISOString()
   }));
   // Refresh page
   ```
2. **Banner shows** "Last day of your free trial"
3. **Urgency messaging** in premium guards

### **Trial Expired State**
1. **Modify trial to expired**:
   ```javascript
   // In browser console  
   localStorage.setItem('novena-trial-data', JSON.stringify({
     trialStartDate: new Date(Date.now() - 8*24*60*60*1000).toISOString(),
     trialEndDate: new Date(Date.now() - 1*24*60*60*1000).toISOString()
   }));
   // Refresh page
   ```
2. **All premium features locked** behind paywall
3. **"Upgrade Now" messaging** throughout app

### **Premium Active State**
1. **Simulate premium subscription**:
   ```javascript
   // In browser console
   localStorage.setItem('novena-premium-status', 'true');
   // Refresh page
   ```
2. **All features unlocked** permanently
3. **Premium indicators** in Settings modal

## 🎯 **Key Features to Test**

### **Premium Guards Working**
- [ ] **Start Novena** - Blocked without access, works with trial/premium
- [ ] **Analytics Section** - Shows premium upgrade prompt vs actual analytics
- [ ] **Settings Premium Section** - Shows upgrade vs premium settings

### **Trial Banner Behavior**
- [ ] **No banner** for new users (no trial started)
- [ ] **Days remaining** during active trial
- [ ] **Urgency messages** when trial expires soon  
- [ ] **Expired messaging** after trial ends
- [ ] **No banner** for premium users

### **Paywall Modal Functionality**
- [ ] **Plan selection** - Can choose monthly vs annual
- [ ] **Start trial button** - Only shows for non-expired trials
- [ ] **Subscribe buttons** - Always available
- [ ] **Feature list** - Shows value proposition
- [ ] **Closing modal** - Returns to previous state

## 🛠️ **Development Testing Commands**

### **Reset All Trial Data**
```javascript
localStorage.removeItem('novena-trial-data');
localStorage.removeItem('novena-premium-status');
location.reload();
```

### **Set Trial to Expire in 1 Hour**
```javascript
localStorage.setItem('novena-trial-data', JSON.stringify({
  trialStartDate: new Date(Date.now() - 6*24*60*60*1000 + 60*60*1000).toISOString(),
  trialEndDate: new Date(Date.now() + 60*60*1000).toISOString()
}));
location.reload();
```

### **Debug Trial State**
```javascript
// Check current trial status
const useTrialStateDebug = () => {
  const trialData = localStorage.getItem('novena-trial-data');
  const premiumStatus = localStorage.getItem('novena-premium-status');
  
  console.log('Trial Data:', trialData ? JSON.parse(trialData) : 'None');
  console.log('Premium Status:', premiumStatus);
  
  if (trialData) {
    const parsed = JSON.parse(trialData);
    const now = new Date();
    const startDate = new Date(parsed.trialStartDate);
    const endDate = new Date(parsed.trialEndDate);
    
    console.log('Days Remaining:', Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))));
    console.log('Is Active:', now >= startDate && now <= endDate);
    console.log('Is Expired:', now > endDate);
  }
};

useTrialStateDebug();
```

## 📱 **Mobile Testing**

### **TWA/Mobile Web Testing**
- [ ] **Responsive design** - Paywall modal fits mobile screens
- [ ] **Touch interactions** - All buttons work properly  
- [ ] **Banner placement** - Trial banner doesn't interfere with navigation
- [ ] **Modal scrolling** - Long content scrolls properly

## 🎨 **UI/UX Testing**

### **Dark Mode Compatibility**
- [ ] **Paywall modal** - Proper dark mode theming
- [ ] **Trial banner** - Readable in both light/dark modes
- [ ] **Premium guards** - Consistent styling across themes

### **Responsive Design**
- [ ] **Desktop** - Full width modals and banners
- [ ] **Tablet** - Proper scaling and touch targets
- [ ] **Mobile** - Compact layouts, readable text

## 🚨 **Edge Cases to Test**

### **Clock Changes**
- [ ] **System time change** - Trial state updates correctly
- [ ] **Timezone changes** - Trial duration remains accurate

### **Storage Issues**
- [ ] **Private/incognito mode** - Graceful fallbacks
- [ ] **Storage full** - Error handling for localStorage failures

### **Network Issues**
- [ ] **Offline usage** - Trial state persists without network
- [ ] **Page refresh** - Trial state survives browser refresh

## ⚡ **Performance Testing**

- [ ] **Build size impact** - Check bundle size increase (+~3KB is expected)
- [ ] **Load time** - No significant performance degradation
- [ ] **Memory usage** - Trial state management doesn't leak memory

## 🎯 **Ready for Next Phase**

Once this testing is complete, we're ready to move to **Phase 2: Stripe Integration** for actual payment processing.

Current implementation provides:
- ✅ **Complete trial management** system  
- ✅ **Premium feature gating** throughout app
- ✅ **Professional UI/UX** for conversions
- ✅ **Mobile-optimized** experience
- ✅ **Dark mode compatible** design

**Next: Add Stripe payment integration for real subscription processing.**