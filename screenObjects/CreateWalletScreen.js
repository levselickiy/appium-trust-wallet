import { browser, $ } from '@wdio/globals'
import { BaseScreen } from './BaseScreen'

export class CreateWalletScreen extends BaseScreen {
    get skipButton() { return $('//android.widget.TextView[@text="Skip"]') }
    get welcomeText() { return $('android=new UiSelector().textContains("Own, control, and")') }
    get createWalletButton() { return $('android=new UiSelector().resourceId("CreateNewWalletButton")') }
    get pinCodeText() { return $('android=new UiSelector().textContains("Enter your passcode.")') }
    get pinCodeConfirmText() { return $('android=new UiSelector().textContains("Re-enter your passcode. ")') }
    get skipNotificationButton() { return $('//android.widget.TextView[@resource-id="secondaryAction"]') }
    get walletReadyText() { return $('android=new UiSelector().textContains("Brilliant, your wallet is ready!")') }
    get enableNotificationButton() { return $('') }
    get passCodeError() {return $('')}
    get systemNotificatationPopUp() { return $('{}')}


    async clickOnEnableNotification() {
        await this.waitForClickableAndClick(this.enableNotificationButton)
    }
    async clickOnSkipButton() {
        await this.waitForClickableAndClick(this.skipButton)
    }

    async verifyPassCodeError() {
        await this.passCodeError.waitForDisplayed({timeout: 5000})
    }

    async verifyWalletReadyText(){
        await this.walletReadyText.waitForDisplayed({timeout: 15000})
    }

    async verifyWelcomeText(){
        await this.welcomeText.waitForDisplayed({timeout: 10000})
    }

    async verifyPinCodeConfirmText(){
        await this.pinCodeConfirmText.waitForDisplayed({timeout: 10000})
    }

    async verifyPinCodeText(){
        await this.pinCodeText.waitForDisplayed({timeout: 10000})
    }

    async createWallet(pin) {
        await this.clickOnCreateWalletButton()
        await this.verifyPinCodeText()
        await this.enterPinCode(pin)
        await this.verifyPinCodeConfirmText()
        await this.enterPinCode(pin)
        await this.clickOnSkipNotificationButton()
        await this.verifyWalletReadyText()
        await this.clickOnSkipButton()
    }

    async clickOnSkipNotificationButton(){
        await this.waitForClickableAndClick(this.createWalletButton)
    }

    async clickOnEnableNotificationButton(){
        await this.waitForClickableAndClick(this.enableNotificationButton)
    }

    async clickOnCreateWalletButton(){
        await this.waitForClickableAndClick(this.createWalletButton)
    }

    async enterPinCode(pin) {
        for (const digit of pin) {
            const digitButton = await $(`//android.widget.TextView[@text="${digit}"]`)
            await this.waitForClickableAndClick(digitButton, 3000)
        }
    }
}

export const createWalletScreen = new CreateWalletScreen()
