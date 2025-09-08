import { homeScreen } from '../../screenObjects/HomeScreen'
import { createWalletScreen  } from '../../screenObjects/CreateWalletScreen'
import { walletSettingsScreen } from '../../screenObjects/WalletSettingScreen'

// Will be implemented in the next iteration
describe.skip('Create a new wallet', () => {
    const pinCode ='111111'
    const walletName = 'Main Wallet 1'
    it('TC001: Verify Welcome Screen', async () => {
        await createWalletScreen.verifyWelcomeText()
        await createWalletScreen.verifyWelcomeText()
    })

    it('TC002: Click Create Wallet Button', async () => {
        await createWalletScreen.verifyWelcomeText()
        await createWalletScreen.waitForClickableAndClick(createWalletScreen.createWalletButton)
        await createWalletScreen.verifyPinCodeText()
    })

    it('TC003: Enter Passcode', async () => {
        await createWalletScreen.verifyWelcomeText()
        await createWalletScreen.waitForClickableAndClick(createWalletScreen.createWalletButton)
        await createWalletScreen.verifyPinCodeText()
        await createWalletScreen.enterPinCode(pinCode)
        await createWalletScreen.verifyPinCodeConfirmText()
        await createWalletScreen.verifyPinCodeText()
    })

    it('TC004: Confirm Passcode', async () => {
        await createWalletScreen.verifyWelcomeText()
        await createWalletScreen.clickOnCreateWalletButton()
        await createWalletScreen.verifyPinCodeText()
        await createWalletScreen.enterPinCode(pinCode)
        await createWalletScreen.verifyPinCodeConfirmText()
        await createWalletScreen.enterPinCode(pinCode)
        await createWalletScreen.skipNotificationButton.isDisplayed()
    })

    it('TC004a: Enter Mismatched Passcode', async () => {
        await createWalletScreen.verifyWelcomeText()
        await createWalletScreen.clickOnCreateWalletButton()
        await createWalletScreen.enterPinCode(pinCode, '654321')

        await createWalletScreen.verifyPassCodeError()
    })

    it('TC005: Skip Notification', async () => {
        await createWalletScreen.verifyWelcomeText()
        await createWalletScreen.clickOnCreateWalletButton()
        await createWalletScreen.enterPinCode(pinCode)
        await createWalletScreen.enterPinCode(pinCode)
        await createWalletScreen.clickOnSkipNotificationButton()
        await createWalletScreen.verifyWalletReadyText()
    })

    it('TC005a: Enable Notification', async () => {
        await createWalletScreen.verifyWelcomeText()
        await createWalletScreen.waitForClickableAndClick(createWalletScreen.createWalletButton)
        await createWalletScreen.enterPinCode(pinCode)
        await createWalletScreen.enterPinCode(pinCode)
        await createWalletScreen.clickOnEnableNotification()
        // const systemPopup = await createWalletScreen.systemNotificatationPopUp()
        // await systemPopup.waitForDisplayed({timeout:5000})
    })

    it('TC006: Verify Wallet Ready Message', async () => {
        await createWalletScreen.verifyWelcomeText()
        await createWalletScreen.createWallet(pinCode)
        await createWalletScreen.verifyWalletReadyText()
    })

    it('TC007: Skip Initial Screen', async () => {
        await createWalletScreen.createWallet(pinCode)
        await createWalletScreen.clickOnSkipButton()
        await homeScreen.isMainWalletDisplayed(walletName)
        await homeScreen.mainWalletButton.isDisplayed()
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

        // await walletSettingsScreen.waitForClickableAndClick(walletSettingsScreen.manualBackUpNowButton)
        // await walletSettingsScreen.firstConsentCheckBox()
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

    it.skip('TC011: Verify Secret Phrase Page', async () => {
        await createWalletScreen.createWallet(pinCode)
        await homeScreen.isMainWalletDisplayed(walletName)
        await homeScreen.clickOnMainWallet()
        await homeScreen.selectWallet()
        await walletSettingsScreen.()
        await walletSettingsScreen.verifyOpenedSecretPhrasePage()
    })

    it('TC012: Seed Phrase is displayed', async () => {
        await createWalletScreen.createWallet(pinCode)
        await homeScreen.isMainWalletDisplayed(walletName)
        await homeScreen.clickOnMainWallet()
        await homeScreen.selectWallet()
        await walletSettingsScreen.verifyManualBackup()
        const seedPhrase = await walletSettingsScreen.saveSeedPhrase()
        expect(Object.keys(seedPhrase)).to.have.lengthOf(12)
    })

    it.skip('TC012a: Seed Phrase Missing Words', async () => {
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
    })

    it.skip('TC013a: Confirm Wrong Seed Phrase', async () => {
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
