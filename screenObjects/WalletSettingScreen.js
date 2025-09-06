import { $,$$ } from '@wdio/globals'
import { BaseScreen } from './BaseScreen'
import { expect } from 'chai'

export class WalletSettingScreen extends BaseScreen {
    get manualBackUpNowButton() {
        return $('(//android.widget.TextView[@resource-id="itemValue"])[2]')
    }

    get firstConsentCheckBox() {
        return $('android=new UiSelector().textContains("Trust wallet does not have access to this")')
    }

    get secondConsentCheckBox() {
        return $('android=new UiSelector().textContains("Don’t save this in any digital format")')
    }

    get continueButton() {
        return $('//android.widget.TextView[@text="Continue"]')
    }

    get secretPhraseTitle() {
        return $('//android.widget.TextView[@resource-id="toolbarTitle" and @text="Secret phrase"]')
    }

    get confirmButton() {
        return $('//android.view.View[@resource-id="confirmButton"]')
    }

    get activeButton() {
        return $('android=new UiSelector().text("Active")')
    }

    get walletSettingPage() {
        return $('android=new UiSelector().text("Main Wallet 1")')
    }

    async verifyManualBackup() {
        await this.waitForClickableAndClick(this.manualBackUpNowButton)
        await this.waitForClickableAndClick(this.firstConsentCheckBox)
        await this.waitForClickableAndClick(this.secondConsentCheckBox)
        await this.waitForClickableAndClick(this.continueButton)
    }

    async verifyOpenedSecretPhrasePage() {
        await this.secretPhraseTitle.waitForDisplayed({timeout: 5000})
    }

    async saveSeedPhrase() {
        const seedPhrase = await this.extractSeedPhrase()
        console.log('Seed Phrase-', seedPhrase)
        expect(Object.keys(seedPhrase)).to.have.lengthOf(12)
        return seedPhrase
    }

    async clickOnContinueButton() {
        await this.waitForClickableAndClick(this.continueButton)

    }

    async clickOnContinueConfirmButton() {
        await this.waitForClickableAndClick(this.confirmButton)
    }


    async verifyWalletBackupCompleted() {
        await this.walletSettingPage.waitForDisplayed({timeout: 5000})
        await this.activeButton.waitForDisplayed({timeout: 5000})
    }


    async extractSeedPhrase() {
        const phraseElements = await $$('//android.widget.TextView[contains(@text, ". ")]')
        const seed = {}
        for (const el of phraseElements) {
            const [index, word] = (await el.getText()).split('. ').map(t => t.trim())
            seed[parseInt(index, 10)] = word
        }
        return seed
    }

    async confirmSeedPhrase(seedMap) {
        const headers = await $$('//android.widget.TextView[starts-with(@text,"Word #")]')

        for (const h of headers) {
            const txt = await h.getText()
            const n = parseInt(txt.replace(/[^\d]/g, ''), 10)
        const expected = seedMap[n]
        if (!expected) {
            throw new Error(`In seedMap  ${n}`)
        }

        const optionTv = await $(`//android.widget.TextView[  translate(normalize-space(@text),
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                    'abcdefghijklmnopqrstuvwxyz'
          )='${expected.toLowerCase()}'
        ]
        /parent::android.view.View[starts-with(@resource-id,"Word_")]`
        )

        await optionTv.waitForDisplayed({ timeout: 7000 })
        try {
            await optionTv.click()
        } catch {
            const btn = await optionTv.$('./android.widget.Button')
            if (await btn.isExisting()) {
                await btn.click()
            } else {
                const tv = await optionTv.$('./android.widget.TextView')
                await tv.click()
            }
        }
    }
}}

export const walletSettingsScreen = new WalletSettingScreen()
