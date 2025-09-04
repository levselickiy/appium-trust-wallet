const { expect } = require('chai');
const { browser, $ } = require('@wdio/globals');

it.only('ping', async (done) => {
    // Найти кнопку по resource-id
    const createWalletButton = await $('android=new UiSelector().resourceId("CreateNewWalletButton")');

    // Проверить, что кнопка видима
    await createWalletButton.waitForDisplayed({ timeout: 5000 });

    // Кликнуть по кнопке
    await createWalletButton.click();

    // // Проверка: можно проверить текст кнопки (опционально)
    // const buttonText = await $('android=new UiSelector().resourceId("buttonTitle")').getText();
    // expect(buttonText).to.equal('Create new wallet');
})
