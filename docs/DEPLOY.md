# Deployment Guide

## Overview

This guide covers the deployment process for the Nanduti app to various platforms.

## Prerequisites

Before deploying, ensure you have:

1. Completed all development and testing
2. Set up proper environment variables
3. Configured app icons and splash screens
4. Tested on both Android and iOS devices

## Preparation

### 1. Update Configuration

Update `app.json` with production settings:

```json
{
  "expo": {
    "name": "nanduti",
    "version": "1.0.0",
    "android": {
      "package": "com.nanduti.app",
      "versionCode": 1
    },
    "ios": {
      "bundleIdentifier": "com.nanduti.app"
    }
  }
}
```

### 2. Update Environment Variables

Set production values in `.env`:

```env
DEBUG_MODE=false
SUPABASE_URL=production-supabase-url
SUPABASE_ANON_KEY=production-supabase-key
```

### 3. Run Final Tests

```bash
npm run typecheck
npm run lint
npm test
```

## Building the App

### Android Build

#### 1. Build APK

```bash
expo build:android -t apk
```

#### 2. Build App Bundle

```bash
expo build:android -t app-bundle
```

#### 3. Download the Build

Once the build completes, download the APK or App Bundle from the Expo dashboard.

### iOS Build

#### 1. Build IPA

```bash
expo build:ios -t archive
```

#### 2. Download the Build

Once the build completes, download the IPA from the Expo dashboard.

## Publishing to App Stores

### Google Play Store

1. **Create a Developer Account**
   - Sign up at [Google Play Console](https://play.google.com/console/)
   - Pay the one-time registration fee

2. **Prepare Store Listing**
   - App name, description, screenshots
   - High-quality icons and promotional graphics
   - Privacy policy

3. **Upload the App Bundle**
   - Go to "App Releases" > "Production"
   - Upload your App Bundle file
   - Fill in release notes

4. **Configure Pricing and Distribution**
   - Set pricing (free or paid)
   - Select target countries
   - Configure content rating

5. **Submit for Review**
   - Review all information
   - Submit for Google's review process

### Apple App Store

1. **Create an Apple Developer Account**
   - Sign up at [Apple Developer](https://developer.apple.com/)
   - Pay the annual developer fee

2. **Prepare App Store Listing**
   - App name, description, screenshots
   - App icons and promotional images
   - Privacy policy

3. **Upload the IPA**
   - Use Xcode or Transporter app
   - Upload your IPA file
   - Fill in metadata

4. **Configure App Information**
   - Set pricing and availability
   - Configure age rating
   - Set up in-app purchases if needed

5. **Submit for Review**
   - Review all information
   - Submit for Apple's review process

## Expo Publishing

For quick updates without app store submissions:

```bash
expo publish
```

This will publish your app to Expo's servers, making it available for users who have the Expo client app.

## Over-the-Air Updates

Nanduti supports OTA updates through Expo:

1. **Make code changes**
2. **Increment version** in `app.json`
3. **Publish updates**

```bash
expo publish
```

Users will receive updates automatically without needing to download a new version from the app store.

## Monitoring and Analytics

### Set Up Monitoring

Add monitoring tools to track app performance and errors:

- **Sentry**: Error tracking
- **Firebase Analytics**: User behavior tracking
- **Crashlytics**: Crash reporting

### Configure Analytics

Add analytics to understand user behavior:

```typescript
// Example: Track screen views
import analytics from '@react-native-firebase/analytics';

analytics().logScreenView({
  screen_name: 'HomeScreen',
  screen_class: 'HomeScreen',
});
```

## Post-Deployment

### 1. Monitor Performance

- Track app crashes and errors
- Monitor API response times
- Watch for memory leaks

### 2. Gather User Feedback

- Implement in-app feedback forms
- Monitor app store reviews
- Respond to user support requests

### 3. Plan Updates

- Schedule regular updates
- Prioritize bug fixes
- Add new features based on user feedback

### 4. Marketing and Promotion

- Announce the launch on social media
- Create promotional materials
- Reach out to local transit authorities for partnerships

## Rollback Plan

In case of critical issues:

1. **Identify the Issue**
   - Check error logs
   - Reproduce the problem

2. **Rollback to Previous Version**
   - For app stores: Submit an expedited review for the previous version
   - For OTA updates: Publish a fix or rollback

3. **Communicate with Users**
   - Post updates on social media
   - Send in-app notifications if possible
   - Update app store listings with status

## Continuous Deployment

Set up CI/CD for automated deployments:

1. **GitHub Actions** or **GitLab CI**
2. **Automated Testing**
3. **Staging Environment**
4. **Production Deployment**

Example GitHub Actions workflow:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run typecheck
      - run: npm run lint
      - run: npm test
      - run: expo build:android
      - run: expo build:ios
```

## Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **API Keys**: Use secure storage for sensitive keys
3. **Data Protection**: Encrypt sensitive user data
4. **Authentication**: Implement proper user authentication
5. **Permissions**: Request only necessary device permissions

## Performance Optimization

1. **Bundle Size**: Optimize app bundle size
2. **Image Optimization**: Compress images and use appropriate formats
3. **Code Splitting**: Load code on demand
4. **Caching**: Implement data caching strategies
5. **Memory Management**: Prevent memory leaks

## Support and Maintenance

1. **Regular Updates**: Schedule monthly updates
2. **Bug Fixes**: Prioritize critical bug fixes
3. **Feature Requests**: Implement user-requested features
4. **Security Patches**: Apply security updates promptly
5. **Dependency Updates**: Keep dependencies up to date

## Legal Considerations

1. **Privacy Policy**: Ensure compliance with privacy laws
2. **Terms of Service**: Clear terms for app usage
3. **Data Collection**: Disclose data collection practices
4. **GDPR Compliance**: For European users
5. **Accessibility**: Ensure app is accessible to all users