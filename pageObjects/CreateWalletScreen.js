import { browser, $ } from '@wdio/globals';
import {BaseScreen} from "./BaseScreen";

export class CreateUserPage extends BaseScreen {

    get welcomeText() { return $('android=new UiSelector().textContains("Own, control, and")'); }
    get createWalletButton() { return $('android=new UiSelector().resourceId("CreateNewWalletButton")'); }
    get pinCodeText() { return $('android=new UiSelector().textContains("Enter your passcode.")'); }
    get pinCodeConfirmText() { return $('android=new UiSelector().textContains("Re-enter your passcode. ")'); }
    get skipNotificationButton() { return $('//android.widget.TextView[@resource-id="secondaryAction"]'); }
    get finishMsg() { return $('android=new UiSelector().textContains("Brilliant, your wallet is ready!")'); }
    get skipButton() { return $('//android.widget.TextView[@text="Skip"]'); }

    async createWallet(pin) {
        await this.click(this.createWalletButton);
        await this.enterPinCode(pin);
        await this.enterPinCode(pin);
        await this.click(this.skipNotificationButton);
    }

    async enterPinCode(pin) {
        for (const digit of pin) {
            const digitButton = await $(`//android.widget.TextView[@text="${digit}"]`);
            await this.click(digitButton, 3000);
        }
    }
}

export const createUserPage = new CreateUserPage();
