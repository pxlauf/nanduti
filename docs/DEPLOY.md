# Deployment Guide

This guide covers deploying the Nanduti Transit App to production.

## Prerequisites

- Completed [Setup Guide](./SETUP.md)
- EAS CLI installed: `npm install -g eas-cli`
- EAS account: [Sign up at expo.dev](https://expo.dev)
- Android and/or iOS developer accounts

## Build Configuration

### 1. Configure EAS

First, set up EAS for your project:

```bash
# Login to your Expo account
eas login

# Configure the project
eas build:configure
```

### 2. Update app.json

Ensure your `app.json` has the correct configuration:

```json
{
  "expo": {
    "name": "nanduti",
    "slug": "nanduti",
    "version": "0.1.0",
    "owner": "your-username",
    "android": {
      "package": "com.nanduti.app"
    },
    "ios": {
      "bundleIdentifier": "com.nanduti.app"
    }
  }
}
```

### 3. Environment Variables for Production

Create a production environment file at `.env.production`:

```env
SUPABASE_URL=https://your-production-project.supabase.co
SUPABASE_ANON_KEY=your-production-anon-key
MAPBOX_ACCESS_TOKEN=your-mapbox-token
```

## Android Deployment

### 1. Create Android Keystore

Generate a keystore for signing your app:

```bash
keytool -genkeypair -v -storetype PKCS12 \
  -keystore nanduti-release-key.p12 \
  -alias nanduti-key-alias \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

Keep this file secure! Store it in a safe location and don't commit it to Git.

### 2. Configure EAS Build for Android

Create or update `eas.json`:

```json
{
  "cli": {
    "version": ">= 5.2.0"
  },
  "build": {
    "production": {
      "android": {
        "buildType": "apk"
      }
    },
    "preview": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

### 3. Build Android APK

```bash
# Build production APK
eas build --platform android --profile production
```

### 4. Build Android App Bundle (AAB)

For Google Play Store, build an AAB:

```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

```bash
eas build --platform android --profile production
```

### 5. Submit to Google Play Store

1. Create a Google Play Console account
2. Create a new application
3. Complete store listing:
   - App name: "Nanduti Transit"
   - Description: Translated version of README
   - Screenshots: At least 2 phone screenshots
   - Icon: 512x512 PNG
   - Feature graphic: 1024x500 PNG

4. Upload your AAB file
5. Complete content rating questionnaire
6. Set pricing and distribution
7. Roll out to production

## iOS Deployment

### 1. Apple Developer Account

1. Sign up for [Apple Developer Program](https://developer.apple.com/programs/)
2. Annual fee: $99 USD

### 2. Configure EAS Build for iOS

Update `eas.json`:

```json
{
  "build": {
    "production": {
      "ios": {
        "autoIncrement": true
      }
    }
  }
}
```

### 3. Build iOS IPA

```bash
eas build --platform ios --profile production
```

### 4. Submit to App Store

After build completes:

```bash
eas submit --platform ios --latest
```

Or manually upload via [App Store Connect](https://appstoreconnect.apple.com/):

1. Create a new app in App Store Connect
2. Complete app information:
   - Name: "Nanduti Transit"
   - Bundle ID: com.nanduti.app
   - SKU: NANDUTI001
   - Category: Navigation

3. Upload screenshots (required sizes):
   - 6.7" Display: 1290 x 2796
   - 6.5" Display: 1242 x 2688
   - 5.5" Display: 1242 x 2208

4. Set pricing and availability
5. Submit for review

### 5. App Store Review Requirements

Make sure your app meets these requirements:
- Privacy policy URL in app listing
- Location usage explained in app description
- Proper data handling documentation
- No placeholder content

## Environment-Specific Builds

### Staging Build

Create a staging environment:

```bash
# Build for staging
eas build --platform android --profile preview
```

### Development Build

For testing with development features:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    }
  }
}
```

```bash
eas build --platform android --profile development
```

## Update Management

### Version Updates

To release a new version:

1. Update version in `app.json`:
   ```json
   {
     "expo": {
       "version": "0.2.0"
     }
   }
   ```

2. Build and submit new version

### Over-the-Air Updates (OTA)

For minor updates without app store approval:

```bash
# Publish an update
eas update --branch production --message "Bug fixes"
```

**Note:** OTA updates can only change JavaScript and assets, not native code.

## Continuous Integration

### GitHub Actions Example

Create `.github/workflows/build.yml`:

```yaml
name: Build and Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run type-check

  build-android:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: eas build --platform android --non-interactive
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
```

## Monitoring and Analytics

### Firebase Analytics (Optional)

Add Firebase for crash reporting and analytics:

```bash
npm install @react-native-firebase/app
npm install @react-native-firebase/analytics
```

### Sentry (Optional)

Add Sentry for error tracking:

```bash
npm install @sentry/react-native
```

## Security Best Practices

1. **Never commit sensitive files:**
   - `.env` files (use `.env.example`)
   - Keystore files
   - API keys

2. **Use environment variables:**
   - Store secrets in EAS secrets
   - Reference them in app.json

3. **Secure your Supabase:**
   - Enable RLS policies
   - Use anon keys, not service keys
   - Regular security audits

4. **Code signing:**
   - Store keystore securely
   - Use different keystores for dev/prod
   - Document keystore passwords

## Post-Deployment Checklist

- [ ] Test on multiple devices
- [ ] Verify all features work
- [ ] Check location permissions
- [ ] Test Supabase connectivity
- [ ] Verify map rendering
- [ ] Test route finding
- [ ] Check app performance
- [ ] Monitor crash reports
- [ ] Set up analytics tracking
- [ ] Update documentation

## Rollback Plan

If issues occur after deployment:

1. **OTA Updates:** Rollback immediately
   ```bash
   eas update --rollback
   ```

2. **App Store:** Submit new version with rollback

3. **Emergency:** Contact platform support for expedited review

## Support

- [EAS Documentation](https://docs.expo.dev/build/introduction/)
- [Expo Forums](https://forums.expo.dev/)
- [React Native Deployment Guide](https://reactnative.dev/docs/publishing-to-app-store)
