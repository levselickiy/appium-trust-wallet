const path = require('path');

exports.config = {
    runner: 'local',
    specs: ['./tests/**/*.spec.js'],
    maxInstances: 1,
    capabilities: [{
        maxInstances: 1,
        platformName: 'Android',
        'appium:platformVersion': '14',
        'appium:deviceName': 'emulator-5554',
        'appium:automationName': 'UiAutomator2',
        'appium:app': path.join(process.cwd(), 'apk', 'latest.apk'),
        'appium:noReset': false,
        'appium:fullReset': true,
        'appium:newCommandTimeout': 240,
    }],
    framework: 'mocha',
    mochaOpts: { ui: 'bdd', timeout: 60000, retries: 0 },
    services: [['appium', {
        command: './node_modules/.bin/appium', // или './node_modules/.bin/appium'
    }]],
    reporters: ['spec'],
};
