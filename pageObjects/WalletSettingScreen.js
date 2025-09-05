// wallet.settings.page.js
import { BasePage } from './base.page.js';
import { $,$$ } from '@wdio/globals';

export class WalletSettingsPage extends BasePage {
    get secretPhraseTitle() { return $('//android.widget.TextView[@resource-id="toolbarTitle" and @text="Secret phrase"]'); }
    get continueButton() { return $('//android.widget.TextView[@text="Continue"]'); }
    get confirmButton() { return $('//android.view.View[@resource-id="confirmButton"]'); }

    async extractSeedPhrase() {
        const phraseElements = await $$('//android.widget.TextView[contains(@text, ". ")]');
        const seed = {};
        for (const el of phraseElements) {
            const [index, word] = (await el.getText()).split('. ').map(t => t.trim());
            seed[parseInt(index, 10)] = word;
        }
        return seed;
    }

    async confirmSeedPhrase(seedMap) {
    // Находим все заголовки "Word #N" на текущем экране
        const headers = await $$('//android.widget.TextView[starts-with(@text,"Word #")]');

        for (const h of headers) {
            const txt = await h.getText();
            const n = parseInt(txt.replace(/[^\d]/g, ''), 10);
        const expected = seedMap[n];
        if (!expected) {
            throw new Error(`В seedMap  ${n}`);
        }

        // Ищем вариант с нужным словом среди кнопок-ответов (они лежат в view c id вида Word_x_y)
        const optionTv = await $(
            `//android.widget.TextView[
          translate(normalize-space(@text),
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                    'abcdefghijklmnopqrstuvwxyz'
          )='${expected.toLowerCase()}'
        ]
        /parent::android.view.View[starts-with(@resource-id,"Word_")]`
        );

        await optionTv.waitForDisplayed({ timeout: 7000 });
        try {
            await optionTv.click();
        } catch {
            const btn = await optionTv.$('./android.widget.Button');
            if (await btn.isExisting()) {
                await btn.click();
            } else {
                const tv = await optionTv.$('./android.widget.TextView');
                await tv.click();
            }
        }
    }
}

export const walletSettingsPage = new WalletSettingsPage();
