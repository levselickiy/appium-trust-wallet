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

    get confirmSeedPhraseTitle() {
        return $('//android.widget.TextView[@text="Please tap on the correct answer of the below seed phrases."]')
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

    async verifyConfirmPhraseTitle(){
        await this.confirmSeedPhraseTitle.waitForDisplayed({timeout: 5000})
    }

    async openManualBackup() {
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
        console.log(`Found ${headers.length} word headers`)

        for (const h of headers) {
            const txt = await h.getText()
            const n = parseInt(txt.replace(/[^\d]/g, ''), 10)
            console.log(`Processing Word #${n}`)

            const expected = seedMap[n]
            if (!expected) {
                console.error(`No entry in seedMap for Word #${n}`)
                throw new Error(`No entry in seedMap for Word #${n}`)
            }
            console.log(`Expected word: "${expected}"`)

            try {
                const optionView = await $(`//android.widget.TextView[
                translate(normalize-space(@text),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${expected.toLowerCase()}'
            ]/ancestor::android.view.View[starts-with(@resource-id,"Word_")]`)

                await optionView.waitForDisplayed({ timeout: 7000 })
                console.log(`Found View for "${expected}" with resource-id`)

                try {
                    await optionView.click()
                    console.log(`Clicked on View for "${expected}"`)
                    continue
                } catch (errClick) {
                    console.warn(`Direct click failed for "${expected}", trying Button/TextView inside`)
                }

                const btn = await optionView.$('.//android.widget.Button')
                if (btn && await btn.isDisplayed()) {
                    await btn.click()
                    console.log(`Clicked Button inside View for "${expected}"`)
                    continue
                }

                const tv = await optionView.$('.//android.widget.TextView')
                if (tv && await tv.isDisplayed()) {
                    await tv.click()
                    console.log(`Clicked TextView inside View for "${expected}"`)
                    continue
                }

                console.error(`Cannot click on seed word: "${expected}"`)
                throw new Error(`Cannot click on seed word: "${expected}"`)

            } catch (err) {
                console.error(`Error processing Word #${n}: ${err.message}`)
                throw err
            }
        }
    }
}

export const walletSettingsScreen = new WalletSettingScreen()
