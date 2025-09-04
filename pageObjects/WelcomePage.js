const { $ } = require('@wdio/globals');

class WalletCreationPage {
    static async continueAsGuest() {
        const button = await $('~continue-as-guest-button');
        await button.waitForDisplayed({ timeout: 5000 });
        await button.click();
    }

    static async selectNoWallet() {
        await (await $('~no-wallet-button')).click();
    }

    static async enterPasscode(code) {
        for (const digit of code) {
            await $(`~key-${digit}`).click();
        }
        await $(`~submit-button`).click();
    }

    static async denyBiometric() {
        await (await $('~deny-biometric-button')).click();
    }

    static async selectManualBackup() {
        await (await $('~backup-manually-button')).click();
    }

    static async agreeToConsent() {
        await (await $('~agree-button')).click();
    }

    static async continueFromRecoveryPhrase() {
        await (await $('~continue-button')).click();
    }

    static async enterRecoveryPhrases(phrases) {
        for (const phrase of phrases) {
            await $(`~input-${phrase.index}`).setValue(phrase.word);
        }
        await $(`~confirm-button`).click();
    }

    static async skipStories() {
        await (await $('~skip-button')).click();
    }

    static async getRecoveryPhrases() {
        const phrases = [];
        for (let i = 1; i <= 12; i++) {
            const word = await (await $(`~phrase-${i}`)).getText();
            phrases.push({ index: i, word });
        }
        return phrases;
    }

    static async swipeThroughStories() {
        const size = await browser.getWindowSize();
        await browser.touchAction([
            { action: 'press', x: size.width * 0.8, y: size.height / 2 },
            { action: 'moveTo', x: size.width * 0.2, y: size.height / 2 },
            'release'
        ]);
    }

    static async getHomeTitle() {
        return await (await $('~wallet-home-title')).getText();
    }

    static async getErrorMessage() {
        return await (await $('~error-message')).getText();
    }
}

module.exports = WalletCreationPage;