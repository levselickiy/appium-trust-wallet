import { BaseScreen } from './base.page.js';
import { $ } from '@wdio/globals';

export class HomeScreen extends BaseScreen {
    get mainWalletButton() { return $('//android.widget.TextView[@resource-id="topBarWalletName"]'); }
    get walletSelect() { return $('//android.view.View[@resource-id="walletDetailsIconButton"]/android.widget.Button'); }

    async openMainWallet() {
        await this.click(this.mainWalletButton);
        await this.click(this.walletSelect);
    }
}

export const homePage = new HomePage();
