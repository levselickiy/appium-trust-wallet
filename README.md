# Appium TrustWallet Automation Tests

This project contains UI automation tests for the TrustWallet Android application using WebDriverIO, Appium, and Mocha.

## Demo Video
Watch a demo of the test execution:  [Screen_recording_final.webm](https://github.com/user-attachments/assets/02e28f89-6141-40db-bc99-da0a530d9600)


## Prerequisites
- **Node.js**: v18 or higher
- **Java JDK**: 11 or higher (for Appium)
- **Android SDK**: Installed with `ANDROID_HOME` set
- **Appium**: Installed globally or locally
- **TrustWallet APK**: Download from [trustwallet.com](https://trustwallet.com/)
- **Android Emulator/Device**: API level 28+ (configured via Android Studio or connected device)

## Setup
1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Install Appium** (if not installed globally):
   ```bash
   npm install -g appium
   ```

3. **Install Appium UiAutomator2 driver**:
   ```bash
   appium driver install uiautomator2
   ```

4. **Set up TrustWallet APK**:
   - Download the APK from [trustwallet.com](https://trustwallet.com/).
   - Update `wdio.conf.js` with the path to the APK in `capabilities.app`.

5. **Start Appium server**:
   ```bash
   appium
   ```

## Running Tests
1. Ensure an Android emulator or device is running.
2. Execute tests:
   ```bash
   npm run test
   ```
   This runs `wdio run ./wdio.conf.js`.


## Notes
- Tests cover the wallet creation flow in TrustWallet.
- Update `wdio.conf.js` with your device/emulator details (`deviceName`, `platformVersion`).
- Ensure Appium server is running before tests.
