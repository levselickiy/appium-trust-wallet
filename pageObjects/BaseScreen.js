import { browser, $ } from '@wdio/globals';

export class BaseScreen {
    async waitForDisplayed(element, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
    }

    async click(element, timeout = 10000) {
        await this.waitForDisplayed(element, timeout);
        await element.click();
    }

    async type(element, text, timeout = 10000) {
        await this.waitForDisplayed(element, timeout);
        await element.clearValue();
        await element.addValue(text);
    }

    async getText(element, timeout = 10000) {
        await this.waitForDisplayed(element, timeout);
        return await element.getText();
    }
}
