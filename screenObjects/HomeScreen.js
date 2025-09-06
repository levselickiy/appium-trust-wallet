import { $ } from '@wdio/globals'
import { BaseScreen } from './BaseScreen'

export class HomeScreen extends BaseScreen {
    get mainWalletButton() { return $('//android.widget.TextView[@resource-id="topBarWalletName"]') }
    get walletSelect() { return $('//android.view.View[@resource-id="walletDetailsIconButton"]/android.widget.Button') }

    mainWalletName(walletName) { return $(`//android.widget.TextView[@resource-id="topBarWalletName" and @text="${walletName}"]`)}
    async isMainWalletDisplayed(walletName) {
        await this.mainWalletName(walletName).waitForDisplayed({ timeout: 10000 })
    }

    async selectWallet() {
        await this.waitForClickableAndClick(this.walletSelect)
    }

    async clickOnMainWallet() {
        await this.waitForClickableAndClick(this.mainWalletButton)
    }
}

export const homeScreen = new HomeScreen()