const { expect } = require('chai')
import {homeScreen} from '../screenObjects/HomeScreen'
import { createWalletScreen  } from '../screenObjects/CreateWalletScreen'
import { walletSettingsScreen } from '../screenObjects/WalletSettingScreen'


describe('Create a new wallet', () => {
    const pinCode ='111111'
    const walletName = 'Main Wallet 1'
    it('Happy path - Create new wallet and confirm the seed phrase', async () => {
        // Step 1: Welcome
        await createWalletScreen.verifyWelcomeText()

        // Step 2: Created a new wallet
        await createWalletScreen.createWallet(pinCode)

        // Step 4: Wallet is created
        await homeScreen.isMainWalletDisplayed(walletName)

         // Step 5: Check
        await homeScreen.isMainWalletDisplayed(walletName)
        await homeScreen.clickOnMainWallet()

        // Step 6: Backup flow
        await homeScreen.selectWallet()
        await walletSettingsScreen.verifyManualBackup()

        // Step 7: Secret phrase
        await walletSettingsScreen.verifyOpenedSecretPhrasePage()
        const seedPhrase = await walletSettingsScreen.saveSeedPhrase()
        await walletSettingsScreen.clickOnContinueButton()
        await walletSettingsScreen.confirmSeedPhrase(seedPhrase)
        await walletSettingsScreen.clickOnContinueConfirmButton()

        // Step 8: Verify wallet is active
        await walletSettingsScreen.verifyWalletBackupCompleted()
    })

    it('TC001: Verify Welcome Screen', async () => {
        await createWalletScreen.verifyWelcomeText()
        expect(await createWalletScreen.verifyWelcomeText()).to.be.true
    })

    it('TC002: Click Create Wallet Button', async () => {
        await createWalletScreen.verifyWelcomeText()
        await createWalletScreen.waitForClickableAndClick(createWalletScreen.createWalletButton)
        expect(await createWalletScreen.verifyPinCodeText()).to.be.true
    })

    it('TC003: Enter Passcode', async () => {
        await createWalletScreen.verifyWelcomeText()
        await createWalletScreen.waitForClickableAndClick(createWalletScreen.createWalletButton)
        await createWalletScreen.verifyPinCodeText()
        await createWalletScreen.enterPinCode(pinCode)
        await createWalletScreen.verifyPinCodeConfirmText()
        expect(await createWalletScreen.verifyPinCodeText()).to.be.true
    })

    it('TC004: Confirm Passcode', async () => {
        await createWalletScreen.verifyWelcomeText()
        await createWalletScreen.clickOnCreateWalletButton()
        await createWalletScreen.verifyPinCodeText()
        await createWalletScreen.enterPinCode(pinCode)
        await createWalletScreen.verifyPinCodeConfirmText()
        await createWalletScreen.enterPinCode(pinCode)
        expect(await createWalletScreen.skipNotificationButton.isDisplayed()).to.be.true
    })

    it('TC004a: Enter Mismatched Passcode', async () => {
        await createWalletScreen.verifyWelcomeText()
        await createWalletScreen.clickOnCreateWalletButton()
        await createWalletScreen.enterPinCode(pinCode, '654321')
        expect(await createWalletScreen.verifyPassCodeError()).to.be.true
    })

    it('TC005: Skip Notification', async () => {
        await createWalletScreen.verifyWelcomeText()
        await createWalletScreen.clickOnCreateWalletButton()
        await createWalletScreen.enterPinCode(pinCode)
        await createWalletScreen.enterPinCode(pinCode)
        await createWalletScreen.clickOnSkipNotificationButton()
        expect(await createWalletScreen.verifyWalletReadyText()).to.be.true
    })

    it('TC005a: Enable Notification', async () => {
        await createWalletScreen.verifyWelcomeText()
        await createWalletScreen.waitForClickableAndClick(createWalletScreen.createWalletButton)
        await createWalletScreen.enterPinCode(pinCode)
        await createWalletScreen.enterPinCode(pinCode)
        await createWalletScreen.clickOnEnableNotification()
        const systemPopup = await createWalletScreen.systemNotificatationPopUp()
        expect(await systemPopup.waitForDisplayed({timeout:5000})).to.be.true
    })

    it('TC006: Verify Wallet Ready Message', async () => {
        await createWalletScreen.createWallet(pinCode)
        expect(await createWalletScreen.verifyWalletReadyText()).to.be.true
    })

    it('TC007: Skip Initial Screen', async () => {
        await createWalletScreen.createWallet(pinCode)
        await createWalletScreen.clickOnSkipButton()
        await homeScreen.isMainWalletDisplayed(walletName)
        expect(await homeScreen.mainWalletButton.isDisplayed()).to.be.true
    })

    it('TC008: Open Wallet Details', async () => {
        await createWalletScreen.createWallet(pinCode)
        await homeScreen.isMainWalletDisplayed(walletName)
        await homeScreen.clickOnMainWallet()
        await homeScreen.selectWallet()
        expect(await walletSettingsScreen.walletSettingPage.isDisplayed()).to.be.true
    })

    it('TC009: Manual Backup', async () => {
        await createWalletScreen.createWallet(pinCode)
        await homeScreen.isMainWalletDisplayed(walletName)
        await homeScreen.clickOnMainWallet()
        await homeScreen.selectWallet()
        await walletSettingsScreen.waitForClickableAndClick(walletSettingsScreen.manualBackUpNowButton)
        expect(await walletSettingsScreen.firstConsentCheckBox.isDisplayed()).to.be.true
    })

    it('TC010: Accept Consents', async () => {
        await createWalletScreen.createWallet(pinCode)
        await homeScreen.isMainWalletDisplayed(walletName)
        await homeScreen.clickOnMainWallet()
        await homeScreen.selectWallet()
        await walletSettingsScreen.verifyManualBackup()
        await walletSettingsScreen.verifyOpenedSecretPhrasePage()
        expect(await walletSettingsScreen.secretPhraseTitle.isDisplayed()).to.be.true
    })

    it('TC010a: Skip Consent', async () => {
        await createWalletScreen.createWallet(pinCode)
        await homeScreen.isMainWalletDisplayed(walletName)
        await homeScreen.clickOnMainWallet()
        await homeScreen.selectWallet()
        await walletSettingsScreen.waitForClickableAndClick(walletSettingsScreen.manualBackUpNowButton)
        await walletSettingsScreen.verifyContinueButtonDisabled()
    })

    it('TC011: Verify Secret Phrase Page', async () => {
        await createWalletScreen.createWallet(pinCode)
        await homeScreen.isMainWalletDisplayed(walletName)
        await homeScreen.clickOnMainWallet()
        await homeScreen.selectWallet()
        await walletSettingsScreen.verifyManualBackup()
        await walletSettingsScreen.verifyOpenedSecretPhrasePage()
        expect(await walletSettingsScreen.secretPhraseTitle.isDisplayed()).to.be.true
    })

    it('TC012: Extract Seed Phrase', async () => {
        await createWalletScreen.createWallet(pinCode)
        await homeScreen.isMainWalletDisplayed(walletName)
        await homeScreen.clickOnMainWallet()
        await homeScreen.selectWallet()
        await walletSettingsScreen.verifyManualBackup()
        const seedPhrase = await walletSettingsScreen.saveSeedPhrase()
        expect(Object.keys(seedPhrase)).to.have.lengthOf(12)
    })

    it('TC012a: Seed Phrase Missing Words', async () => {
        await createWalletScreen.createWallet(pinCode)
        await homeScreen.isMainWalletDisplayed(walletName)
        await homeScreen.clickOnMainWallet()
        await homeScreen.selectWallet()
        await walletSettingsScreen.verifyManualBackup()
        try {
            await walletSettingsScreen.saveSeedPhrase()
        } catch (error) {
            const errorMessage = await walletSettingsScreen.verifySeedPhraseError()
            expect(errorMessage).to.include('Error')
        }
    })

    it('TC013: Confirm Seed Phrase', async () => {
        await createWalletScreen.createWallet(pinCode)
        await homeScreen.isMainWalletDisplayed(walletName)
        await homeScreen.clickOnMainWallet()
        await homeScreen.selectWallet()
        await walletSettingsScreen.verifyManualBackup()
        const seedPhrase = await walletSettingsScreen.saveSeedPhrase()
        await walletSettingsScreen.clickOnContinueButton()
        await walletSettingsScreen.confirmSeedPhrase(seedPhrase)
        await walletSettingsScreen.clickOnContinueConfirmButton()
        await walletSettingsScreen.verifyWalletBackupCompleted()
        expect(await walletSettingsScreen.activeButton.isDisplayed()).to.be.true
    })

    it('TC013a: Confirm Wrong Seed Phrase', async () => {
        await createWalletScreen.createWallet(pinCode)
        await homeScreen.isMainWalletDisplayed(walletName)
        await homeScreen.clickOnMainWallet()
        await homeScreen.selectWallet()
        await walletSettingsScreen.verifyManualBackup()
        const seedPhrase = await walletSettingsScreen.saveSeedPhrase()
        await walletSettingsScreen.clickOnContinueButton()
        await walletSettingsScreen.confirmWrongSeedPhrase(seedPhrase)
        const errorMessage = await walletSettingsScreen.verifyConfirmSeedError()
        expect(errorMessage).to.include('Incorrect')
    })
})
